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

    // Find the city
    const city = await prisma.city.findUnique({
      where: { slug: body.citySlug }
    });

    if (!city) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      );
    }

    // Find the project if provided
    let project = null;
    if (body.projectSlug) {
      project = await prisma.project.findUnique({
        where: { slug: body.projectSlug }
      });
    }

    // Create the lead in the database
    const lead = await prisma.lead.create({
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

    // Find matching contractors
    const contractors = await prisma.contractor.findMany({
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

    // Send notifications to contractors
    const emailPromises = contractors.map(async (contractor) => {
      // Create lead-contractor match record
      await prisma.leadContractorMatch.create({
        data: {
          leadId: lead.id,
          contractorId: contractor.id,
          price: contractor.subscriptionTier === 'premium' ? 150 : 100, // Different pricing by tier
          status: 'pending'
        }
      });

      // Send email notification
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
    });

    // Send confirmation email to homeowner
    const confirmationPromise = sendConfirmationEmail(
      {
        homeownerName: body.firstName,
        projectType: body.projectType,
        city: `${city.name}, ${city.state}`,
        submittedAt: new Date().toLocaleString()
      },
      body.email
    );

    // Wait for all emails to be sent
    const emailResults = await Promise.allSettled([...emailPromises, confirmationPromise]);
    
    // Log email results (in production, you'd want better error tracking)
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