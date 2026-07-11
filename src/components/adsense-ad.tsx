'use client';

import { useEffect, useRef } from 'react';

// Replace this with your AdSense publisher ID after approval
// e.g., 'ca-pub-1234567890123456'
const ADSENSE_PUBLISHER_ID = 'ca-pub-2529520824838951';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

export function AdSenseAd({ adSlot, adFormat = 'auto', style, className = '' }: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    if (!ADSENSE_PUBLISHER_ID) return;

    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isLoaded.current = true;
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [ADSENSE_PUBLISHER_ID]);

  // Show placeholder until AdSense is configured
  if (!ADSENSE_PUBLISHER_ID) {
    return (
      <div
        className={`rounded-lg border border-dashed border-muted-foreground/15 flex items-center justify-center bg-muted/20 ${className}`}
        style={style}
      >
        <span className="text-xs text-muted-foreground/40">Ad</span>
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}