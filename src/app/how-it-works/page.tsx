import Link from 'next/link';
import type { Metadata } from 'next';
import { HorizontalAd } from '@/components/GoogleAdsense';

export const metadata: Metadata = {
  title: 'How TownKit Works | Building Permits Made Simple',
  description: 'Learn how TownKit connects homeowners with qualified contractors for building permits and home improvement projects. Simple 3-step process.',
  keywords: 'how it works, building permits, contractor matching, home improvement, permit process'
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">TownKit</Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/how-it-works" className="text-indigo-600 font-medium">How it Works</Link>
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
            <li className="text-gray-900">How it Works</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How TownKit Works
          </h1>
          <p className="text-xl text-gray-600">
            Getting building permits and finding qualified contractors has never been easier. 
            Our simple 3-step process connects you with pre-screened professionals in your area.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Tell Us About Your Project</h2>
            <p className="text-gray-600 mb-4">
              Use our permit calculator or fill out a project form. Tell us about your location, 
              project type, timeline, and budget. The more details you provide, the better we can match you.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Project type and scope</p>
              <p>• Your location and timeline</p>
              <p>• Budget range</p>
              <p>• Special requirements</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Get Matched with Contractors</h2>
            <p className="text-gray-600 mb-4">
              We instantly match you with up to 4 qualified contractors in your area who specialize 
              in your project type. All contractors are pre-screened, licensed, and insured.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Licensed and insured contractors</p>
              <p>• Specialists in your project type</p>
              <p>• Local to your area</p>
              <p>• Pre-screened and verified</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Compare & Choose</h2>
            <p className="text-gray-600 mb-4">
              Contractors will contact you within 24-48 hours with quotes and project timelines. 
              Compare their proposals, check reviews, and choose the best fit for your project.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Free quotes and consultations</p>
              <p>• Compare prices and timelines</p>
              <p>• Read verified reviews</p>
              <p>• No obligation to hire</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose TownKit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Save Time & Money</h3>
              <p className="text-gray-600 mb-4">
                No more calling dozens of contractors or researching permit requirements. 
                We do the legwork for you and connect you with qualified professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🛡️ Verified Contractors</h3>
              <p className="text-gray-600 mb-4">
                All contractors are pre-screened for licensing, insurance, and customer satisfaction. 
                We only work with trusted professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Permit Expertise</h3>
              <p className="text-gray-600 mb-4">
                Our contractors understand local permit requirements and can handle the entire 
                process from application to final inspection.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 Competitive Pricing</h3>
              <p className="text-gray-600 mb-4">
                Compare multiple quotes to ensure you get fair pricing. 
                Our network of contractors provides competitive rates.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-50 rounded-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of homeowners who have successfully completed their projects with TownKit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/calculator"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Start Permit Calculator
            </Link>
            <Link 
              href="/permits"
              className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Browse by City
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is TownKit free to use?</h3>
              <p className="text-gray-600">
                Yes! TownKit is completely free for homeowners. We earn a small fee from contractors 
                only when they successfully complete a project through our platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How are contractors vetted?</h3>
              <p className="text-gray-600">
                We verify contractor licensing, insurance, Better Business Bureau ratings, 
                and customer reviews. Only contractors meeting our standards are accepted.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I have to hire someone?</h3>
              <p className="text-gray-600">
                No obligation at all. You can receive quotes, compare options, and decide 
                if you want to move forward. Many homeowners use our service just for research.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I'm not satisfied?</h3>
              <p className="text-gray-600">
                We follow up on all projects to ensure satisfaction. If there are any issues, 
                our customer service team is here to help resolve them.
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