interface LocalBusinessSchema {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  url: string;
  openingHours?: string[];
}

interface ServiceSchema {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed: string;
  serviceType: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

interface FAQSchema {
  question: string;
  answer: string;
}

interface BreadcrumbSchema {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: 'LocalBusiness' | 'Service' | 'FAQ' | 'Breadcrumb' | 'Article';
  data: any;
}

export function generateLocalBusinessSchema(business: LocalBusinessSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.addressLocality,
      "addressRegion": business.address.addressRegion,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.addressCountry
    },
    "telephone": business.telephone,
    "url": business.url,
    "openingHours": business.openingHours || []
  };
}

export function generateServiceSchema(service: ServiceSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider.name,
      "url": service.provider.url
    },
    "areaServed": service.areaServed,
    "serviceType": service.serviceType,
    "offers": service.offers ? {
      "@type": "Offer",
      "price": service.offers.price,
      "priceCurrency": service.offers.priceCurrency,
      "availability": service.offers.availability
    } : undefined
  };
}

export function generateFAQSchema(faqs: FAQSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "TownKit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://townkit.com/logo.png"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "image": article.image ? {
      "@type": "ImageObject",
      "url": article.image
    } : undefined
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema;

  switch (type) {
    case 'LocalBusiness':
      schema = generateLocalBusinessSchema(data);
      break;
    case 'Service':
      schema = generateServiceSchema(data);
      break;
    case 'FAQ':
      schema = generateFAQSchema(data);
      break;
    case 'Breadcrumb':
      schema = generateBreadcrumbSchema(data);
      break;
    case 'Article':
      schema = generateArticleSchema(data);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}