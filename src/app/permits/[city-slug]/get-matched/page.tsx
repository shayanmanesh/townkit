'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GetMatchedPageProps {
  params: Promise<{
    'city-slug': string;
  }>;
}

const getCityName = (citySlug: string) => {
  const cityMap: { [key: string]: string } = {
    'los-angeles-ca': 'Los Angeles, CA',
    'new-york-ny': 'New York, NY',
    'chicago-il': 'Chicago, IL',
    'houston-tx': 'Houston, TX',
    'phoenix-az': 'Phoenix, AZ',
    'philadelphia-pa': 'Philadelphia, PA',
    'san-antonio-tx': 'San Antonio, TX',
    'san-diego-ca': 'San Diego, CA',
    'dallas-tx': 'Dallas, TX',
    'austin-tx': 'Austin, TX',
    'san-jose-ca': 'San Jose, CA',
    'fort-worth-tx': 'Fort Worth, TX',
    'jacksonville-fl': 'Jacksonville, FL',
    'columbus-oh': 'Columbus, OH',
    'charlotte-nc': 'Charlotte, NC',
    'san-francisco-ca': 'San Francisco, CA',
    'indianapolis-in': 'Indianapolis, IN',
    'seattle-wa': 'Seattle, WA',
    'denver-co': 'Denver, CO',
    'washington-dc': 'Washington, DC',
    'boston-ma': 'Boston, MA',
    'el-paso-tx': 'El Paso, TX',
    'nashville-tn': 'Nashville, TN',
    'detroit-mi': 'Detroit, MI',
    'oklahoma-city-ok': 'Oklahoma City, OK',
    'portland-or': 'Portland, OR',
    'las-vegas-nv': 'Las Vegas, NV',
    'memphis-tn': 'Memphis, TN',
    'louisville-ky': 'Louisville, KY',
    'baltimore-md': 'Baltimore, MD',
    'milwaukee-wi': 'Milwaukee, WI',
    'albuquerque-nm': 'Albuquerque, NM',
    'tucson-az': 'Tucson, AZ',
    'fresno-ca': 'Fresno, CA',
    'mesa-az': 'Mesa, AZ',
    'sacramento-ca': 'Sacramento, CA',
    'atlanta-ga': 'Atlanta, GA',
    'kansas-city-mo': 'Kansas City, MO',
    'colorado-springs-co': 'Colorado Springs, CO',
    'miami-fl': 'Miami, FL',
    'raleigh-nc': 'Raleigh, NC',
    'omaha-ne': 'Omaha, NE',
    'long-beach-ca': 'Long Beach, CA',
    'virginia-beach-va': 'Virginia Beach, VA',
    'oakland-ca': 'Oakland, CA',
    'minneapolis-mn': 'Minneapolis, MN',
    'tulsa-ok': 'Tulsa, OK',
    'tampa-fl': 'Tampa, FL',
    'arlington-tx': 'Arlington, TX',
    'new-orleans-la': 'New Orleans, LA'
  };
  return cityMap[citySlug] || null;
};

export default function GetMatchedPage({ params }: GetMatchedPageProps) {
  const [citySlug, setCitySlug] = useState('');
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    propertyType: '',
    homeOwnership: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle async params with useEffect
  React.useEffect(() => {
    params.then((resolvedParams) => {
      const slug = resolvedParams['city-slug'];
      const name = getCityName(slug);
      
      if (!name) {
        notFound();
        return;
      }
      
      setCitySlug(slug);
      setCityName(name);
      setIsLoading(false);
    }).catch(() => {
      notFound();
    });
  }, [params]);

  const projectTypes = [
    'Deck Addition',
    'Kitchen Remodel', 
    'Bathroom Remodel',
    'Room Addition',
    'Swimming Pool',
    'Fence Installation',
    'Shed/Garage',
    'Solar Panel Installation',
    'Roofing',
    'Flooring',
    'HVAC System',
    'Other'
  ];

  const timelineOptions = [
    'ASAP (within 1 month)',
    '1-3 months',
    '3-6 months', 
    '6-12 months',
    'More than 1 year',
    'Just planning/researching'
  ];

  const budgetOptions = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000',
    'Not sure yet'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          projectDescription: formData.projectDescription,
          timeline: formData.timeline,
          budget: formData.budget,
          propertyType: formData.propertyType,
          homeOwnership: formData.homeOwnership,
          citySlug: citySlug,
          projectSlug: null,
          permitHelp: formData.permitHelp,
          additionalServices: formData.additionalServices
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      const result = await response.json();
      console.log('Lead submitted successfully:', result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert(`There was an error submitting your request: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !cityName) {
    return <div>Loading...</div>;
  }

  if (isSubmitted) {
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

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You! Your Request Has Been Submitted
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              We're matching you with qualified contractors in {cityName}
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">What happens next:</h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>We'll review your project details and find the best contractor matches</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Up to 4 pre-screened contractors will contact you within 24-48 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Compare quotes and choose the contractor that's right for you</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>We'll check in to make sure you're satisfied with the service</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/permits/${citySlug}`}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                View Permit Requirements
              </Link>
              <Link 
                href="/calculator"
                className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Try Permit Calculator
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Questions? Email us at <a href="mailto:help@townkit.com" className="text-indigo-600 hover:underline">help@townkit.com</a> or call (555) 123-4567
            </p>
          </div>
        </main>
      </div>
    );
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-indigo-600">Home</Link></li>
            <li>&gt;</li>
            <li><Link href="/permits" className="hover:text-indigo-600">Permits</Link></li>
            <li>&gt;</li>
            <li><Link href={`/permits/${citySlug}`} className="hover:text-indigo-600">{cityName}</Link></li>
            <li>&gt;</li>
            <li className="text-gray-900">Get Matched</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">
              Get Matched with Contractors in {cityName}
            </h1>
            <p className="text-indigo-100">
              Tell us about your project and we'll connect you with pre-screened contractors who can help with permits and construction.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select project type...</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                    Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select timeline...</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select budget range...</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="homeOwnership" className="block text-sm font-medium text-gray-700 mb-1">
                    Home Ownership *
                  </label>
                  <select
                    id="homeOwnership"
                    name="homeOwnership"
                    required
                    value={formData.homeOwnership}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select...</option>
                    <option value="own">I own my home</option>
                    <option value="rent-with-permission">I rent with landlord permission</option>
                    <option value="rent-without-permission">I rent without permission</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Please describe your project in detail. Include size, materials, specific requirements, etc."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Get Matched with Contractors'}
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                By submitting this form, you agree to be contacted by contractors. No spam, only relevant project matches.
              </p>
            </div>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              ✓
            </div>
            <h3 className="font-semibold text-gray-900">Pre-Screened Contractors</h3>
            <p className="text-sm text-gray-600">All contractors are licensed, insured, and background checked</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              🕐
            </div>
            <h3 className="font-semibold text-gray-900">Quick Response</h3>
            <p className="text-sm text-gray-600">Contractors respond within 24-48 hours with quotes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              🛡️
            </div>
            <h3 className="font-semibold text-gray-900">100% Free Service</h3>
            <p className="text-sm text-gray-600">No fees for homeowners. Contractors pay us for leads</p>
          </div>
        </div>
      </main>
    </div>
  );
}