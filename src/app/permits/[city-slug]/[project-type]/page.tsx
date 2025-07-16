import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    'city-slug': string;
    'project-type': string;
  }>;
}

const getCityProjectData = (citySlug: string, projectType: string) => {
  // All supported cities
  const allCities: { [key: string]: { name: string; state: string } } = {
    'los-angeles-ca': { name: 'Los Angeles', state: 'CA' },
    'new-york-ny': { name: 'New York', state: 'NY' },
    'chicago-il': { name: 'Chicago', state: 'IL' },
    'houston-tx': { name: 'Houston', state: 'TX' },
    'phoenix-az': { name: 'Phoenix', state: 'AZ' },
    'philadelphia-pa': { name: 'Philadelphia', state: 'PA' },
    'san-antonio-tx': { name: 'San Antonio', state: 'TX' },
    'san-diego-ca': { name: 'San Diego', state: 'CA' },
    'dallas-tx': { name: 'Dallas', state: 'TX' },
    'austin-tx': { name: 'Austin', state: 'TX' },
    'san-jose-ca': { name: 'San Jose', state: 'CA' },
    'fort-worth-tx': { name: 'Fort Worth', state: 'TX' },
    'jacksonville-fl': { name: 'Jacksonville', state: 'FL' },
    'columbus-oh': { name: 'Columbus', state: 'OH' },
    'charlotte-nc': { name: 'Charlotte', state: 'NC' },
    'san-francisco-ca': { name: 'San Francisco', state: 'CA' },
    'indianapolis-in': { name: 'Indianapolis', state: 'IN' },
    'seattle-wa': { name: 'Seattle', state: 'WA' },
    'denver-co': { name: 'Denver', state: 'CO' },
    'washington-dc': { name: 'Washington', state: 'DC' },
    'boston-ma': { name: 'Boston', state: 'MA' },
    'el-paso-tx': { name: 'El Paso', state: 'TX' },
    'nashville-tn': { name: 'Nashville', state: 'TN' },
    'detroit-mi': { name: 'Detroit', state: 'MI' },
    'oklahoma-city-ok': { name: 'Oklahoma City', state: 'OK' },
    'portland-or': { name: 'Portland', state: 'OR' },
    'las-vegas-nv': { name: 'Las Vegas', state: 'NV' },
    'memphis-tn': { name: 'Memphis', state: 'TN' },
    'louisville-ky': { name: 'Louisville', state: 'KY' },
    'baltimore-md': { name: 'Baltimore', state: 'MD' },
    'milwaukee-wi': { name: 'Milwaukee', state: 'WI' },
    'albuquerque-nm': { name: 'Albuquerque', state: 'NM' },
    'tucson-az': { name: 'Tucson', state: 'AZ' },
    'fresno-ca': { name: 'Fresno', state: 'CA' },
    'mesa-az': { name: 'Mesa', state: 'AZ' },
    'sacramento-ca': { name: 'Sacramento', state: 'CA' },
    'atlanta-ga': { name: 'Atlanta', state: 'GA' },
    'kansas-city-mo': { name: 'Kansas City', state: 'MO' },
    'colorado-springs-co': { name: 'Colorado Springs', state: 'CO' },
    'miami-fl': { name: 'Miami', state: 'FL' },
    'raleigh-nc': { name: 'Raleigh', state: 'NC' },
    'omaha-ne': { name: 'Omaha', state: 'NE' },
    'long-beach-ca': { name: 'Long Beach', state: 'CA' },
    'virginia-beach-va': { name: 'Virginia Beach', state: 'VA' },
    'oakland-ca': { name: 'Oakland', state: 'CA' },
    'minneapolis-mn': { name: 'Minneapolis', state: 'MN' },
    'tulsa-ok': { name: 'Tulsa', state: 'OK' },
    'tampa-fl': { name: 'Tampa', state: 'FL' },
    'arlington-tx': { name: 'Arlington', state: 'TX' },
    'new-orleans-la': { name: 'New Orleans', state: 'LA' }
  };

  const projectMap: { [key: string]: { name: string; description: string } } = {
    'deck-permit': { 
      name: 'Deck Permit',
      description: 'Building permits are required for deck construction when the deck is over 30 inches high or attached to the main structure.'
    },
    'kitchen-remodel-permit': { 
      name: 'Kitchen Remodel Permit',
      description: 'Kitchen remodeling permits are required when changing plumbing, electrical, or structural elements.'
    },
    'addition-permit': { 
      name: 'Room Addition Permit',
      description: 'Room addition permits are always required for new construction or expanding existing structures.'
    },
    'pool-permit': { 
      name: 'Pool Permit',
      description: 'Swimming pool permits are required for all pool installations including safety equipment.'
    },
    'fence-permit': { 
      name: 'Fence Permit',
      description: 'Fence permits may be required based on height, location, and local zoning requirements.'
    },
    'accessory-structure-permit': { 
      name: 'Shed/Garage Permit',
      description: 'Accessory structure permits are required for sheds, garages, and other outbuildings over certain square footage.'
    },
    'bathroom-remodel-permit': { 
      name: 'Bathroom Remodel Permit',
      description: 'Bathroom remodeling permits are required for plumbing, electrical, or structural modifications.'
    },
    'solar-permit': { 
      name: 'Solar Panel Permit',
      description: 'Solar installation permits are required for both building and electrical safety compliance.'
    },
    'roofing-permit': { 
      name: 'Roofing Permit',
      description: 'Roofing permits are required for major roof replacements or structural changes.'
    },
    'hvac-permit': { 
      name: 'HVAC Permit',
      description: 'HVAC permits are required for heating, ventilation, and air conditioning installations.'
    },
    'electrical-permit': { 
      name: 'Electrical Permit',
      description: 'Electrical permits are required for new circuits, panels, or major electrical modifications.'
    },
    'hardscape-permit': { 
      name: 'Driveway/Patio Permit',
      description: 'Hardscape permits may be required for significant paving or grading work.'
    }
  };

  const cityInfo = allCities[citySlug];
  const projectInfo = projectMap[projectType];
  
  if (!cityInfo || !projectInfo) return null;

  // Generate dynamic project data
  const data: { [key: string]: { [key: string]: any } } = {
    'los-angeles-ca': {
      'deck-permit': {
        cityName: 'Los Angeles',
        state: 'CA',
        fullCityName: 'Los Angeles, CA',
        projectName: 'Deck Permit',
        description: 'Building permits are required for deck construction in Los Angeles when the deck is over 30 inches high or attached to the main structure.',
        requirements: [
          'Building permit application',
          'Site plan showing deck location',
          'Structural drawings and calculations',
          'Railing details (minimum 42" height)',
          'Foundation plan and details',
          'Electrical plan (if adding lighting/outlets)'
        ],
        documents: [
          'Completed permit application form',
          'Property survey or plot plan',
          'Structural engineering plans',
          'Proof of homeowner authorization',
          'HOA approval (if applicable)',
          'Environmental clearance (for hillside properties)'
        ],
        fees: {
          permitFee: '$285',
          planCheckFee: '$165',
          inspectionFee: '$95',
          totalEstimate: '$545'
        },
        timeline: {
          submittal: '1 day',
          planCheck: '2-3 weeks',
          corrections: '1-2 weeks (if needed)',
          approval: '1-2 days',
          total: '3-6 weeks'
        },
        inspections: [
          'Foundation inspection (before concrete pour)',
          'Framing inspection (before covering)',
          'Final inspection (upon completion)'
        ],
        codes: [
          '2022 Los Angeles Building Code',
          '2022 California Building Code',
          'Los Angeles Municipal Code Chapter IX'
        ]
      },
      'kitchen-remodel-permit': {
        cityName: 'Los Angeles',
        state: 'CA',
        fullCityName: 'Los Angeles, CA',
        projectName: 'Kitchen Remodel Permit',
        description: 'Kitchen remodels in Los Angeles require permits when work involves plumbing, electrical, gas, or structural modifications.',
        requirements: [
          'Building permit for structural changes',
          'Electrical permit for new circuits',
          'Plumbing permit for fixture relocations',
          'Mechanical permit for ventilation',
          'Energy compliance documentation',
          'Accessibility compliance (ADA)'
        ],
        documents: [
          'Completed permit applications',
          'Floor plan and elevation drawings',
          'Electrical and plumbing plans',
          'Ventilation calculations',
          'Energy compliance forms (Title 24)',
          'Structural calculations (if removing walls)'
        ],
        fees: {
          buildingPermit: '$465',
          electricalPermit: '$185',
          plumbingPermit: '$285',
          mechanicalPermit: '$165',
          totalEstimate: '$1,100'
        },
        timeline: {
          submittal: '1-2 days',
          planCheck: '3-4 weeks',
          corrections: '2-3 weeks (if needed)',
          approval: '2-3 days',
          total: '6-10 weeks'
        },
        inspections: [
          'Rough electrical inspection',
          'Rough plumbing inspection',
          'Rough mechanical inspection',
          'Insulation inspection',
          'Final electrical inspection',
          'Final plumbing inspection',
          'Final building inspection'
        ],
        codes: [
          '2022 Los Angeles Building Code',
          '2022 California Electrical Code',
          '2022 California Plumbing Code',
          'California Energy Code (Title 24)'
        ]
      }
    },
    'new-york-ny': {
      'deck-permit': {
        cityName: 'New York',
        state: 'NY',
        fullCityName: 'New York, NY',
        projectName: 'Deck Permit',
        description: 'All deck construction in NYC requires an Alt-2 permit through the Department of Buildings, regardless of size or height.',
        requirements: [
          'Professional engineer or architect plans',
          'Alt-2 permit application',
          'Zoning compliance review',
          'Landmark preservation review (if applicable)',
          'DOB professional certification',
          'Special inspection requirements'
        ],
        documents: [
          'Alt-2 application with architect seal',
          'Professional engineer drawings',
          'Zoning analysis report',
          'Structural calculations',
          'Progress inspection schedule',
          'Professional liability insurance'
        ],
        fees: {
          permitFee: '$485',
          examinerFee: '$280',
          professionalFee: '$1,200',
          inspectionFee: '$150',
          totalEstimate: '$2,115'
        },
        timeline: {
          submittal: '2-3 days',
          planCheck: '4-6 weeks',
          corrections: '3-4 weeks (if needed)',
          approval: '3-5 days',
          total: '8-13 weeks'
        },
        inspections: [
          'Foundation inspection',
          'Reinforcement inspection',
          'Concrete pour inspection',
          'Framing inspection',
          'Final inspection'
        ],
        codes: [
          '2014 NYC Building Code',
          '2014 NYC Zoning Resolution',
          'NYC Department of Buildings Rules'
        ]
      }
    }
  };

  // Generate dynamic project data instead of using hardcoded data
  return {
    cityName: cityInfo.name,
    state: cityInfo.state,
    fullCityName: `${cityInfo.name}, ${cityInfo.state}`,
    projectName: projectInfo.name,
    description: `${projectInfo.description} in ${cityInfo.name}.`,
    requirements: [
      'Building permit application',
      'Site plan showing project location', 
      'Structural drawings and calculations',
      'Property survey or site plan',
      'Proof of property ownership',
      'HOA approval letter (if applicable)'
    ],
    documents: [
      'Completed permit application form',
      'Property survey or site plan', 
      'Architectural drawings and specifications',
      'Structural calculations (if required)',
      'Contractor license information',
      'Insurance certificates'
    ],
    fees: {
      baseFee: '$250',
      planCheckFee: '$125',
      inspectionFee: '$75',
      total: '$450'
    },
    timeline: '2-6 weeks',
    inspections: [
      'Foundation/Footing Inspection',
      'Framing Inspection', 
      'Final Inspection'
    ],
    permitOffice: {
      name: `${cityInfo.name} Department of Building and Safety`,
      address: `City Hall, ${cityInfo.name}, ${cityInfo.state}`,
      phone: '(555) 123-4567',
      website: `https://www.${citySlug.replace(/-/g, '')}.gov`,
      hours: 'Monday-Friday: 8:00 AM - 5:00 PM'
    },
    codes: [
      `${cityInfo.state} Building Code`,
      `${cityInfo.name} Municipal Code`,
      'International Building Code'
    ]
  };
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const citySlug = resolvedParams['city-slug'];
  const projectType = resolvedParams['project-type'];
  const projectData = getCityProjectData(citySlug, projectType);
  
  if (!projectData) {
    return {
      title: 'Project Not Found | TownKit'
    };
  }

  return {
    title: `${projectData.projectName} in ${projectData.fullCityName} | TownKit`,
    description: `Complete guide to ${projectData.projectName.toLowerCase()} requirements in ${projectData.fullCityName}. Fees, timeline, and contractor matching.`,
    keywords: `${projectData.projectName} ${projectData.cityName}, ${projectData.state} ${projectType.replace('-', ' ')}, building permit ${projectData.cityName}`
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const citySlug = resolvedParams['city-slug'];
  const projectType = resolvedParams['project-type'];
  const projectData = getCityProjectData(citySlug, projectType);

  if (!projectData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">TownKit</Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/how-it-works" className="text-gray-600 hover:text-indigo-600">How it Works</Link>
              <Link href="/contractors" className="text-gray-600 hover:text-indigo-600">For Contractors</Link>
              <Link href="/help" className="text-gray-600 hover:text-indigo-600">Help</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-indigo-600">Home</Link></li>
            <li>&gt;</li>
            <li><Link href="/permits" className="hover:text-indigo-600">Permits</Link></li>
            <li>&gt;</li>
            <li><Link href={`/permits/${citySlug}`} className="hover:text-indigo-600">{projectData.fullCityName}</Link></li>
            <li>&gt;</li>
            <li className="text-gray-900">{projectData.projectName}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {projectData.projectName} in {projectData.fullCityName}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {projectData.description}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Estimated Cost</h3>
              <p className="text-2xl font-bold text-green-600">{projectData.fees.totalEstimate}</p>
              <p className="text-sm text-green-700">Total permit fees</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Timeline</h3>
              <p className="text-2xl font-bold text-blue-600">{projectData.timeline.total}</p>
              <p className="text-sm text-blue-700">Approval timeline</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Inspections</h3>
              <p className="text-2xl font-bold text-purple-600">{projectData.inspections.length}</p>
              <p className="text-sm text-purple-700">Required inspections</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 mb-4">
              Connect with experienced contractors who can handle permits and construction for your {projectData.projectName.toLowerCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href={`/permits/${citySlug}/${projectType}/get-matched`}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center"
              >
                Get Matched with Contractors
              </Link>
              <Link 
                href={`/calculator?city=${citySlug}&project=${projectType}`}
                className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-center"
              >
                Use Permit Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Permit Requirements
              </h2>
              <div className="space-y-3">
                {projectData.requirements.map((req: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Required Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectData.documents.map((doc: string, index: number) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded text-xs flex items-center justify-center mr-3 mt-0.5">
                      📄
                    </div>
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Fee Breakdown
              </h2>
              <div className="space-y-3">
                {Object.entries(projectData.fees).map(([feeType, amount]) => {
                  if (feeType === 'totalEstimate') return null;
                  return (
                    <div key={feeType} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 capitalize">
                        {feeType.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-semibold text-gray-900">{amount as string}</span>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-200 font-bold">
                  <span className="text-gray-900">Total Estimated Cost</span>
                  <span className="text-green-600 text-lg">{projectData.fees.totalEstimate}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Process Timeline
              </h2>
              <div className="space-y-4">
                {Object.entries(projectData.timeline).map(([phase, duration], index) => {
                  if (phase === 'total') return null;
                  return (
                    <div key={phase} className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 capitalize">
                          {phase.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-600">{duration as string}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center border-t pt-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    ✓
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Total Timeline</h3>
                    <p className="text-sm font-semibold text-green-600">{projectData.timeline.total}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Required Inspections
              </h2>
              <div className="space-y-3">
                {projectData.inspections.map((inspection: string, index: number) => (
                  <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{inspection}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Building Codes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Applicable Building Codes
              </h3>
              <div className="space-y-2">
                {projectData.codes.map((code: string, index: number) => (
                  <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                    {code}
                  </div>
                ))}
              </div>
            </div>

            {/* Help Box */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">
                Need Professional Help?
              </h3>
              <p className="text-blue-800 text-sm mb-4">
                Permit applications can be complex. Our network of professionals can help with:
              </p>
              <ul className="text-sm text-blue-800 space-y-1 mb-4">
                <li>• Plan preparation and drawings</li>
                <li>• Permit application filing</li>
                <li>• Code compliance review</li>
                <li>• Inspection scheduling</li>
              </ul>
              <Link 
                href={`/permits/${citySlug}/${projectType}/get-matched`}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center"
              >
                Get Professional Help
              </Link>
            </div>

            {/* Related Projects */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Related Projects
              </h3>
              <div className="space-y-3">
                <Link 
                  href={`/permits/${citySlug}/kitchen-remodel-permit`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Kitchen Remodel</h4>
                  <p className="text-sm text-gray-600">Major renovation permits</p>
                </Link>
                <Link 
                  href={`/permits/${citySlug}/addition-permit`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Room Addition</h4>
                  <p className="text-sm text-gray-600">Expand your living space</p>
                </Link>
                <Link 
                  href={`/permits/${citySlug}/pool-permit`}
                  className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Swimming Pool</h4>
                  <p className="text-sm text-gray-600">Pool installation permits</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}