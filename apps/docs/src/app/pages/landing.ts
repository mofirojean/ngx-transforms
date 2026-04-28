import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { ReversePipe, TitleCasePipe, SlugifyPipe, MorseCodePipe } from '@ngx-transforms';
import { PIPES } from './model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HlmButtonImports,
    NgIconComponent,
    Footer,
    RouterLink,
    FormsModule,
    ReversePipe,
    TitleCasePipe,
    SlugifyPipe,
    MorseCodePipe,
  ],
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
      /* Marquee — infinite horizontal scroll for the pipe-name strip. */
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      /* Result fade-in when the live demo updates. */
      @keyframes result-pop {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .float-slow { animation: float 6s ease-in-out infinite; }
      .float-medium { animation: float 4s ease-in-out infinite; }
      .float-fast { animation: float 3s ease-in-out infinite; }
      .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      .marquee-track { animation: marquee 60s linear infinite; }
      .result-pop { animation: result-pop 200ms ease-out both; }
      .cursor-blink { animation: blink 1s step-end infinite; }
      .slide-up { animation: slide-up 0.6s ease-out both; }
      .slide-up-1 { animation-delay: 0.1s; }
      .slide-up-2 { animation-delay: 0.2s; }
      .slide-up-3 { animation-delay: 0.3s; }
      .slide-up-4 { animation-delay: 0.4s; }
      .slide-up-5 { animation-delay: 0.5s; }
      .slide-up-6 { animation-delay: 0.7s; }
      .slide-up-7 { animation-delay: 0.9s; }
      @media (prefers-reduced-motion: reduce) {
        .marquee-track, .result-pop, .cursor-blink,
        .float-slow, .float-medium, .float-fast, .pulse-glow {
          animation: none;
        }
      }
    </style>

    <main class="relative flex flex-col items-center overflow-hidden">

      <!-- Background -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-background"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#E91E63]/5 rounded-full blur-3xl pulse-glow"></div>
        <div class="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#C724B1]/5 rounded-full blur-3xl pulse-glow" style="animation-delay: 1s;"></div>
        <div class="absolute top-40 left-1/4 w-[300px] h-[300px] bg-[#7C4DFF]/5 rounded-full blur-3xl pulse-glow" style="animation-delay: 2s;"></div>
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

        <!-- Live typewriter — rotates through what the library does. -->
        <div class="slide-up slide-up-1 mb-8 inline-flex items-center gap-2 rounded-full border border-[#C724B1]/30 bg-card/60 backdrop-blur-sm px-5 py-2 text-sm sm:text-base font-mono shadow-lg shadow-[#C724B1]/5">
          <span class="flex h-2 w-2 rounded-full bg-[#C724B1] animate-pulse" aria-hidden="true"></span>
          <span class="text-muted-foreground">ngx-transforms can</span>
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF] font-semibold min-w-[1ch]"
            aria-live="polite"
            [attr.aria-label]="'currently demonstrating: ' + typedText()">
            {{ typedText() }}
          </span>
          <span class="text-[#C724B1] font-bold cursor-blink" aria-hidden="true">|</span>
        </div>

        <!-- Heading -->
        <h1 class="slide-up slide-up-2 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          <span class="sr-only">ngx-transforms — {{ pipeCount }}+ Standalone Angular Pipes for Modern Angular Apps.</span>
          <span aria-hidden="true" class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF]">
            The Pipe Library
          </span>
          <br aria-hidden="true" />
          <span aria-hidden="true" class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF]">
            Angular Deserves
          </span>
        </h1>

        <p class="slide-up slide-up-3 mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          <strong>{{ pipeCount }} standalone Angular pipes</strong> for text transformation, data masking, math, array utilities, and more.
          Type-safe, tree-shakeable, and built for Angular 17+.
          Zero config, just import and transform.
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
      <!-- Live Playground (the hero IS the demo) -->
      <section class="container relative z-10 px-4 md:px-6 pb-20 slide-up slide-up-6">
        <div class="mx-auto max-w-4xl">
          <div class="rounded-xl border border-[#C724B1]/20 bg-card/80 backdrop-blur-sm shadow-2xl shadow-[#C724B1]/10 overflow-hidden">

            <!-- Window chrome -->
            <div class="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2.5">
              <div class="flex space-x-2">
                <div class="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-green-500/80"></div>
              </div>
              <div class="text-xs font-medium text-muted-foreground font-mono">type below — pipes update live</div>
              <div class="w-12"></div>
            </div>

            <!-- The actual interactive playground -->
            <div class="p-6 md:p-8 space-y-6">

              <!-- Input -->
              <div>
                <label for="hero-live-input" class="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2 block">Try it — type anything</label>
                <input
                  id="hero-live-input"
                  type="text"
                  [ngModel]="liveInput()"
                  (ngModelChange)="liveInput.set($event)"
                  class="w-full bg-muted/50 border border-border focus:border-[#C724B1]/50 focus:ring-2 focus:ring-[#C724B1]/20 outline-none rounded-lg px-4 py-3 font-mono text-base transition-colors"
                  placeholder="Hello ngx-transforms"
                  autocomplete="off"
                  spellcheck="false" />
              </div>

              <!-- 4 live transformations stacked -->
              <div class="space-y-2">
                <div class="grid grid-cols-[auto_1fr] gap-3 items-center rounded-md bg-muted/30 px-3 py-2.5 hover:bg-muted/60 transition-colors">
                  <span class="text-xs font-mono text-[#E91E63] font-semibold whitespace-nowrap">| reverse</span>
                  <span class="font-mono text-sm break-all result-pop" [attr.data-key]="liveInput()">{{ liveInput() | reverse }}</span>
                </div>
                <div class="grid grid-cols-[auto_1fr] gap-3 items-center rounded-md bg-muted/30 px-3 py-2.5 hover:bg-muted/60 transition-colors">
                  <span class="text-xs font-mono text-[#C724B1] font-semibold whitespace-nowrap">| titleCase</span>
                  <span class="font-mono text-sm break-all result-pop" [attr.data-key]="liveInput()">{{ liveInput() | titleCase }}</span>
                </div>
                <div class="grid grid-cols-[auto_1fr] gap-3 items-center rounded-md bg-muted/30 px-3 py-2.5 hover:bg-muted/60 transition-colors">
                  <span class="text-xs font-mono text-[#9C30C7] font-semibold whitespace-nowrap">| slugify</span>
                  <span class="font-mono text-sm break-all result-pop" [attr.data-key]="liveInput()">{{ liveInput() | slugify }}</span>
                </div>
                <div class="grid grid-cols-[auto_1fr] gap-3 items-center rounded-md bg-muted/30 px-3 py-2.5 hover:bg-muted/60 transition-colors">
                  <span class="text-xs font-mono text-[#7C4DFF] font-semibold whitespace-nowrap">| morseCode</span>
                  <span class="font-mono text-sm break-all result-pop" [attr.data-key]="liveInput()">{{ liveInput() | morseCode }}</span>
                </div>
              </div>

              <!-- Quick-fill chips -->
              <div class="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                <span class="text-xs text-muted-foreground self-center mr-1">try:</span>
                @for (preset of livePresets; track preset) {
                  <button
                    hlmBtn
                    variant="ghost"
                    size="sm"
                    class="text-xs h-7 font-mono"
                    (click)="liveInput.set(preset)">
                    {{ preset }}
                  </button>
                }
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- Pipe-name marquee — shows the breadth of the library at a glance -->
      <section class="relative w-full overflow-hidden border-y border-border/50 py-4 bg-card/30 backdrop-blur-sm" aria-label="ngx-transforms pipe catalog">
        <!-- Edge fade masks -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

        <div class="flex marquee-track whitespace-nowrap">
          <div class="flex shrink-0 gap-8 pr-8">
            @for (name of marqueeNames; track $index) {
              <span class="text-sm font-mono text-muted-foreground">| {{ name }}</span>
            }
          </div>
          <div class="flex shrink-0 gap-8 pr-8" aria-hidden="true">
            @for (name of marqueeNames; track $index) {
              <span class="text-sm font-mono text-muted-foreground">| {{ name }}</span>
            }
          </div>
        </div>
      </section>

      <!-- Stats Strip -->
      <section class="w-full border-y border-border bg-card/50 backdrop-blur-sm">
        <div class="container mx-auto px-4 md:px-6 py-12">
          <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] to-[#C724B1]">{{ pipeCount }}+</div>
              <div class="text-sm text-muted-foreground">Pipes</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF]">100%</div>
              <div class="text-sm text-muted-foreground">Type Safe</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#C724B1] to-[#7C4DFF]">100+</div>
              <div class="text-sm text-muted-foreground">Locales</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF]">NgxTransforms</span>?
          </h2>
          <p class="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop rewriting utility pipes in every project. Import, use, ship.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          @for (feature of features; track feature.title) {
            <div class="group relative rounded-xl border border-border bg-card/50 p-6 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#E91E63]/20 to-[#7C4DFF]/20 text-[#C724B1] mb-4 group-hover:from-[#E91E63]/30 group-hover:to-[#7C4DFF]/30 transition-all">
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
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF] font-semibold">{{ pipeCount }} pipes</span>
              <span class="text-muted-foreground">and counting</span>
            </div>
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Explore the <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF]">Collection</span>
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
                <div class="absolute inset-0 bg-gradient-to-br from-[#E91E63]/5 via-[#C724B1]/5 to-[#7C4DFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div class="relative z-10">
                  <!-- Header -->
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                      <div class="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#E91E63]/15 to-[#7C4DFF]/15 text-[#C724B1] group-hover:from-[#E91E63]/25 group-hover:to-[#7C4DFF]/25 transition-all">
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
                      <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] to-[#C724B1] font-bold shrink-0">| {{ pipe.pipeName }}</span>
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
          <div class="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF] opacity-20"></div>

          <div class="relative rounded-2xl bg-card/95 backdrop-blur-xl p-10 md:p-16 overflow-hidden">
            <!-- Background effects -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#E91E63]/5 via-transparent to-[#7C4DFF]/5"></div>
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
                Start <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#E91E63] via-[#C724B1] to-[#7C4DFF]">transforming</span> today
              </h2>
              <p class="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                One install. {{ pipeCount }} pipes. Zero config.
                <br class="hidden sm:block" />
                Join developers who ship faster with NgxTransforms.
              </p>

              <!-- Steps -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                <div class="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#E91E63]/20 to-[#E91E63]/10 text-[#E91E63] text-sm font-bold mx-auto mb-2">1</div>
                  <div class="font-mono text-xs text-muted-foreground">npm install</div>
                </div>
                <div class="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#C724B1]/20 to-[#C724B1]/10 text-[#C724B1] text-sm font-bold mx-auto mb-2">2</div>
                  <div class="font-mono text-xs text-muted-foreground">import pipe</div>
                </div>
                <div class="rounded-xl border border-border/50 bg-muted/30 p-4 text-center">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7C4DFF]/20 to-[#7C4DFF]/10 text-[#7C4DFF] text-sm font-bold mx-auto mb-2">3</div>
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
  marqueeNames = PIPES.map(p => p.name);

  liveInput = signal('Hello ngx-transforms');
  livePresets = ['Hello World', 'angular pipes are great', 'SOS', 'ngx-transforms rocks'];

  typedText = signal('');
  private readonly typedPhrases = [
    'reverse strings',
    'mask credit cards',
    'render QR codes',
    'format dates',
    'slugify URLs',
    'strip HTML safely',
    'morse-encode text',
    'shuffle arrays',
    'group by property',
    'mask emails',
    'compute averages',
    'truncate text',
  ];
  private typedIndex = 0;
  private typedTimer: ReturnType<typeof setTimeout> | null = null;
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
  version = '0.3.0';
  copied = signal(false);

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

  copyInstall() {
    navigator.clipboard.writeText('npm i ngx-transforms');
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  ngOnInit(): void {
    this.typeTick('typing');
  }

  ngOnDestroy(): void {
    if (this.typedTimer) clearTimeout(this.typedTimer);
  }

  private typeTick(state: 'typing' | 'erasing'): void {
    const phrase = this.typedPhrases[this.typedIndex];
    const current = this.typedText();

    if (state === 'typing') {
      if (current.length < phrase.length) {
        this.typedText.set(phrase.slice(0, current.length + 1));
        this.typedTimer = setTimeout(() => this.typeTick('typing'), 55 + Math.random() * 45);
      } else {
        this.typedTimer = setTimeout(() => this.typeTick('erasing'), 1600);
      }
    } else {
      if (current.length > 0) {
        this.typedText.set(current.slice(0, -1));
        this.typedTimer = setTimeout(() => this.typeTick('erasing'), 28);
      } else {
        this.typedIndex = (this.typedIndex + 1) % this.typedPhrases.length;
        this.typedTimer = setTimeout(() => this.typeTick('typing'), 240);
      }
    }
  }
}
