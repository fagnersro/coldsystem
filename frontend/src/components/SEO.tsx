import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string; // e.g. "/equipments/new"
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export const SEO = ({ title, description, canonicalPath, jsonLd }: SEOProps) => {
  useEffect(() => {
    if (title) document.title = title;

    const ensureTag = (selector: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };

    if (description) {
      const metaDesc = ensureTag('meta[name="description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        return m;
      });
      metaDesc.setAttribute('content', description);

      const ogDesc = ensureTag('meta[property="og:description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:description');
        return m;
      });
      ogDesc.setAttribute('content', description);
    }

    const ogTitle = ensureTag('meta[property="og:title"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:title');
      return m;
    });
    ogTitle.setAttribute('content', title);

    if (canonicalPath) {
      const canonical = ensureTag('link[rel="canonical"]', () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      });
      const base = window.location.origin;
      canonical.setAttribute('href', `${base}${canonicalPath}`);
    }

    // JSON-LD structured data
    let jsonLdEl = document.getElementById('jsonld-script') as HTMLScriptElement | null;
    if (jsonLdEl) jsonLdEl.remove();
    if (jsonLd) {
      jsonLdEl = document.createElement('script');
      jsonLdEl.id = 'jsonld-script';
      (jsonLdEl as HTMLScriptElement).setAttribute('type', 'application/ld+json');
      (jsonLdEl as HTMLScriptElement).text = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdEl);
    }
  }, [title, description, canonicalPath, jsonLd]);

  return null;
};
