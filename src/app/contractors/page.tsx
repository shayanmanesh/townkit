import Link from 'next/link';
import type { Metadata } from 'next';
import { HorizontalAd } from '@/components/GoogleAdsense';

export const metadata: Metadata = {
  title: 'For Contractors | Join TownKit Network',
  description: 'Join the TownKit contractor network and get connected with qualified homeowners looking for building permits and home improvement projects.',
  keywords: 'contractors, join network, building permits, home improvement leads, contractor registration'
};

export default function ContractorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">TownKit</Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/how-it-works" className="text-gray-600 hover:text-indigo-600">How it Works</Link>
              <Link href="/contractors" className="text-indigo-600 font-medium">For Contractors</Link>
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
            <li className="text-gray-900">For Contractors</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Grow Your Business with TownKit
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Join thousands of contractors who are growing their businesses by connecting 
            with qualified homeowners looking for building permits and home improvement projects.
          </p>
          <div className="bg-indigo-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to Join Our Network?
            </h2>
            <p className="text-gray-600 mb-4">
              Get started today and start receiving high-quality leads in your area.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Apply to Join Network
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
              💰
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Qualified Leads</h3>
            <p className="text-gray-600">
              Receive pre-qualified leads from homeowners who are ready to move forward 
              with their projects. No more cold calling or door knocking.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
              📍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Local Focus</h3>
            <p className="text-gray-600">
              Get matched with projects in your service area. Build your local reputation 
              and reduce travel time between jobs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
              ⭐
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Build Your Reputation</h3>
            <p className="text-gray-600">
              Showcase your work, collect reviews, and build your online presence. 
              Our platform helps you demonstrate your expertise.
            </p>
          </div>
        </div>

        {/* How It Works for Contractors */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works for Contractors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apply & Get Verified</h3>
              <p className="text-sm text-gray-600">
                Complete our application process and provide license, insurance, and reference information.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Set Your Preferences</h3>
              <p className="text-sm text-gray-600">
                Choose your service areas, project types, and lead preferences to get relevant matches.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Receive Quality Leads</h3>
              <p className="text-sm text-gray-600">
                Get notified of new leads that match your criteria. Contact homeowners directly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Win More Projects</h3>
              <p className="text-sm text-gray-600">
                Provide quotes, win projects, and grow your business with satisfied customers.
              </p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contractor Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Requirements</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Valid contractor license in your state
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  General liability insurance ($1M minimum)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Workers compensation insurance
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Business registration and tax ID
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Minimum 2 years in business
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Qualifications</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  BBB accreditation or A+ rating
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Professional references available
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Portfolio of completed projects
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Positive online reviews and ratings
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Permit and code expertise
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Plan</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">$99<span className="text-lg text-gray-600">/lead</span></div>
              <p className="text-gray-600 mb-4">Perfect for established contractors</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Qualified homeowner leads
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Project details and timeline
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Direct homeowner contact info
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Lead management tools
                </li>
              </ul>
            </div>
            <div className="border-2 border-indigo-500 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Plan</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">$149<span className="text-lg text-gray-600">/lead</span></div>
              <p className="text-gray-600 mb-4">Priority access and exclusive benefits</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Standard Plan
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority lead notifications
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Featured contractor listing
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Customer service priority
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-gray-600 mb-6">
            Join our network of successful contractors and start receiving quality leads today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Apply Now
            </button>
            <Link 
              href="/help"
              className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>

      {/* Ad: Bottom horizontal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <HorizontalAd className="max-w-4xl" />
        </div>
      </div>
    </div>
  );
}