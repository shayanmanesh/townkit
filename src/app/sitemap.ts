import { MetadataRoute } from 'next'
 
const cities = [
  'los-angeles-ca',
  'new-york-ny',
  'chicago-il',
  'houston-tx',
  'phoenix-az',
  'philadelphia-pa',
  'san-antonio-tx',
  'san-diego-ca',
  'dallas-tx',
  'austin-tx'
]

const projectTypes = [
  'deck-permit',
  'kitchen-remodel-permit',
  'bathroom-remodel-permit',
  'addition-permit',
  'pool-permit',
  'fence-permit',
  'accessory-structure-permit',
  'solar-permit',
  'roofing-permit',
  'hvac-permit'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://townkit.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contractors`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  // City pages
  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/permits/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Project pages for each city
  const projectPages = cities.flatMap((city) =>
    projectTypes.map((project) => ({
      url: `${baseUrl}/permits/${city}/${project}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  // Lead capture pages
  const leadPages = cities.flatMap((city) => [
    {
      url: `${baseUrl}/permits/${city}/get-matched`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    ...projectTypes.map((project) => ({
      url: `${baseUrl}/permits/${city}/${project}/get-matched`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  ])

  return [
    ...staticPages,
    ...cityPages,
    ...projectPages,
    ...leadPages
  ]
}