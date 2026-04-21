import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = 'ngx-transforms';
const SITE_ORIGIN = 'https://ngx-transforms.vercel.app';
const DEFAULT_IMAGE = `${SITE_ORIGIN}/og-image.png`;
const TWITTER_HANDLE = '@mofirojean';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const fullTitle = data.title.includes(SITE_NAME) ? data.title : `${data.title} | ${SITE_NAME}`;
    const url = data.url.startsWith('http') ? data.url : `${SITE_ORIGIN}${data.url.startsWith('/') ? data.url : '/' + data.url}`;
    const image = data.image ?? DEFAULT_IMAGE;
    const type = data.type ?? 'website';

    this.title.setTitle(fullTitle);

    this.setMeta('name', 'description', data.description);
    if (data.keywords?.length) {
      this.setMeta('name', 'keywords', data.keywords.join(', '));
    }

    // Open Graph
    this.setMeta('property', 'og:title', fullTitle);
    this.setMeta('property', 'og:description', data.description);
    this.setMeta('property', 'og:url', url);
    this.setMeta('property', 'og:type', type);
    this.setMeta('property', 'og:image', image);
    this.setMeta('property', 'og:site_name', SITE_NAME);

    // Twitter
    this.setMeta('name', 'twitter:card', 'summary_large_image');
    this.setMeta('name', 'twitter:title', fullTitle);
    this.setMeta('name', 'twitter:description', data.description);
    this.setMeta('name', 'twitter:image', image);
    this.setMeta('name', 'twitter:site', TWITTER_HANDLE);
    this.setMeta('name', 'twitter:creator', TWITTER_HANDLE);

    this.setCanonical(url);
    this.setJsonLd(data.jsonLd);
  }

  private setMeta(attr: 'name' | 'property', key: string, content: string): void {
    const selector = `${attr}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content });
    } else {
      this.meta.addTag({ [attr]: key, content });
    }
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data?: Record<string, unknown>): void {
    const head = this.document.head;
    const existing = head.querySelector('script[type="application/ld+json"][data-seo="route"]');
    if (existing) {
      existing.remove();
    }
    if (!data) return;

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo', 'route');
    script.textContent = JSON.stringify(data);
    head.appendChild(script);
  }
}
