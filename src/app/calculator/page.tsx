'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HorizontalAd } from '@/components/GoogleAdsense';

interface CalculatorResult {
  needsPermit: boolean;
  permits: string[];
  estimatedCost: string;
  timeline: string;
  nextSteps: string[];
  citySlug: string;
  projectSlug: string;
}

const cities = [
  { name: 'Los Angeles, CA', slug: 'los-angeles-ca' },
  { name: 'New York, NY', slug: 'new-york-ny' },
  { name: 'Chicago, IL', slug: 'chicago-il' },
  { name: 'Houston, TX', slug: 'houston-tx' },
  { name: 'Phoenix, AZ', slug: 'phoenix-az' },
  { name: 'Philadelphia, PA', slug: 'philadelphia-pa' },
  { name: 'San Antonio, TX', slug: 'san-antonio-tx' },
  { name: 'San Diego, CA', slug: 'san-diego-ca' },
  { name: 'Dallas, TX', slug: 'dallas-tx' },
  { name: 'Austin, TX', slug: 'austin-tx' },
  { name: 'San Jose, CA', slug: 'san-jose-ca' },
  { name: 'Fort Worth, TX', slug: 'fort-worth-tx' },
  { name: 'Jacksonville, FL', slug: 'jacksonville-fl' },
  { name: 'Columbus, OH', slug: 'columbus-oh' },
  { name: 'Charlotte, NC', slug: 'charlotte-nc' },
  { name: 'San Francisco, CA', slug: 'san-francisco-ca' },
  { name: 'Indianapolis, IN', slug: 'indianapolis-in' },
  { name: 'Seattle, WA', slug: 'seattle-wa' },
  { name: 'Denver, CO', slug: 'denver-co' },
  { name: 'Washington, DC', slug: 'washington-dc' },
  { name: 'Boston, MA', slug: 'boston-ma' },
  { name: 'El Paso, TX', slug: 'el-paso-tx' },
  { name: 'Nashville, TN', slug: 'nashville-tn' },
  { name: 'Detroit, MI', slug: 'detroit-mi' },
  { name: 'Oklahoma City, OK', slug: 'oklahoma-city-ok' },
  { name: 'Portland, OR', slug: 'portland-or' },
  { name: 'Las Vegas, NV', slug: 'las-vegas-nv' },
  { name: 'Memphis, TN', slug: 'memphis-tn' },
  { name: 'Louisville, KY', slug: 'louisville-ky' },
  { name: 'Baltimore, MD', slug: 'baltimore-md' },
  { name: 'Milwaukee, WI', slug: 'milwaukee-wi' },
  { name: 'Albuquerque, NM', slug: 'albuquerque-nm' },
  { name: 'Tucson, AZ', slug: 'tucson-az' },
  { name: 'Fresno, CA', slug: 'fresno-ca' },
  { name: 'Mesa, AZ', slug: 'mesa-az' },
  { name: 'Sacramento, CA', slug: 'sacramento-ca' },
  { name: 'Atlanta, GA', slug: 'atlanta-ga' },
  { name: 'Kansas City, MO', slug: 'kansas-city-mo' },
  { name: 'Colorado Springs, CO', slug: 'colorado-springs-co' },
  { name: 'Miami, FL', slug: 'miami-fl' },
  { name: 'Raleigh, NC', slug: 'raleigh-nc' },
  { name: 'Omaha, NE', slug: 'omaha-ne' },
  { name: 'Long Beach, CA', slug: 'long-beach-ca' },
  { name: 'Virginia Beach, VA', slug: 'virginia-beach-va' },
  { name: 'Oakland, CA', slug: 'oakland-ca' },
  { name: 'Minneapolis, MN', slug: 'minneapolis-mn' },
  { name: 'Tulsa, OK', slug: 'tulsa-ok' },
  { name: 'Tampa, FL', slug: 'tampa-fl' },
  { name: 'Arlington, TX', slug: 'arlington-tx' },
  { name: 'New Orleans, LA', slug: 'new-orleans-la' }
];

const projectTypes = [
  { name: 'Deck Addition', slug: 'deck-permit' },
  { name: 'Kitchen Remodel', slug: 'kitchen-remodel-permit' },
  { name: 'Room Addition', slug: 'addition-permit' },
  { name: 'Swimming Pool', slug: 'pool-permit' },
  { name: 'Fence Installation', slug: 'fence-permit' },
  { name: 'Shed/Garage', slug: 'accessory-structure-permit' },
  { name: 'Bathroom Remodel', slug: 'bathroom-remodel-permit' },
  { name: 'Solar Panel Installation', slug: 'solar-permit' },
  { name: 'Driveway/Patio', slug: 'hardscape-permit' },
  { name: 'HVAC System', slug: 'hvac-permit' }
];

const calculatePermitNeeds = (
  city: string,
  projectType: string,
  projectSize: string,
  projectScope: string,
  structuralChanges: boolean,
  electricalWork: boolean,
  plumbingWork: boolean
): CalculatorResult => {
  let needsPermit = false;
  const permits: string[] = [];
  let estimatedCost = '$0';
  let timeline = '0 weeks';
  let nextSteps: string[] = [];

  const cityData = cities.find(c => c.slug === city);
  const projectData = projectTypes.find(p => p.slug === projectType);

  if (!cityData || !projectData) {
    return {
      needsPermit: false,
      permits: [],
      estimatedCost: '$0',
      timeline: '0 weeks',
      nextSteps: ['Please select a valid city and project type.'],
      citySlug: city,
      projectSlug: projectType
    };
  }

  // Logic based on project type and parameters
  switch (projectType) {
    case 'deck-permit':
      if (projectSize === 'large' || structuralChanges) {
        needsPermit = true;
        permits.push('Building Permit');
        estimatedCost = city === 'los-angeles-ca' ? '$285-$545' : '$300-$600';
        timeline = '3-6 weeks';
      }
      if (electricalWork) {
        permits.push('Electrical Permit');
        estimatedCost = city === 'los-angeles-ca' ? '$370-$730' : '$450-$850';
      }
      break;

    case 'kitchen-remodel-permit':
      needsPermit = true;
      permits.push('Building Permit');
      estimatedCost = '$400-$800';
      timeline = '4-8 weeks';
      
      if (electricalWork) permits.push('Electrical Permit');
      if (plumbingWork) permits.push('Plumbing Permit');
      if (structuralChanges) permits.push('Structural Permit');
      
      if (permits.length > 1) {
        estimatedCost = city === 'los-angeles-ca' ? '$800-$1,600' : '$1,000-$2,000';
        timeline = '6-12 weeks';
      }
      break;

    case 'addition-permit':
      needsPermit = true;
      permits.push('Building Permit', 'Zoning Review');
      estimatedCost = '$1,200-$3,000';
      timeline = '8-16 weeks';
      
      if (electricalWork) permits.push('Electrical Permit');
      if (plumbingWork) permits.push('Plumbing Permit');
      break;

    case 'pool-permit':
      needsPermit = true;
      permits.push('Building Permit', 'Pool Permit', 'Safety Inspection');
      estimatedCost = '$800-$1,500';
      timeline = '6-12 weeks';
      
      if (electricalWork) permits.push('Electrical Permit');
      break;

    case 'fence-permit':
      if (projectSize === 'large' || (city === 'new-york-ny')) {
        needsPermit = true;
        permits.push('Fence Permit');
        estimatedCost = '$150-$400';
        timeline = '1-3 weeks';
      }
      break;

    case 'accessory-structure-permit':
      if (projectSize !== 'small') {
        needsPermit = true;
        permits.push('Building Permit');
        estimatedCost = '$300-$800';
        timeline = '3-6 weeks';
      }
      break;

    default:
      needsPermit = true;
      permits.push('Building Permit');
      estimatedCost = '$200-$600';
      timeline = '2-6 weeks';
  }

  // Generate next steps
  if (needsPermit) {
    nextSteps = [
      'Review detailed requirements for your specific project',
      'Prepare required documents and plans',
      'Submit permit application with fees',
      'Schedule required inspections',
      'Connect with qualified contractors'
    ];
  } else {
    nextSteps = [
      'No permit required for this project scope',
      'Check with contractors for best practices',
      'Consider HOA approval if applicable',
      'Verify property line setbacks'
    ];
  }

  return {
    needsPermit,
    permits,
    estimatedCost,
    timeline,
    nextSteps,
    citySlug: city,
    projectSlug: projectType
  };
};

export default function CalculatorPage() {
  const [city, setCity] = useState('');
  const [projectType, setProjectType] = useState('');
  const [projectSize, setProjectSize] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [structuralChanges, setStructuralChanges] = useState(false);
  const [electricalWork, setElectricalWork] = useState(false);
  const [plumbingWork, setPlumbingWork] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    const projectParam = urlParams.get('project');
    
    if (cityParam) setCity(cityParam);
    if (projectParam) setProjectType(projectParam);
  }, []);

  const calculateResults = () => {
    if (!city || !projectType) return;
    
    const calculatorResult = calculatePermitNeeds(
      city,
      projectType,
      projectSize,
      projectScope,
      structuralChanges,
      electricalWork,
      plumbingWork
    );
    
    setResult(calculatorResult);
    setCurrentStep(5);
  };

  const resetCalculator = () => {
    setCity('');
    setProjectType('');
    setProjectSize('');
    setProjectScope('');
    setStructuralChanges(false);
    setElectricalWork(false);
    setPlumbingWork(false);
    setResult(null);
    setCurrentStep(1);
  };

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Permit Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Find out if you need a permit for your home improvement project
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Project Details</span>
            <span>Results</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {!result ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Step 1: Location */}
            {currentStep >= 1 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  1. Where is your project located?
                </h2>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select your city...</option>
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Step 2: Project Type */}
            {currentStep >= 2 && city && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  2. What type of project are you planning?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectTypes.map((project) => (
                    <button
                      key={project.slug}
                      onClick={() => setProjectType(project.slug)}
                      className={`p-4 text-left border rounded-lg transition-colors ${
                        projectType === project.slug
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Project Size */}
            {currentStep >= 3 && projectType && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  3. What&apos;s the size/scope of your project?
                </h2>
                <div className="space-y-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setProjectSize(size)}
                      className={`w-full p-4 text-left border rounded-lg transition-colors ${
                        projectSize === size
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium capitalize">{size} Project</div>
                      <div className="text-sm text-gray-600">
                        {size === 'small' && 'Minor changes, under $5,000'}
                        {size === 'medium' && 'Moderate changes, $5,000-$25,000'}
                        {size === 'large' && 'Major changes, over $25,000'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Work Details */}
            {currentStep >= 4 && projectSize && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  4. What type of work will be involved?
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={structuralChanges}
                      onChange={(e) => setStructuralChanges(e.target.checked)}
                      className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span>Structural changes (removing walls, adding load-bearing elements)</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={electricalWork}
                      onChange={(e) => setElectricalWork(e.target.checked)}
                      className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span>Electrical work (new circuits, outlets, lighting)</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={plumbingWork}
                      onChange={(e) => setPlumbingWork(e.target.checked)}
                      className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span>Plumbing work (moving fixtures, new water lines)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Calculate Button */}
            {city && projectType && projectSize && (
              <div className="flex justify-center">
                <button
                  onClick={calculateResults}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Calculate Permit Requirements
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              {currentStep < 4 && city && (currentStep === 1 || (currentStep === 2 && projectType) || (currentStep === 3 && projectSize)) && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Main Result */}
            <div className={`rounded-lg shadow-lg p-8 ${result.needsPermit ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${result.needsPermit ? 'bg-yellow-500' : 'bg-green-500'}`}>
                  <span className="text-white text-2xl font-bold">
                    {result.needsPermit ? '⚠️' : '✅'}
                  </span>
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${result.needsPermit ? 'text-yellow-800' : 'text-green-800'}`}>
                  {result.needsPermit ? 'Permit Required' : 'No Permit Required'}
                </h2>
                <p className={`text-lg ${result.needsPermit ? 'text-yellow-700' : 'text-green-700'}`}>
                  {result.needsPermit 
                    ? `You'll need ${result.permits.length} permit(s) for this project`
                    : 'Your project can proceed without permits'
                  }
                </p>
              </div>
            </div>

            {result.needsPermit && (
              <>
                {/* Permit Details */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Required Permits</h3>
                  <div className="space-y-2">
                    {result.permits.map((permit, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <span className="font-medium">{permit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost and Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Estimated Cost</h3>
                    <p className="text-3xl font-bold text-green-600">{result.estimatedCost}</p>
                    <p className="text-sm text-gray-600">Total permit fees</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Timeline</h3>
                    <p className="text-3xl font-bold text-blue-600">{result.timeline}</p>
                    <p className="text-sm text-gray-600">Approval process</p>
                  </div>
                </div>
              </>
            )}

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                {result.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Move Forward?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {result.needsPermit && (
                  <>
                    <Link 
                      href={`/permits/${result.citySlug}/${result.projectSlug}`}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center"
                    >
                      View Detailed Requirements
                    </Link>
                    <Link 
                      href={`/permits/${result.citySlug}/${result.projectSlug}/get-matched`}
                      className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-center"
                    >
                      Get Matched with Contractors
                    </Link>
                  </>
                )}
                <button
                  onClick={resetCalculator}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Calculate Another Project
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Ad: Bottom of calculator */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center">
            <HorizontalAd className="max-w-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
}