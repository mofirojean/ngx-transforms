import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PIPES } from '../../pages/model';
import { SeoService } from './seo.service';

interface RouteSeoEntry {
  title: string;
  description: string;
  keywords?: string[];
}

const ROUTE_SEO: Record<string, RouteSeoEntry> = {
  '/': {
    title: 'ngx-transforms — 63+ Standalone Angular Pipes for Modern Apps',
    description:
      'The complete Angular pipe library. 63+ tree-shakeable, type-safe, standalone pipes for text transformation, data masking, math, array utilities, QR codes, and more. Zero config, Angular 17+.',
    keywords: [
      'angular pipes',
      'ngx-transforms',
      'angular pipe library',
      'standalone pipes angular',
      'angular utilities',
      'typescript pipes',
      'angular 17 pipes',
      'angular 20 pipes',
      'angular 21 pipes',
      'custom pipes angular',
    ],
  },
  '/docs/introduction': {
    title: 'Introduction — Get Started with ngx-transforms',
    description:
      'Install ngx-transforms in your Angular project. 63+ standalone pipes for text, security, media, data, array, and math transformations. Works with Angular 17+.',
    keywords: ['angular pipes installation', 'ngx-transforms getting started', 'angular standalone pipes'],
  },
  '/docs/pipes': {
    title: 'All Angular Pipes — ngx-transforms Pipe Catalog',
    description:
      'Browse the complete catalog of 63+ standalone Angular pipes. Text transforms, data masking, math utilities, array operations, QR codes, morse code, and more.',
    keywords: [
      'angular pipes list',
      'all angular pipes',
      'angular pipe catalog',
      'angular pipe examples',
    ],
  },
};

const SITE_ORIGIN = 'https://ngx-transforms.vercel.app';

function buildPipeSeo(pipeName: string, description: string, url: string): RouteSeoEntry & { jsonLd: Record<string, unknown> } {
  const title = `${pipeName} Pipe — Angular | ngx-transforms`;
  const fullDescription = `${description} A standalone Angular pipe from ngx-transforms — type-safe, tree-shakeable, and ready for Angular 17+.`;

  return {
    title,
    description: fullDescription,
    keywords: [
      `${pipeName.toLowerCase()} pipe angular`,
      `angular ${pipeName.toLowerCase()} pipe`,
      `${pipeName.toLowerCase()} angular`,
      'ngx-transforms',
      'angular pipes',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: `${pipeName} Pipe — Angular`,
      description: fullDescription,
      url: `${SITE_ORIGIN}${url}`,
      author: { '@type': 'Person', name: 'Mofiro Jean', url: 'https://github.com/mofirojean' },
      publisher: {
        '@type': 'Organization',
        name: 'ngx-transforms',
        logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo.png` },
      },
      about: {
        '@type': 'SoftwareApplication',
        applicationCategory: 'DeveloperApplication',
        name: `${pipeName} Pipe`,
        operatingSystem: 'Cross-platform',
      },
      mainEntityOfPage: `${SITE_ORIGIN}${url}`,
    },
  };
}

export function provideSeoInitializer(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const router = inject(Router);
    const seo = inject(SeoService);

    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects.split('?')[0].split('#')[0];

        // Known static route?
        const staticEntry = ROUTE_SEO[url] ?? ROUTE_SEO[url.replace(/\/$/, '')] ?? null;
        if (staticEntry) {
          seo.update({
            title: staticEntry.title,
            description: staticEntry.description,
            keywords: staticEntry.keywords,
            url,
            type: url === '/' ? 'website' : 'article',
          });
          return;
        }

        // Pipe detail route? Match against PIPES.
        const pipe = PIPES.find((p) => p.url === url);
        if (pipe) {
          const entry = buildPipeSeo(pipe.name, pipe.description, pipe.url);
          seo.update({
            title: entry.title,
            description: entry.description,
            keywords: entry.keywords,
            url,
            type: 'article',
            jsonLd: entry.jsonLd,
          });
          return;
        }

        // Fallback: generic site meta
        seo.update({
          title: 'ngx-transforms — Standalone Angular Pipes',
          description:
            'The complete Angular pipe library. 63+ tree-shakeable, type-safe, standalone pipes.',
          url,
          type: 'website',
        });
      });
  });
}