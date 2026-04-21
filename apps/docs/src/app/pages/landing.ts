import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideBox,
  lucideCopy,
  lucideCheck,
  lucideShieldCheck,
  lucideZap,
  lucideGlobe,
  lucidePackage,
  lucideStar,
  lucideTerminal,
  lucideChevronRight,
  lucideArrowLeftRight,
  lucideScissors,
  lucideCreditCard,
  lucideMail,
  lucideQrCode,
  lucideClock,
  lucidePalette,
  lucideHash,
  lucideType,
} from '@ng-icons/lucide';
import { Footer } from '../reusables/footer';
import { RouterLink } from '@angular/router';
import { PIPES } from './model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HlmButtonImports, NgIconComponent, Footer, RouterLink],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideZap,
      lucideShieldCheck,
      lucideBox,
      lucideCopy,
      lucideCheck,
      lucideGlobe,
      lucidePackage,
      lucideStar,
      lucideTerminal,
      lucideChevronRight,
      lucideArrowLeftRight,
      lucideScissors,
      lucideCreditCard,
      lucideMail,
      lucideQrCode,
      lucideClock,
      lucidePalette,
      lucideHash,
      lucideType,
    }),
  ],
  template: `
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
      @keyframes slide-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .float-slow { animation: float 6s ease-in-out infinite; }
      .float-medium { animation: float 4s ease-in-out infinite; }
      .float-fast { animation: float 3s ease-in-out infinite; }
      .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      .slide-up { animation: slide-up 0.6s ease-out both; }
      .slide-up-1 { animation-delay: 0.1s; }
      .slide-up-2 { animation-delay: 0.2s; }
      .slide-up-3 { animation-delay: 0.3s; }
      .slide-up-4 { animation-delay: 0.4s; }
      .slide-up-5 { animation-delay: 0.5s; }
      .slide-up-6 { animation-delay: 0.7s; }
      .slide-up-7 { animation-delay: 0.9s; }
    </style>

    <main class="relative flex flex-col items-center overflow-hidden">

      <!-- Background -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-background"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pulse-glow"></div>
        <div class="absolute top-20 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pulse-glow" style="animation-delay: 1s;"></div>
        <div class="absolute top-40 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pulse-glow" style="animation-delay: 2s;"></div>
      </div>

      <!-- Floating pipe badges (decorative) -->
      <div class="absolute top-32 left-[8%] hidden lg:block float-slow opacity-60">
        <div class="rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-muted-foreground shadow-lg">| reverse</div>
      </div>
      <div class="absolute top-48 right-[10%] hidden lg:block float-medium opacity-60">
        <div class="rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-primary shadow-lg">| timeAgo</div>
      </div>
      <div class="absolute top-72 left-[15%] hidden lg:block float-fast opacity-60">
        <div class="rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-muted-foreground shadow-lg">| qrCode</div>
      </div>
      <div class="absolute top-60 right-[18%] hidden lg:block float-slow opacity-60" style="animation-delay: 1s;">
        <div class="rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-muted-foreground shadow-lg">| truncate</div>
      </div>
      <div class="absolute top-80 right-[5%] hidden xl:block float-medium opacity-60" style="animation-delay: 0.5s;">
        <div class="rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-muted-foreground shadow-lg">| camelCase</div>
      </div>

      <!-- Hero Section -->
      <section class="container relative z-10 flex flex-col items-center text-center px-4 md:px-6 pt-20 md:pt-32 lg:pt-40 pb-16">

        <!-- Badge -->
        <div class="slide-up slide-up-1 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm backdrop-blur-sm mb-8 hover:border-primary/50 transition-colors cursor-default">
          <span class="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span class="text-muted-foreground">v{{ version }} — {{ pipeCount }} pipes and growing</span>
        </div>

        <!-- Heading -->
        <h1 class="slide-up slide-up-2 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          <span class="sr-only">ngx-transforms — {{ pipeCount }}+ Standalone Angular Pipes for Modern Angular Apps.</span>
          <span aria-hidden="true" class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            The Pipe Library
          </span>
          <br aria-hidden="true" />
          <span aria-hidden="true" class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-500">
            Angular Deserves
          </span>
        </h1>

        <p class="slide-up slide-up-3 mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          <strong>{{ pipeCount }} standalone Angular pipes</strong> for text transformation, data masking, math, array utilities, and more.
          Type-safe, tree-shakeable, and built for Angular 17+.
          Zero config — just import and transform.
        </p>

        <!-- CTA Buttons -->
        <div class="slide-up slide-up-4 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            hlmBtn
            size="lg"
            class="gap-2 min-w-44 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
            routerLink="/docs/introduction"
          >
            Get Started
            <ng-icon name="lucideArrowRight" class="h-4 w-4"></ng-icon>
          </a>
          <a
            hlmBtn
            variant="outline"
            size="lg"
            class="gap-2 min-w-44"
            href="https://github.com/mofirojean/ngx-transforms"
            target="_blank"
          >
            <ng-icon name="lucideStar" class="h-4 w-4"></ng-icon>
            Star on GitHub
          </a>
        </div>

        <!-- Install command -->
        <div class="slide-up slide-up-5 mt-8">
          <button
            (click)="copyInstall()"
            class="group inline-flex items-center gap-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm px-6 py-3 font-mono text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer">
            <ng-icon name="lucideTerminal" class="h-4 w-4 text-primary"></ng-icon>
            <span>npm i ngx-transforms</span>
            <ng-icon
              [name]="copied() ? 'lucideCheck' : 'lucideCopy'"
              class="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
              [class.text-green-500]="copied()">
            </ng-icon>
          </button>
        </div>
      </section>

      <!-- Live Demo Section -->
      <section class="container relative z-10 px-4 md:px-6 pb-20 slide-up slide-up-6">
        <div class="mx-auto max-w-4xl">
          <div class="rounded-xl border border-primary/20 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/10 overflow-hidden">
            <!-- Window chrome -->
            <div class="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
              <div class="flex space-x-2">
                <div class="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-green-500/80"></div>
              </div>
              <div class="text-xs font-medium text-muted-foreground font-mono">live-demo.component.html</div>
              <div class="w-12"></div>
            </div>

            <!-- Interactive demo -->
            <div class="p-6 md:p-8">
              <div class="flex flex-col md:flex-row items-stretch gap-6">
                <!-- Input side -->
                <div class="flex-1 space-y-3">
                  <div class="flex items-center gap-2 mb-4">
                    <span class="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium">Input</span>
                  </div>
                  <div class="rounded-lg bg-muted/50 p-4 font-mono text-sm space-y-1">
                    <span class="text-muted-foreground">value = </span>
                    <span class="text-green-400">"{{ demoInput() }}"</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    @for (example of demoExamples; track example.label) {
                      <button
                        hlmBtn
                        variant="ghost"
                        size="sm"
                        class="text-xs h-7"
                        [class.bg-primary/10]="selectedDemo() === example.label"
                        (click)="selectDemo(example)">
                        {{ example.label }}
                      </button>
                    }
                  </div>
                </div>

                <!-- Arrow -->
                <div class="hidden md:flex items-center justify-center">
                  <div class="flex flex-col items-center gap-1">
                    <div class="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25">
                      <ng-icon name="lucideChevronRight" class="h-4 w-4"></ng-icon>
                    </div>
                    <span class="text-[10px] font-mono text-primary font-bold">| {{ demoPipe() }}</span>
                  </div>
                </div>
                <div class="flex md:hidden items-center justify-center">
                  <span class="text-xs font-mono text-primary font-bold px-3 py-1 rounded-full bg-primary/10">| {{ demoPipe() }}</span>
                </div>

                <!-- Output side -->
                <div class="flex-1 space-y-3">
                  <div class="flex items-center gap-2 mb-4">
                    <span class="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 font-medium">Output</span>
                  </div>
                  <div class="rounded-lg bg-muted/50 p-4 font-mono text-sm border border-primary/20">
                    <span class="text-foreground font-bold">{{ demoOutput() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Strip -->
      <section class="w-full border-y border-border bg-card/50 backdrop-blur-sm">
        <div class="container mx-auto px-4 md:px-6 py-12">
          <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">{{ pipeCount }}+</div>
              <div class="text-sm text-muted-foreground">Pipes</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">100%</div>
              <div class="text-sm text-muted-foreground">Type Safe</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">100+</div>
              <div class="text-sm text-muted-foreground">Locales</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">NgxTransforms</span>?
          </h2>
          <p class="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop rewriting utility pipes in every project. Import, use, ship.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          @for (feature of features; track feature.title) {
            <div class="group relative rounded-xl border border-border bg-card/50 p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary mb-4 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-all">
                <ng-icon [name]="feature.icon" class="h-5 w-5"></ng-icon>
              </div>
              <h3 class="font-semibold text-lg mb-2">{{ feature.title }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Pipe Showcase -->
      <section class="w-full border-y border-border bg-muted/30 relative overflow-hidden">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl"></div>

        <div class="container relative z-10 mx-auto px-4 md:px-6 py-20 md:py-28">
          <div class="text-center mb-14">
            <div class="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm backdrop-blur-sm mb-6">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 font-semibold">{{ pipeCount }} pipes</span>
              <span class="text-muted-foreground">and counting</span>
            </div>
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Explore the <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Collection</span>
            </h2>
            <p class="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Click any pipe to see what it does. Each one is standalone — import only what you need.
            </p>
          </div>

          <!-- Pipe cards grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            @for (pipe of showcasePipes; track pipe.name) {
              <a
                [routerLink]="pipe.url"
                class="group relative rounded-xl border border-border bg-card/80 backdrop-blur-sm p-5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">

                <!-- Hover gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div class="relative z-10">
                  <!-- Header -->
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                      <div class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary/15 to-purple-500/15 text-primary group-hover:from-primary/25 group-hover:to-purple-500/25 transition-all">
                        <ng-icon [name]="pipe.icon" class="h-3.5 w-3.5"></ng-icon>
                      </div>
                      <h3 class="font-semibold text-sm">{{ pipe.name }}</h3>
                    </div>
                    <ng-icon name="lucideChevronRight" class="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"></ng-icon>
                  </div>

                  <!-- Live preview -->
                  <div class="rounded-lg bg-muted/50 p-3 font-mono text-xs space-y-1.5 border border-border/50 group-hover:border-primary/20 transition-colors">
                    <div class="flex items-center gap-2">
                      <span class="text-muted-foreground shrink-0">in</span>
                      <span class="text-foreground/70 truncate">{{ pipe.input }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 font-bold shrink-0">| {{ pipe.pipeName }}</span>
                    </div>
                    <div class="flex items-center gap-2 pt-1 border-t border-border/50">
                      <span class="text-muted-foreground shrink-0">out</span>
                      <span class="text-foreground font-bold truncate">{{ pipe.output }}</span>
                    </div>
                  </div>
                </div>
              </a>
            }
          </div>

          <div class="text-center mt-12">
            <a
              hlmBtn
              size="lg"
              class="gap-2 shadow-lg shadow-primary/25"
              routerLink="/docs/pipes">
              View full documentation
              <ng-icon name="lucideArrowRight" class="h-4 w-4"></ng-icon>
            </a>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div class="relative rounded-2xl max-w-4xl mx-auto overflow-hidden">
          <!-- Animated gradient border -->
          <div class="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-20"></div>

          <div class="relative rounded-2xl bg-card/95 backdrop-blur-xl p-10 md:p-16 overflow-hidden">
            <!-- Background effects -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
            <div class="absolute -top-32 -right-32 w-64 h-64 bg-primary/8 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>

            <div class="relative z-10 text-center">
              <!-- Terminal-style install preview -->
              <div class="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-mono text-muted-foreground mb-8">
                <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>npm i ngx-transforms</span>
                <span class="text-primary font-bold">→</span>
                <span class="text-foreground">ready</span>
              </div>

              <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Start <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">transforming</span> today
              </h2>
              <p class="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                One install. {{ pipeCount }} pipes. Zero config.
                <br class="hidden sm:block" />
                Join developers who ship faster with NgxTransforms.
              </p>

              <!-- Steps -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                <div class="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary text-sm font-bold mx-auto mb-2">1</div>
                  <div class="font-mono text-xs text-muted-foreground">npm install</div>
                </div>
                <div class="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-500 text-sm font-bold mx-auto mb-2">2</div>
                  <div class="font-mono text-xs text-muted-foreground">import pipe</div>
                </div>
                <div class="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 text-pink-500 text-sm font-bold mx-auto mb-2">3</div>
                  <div class="font-mono text-xs text-muted-foreground">use in template</div>
                </div>
              </div>

              <div class="flex flex-wrap justify-center gap-4">
                <a
                  hlmBtn
                  size="lg"
                  class="gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                  routerLink="/docs/introduction">
                  Get Started
                  <ng-icon name="lucideArrowRight" class="h-4 w-4"></ng-icon>
                </a>
                <a
                  hlmBtn
                  variant="outline"
                  size="lg"
                  class="gap-2 hover:bg-primary/5 transition-colors"
                  href="https://github.com/mofirojean/ngx-transforms"
                  target="_blank">
                  <ng-icon name="lucideStar" class="h-4 w-4"></ng-icon>
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <app-footer />
  `,
})
export class Landing implements OnInit, OnDestroy {
  pipes = PIPES;
  pipeCount = PIPES.length;
  showcasePipes = [
    { name: 'Reverse', pipeName: 'reverse', input: '"Hello World"', output: '"dlroW olleH"', icon: 'lucideArrowLeftRight', url: '/docs/pipes/reverse' },
    { name: 'Truncate', pipeName: 'truncate:15', input: '"A very long sentence"', output: '"A very long..."', icon: 'lucideScissors', url: '/docs/pipes/truncate' },
    { name: 'Time Ago', pipeName: 'timeAgo', input: 'Date (5m ago)', output: '"5 minutes ago"', icon: 'lucideClock', url: '/docs/pipes/time-ago' },
    { name: 'Credit Card Mask', pipeName: 'creditCardMask', input: '"4111111111111111"', output: '"**** **** **** 1111"', icon: 'lucideCreditCard', url: '/docs/pipes/credit-card-mask' },
    { name: 'Email Mask', pipeName: 'emailMask', input: '"john@email.com"', output: '"j***n@email.com"', icon: 'lucideMail', url: '/docs/pipes/email-mask' },
    { name: 'QR Code', pipeName: 'qrCode', input: '"https://angular.dev"', output: 'data:image/png...', icon: 'lucideQrCode', url: '/docs/pipes/qrcode' },
    { name: 'Color Convert', pipeName: 'colorConvert:"rgb"', input: '"#FF5722"', output: '"rgb(255,87,34)"', icon: 'lucidePalette', url: '/docs/pipes/color-convert' },
    { name: 'Count', pipeName: 'count', input: '[1, 2, 3, 4, 5]', output: '5', icon: 'lucideHash', url: '/docs/pipes/count' },
    { name: 'Text Transform', pipeName: 'camelCase', input: '"hello world"', output: '"helloWorld"', icon: 'lucideType', url: '/docs/pipes/text-transform' },
  ];
  version = '0.0.5';
  copied = signal(false);

  // Demo state
  selectedDemo = signal('Reverse');
  demoInput = signal('Hello World');
  demoPipe = signal('reverse');
  demoOutput = signal('dlroW olleH');
  private rotateInterval: ReturnType<typeof setInterval> | null = null;

  demoExamples = [
    { label: 'Reverse', input: 'Hello World', pipe: 'reverse', output: 'dlroW olleH' },
    { label: 'Truncate', input: 'Angular is a powerful framework for building apps', pipe: 'truncate:20', output: 'Angular is a powe...' },
    { label: 'CamelCase', input: 'hello world pipe', pipe: 'camelCase', output: 'helloWorldPipe' },
    { label: 'SnakeCase', input: 'ngxTransforms', pipe: 'snakeCase', output: 'ngx_transforms' },
    { label: 'KebabCase', input: 'ngxTransforms', pipe: 'kebabCase', output: 'ngx-transforms' },
    { label: 'Initials', input: 'Mofiro Jean', pipe: 'initials', output: 'MJ' },
    { label: 'Count', input: '[1, 2, 3, 4, 5]', pipe: 'count', output: '5' },
    { label: 'MorseCode', input: 'SOS', pipe: 'morseCode', output: '... --- ...' },
  ];

  features = [
    {
      icon: 'lucideZap',
      title: 'Pure & Performant',
      description: 'Every pipe is pure by default. Angular caches the result and only re-evaluates when inputs change.',
    },
    {
      icon: 'lucideShieldCheck',
      title: 'Type Safe & Null Safe',
      description: 'Full TypeScript support with strict types. Gracefully handles null, undefined, and edge cases.',
    },
    {
      icon: 'lucideBox',
      title: 'Standalone & Tree-Shakeable',
      description: 'No NgModule needed. Import only the pipes you use — unused pipes are automatically stripped from your bundle.',
    },
    {
      icon: 'lucideGlobe',
      title: 'Localization Ready',
      description: 'Pipes like timeAgo use Intl APIs for built-in localization across 100+ locales. No extra dependencies.',
    },
    {
      icon: 'lucidePackage',
      title: 'Zero Config',
      description: 'Install, import, use. No providers to configure, no modules to register, no setup boilerplate.',
    },
    {
      icon: 'lucideTerminal',
      title: 'Developer Experience',
      description: 'Comprehensive docs with interactive examples. Every pipe is tested, documented, and ready for production.',
    },
  ];

  ngOnInit() {
    let index = 0;
    this.rotateInterval = setInterval(() => {
      index = (index + 1) % this.demoExamples.length;
      this.selectDemo(this.demoExamples[index]);
    }, 4000);
  }

  ngOnDestroy() {
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
    }
  }

  selectDemo(example: typeof this.demoExamples[0]) {
    this.selectedDemo.set(example.label);
    this.demoInput.set(example.input);
    this.demoPipe.set(example.pipe);
    this.demoOutput.set(example.output);

    // Reset auto-rotate timer
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
    }
    let index = this.demoExamples.findIndex(e => e.label === example.label);
    this.rotateInterval = setInterval(() => {
      index = (index + 1) % this.demoExamples.length;
      this.selectDemo(this.demoExamples[index]);
    }, 4000);
  }

  copyInstall() {
    navigator.clipboard.writeText('npm i ngx-transforms');
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}