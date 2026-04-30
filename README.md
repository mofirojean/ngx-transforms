# ngx-transforms

[![npm](https://img.shields.io/npm/v/ngx-transforms.svg)](https://www.npmjs.com/package/ngx-transforms)
[![Angular](https://img.shields.io/badge/Angular-17+-dd0031.svg)](https://angular.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/mofirojean/ngx-transforms/actions/workflows/ci.yml/badge.svg)](https://github.com/mofirojean/ngx-transforms/actions/workflows/ci.yml)

> 86+ standalone, tree-shakable Angular pipes for text, arrays, math, objects, and more.

**[Docs & live playground](https://ngx-transforms.vercel.app)** · **[Library README](libs/ngx-transforms/README.md)**

---

## Install

```bash
npm install ngx-transforms
```

```ts
import { TruncatePipe } from 'ngx-transforms';

@Component({
  standalone: true,
  imports: [TruncatePipe],
  template: `<p>{{ post.body | truncate:80 }}</p>`,
})
export class PostCard {}
```

See the [library README](libs/ngx-transforms/README.md) for the full pipe catalog.

---

## Contributing

This is an [Nx](https://nx.dev/) monorepo with the published library in `libs/ngx-transforms/` and the docs site in `apps/docs/`.

### Prerequisites

- Node.js **v22+**
- pnpm **v10+**

### Setup

```bash
git clone https://github.com/mofirojean/ngx-transforms.git
cd ngx-transforms
pnpm install
```

### Common commands

```bash
pnpm nx serve docs              # run docs site at localhost:4200
pnpm nx test ngx-transforms     # run library unit tests (Vitest)
pnpm nx lint ngx-transforms     # lint the library
pnpm nx build ngx-transforms    # produce dist/libs/ngx-transforms
```

### Submitting changes

1. Branch from `master` (`feature/...` or `fix/...`)
2. Add tests for any new pipe — every pipe needs a `.spec.ts`
3. Keep commits in [Conventional Commits](https://www.conventionalcommits.org/) form (`feat:`, `fix:`, `docs:`, etc.)
4. Open a PR against `master` CI must be green (lint + test + build)

### Project layout

```
apps/
  docs/                          Documentation site (Angular)
  docs-e2e/                      Playwright E2E tests
libs/
  ngx-transforms/
    src/lib/pipes/<category>/    Individual pipe implementations + specs
    src/providers/               ALL_PIPES provider
```

---

## License

[MIT](libs/ngx-transforms/LICENSE) © [Mofiro Jean](https://github.com/mofirojean)
