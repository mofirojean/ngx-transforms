import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PIPES, PIPE_CATEGORIES } from '../src/app/pages/model';

const SITE_ORIGIN = 'https://ngx-transforms.vercel.app';
const OUTPUT = resolve(__dirname, '../public/sitemap.xml');
const TODAY = new Date().toISOString().split('T')[0];

interface UrlEntry {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

const staticRoutes: UrlEntry[] = [
  { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: TODAY },
  { loc: '/docs/introduction', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/docs/pipes', priority: '0.9', changefreq: 'weekly', lastmod: TODAY },
];

const pipeRoutes: UrlEntry[] = PIPES.map((pipe) => ({
  loc: pipe.url,
  priority: '0.8',
  changefreq: 'monthly',
  lastmod: pipe.addedOn ?? TODAY,
}));

const allRoutes = [...staticRoutes, ...pipeRoutes];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allRoutes.map(
    (r) =>
      `  <url>\n` +
      `    <loc>${SITE_ORIGIN}${r.loc}</loc>\n` +
      `    <lastmod>${r.lastmod}</lastmod>\n` +
      `    <changefreq>${r.changefreq}</changefreq>\n` +
      `    <priority>${r.priority}</priority>\n` +
      `  </url>`
  ),
  '</urlset>',
  '',
].join('\n');

writeFileSync(OUTPUT, xml, 'utf8');

const totalPipes = PIPE_CATEGORIES.reduce((sum, c) => sum + c.pipes.length, 0);
console.log(`✓ Wrote sitemap.xml — ${allRoutes.length} URLs (${totalPipes} pipes across ${PIPE_CATEGORIES.length} categories)`);
