import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const cities = [
  { name: 'New York', state: 'NY', slug: 'new-york-ny' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca' },
  { name: 'Chicago', state: 'IL', slug: 'chicago-il' },
  { name: 'Houston', state: 'TX', slug: 'houston-tx' },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix-az' },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia-pa' },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio-tx' },
  { name: 'San Diego', state: 'CA', slug: 'san-diego-ca' },
  { name: 'Dallas', state: 'TX', slug: 'dallas-tx' },
  { name: 'Austin', state: 'TX', slug: 'austin-tx' },
  { name: 'San Jose', state: 'CA', slug: 'san-jose-ca' },
  { name: 'Fort Worth', state: 'TX', slug: 'fort-worth-tx' },
  { name: 'Jacksonville', state: 'FL', slug: 'jacksonville-fl' },
  { name: 'Columbus', state: 'OH', slug: 'columbus-oh' },
  { name: 'Charlotte', state: 'NC', slug: 'charlotte-nc' },
  { name: 'San Francisco', state: 'CA', slug: 'san-francisco-ca' },
  { name: 'Indianapolis', state: 'IN', slug: 'indianapolis-in' },
  { name: 'Seattle', state: 'WA', slug: 'seattle-wa' },
  { name: 'Denver', state: 'CO', slug: 'denver-co' },
  { name: 'Washington', state: 'DC', slug: 'washington-dc' },
  { name: 'Boston', state: 'MA', slug: 'boston-ma' },
  { name: 'El Paso', state: 'TX', slug: 'el-paso-tx' },
  { name: 'Nashville', state: 'TN', slug: 'nashville-tn' },
  { name: 'Detroit', state: 'MI', slug: 'detroit-mi' },
  { name: 'Oklahoma City', state: 'OK', slug: 'oklahoma-city-ok' },
  { name: 'Portland', state: 'OR', slug: 'portland-or' },
  { name: 'Las Vegas', state: 'NV', slug: 'las-vegas-nv' },
  { name: 'Memphis', state: 'TN', slug: 'memphis-tn' },
  { name: 'Louisville', state: 'KY', slug: 'louisville-ky' },
  { name: 'Baltimore', state: 'MD', slug: 'baltimore-md' },
  { name: 'Milwaukee', state: 'WI', slug: 'milwaukee-wi' },
  { name: 'Albuquerque', state: 'NM', slug: 'albuquerque-nm' },
  { name: 'Tucson', state: 'AZ', slug: 'tucson-az' },
  { name: 'Fresno', state: 'CA', slug: 'fresno-ca' },
  { name: 'Mesa', state: 'AZ', slug: 'mesa-az' },
  { name: 'Sacramento', state: 'CA', slug: 'sacramento-ca' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta-ga' },
  { name: 'Kansas City', state: 'MO', slug: 'kansas-city-mo' },
  { name: 'Colorado Springs', state: 'CO', slug: 'colorado-springs-co' },
  { name: 'Miami', state: 'FL', slug: 'miami-fl' },
  { name: 'Raleigh', state: 'NC', slug: 'raleigh-nc' },
  { name: 'Omaha', state: 'NE', slug: 'omaha-ne' },
  { name: 'Long Beach', state: 'CA', slug: 'long-beach-ca' },
  { name: 'Virginia Beach', state: 'VA', slug: 'virginia-beach-va' },
  { name: 'Oakland', state: 'CA', slug: 'oakland-ca' },
  { name: 'Minneapolis', state: 'MN', slug: 'minneapolis-mn' },
  { name: 'Tulsa', state: 'OK', slug: 'tulsa-ok' },
  { name: 'Tampa', state: 'FL', slug: 'tampa-fl' },
  { name: 'Arlington', state: 'TX', slug: 'arlington-tx' },
  { name: 'New Orleans', state: 'LA', slug: 'new-orleans-la' }
];

const projects = [
  {
    name: 'Deck Addition',
    slug: 'deck-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit'],
      description: 'Deck permits are typically required for decks over 30 inches high or attached to the main structure.',
      estimatedCost: '$200-$600',
      timeline: '2-4 weeks'
    }
  },
  {
    name: 'Kitchen Remodel',
    slug: 'kitchen-remodel-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit', 'Electrical Permit', 'Plumbing Permit'],
      description: 'Kitchen remodels require permits when work involves plumbing, electrical, gas, or structural modifications.',
      estimatedCost: '$400-$1,200',
      timeline: '4-8 weeks'
    }
  },
  {
    name: 'Bathroom Remodel',
    slug: 'bathroom-remodel-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit', 'Plumbing Permit', 'Electrical Permit'],
      description: 'Bathroom remodels typically require permits for plumbing and electrical work.',
      estimatedCost: '$300-$800',
      timeline: '3-6 weeks'
    }
  },
  {
    name: 'Room Addition',
    slug: 'addition-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit', 'Electrical Permit', 'Plumbing Permit', 'Zoning Review'],
      description: 'Room additions always require comprehensive permits and plan review.',
      estimatedCost: '$1,000-$3,000',
      timeline: '6-12 weeks'
    }
  },
  {
    name: 'Swimming Pool',
    slug: 'pool-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit', 'Pool Permit', 'Electrical Permit'],
      description: 'Pool installations require specialized permits for safety and structural requirements.',
      estimatedCost: '$500-$1,500',
      timeline: '4-8 weeks'
    }
  },
  {
    name: 'Fence Installation',
    slug: 'fence-permit',
    typicalPermitsRequired: {
      permits: ['Fence Permit'],
      description: 'Fence permits may be required based on height, location, and local zoning requirements.',
      estimatedCost: '$100-$300',
      timeline: '1-2 weeks'
    }
  },
  {
    name: 'Shed/Garage',
    slug: 'accessory-structure-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit'],
      description: 'Accessory structures typically require permits when over a certain square footage.',
      estimatedCost: '$200-$600',
      timeline: '2-4 weeks'
    }
  },
  {
    name: 'Solar Panel Installation',
    slug: 'solar-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit', 'Electrical Permit'],
      description: 'Solar installations require both building and electrical permits for safety compliance.',
      estimatedCost: '$300-$800',
      timeline: '2-6 weeks'
    }
  },
  {
    name: 'Roofing',
    slug: 'roofing-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit'],
      description: 'Roofing permits are typically required for major roof replacements or structural changes.',
      estimatedCost: '$150-$400',
      timeline: '1-3 weeks'
    }
  },
  {
    name: 'HVAC System',
    slug: 'hvac-permit',
    typicalPermitsRequired: {
      permits: ['Mechanical Permit', 'Electrical Permit'],
      description: 'HVAC installations and major repairs require mechanical and electrical permits.',
      estimatedCost: '$200-$500',
      timeline: '1-3 weeks'
    }
  },
  {
    name: 'Driveway/Patio',
    slug: 'hardscape-permit',
    typicalPermitsRequired: {
      permits: ['Building Permit'],
      description: 'Hardscape permits may be required for significant paving or grading work.',
      estimatedCost: '$150-$400',
      timeline: '1-3 weeks'
    }
  },
  {
    name: 'Electrical Work',
    slug: 'electrical-permit',
    typicalPermitsRequired: {
      permits: ['Electrical Permit'],
      description: 'Electrical permits are required for new circuits, panels, or major electrical modifications.',
      estimatedCost: '$100-$300',
      timeline: '1-2 weeks'
    }
  }
];

const sampleContractors = [
  {
    businessName: 'ABC Construction Co.',
    contactEmail: 'contact@abcconstruction.com',
    contactPhone: '(555) 123-4567',
    licenseNumber: 'CA-LIC-123456',
    specialties: ['deck-permit', 'addition-permit', 'kitchen-remodel-permit'],
    isVerified: true
  },
  {
    businessName: 'Superior Decks & Outdoor Living',
    contactEmail: 'info@superiordecks.com',
    contactPhone: '(555) 234-5678',
    licenseNumber: 'CA-LIC-234567',
    specialties: ['deck-permit', 'hardscape-permit'],
    isVerified: true
  },
  {
    businessName: 'Kitchen Pro LLC',
    contactEmail: 'hello@kitchenpro.com',
    contactPhone: '(555) 345-6789',
    licenseNumber: 'CA-LIC-345678',
    specialties: ['kitchen-remodel-permit', 'bathroom-remodel-permit'],
    isVerified: true
  },
  {
    businessName: 'Complete Home Solutions',
    contactEmail: 'info@completehome.com',
    contactPhone: '(555) 456-7890',
    licenseNumber: 'CA-LIC-456789',
    specialties: ['addition-permit', 'roofing-permit', 'electrical-permit'],
    isVerified: true
  },
  {
    businessName: 'Pool Paradise Builders',
    contactEmail: 'sales@poolparadise.com',
    contactPhone: '(555) 567-8901',
    licenseNumber: 'CA-LIC-567890',
    specialties: ['pool-permit', 'hardscape-permit'],
    isVerified: true
  }
];

async function main() {
  console.log('Starting database seed...')

  // Create cities
  console.log('Seeding cities...')
  for (const city of cities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        name: city.name,
        state: city.state,
        country: 'US',
        slug: city.slug,
        permitInfoJson: {
          description: `${city.name}, ${city.state} has comprehensive building permit requirements for residential and commercial projects.`,
          permitOffice: `${city.name} Department of Building and Safety`,
          website: `https://www.${city.slug.replace(/-/g, '')}.gov`,
          phone: '(555) 123-4567'
        }
      }
    })
  }

  // Create projects
  console.log('Seeding projects...')
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        name: project.name,
        slug: project.slug,
        typicalPermitsRequired: project.typicalPermitsRequired,
        description: project.typicalPermitsRequired.description
      }
    })
  }

  // Create sample contractors for major cities
  console.log('Seeding contractors...')
  const majorCities = ['los-angeles-ca', 'new-york-ny', 'chicago-il', 'houston-tx', 'phoenix-az'];
  
  for (const citySlug of majorCities) {
    const city = await prisma.city.findUnique({ where: { slug: citySlug } });
    if (city) {
      for (const contractor of sampleContractors) {
        await prisma.contractor.upsert({
          where: { 
            contactEmail: `${contractor.contactEmail.split('@')[0]}+${citySlug}@${contractor.contactEmail.split('@')[1]}`
          },
          update: {},
          create: {
            businessName: `${contractor.businessName} - ${city.name}`,
            contactEmail: `${contractor.contactEmail.split('@')[0]}+${citySlug}@${contractor.contactEmail.split('@')[1]}`,
            contactPhone: contractor.contactPhone,
            licenseNumber: contractor.licenseNumber.replace('CA-LIC', `${city.state}-LIC`),
            cityId: city.id,
            specialties: contractor.specialties,
            isVerified: contractor.isVerified,
            subscriptionTier: Math.random() > 0.5 ? 'premium' : 'free'
          }
        })
      }
    }
  }

  // Create permit requirements for city-project combinations
  console.log('Seeding permit requirements...')
  const sampleCities = ['los-angeles-ca', 'new-york-ny', 'chicago-il'];
  const sampleProjects = ['deck-permit', 'kitchen-remodel-permit', 'pool-permit'];

  for (const citySlug of sampleCities) {
    const city = await prisma.city.findUnique({ where: { slug: citySlug } });
    if (city) {
      for (const projectSlug of sampleProjects) {
        const project = await prisma.project.findUnique({ where: { slug: projectSlug } });
        if (project) {
          await prisma.permitRequirement.upsert({
            where: {
              cityId_projectId: {
                cityId: city.id,
                projectId: project.id
              }
            },
            update: {},
            create: {
              cityId: city.id,
              projectId: project.id,
              requirementsJson: {
                permits: ['Building Permit'],
                documents: ['Application form', 'Site plan', 'Proof of ownership'],
                fees: {
                  permitFee: '$250',
                  planCheckFee: '$150',
                  total: '$400'
                },
                timeline: '2-4 weeks',
                inspections: ['Foundation', 'Framing', 'Final'],
                codes: [`${city.name} Building Code`, 'State Building Code']
              },
              estimatedCost: '$200-$600',
              estimatedTimeline: '2-4 weeks'
            }
          })
        }
      }
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })