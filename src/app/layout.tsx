import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TownKit - Building Permits & Contractor Marketplace",
    template: "%s | TownKit"
  },
  description: "Navigate building permits like a pro. Find qualified contractors for your home improvement projects. Get instant permit requirements and cost estimates for your city.",
  keywords: [
    "building permits",
    "contractors",
    "home improvement",
    "permit requirements",
    "construction permits",
    "building codes",
    "contractor marketplace",
    "permit calculator",
    "home renovation"
  ],
  authors: [{ name: "TownKit Team" }],
  creator: "TownKit",
  publisher: "TownKit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://townkit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://townkit.com",
    title: "TownKit - Building Permits & Contractor Marketplace",
    description: "Navigate building permits like a pro. Find qualified contractors for your home improvement projects.",
    siteName: "TownKit",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TownKit - Building Permits & Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TownKit - Building Permits & Contractor Marketplace",
    description: "Navigate building permits like a pro. Find qualified contractors for your home improvement projects.",
    creator: "@townkit",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TownKit",
  description: "Building permits and contractor marketplace for homeowners",
  url: "https://townkit.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://townkit.com/permits/{search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  publisher: {
    "@type": "Organization",
    name: "TownKit",
    description: "Municipal services and permits marketplace",
    url: "https://townkit.com",
    logo: {
      "@type": "ImageObject",
      url: "https://townkit.com/logo.png"
    },
    sameAs: [
      "https://twitter.com/townkit",
      "https://facebook.com/townkit",
      "https://linkedin.com/company/townkit"
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TownKit" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-5635114711353420" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5635114711353420"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
