#!/usr/bin/env node
// Adds "type": "module" to the dist package.json after ng-packagr finishes.
// Source package.json doesn't carry it because vitest config resolution breaks
// under strict ESM in the workspace (vite only lives in .pnpm).
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const distPkgPath = resolve(process.cwd(), 'dist/libs/ngx-transforms/package.json');

const pkg = JSON.parse(await readFile(distPkgPath, 'utf8'));

if (pkg.type === 'module') {
  console.log('finalize-dist-package: "type": "module" already set, no-op');
  process.exit(0);
}

pkg.type = 'module';

// Place "type" right after "license" for stable diffs
const ordered = {};
for (const [k, v] of Object.entries(pkg)) {
  ordered[k] = v;
  if (k === 'license') ordered.type = 'module';
}

await writeFile(distPkgPath, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
console.log('finalize-dist-package: wrote "type": "module" to dist package.json');
