'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdsenseProps {
  slot: string;
  format?: 'auto' | 'autorelaxed';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

export default function GoogleAdsense({ 
  slot, 
  format = 'auto', 
  style,
  className = '',
  responsive = true 
}: GoogleAdsenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const adStyle = {
    display: 'block',
    ...style
  };

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-5635114711353420"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Pre-configured ad components for easy use
export function SquareAd({ className }: { className?: string }) {
  return (
    <GoogleAdsense 
      slot="4431777949"
      className={className}
    />
  );
}

export function HorizontalAd({ className }: { className?: string }) {
  return (
    <GoogleAdsense 
      slot="3137758017"
      className={className}
    />
  );
}

export function VerticalAd({ className }: { className?: string }) {
  return (
    <GoogleAdsense 
      slot="4175507517"
      className={className}
    />
  );
}

export function InFeedAd({ className }: { className?: string }) {
  return (
    <GoogleAdsense 
      slot="3637571023"
      format="autorelaxed"
      className={className}
    />
  );
}

export function InArticleAd({ className }: { className?: string }) {
  return (
    <GoogleAdsense 
      slot="2324489353"
      format="autorelaxed"
      className={className}
    />
  );
}