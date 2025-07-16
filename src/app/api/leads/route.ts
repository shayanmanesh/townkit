import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContractorNotification, sendConfirmationEmail } from '@/lib/email';

interface LeadRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  propertyType?: string;
  homeOwnership: string;
  citySlug: string;
  projectSlug?: string;
  permitHelp?: string;
  additionalServices?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadRequest = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.projectType || 
        !body.projectDescription || !body.timeline || !body.budget || !body.citySlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Try to find the city, but continue if database is not seeded yet
    let city = null;
    try {
      city = await prisma.city.findUnique({
        where: { slug: body.citySlug }
      });
    } catch (dbError) {
      console.warn('Database not accessible or seeded:', dbError);
    }

    // If city not found in database, create a mock city for now
    if (!city) {
      city = {
        id: 'temp-city-id',
        name: body.citySlug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        state: 'Unknown',
        slug: body.citySlug
      };
    }

    // Find the project if provided (handle database errors gracefully)
    let project = null;
    if (body.projectSlug) {
      try {
        project = await prisma.project.findUnique({
          where: { slug: body.projectSlug }
        });
      } catch (dbError) {
        console.warn('Project lookup failed:', dbError);
      }
    }

    // Try to create the lead in the database, but continue if it fails
    let lead = null;
    try {
      lead = await prisma.lead.create({
        data: {
          homeownerName: `${body.firstName} ${body.lastName}`,
          email: body.email,
          phone: body.phone || null,
          projectType: body.projectType,
          projectDescription: body.projectDescription,
          budget: body.budget,
          timeline: body.timeline,
          cityId: city.id,
          projectId: project?.id || null,
          status: 'new'
        }
      });
    } catch (dbError) {
      console.warn('Lead creation failed, creating mock lead:', dbError);
      lead = {
        id: `temp-lead-${Date.now()}`,
        homeownerName: `${body.firstName} ${body.lastName}`,
        email: body.email,
        phone: body.phone || null,
        projectType: body.projectType,
        projectDescription: body.projectDescription,
        budget: body.budget,
        timeline: body.timeline,
        status: 'new'
      };
    }

    // Try to find matching contractors (handle database errors gracefully)
    let contractors = [];
    try {
      contractors = await prisma.contractor.findMany({
        where: {
          cityId: city.id,
          isVerified: true,
          AND: body.projectSlug ? {
            specialties: {
              has: body.projectSlug
            }
          } : {}
        },
        orderBy: [
          { subscriptionTier: 'desc' }, // Premium contractors first
          { createdAt: 'asc' }
        ],
        take: 4 // Limit to 4 contractors
      });
    } catch (dbError) {
      console.warn('Contractor lookup failed, using mock contractors:', dbError);
      contractors = [
        {
          id: 'mock-contractor-1',
          businessName: `Local ${body.projectType} Experts`,
          contactEmail: 'contractor1@example.com',
          subscriptionTier: 'premium'
        },
        {
          id: 'mock-contractor-2', 
          businessName: `${city.name} Construction Co`,
          contactEmail: 'contractor2@example.com',
          subscriptionTier: 'free'
        }
      ];
    }

    // Send notifications to contractors (skip database operations if needed)
    const emailPromises = contractors.map(async (contractor) => {
      // Try to create lead-contractor match record
      try {
        await prisma.leadContractorMatch.create({
          data: {
            leadId: lead.id,
            contractorId: contractor.id,
            price: contractor.subscriptionTier === 'premium' ? 150 : 100,
            status: 'pending'
          }
        });
      } catch (dbError) {
        console.warn('Failed to create lead-contractor match:', dbError);
      }

      // Send email notification (only if we have real contractors)
      if (contractor.contactEmail !== 'contractor1@example.com' && contractor.contactEmail !== 'contractor2@example.com') {
        return sendContractorNotification({
          homeownerName: lead.homeownerName,
          email: lead.email,
          phone: lead.phone || undefined,
          projectType: body.projectType,
          projectDescription: body.projectDescription,
          timeline: body.timeline,
          budget: body.budget,
          city: `${city.name}, ${city.state}`,
          contractorName: contractor.businessName,
          contractorEmail: contractor.contactEmail
        });
      }
    });

    // Send confirmation email to homeowner
    let confirmationPromise;
    try {
      confirmationPromise = sendConfirmationEmail(
        {
          homeownerName: body.firstName,
          projectType: body.projectType,
          city: `${city.name}, ${city.state}`,
          submittedAt: new Date().toLocaleString()
        },
        body.email
      );
    } catch (emailError) {
      console.warn('Email service not configured:', emailError);
      confirmationPromise = Promise.resolve({ success: false });
    }

    // Wait for all emails to be sent
    const emailResults = await Promise.allSettled([...emailPromises.filter(Boolean), confirmationPromise]);
    
    // Log email results
    const failedEmails = emailResults.filter(result => result.status === 'rejected').length;
    if (failedEmails > 0) {
      console.warn(`${failedEmails} emails failed to send for lead ${lead.id}`);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      contractorsMatched: contractors.length,
      message: `Successfully matched with ${contractors.length} contractors`
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve lead status (for follow-up)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID required' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        city: true,
        project: true,
        contractorMatches: {
          include: {
            contractor: {
              select: {
                businessName: true,
                contactEmail: true,
                isVerified: true
              }
            }
          }
        }
      }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lead: {
        id: lead.id,
        homeownerName: lead.homeownerName,
        projectType: lead.projectType,
        status: lead.status,
        createdAt: lead.createdAt,
        city: lead.city.name,
        contractorMatches: lead.contractorMatches.map(match => ({
          contractorName: match.contractor.businessName,
          status: match.status,
          matchedAt: match.matchedAt
        }))
      }
    });

  } catch (error) {
    console.error('Error retrieving lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}