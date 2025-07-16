import Link from 'next/link';
import type { Metadata } from 'next';
import { HorizontalAd } from '@/components/GoogleAdsense';

export const metadata: Metadata = {
  title: 'Help & Support | TownKit',
  description: 'Get help with building permits, finding contractors, and using TownKit. Frequently asked questions and customer support.',
  keywords: 'help, support, FAQ, building permits, contractors, customer service'
};

export default function HelpPage() {
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
              <Link href="/help" className="text-indigo-600 font-medium">Help</Link>
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
            <li className="text-gray-900">Help</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/calculator" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-1">Permit Calculator</h3>
                  <p className="text-sm text-gray-600">Find out what permits you need</p>
                </Link>
                <Link href="/how-it-works" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-1">How It Works</h3>
                  <p className="text-sm text-gray-600">Learn about our process</p>
                </Link>
                <Link href="/contractors" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-1">For Contractors</h3>
                  <p className="text-sm text-gray-600">Join our contractor network</p>
                </Link>
                <Link href="/permits" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-1">Browse Cities</h3>
                  <p className="text-sm text-gray-600">Find permit info by city</p>
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do I need a permit for my project?
                  </h3>
                  <p className="text-gray-600">
                    Most construction and renovation projects require permits, but requirements vary by location and project type. 
                    Use our <Link href="/calculator" className="text-indigo-600 hover:underline">permit calculator</Link> to get 
                    a quick assessment, or consult with local contractors for specific guidance.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How much do building permits cost?
                  </h3>
                  <p className="text-gray-600">
                    Permit costs vary widely based on location, project type, and scope. Simple permits might cost $100-$500, 
                    while complex projects can cost $1,000-$5,000 or more. Our city-specific pages provide estimated costs 
                    for common projects in your area.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How long does the permit process take?
                  </h3>
                  <p className="text-gray-600">
                    Timeline depends on project complexity and local review processes. Simple permits might take 1-2 weeks, 
                    while complex projects requiring plan review can take 6-12 weeks or more. Check your city's specific 
                    timelines on our permit pages.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Is TownKit free to use?
                  </h3>
                  <p className="text-gray-600">
                    Yes! TownKit is completely free for homeowners. We provide permit information, calculator tools, 
                    and contractor matching at no cost. We earn a small fee from contractors when they complete projects 
                    through our platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How are contractors vetted?
                  </h3>
                  <p className="text-gray-600">
                    All contractors in our network are pre-screened for licensing, insurance, Better Business Bureau ratings, 
                    and customer reviews. We verify credentials and only accept contractors who meet our quality standards.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What if I'm not satisfied with a contractor?
                  </h3>
                  <p className="text-gray-600">
                    We follow up on all projects to ensure satisfaction. If there are any issues with a contractor 
                    from our network, contact our support team and we'll help resolve the situation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I get permits myself without a contractor?
                  </h3>
                  <p className="text-gray-600">
                    In most areas, homeowners can apply for permits themselves. However, many choose to work with contractors 
                    who understand local requirements and can handle the entire process. Some complex projects may require 
                    professional drawings or engineer approval.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What happens after I submit a lead request?
                  </h3>
                  <p className="text-gray-600">
                    After submitting your project details, we match you with up to 4 qualified contractors in your area. 
                    They'll typically contact you within 24-48 hours to discuss your project and provide quotes. 
                    You can compare options and choose the best fit.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you cover my city?
                  </h3>
                  <p className="text-gray-600">
                    We cover major cities across the United States and are constantly expanding. 
                    Check our <Link href="/permits" className="text-indigo-600 hover:underline">city directory</Link> 
                    to see if your area is covered. If not, contact us and we'll work to add your city to our network.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How accurate is the permit information?
                  </h3>
                  <p className="text-gray-600">
                    We strive to keep permit information current, but regulations can change frequently. 
                    Our information is for guidance only - always verify requirements with your local permit office 
                    or qualified contractor before proceeding with any project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Support</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                  <a href="mailto:help@townkit.com" className="text-indigo-600 hover:underline">
                    help@townkit.com
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                  <a href="tel:+15551234567" className="text-indigo-600 hover:underline">
                    (555) 123-4567
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Hours</h4>
                  <p className="text-gray-600">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* Popular Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Resources</h3>
              <div className="space-y-3">
                <Link href="/calculator" className="block text-indigo-600 hover:underline">
                  Permit Calculator
                </Link>
                <Link href="/permits/los-angeles-ca" className="block text-indigo-600 hover:underline">
                  Los Angeles Permits
                </Link>
                <Link href="/permits/new-york-ny" className="block text-indigo-600 hover:underline">
                  New York Permits
                </Link>
                <Link href="/permits/chicago-il" className="block text-indigo-600 hover:underline">
                  Chicago Permits
                </Link>
                <Link href="/how-it-works" className="block text-indigo-600 hover:underline">
                  How It Works
                </Link>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-2">Emergency Situations</h3>
              <p className="text-red-700 text-sm mb-3">
                For urgent safety issues or code violations, contact your local building department immediately.
              </p>
              <p className="text-red-600 text-sm">
                TownKit provides information and contractor matching services - we are not a government agency 
                and cannot issue permits or handle emergency situations.
              </p>
            </div>
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