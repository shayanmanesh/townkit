import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { VerticalAd, HorizontalAd } from '@/components/GoogleAdsense';

interface CityPageProps {
  params: Promise<{
    'city-slug': string;
  }>;
}

const getCityData = (citySlug: string) => {
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

  const cityInfo = allCities[citySlug];
  if (!cityInfo) return null;

  // Generate dynamic city data
  const commonProjects = [
    {
      name: 'Deck Addition',
      slug: 'deck-permit',
      requirement: 'Required for decks over 30 inches high or attached to structure',
      estimatedFee: '$200 - $600',
      timeline: '2-4 weeks'
    },
    {
      name: 'Kitchen Remodel',
      slug: 'kitchen-remodel-permit',
      requirement: 'Required if changing plumbing, electrical, or structural elements',
      estimatedFee: '$400 - $1,000',
      timeline: '3-6 weeks'
    },
    {
      name: 'Room Addition',
      slug: 'addition-permit',
      requirement: 'Always required for new construction or room additions',
      estimatedFee: '$1,200 - $3,000',
      timeline: '6-12 weeks'
    },
    {
      name: 'Swimming Pool',
      slug: 'pool-permit',
      requirement: 'Required for all pool installations',
      estimatedFee: '$800 - $1,500',
      timeline: '4-8 weeks'
    },
    {
      name: 'Fence Installation',
      slug: 'fence-permit',
      requirement: 'Required for fences over 6 feet high in residential areas',
      estimatedFee: '$150 - $400',
      timeline: '1-3 weeks'
    },
    {
      name: 'Shed/Garage',
      slug: 'accessory-structure-permit',
      requirement: 'Required for structures over 120 sq ft',
      estimatedFee: '$200 - $600',
      timeline: '2-4 weeks'
    }
  ];

  return {
    name: cityInfo.name,
    state: cityInfo.state,
    fullName: `${cityInfo.name}, ${cityInfo.state}`,
    description: `${cityInfo.name} has comprehensive building permit requirements for residential and commercial projects. Connect with local contractors to ensure compliance.`,
    permitOffice: {
      name: `${cityInfo.name} Department of Building and Safety`,
      website: `https://www.${citySlug.replace(/-/g, '')}.gov`,
      phone: '(555) 123-4567',
      address: `City Hall, ${cityInfo.name}, ${cityInfo.state}`
    },
    commonProjects
  };
};

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const citySlug = resolvedParams['city-slug'];
  const cityData = getCityData(citySlug);
  
  if (!cityData) {
    return {
      title: 'City Not Found | TownKit'
    };
  }

  return {
    title: `Building Permits in ${cityData.fullName} | TownKit`,
    description: `Find building permit requirements, costs, and timelines for ${cityData.fullName}. Connect with local contractors for your home improvement project.`,
    keywords: `${cityData.name} building permits, ${cityData.state} permits, construction permits ${cityData.name}, building requirements ${cityData.fullName}`
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  const citySlug = resolvedParams['city-slug'];
  const cityData = getCityData(citySlug);

  if (!cityData) {
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
            <li className="text-gray-900">{cityData.fullName}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Building Permits in {cityData.fullName}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {cityData.description}
          </p>
          
          {/* CTA Section */}
          <div className="bg-indigo-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Need Help With Your Project?
            </h2>
            <p className="text-gray-600 mb-4">
              Get matched with pre-screened contractors in {cityData.name} who can handle permits and construction.
            </p>
            <Link 
              href={`/permits/${citySlug}/get-matched`}
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Matched with Contractors
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Permit Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Common Permit Requirements
              </h2>
              <div className="space-y-6">
                {cityData.commonProjects.map((project: any) => (
                  <div key={project.slug} className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <Link 
                        href={`/permits/${citySlug}/${project.slug}`}
                        className="hover:text-indigo-600"
                      >
                        {project.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2">{project.requirement}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-green-600 font-medium">
                        Fee: {project.estimatedFee}
                      </span>
                      <span className="text-blue-600 font-medium">
                        Timeline: {project.timeline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permit Process */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How to Apply for Permits in {cityData.name}
              </h2>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Determine Requirements</h3>
                    <p className="text-gray-600">Use our permit calculator or consult with a contractor to understand what permits you need.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Prepare Documents</h3>
                    <p className="text-gray-600">Gather architectural plans, project descriptions, and property surveys as required.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Submit Application</h3>
                    <p className="text-gray-600">Submit your application online or in person with all required documents and fees.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Review Process</h3>
                    <p className="text-gray-600">Wait for plan review and address any comments or required revisions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Permit Issuance</h3>
                    <p className="text-gray-600">Once approved, pay final fees and receive your building permit to begin construction.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad: Vertical in sidebar */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <VerticalAd />
            </div>
            {/* Permit Office Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {cityData.name} Permit Office
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{cityData.permitOffice.name}</h4>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a href={`tel:${cityData.permitOffice.phone}`} className="text-indigo-600 hover:underline">
                    {cityData.permitOffice.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Website</p>
                  <a 
                    href={cityData.permitOffice.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline break-all"
                  >
                    Official Site
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-gray-900">{cityData.permitOffice.address}</p>
                </div>
              </div>
            </div>

            {/* Quick Calculator */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Permit Calculator
              </h3>
              <p className="text-gray-600 mb-4">
                Get an instant estimate of what permits you might need for your project.
              </p>
              <Link 
                href={`/calculator?city=${citySlug}`}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-block text-center"
              >
                Start Calculator
              </Link>
            </div>

            {/* Featured Contractors */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Featured Contractors
              </h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-gray-900">ABC Construction</h4>
                  <p className="text-sm text-gray-600">Specializes in home additions</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-sm text-gray-600 ml-1">(47 reviews)</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-gray-900">Superior Decks</h4>
                  <p className="text-sm text-gray-600">Deck and outdoor specialists</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★★★★☆</span>
                    <span className="text-sm text-gray-600 ml-1">(23 reviews)</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-gray-900">Kitchen Pro LLC</h4>
                  <p className="text-sm text-gray-600">Kitchen remodeling experts</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-sm text-gray-600 ml-1">(89 reviews)</span>
                  </div>
                </div>
              </div>
              <Link 
                href={`/contractors?city=${citySlug}`}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-block text-center mt-4"
              >
                View All Contractors
              </Link>
            </div>
          </div>
        </div>
        
        {/* Ad: Bottom horizontal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center">
            <HorizontalAd className="max-w-4xl" />
          </div>
        </div>
      </main>
    </div>
  );
}