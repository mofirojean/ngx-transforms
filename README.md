# ngx-transforms

[![npm version](https://img.shields.io/npm/v/ngx-transforms.svg)](https://www.npmjs.com/package/ngx-transforms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21+-dd0031.svg)](https://angular.dev)
[![CI](https://github.com/mofirojean/ngx-transforms/actions/workflows/ci.yml/badge.svg)](https://github.com/mofirojean/ngx-transforms/actions/workflows/ci.yml)

A comprehensive collection of modern, type-safe, and performant standalone Angular pipes for common data transformations.

## Features

- **Pure and Performant** -- All pipes are pure by default, ensuring optimal change detection performance.
- **Type-Safe** -- Written in TypeScript with strict type checking to catch errors at compile time.
- **Standalone** -- Fully compatible with Angular's standalone components API.
- **Tree-Shakeable** -- Import only what you need, keeping your bundle size small.
- **Modern** -- Built for Angular 21+ with zoneless architecture support.

## Installation

```bash
npm install ngx-transforms
```

## Usage

Import the pipe you need directly into your component:

```typescript
import { Component } from '@angular/core';
import { CamelCasePipe, CountPipe } from 'ngx-transforms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CamelCasePipe, CountPipe],
  template: `
    <p>{{ 'hello world' | camelCase }}</p>
    <p>Array length: {{ items | count }}</p>
  `,
})
export class AppComponent {
  items = [1, 2, 3, 4, 5];
}
```

For the full list of available pipes, see the [library README](libs/ngx-transforms/README.md).

## Documentation

For full documentation and live examples, visit the [documentation site](https://ngx-transforms.vercel.app).

## Contributing

Contributions are welcome. Please follow the process below to submit changes.

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v10+
- Familiarity with [Nx](https://nx.dev/) monorepo tooling

### Development Setup

```bash
# Clone the repository
git clone https://github.com/mofirojean/ngx-transforms.git
cd ngx-transforms

# Install dependencies
pnpm install

# Start the docs app in development mode
pnpm nx serve docs

# Run library tests
pnpm nx test ngx-transforms

# Lint the library
pnpm nx lint ngx-transforms

# Build the library
pnpm nx build ngx-transforms
```

### Submitting Changes

1. Fork the repository
2. Create a feature branch from `master` (`git checkout -b feature/your-feature`)
3. Make your changes and ensure all tests pass
4. Commit your changes with a descriptive message following [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add new pipe`, `fix: resolve edge case`)
5. Push to your branch (`git push origin feature/your-feature`)
6. Open a Pull Request against `master`

All pull requests must pass the CI pipeline (lint, test, build) before they can be merged.

### Project Structure

```
ngx-transforms/
  apps/
    docs/               Documentation site (Angular)
    docs-e2e/           End-to-end tests (Playwright)
  libs/
    ngx-transforms/     Pipe library (published to npm)
      src/lib/pipes/    Individual pipe implementations
```

## License

This project is licensed under the MIT License. See the [LICENSE](libs/ngx-transforms/LICENSE) file for details.

## Author

Built and maintained by [Mofiro Jean](https://github.com/mofirojean).
