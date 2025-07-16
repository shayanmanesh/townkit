'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectGetMatchedPageProps {
  params: Promise<{
    'city-slug': string;
    'project-type': string;
  }>;
}

const getCityAndProjectData = (citySlug: string, projectType: string) => {
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

  const projectMap: { [key: string]: string } = {
    'deck-permit': 'Deck Addition',
    'kitchen-remodel-permit': 'Kitchen Remodel',
    'bathroom-remodel-permit': 'Bathroom Remodel',
    'addition-permit': 'Room Addition',
    'pool-permit': 'Swimming Pool',
    'fence-permit': 'Fence Installation',
    'accessory-structure-permit': 'Shed/Garage',
    'solar-permit': 'Solar Panel Installation',
    'roofing-permit': 'Roofing',
    'hvac-permit': 'HVAC System'
  };

  const cityName = cityMap[citySlug];
  const projectName = projectMap[projectType];

  return cityName && projectName ? { cityName, projectName } : null;
};

export default function ProjectGetMatchedPage({ params }: ProjectGetMatchedPageProps) {
  const [citySlug, setCitySlug] = useState('');
  const [projectType, setProjectType] = useState('');
  const [cityName, setCityName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    propertyType: '',
    homeOwnership: '',
    permitHelp: '',
    additionalServices: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle async params with useEffect
  React.useEffect(() => {
    params.then((resolvedParams) => {
      const slug = resolvedParams['city-slug'];
      const project = resolvedParams['project-type'];
      const data = getCityAndProjectData(slug, project);
      
      if (!data) {
        notFound();
        return;
      }
      
      setCitySlug(slug);
      setProjectType(project);
      setCityName(data.cityName);
      setProjectName(data.projectName);
      setIsLoading(false);
    }).catch(() => {
      notFound();
    });
  }, [params]);

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

  const additionalServicesOptions = [
    'Permit application and filing',
    'Architectural drawings and plans',
    'Structural engineering',
    'Interior design consultation',
    'Material sourcing and procurement',
    'Project management',
    'Post-construction cleanup',
    'Warranty and maintenance'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
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
          projectType: projectName,
          projectDescription: formData.projectDescription,
          timeline: formData.timeline,
          budget: formData.budget,
          propertyType: formData.propertyType,
          homeOwnership: formData.homeOwnership,
          citySlug: citySlug,
          projectSlug: projectType,
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

  if (isLoading || !cityName || !projectName) {
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
              Perfect! Your {projectName} Request is Submitted
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              We're connecting you with {projectName.toLowerCase()} specialists in {cityName}
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">Specialized matching for {projectName.toLowerCase()}:</h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Contractors experienced specifically with {projectName.toLowerCase()} projects</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Familiar with {cityName} permit requirements for {projectName.toLowerCase()}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Up to 4 qualified contractors will contact you within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Compare detailed quotes and choose your preferred contractor</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/permits/${citySlug}/${projectType}`}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                View {projectName} Requirements
              </Link>
              <Link 
                href="/calculator"
                className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Calculate Another Project
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Questions about your {projectName.toLowerCase()}? Email us at <a href="mailto:help@townkit.com" className="text-indigo-600 hover:underline">help@townkit.com</a>
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
            <li><Link href={`/permits/${citySlug}/${projectType}`} className="hover:text-indigo-600">{projectName}</Link></li>
            <li>&gt;</li>
            <li className="text-gray-900">Get Matched</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <h1 className="text-3xl font-bold mb-2">
              Find {projectName} Contractors in {cityName}
            </h1>
            <p className="text-indigo-100">
              Connect with specialists who understand {projectName.toLowerCase()} permits and requirements in {cityName}.
            </p>
          </div>

          {/* Specialized Benefits */}
          <div className="bg-indigo-50 p-6 border-b">
            <h2 className="font-semibold text-indigo-900 mb-3">Why use our {projectName} specialists?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">✓</div>
                <span className="text-indigo-800">Local permit expertise</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">✓</div>
                <span className="text-indigo-800">Project-specific experience</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">✓</div>
                <span className="text-indigo-800">Licensed & insured</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
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
                  />
                </div>
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
                  />
                </div>
              </div>
            </div>

            {/* Project Specific Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{projectName} Project Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">When do you want to start?</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
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
                    <option value="">Select your budget...</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="permitHelp" className="block text-sm font-medium text-gray-700 mb-1">
                    Permit Assistance Needed? *
                  </label>
                  <select
                    id="permitHelp"
                    name="permitHelp"
                    required
                    value={formData.permitHelp}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select...</option>
                    <option value="yes-full-service">Yes, handle all permits for me</option>
                    <option value="yes-guidance">Yes, guide me through the process</option>
                    <option value="no-have-permits">No, I already have permits</option>
                    <option value="not-sure">Not sure what I need</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="homeOwnership" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Ownership *
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
                    <option value="own">I own this property</option>
                    <option value="rent-with-permission">I rent with permission</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed {projectName} Description *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Describe your ${projectName.toLowerCase()} project in detail. Include dimensions, materials, specific features, etc.`}
                />
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Services (Optional)</h2>
              <p className="text-gray-600 mb-4">What other services would you like help with?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {additionalServicesOptions.map((service) => (
                  <label key={service} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Finding Your Perfect Match...' : `Find ${projectName} Contractors`}
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                You'll receive quotes from up to 4 qualified {projectName.toLowerCase()} contractors in {cityName}
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}