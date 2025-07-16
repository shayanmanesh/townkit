'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HorizontalAd, SquareAd, InFeedAd } from '@/components/GoogleAdsense';

const popularCities = [
  'Los Angeles, CA',
  'New York, NY', 
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'Austin, TX',
  'San Jose, CA',
  'Fort Worth, TX',
  'Jacksonville, FL',
  'Columbus, OH',
  'Charlotte, NC',
  'San Francisco, CA',
  'Indianapolis, IN',
  'Seattle, WA',
  'Denver, CO',
  'Washington, DC',
  'Boston, MA',
  'El Paso, TX',
  'Nashville, TN',
  'Detroit, MI',
  'Oklahoma City, OK',
  'Portland, OR',
  'Las Vegas, NV',
  'Memphis, TN',
  'Louisville, KY',
  'Baltimore, MD',
  'Milwaukee, WI',
  'Albuquerque, NM',
  'Tucson, AZ',
  'Fresno, CA',
  'Mesa, AZ',
  'Sacramento, CA',
  'Atlanta, GA',
  'Kansas City, MO',
  'Colorado Springs, CO',
  'Miami, FL',
  'Raleigh, NC',
  'Omaha, NE',
  'Long Beach, CA',
  'Virginia Beach, VA',
  'Oakland, CA',
  'Minneapolis, MN',
  'Tulsa, OK',
  'Tampa, FL',
  'Arlington, TX',
  'New Orleans, LA'
];

const popularProjects = [
  {
    name: 'Deck Addition',
    slug: 'deck-permit',
    description: 'Build a new deck or expand an existing one',
    estimatedCost: '$5,000 - $25,000'
  },
  {
    name: 'Kitchen Remodel',
    slug: 'kitchen-remodel-permit',
    description: 'Renovate your kitchen with new layout or appliances',
    estimatedCost: '$15,000 - $75,000'
  },
  {
    name: 'Room Addition', 
    slug: 'addition-permit',
    description: 'Add a new room or expand your living space',
    estimatedCost: '$25,000 - $150,000'
  },
  {
    name: 'Swimming Pool',
    slug: 'pool-permit',
    description: 'Install an in-ground or above-ground pool',
    estimatedCost: '$30,000 - $100,000'
  },
  {
    name: 'Fence Installation',
    slug: 'fence-permit',
    description: 'Install privacy, decorative, or security fencing',
    estimatedCost: '$2,000 - $8,000'
  },
  {
    name: 'Shed/Garage',
    slug: 'accessory-structure-permit',
    description: 'Build detached garage, shed, or workshop',
    estimatedCost: '$5,000 - $30,000'
  }
];

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySearch = () => {
    if (selectedCity) {
      const citySlug = selectedCity.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      window.location.href = `/permits/${citySlug}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">TownKit</div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/how-it-works" className="text-gray-600 hover:text-indigo-600">How it Works</Link>
              <Link href="/contractors" className="text-gray-600 hover:text-indigo-600">For Contractors</Link>
              <Link href="/help" className="text-gray-600 hover:text-indigo-600">Help</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Building Permits & 
            <span className="text-indigo-600"> Contractors</span> in Your City
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Navigate permits like a pro. Connect with qualified contractors. 
            Turn your home improvement dreams into reality.
          </p>

          {/* City Selector */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get Started in Your City
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  >
                    <option value="">Select your city...</option>
                    {popularCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={handleCitySearch}
                  disabled={!selectedCity}
                  className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Find Permits
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Don't see your city? <Link href="/request-city" className="text-indigo-600 hover:underline">Request it here</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Ad: Horizontal */}
        <div className="mb-8 flex justify-center">
          <HorizontalAd className="max-w-4xl" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Popular Home Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProjects.map((project) => (
            <div key={project.slug} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-600">{project.estimatedCost}</span>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Ad: In-Feed between sections */}
        <div className="mt-16 mb-8 flex justify-center">
          <InFeedAd className="max-w-2xl" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How TownKit Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Requirements</h3>
              <p className="text-gray-600">
                Tell us your project and location. We'll show you exactly what permits you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Connect with pre-screened contractors who specialize in your project type.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Building</h3>
              <p className="text-gray-600">
                Get quotes, compare options, and start your project with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-indigo-400 mb-4">TownKit</div>
              <p className="text-gray-400">
                Simplifying permits and connecting homeowners with qualified contractors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Homeowners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/permits" className="hover:text-white">Find Permits</Link></li>
                <li><Link href="/contractors" className="hover:text-white">Find Contractors</Link></li>
                <li><Link href="/calculator" className="hover:text-white">Cost Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Contractors</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contractor-signup" className="hover:text-white">Join Network</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/leads" className="hover:text-white">Get Leads</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TownKit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
