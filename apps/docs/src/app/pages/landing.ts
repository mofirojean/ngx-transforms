 import {Component} from '@angular/core';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowRight, lucideBox, lucideCopy, lucideShieldCheck, lucideZap} from '@ng-icons/lucide';
import {Footer} from '../reusables/footer';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HlmButtonImports, NgIconComponent, Footer],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideZap,
      lucideShieldCheck,
      lucideBox,
      lucideCopy
    })
  ],
  template: `
    <main class="relative flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16">

      <!-- Hero Background Pattern -->
      <div
        class="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20"></div>
      <div
        class="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <!-- Hero Content -->
      <div class="container relative z-10 flex flex-col items-center text-center px-4 md:px-6">
        <div
          class="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span class="flex h-2 w-2 rounded-full bg-green-600 mr-2"></span>
          Optimized for maximum performance
        </div>

        <h1
          class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 animate-in fade-in slide-in-from-bottom-6 duration-700">
          Transform Data with <br class="hidden sm:block"/>
          <span class="text-primary">Modern Angular Pipes</span>
        </h1>

        <p
          class="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          A lightweight, type-safe, and performant collection of pure pipes for your Angular applications.
          Built for modern Angular with standalone support.
        </p>

        <div
          class="mt-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          <a
            hlmBtn
            size="lg"
            class="gap-2 min-w-40"
            href="/docs/introduction"
          >
            Get Started
            <ng-icon name="lucideArrowRight" class="h-4 w-4"></ng-icon>
          </a>
          <a
            hlmBtn
            variant="outline"
            size="lg"
            class="gap-2 min-w-40"
            href="https://github.com/mofirojean/ngx-transforms"
            target="_blank"
          >
            <ng-icon name="lucideGithub" class="h-4 w-4"></ng-icon>
            GitHub
          </a>
        </div>

        <!-- Pipe Visual Animation -->
        <div
          class="mt-20 relative w-full max-w-5xl mx-auto perspective-[2000px] animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <div
            class="relative rounded-xl border border-border bg-card/50 shadow-2xl backdrop-blur-sm overflow-hidden transform rotate-x-12 transition-transform hover:rotate-x-0 duration-700 ease-out">
            <div class="flex items-center border-b border-border bg-muted/50 px-4 py-2">
              <div class="flex space-x-2">
                <div class="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-green-500/80"></div>
              </div>
              <div class="mx-auto text-xs font-medium text-muted-foreground">example.component.ts</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              <div class="p-6 md:p-8 bg-background/30">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-muted-foreground">Input Data</span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">Raw</span>
                  </div>
                  <div class="rounded-md bg-muted/50 p-4 font-mono text-sm">
                    <div class="text-green-500">const data = [</div>
                    <div class="pl-4 text-foreground">1, 2, 3, 4, 5</div>
                    <div class="text-green-500">];</div>
                  </div>
                </div>
              </div>

              <div class="relative p-6 md:p-8 bg-background/30 flex flex-col justify-center">
                <!-- Pipe Connector Visual -->
                <div
                  class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                  <ng-icon name="lucideArrowRight" class="h-4 w-4"></ng-icon>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-muted-foreground">Template Usage</span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Transformed</span>
                  </div>
                  <div class="rounded-md bg-muted/50 p-4 font-mono text-sm">
                    <div class="text-blue-400">&lt;p&gt;</div>
                    <div class="pl-4">
                      <span class="text-foreground">&#123;&#123; </span>
                      <span class="text-yellow-500">data</span>
                      <span class="text-primary font-bold"> | count </span>
                      <span class="text-foreground"> &#125;&#125;</span>
                    </div>
                    <div class="text-blue-400">&lt;/p&gt;</div>
                    <div class="mt-2 pt-2 border-t border-border/50 text-muted-foreground text-xs">
                      Output: <span class="text-foreground font-bold text-base ml-2">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Features Section -->
    <section id="get-started" class="container mx-auto py-16 md:py-24 lg:py-32 px-4 md:px-6">
      <div class="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
        <div class="flex flex-col justify-center space-y-4">
          <div class="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground w-fit">
            Why NgxTransforms?
          </div>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Built for the Modern Web
          </h2>
          <p class="max-w-150 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stop rewriting the same utility pipes in every project. We provide a robust, tested, and performant
            collection of pipes that just work.
          </p>
          <ul class="grid gap-4 mt-4">
            <li class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ng-icon name="lucideZap" class="h-4 w-4"></ng-icon>
              </div>
              <span class="font-medium">Blazing fast pure pipes</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ng-icon name="lucideShieldCheck" class="h-4 w-4"></ng-icon>
              </div>
              <span class="font-medium">Fully typed & null safe</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ng-icon name="lucideBox" class="h-4 w-4"></ng-icon>
              </div>
              <span class="font-medium">Standalone & Tree-shakeable</span>
            </li>
          </ul>
        </div>
        <div class="mx-auto w-full max-w-125 lg:max-w-none">
          <div class="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div class="p-6 pt-0 mt-6">
              <h3 class="text-2xl font-semibold leading-none tracking-tight mb-4">Quick Install</h3>
              <div class="relative rounded-md bg-muted p-4 font-mono text-sm">
                <div class="flex justify-between items-center">
                  <span class="text-foreground">npm i ngx-transforms</span>
                  <button hlmBtn variant="ghost" size="icon"
                          class="h-6 w-6 text-muted-foreground hover:text-foreground">
                    <ng-icon name="lucideCopy" class="h-3 w-3"></ng-icon>
                  </button>
                </div>
              </div>

              <h3 class="text-2xl font-semibold leading-none tracking-tight mt-8 mb-4">Usage</h3>
              <div class="relative rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto">
                <div class="text-blue-400">import <span class="text-foreground">&#123;</span> <span
                  class="text-yellow-400">CountPipe</span> <span class="text-foreground">&#125;</span> from <span
                  class="text-green-400">'&#64;ngx-transforms'</span>;
                </div>
                <br>
                <div class="text-blue-400">&#64;Component<span class="text-foreground">(&#123;</span></div>
                <div class="pl-4 text-foreground">standalone: <span class="text-blue-400">true</span>,</div>
                <div class="pl-4 text-foreground">imports: [<span class="text-yellow-400">CountPipe</span>],</div>
                <div class="pl-4 text-foreground">template: <span class="text-green-400">{{ 'items | count' }}</span>
                </div>
                <div class="text-foreground">&#125;)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <app-footer/>
  `
})
export class Landing {
}
