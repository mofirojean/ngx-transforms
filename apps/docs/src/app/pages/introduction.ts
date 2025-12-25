import {Component} from '@angular/core';
import {Footer} from '../reusables/footer';

@Component({
  selector: 'app-introduction-page',
  standalone: true,
  imports: [Footer],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Introduction</h1>
      <p class="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground">
        NgxTransforms is a comprehensive collection of modern, type-safe, and performant Angular pipes designed to simplify data transformation in your templates.
      </p>

      <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Philosophy
      </h2>
      <p class="leading-7 [&:not(:first-child)]:mt-6">
        We believe that pipes should be simple, pure, and do one thing well. NgxTransforms is built with these principles in mind:
      </p>
      <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
        <li><strong>Pure & Performant:</strong> All pipes are pure by default, ensuring optimal change detection performance.</li>
        <li><strong>Type-Safe:</strong> Written in TypeScript with strict type checking to catch errors at compile time.</li>
        <li><strong>Standalone:</strong> Fully compatible with Angular's standalone components API.</li>
        <li><strong>Tree-Shakeable:</strong> Import only what you need, keeping your bundle size small.</li>
      </ul>

      <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10 mb-4">
        Installation
      </h2>
      <div class="relative rounded-md bg-muted p-4 font-mono text-sm mt-4">
        npm install &#64;ngx-transforms/core
      </div>
      <app-footer />
    </div>
  `
})
export class Introduction {
}
