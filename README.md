# NgxTransforms

<p align="center">
  <img src="https://raw.githubusercontent.com/mofirojean/ngx-transforms/main/apps/docs/src/favicon.ico" alt="NgxTransforms Logo" width="120" height="120">
</p>

<p align="center">
  <strong>A comprehensive collection of modern, type-safe, and performant Angular pipes.</strong>
</p>

<p align="center">
  <a href="https://github.com/mofirojean/ngx-transforms/actions"><img src="https://img.shields.io/github/actions/workflow/status/mofirojean/ngx-transforms/ci.yml?branch=main" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/@ngx-transforms/core"><img src="https://img.shields.io/npm/v/@ngx-transforms/core" alt="NPM Version"></a>
  <a href="https://github.com/mofirojean/ngx-transforms/blob/main/LICENSE"><img src="https://img.shields.io/github/license/mofirojean/ngx-transforms" alt="License"></a>
</p>

---

## 🚀 Features

- **Pure & Performant:** All pipes are pure by default, ensuring optimal change detection performance.
- **Type-Safe:** Written in TypeScript with strict type checking to catch errors at compile time.
- **Standalone:** Fully compatible with Angular's standalone components API.
- **Tree-Shakeable:** Import only what you need, keeping your bundle size small.
- **Modern:** Built for the latest versions of Angular.

## 📦 Installation

Install the library via npm:

```bash
npm install @ngx-transforms/core
```

## 🛠️ Usage

Import the pipe you need into your component:

```typescript
import { Component } from '@angular/core';
import { CountPipe } from '@ngx-transforms/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CountPipe],
  template: `
    <p>Array length: {{ items | count }}</p>
  `
})
export class AppComponent {
  items = [1, 2, 3, 4, 5];
}
```

## 📚 Documentation

For full documentation and examples, visit our [documentation site](https://ngx-transforms.vercel.app) (coming soon).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ by [Mofiro Jean](https://github.com/mofirojean).
