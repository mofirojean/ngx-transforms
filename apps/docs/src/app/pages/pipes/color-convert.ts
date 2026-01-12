import { Component } from '@angular/core';
import { ColorConvertPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { ColorStudio } from '../../examples/color-studio/color-studio';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-color-convert-page',
  standalone: true,
  imports: [
    ColorConvertPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    ColorStudio,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2"
      >
        Color Convert Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A versatile pipe that converts colors between HEX, RGB, and RGBA
        formats with support for shorthand notation and alpha channels.
      </p>

      <!-- Supported Formats -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Supported Formats</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-3">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-4 h-4 rounded bg-red-500"></div>
              <code class="text-sm font-mono font-semibold">#RGB</code>
            </div>
            <p class="text-xs text-muted-foreground">
              3-digit shorthand (e.g., #F00)
            </p>
          </div>
          <div class="rounded-md border border-border p-3">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-4 h-4 rounded bg-green-500"></div>
              <code class="text-sm font-mono font-semibold">#RRGGBB</code>
            </div>
            <p class="text-xs text-muted-foreground">
              6-digit standard (e.g., #00FF00)
            </p>
          </div>
          <div class="rounded-md border border-border p-3">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-4 h-4 rounded bg-blue-500/50"></div>
              <code class="text-sm font-mono font-semibold">#RRGGBBAA</code>
            </div>
            <p class="text-xs text-muted-foreground">
              8-digit with alpha (e.g., #0000FF80)
            </p>
          </div>
          <div class="rounded-md border border-border p-3">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-4 h-4 rounded bg-purple-500"></div>
              <code class="text-sm font-mono font-semibold">rgb() / rgba()</code>
            </div>
            <p class="text-xs text-muted-foreground">
              Functional notation with flexible whitespace
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Color Studio">
        <app-color-studio />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Conversion Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <!-- HEX to RGB -->
              <div>
                <div class="text-xs text-muted-foreground mb-2">HEX to RGB</div>
                <div class="flex items-center gap-4">
                  <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded"
                    >#FF5733</code
                  >
                  <div class="h-px flex-1 bg-border"></div>
                  <code class="font-bold text-primary font-mono">{{
                    '#FF5733' | colorConvert : 'rgb'
                  }}</code>
                </div>
              </div>

              <!-- Short HEX to RGB -->
              <div>
                <div class="text-xs text-muted-foreground mb-2">
                  Short HEX to RGB
                </div>
                <div class="flex items-center gap-4">
                  <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded"
                    >#F00</code
                  >
                  <div class="h-px flex-1 bg-border"></div>
                  <code class="font-bold text-primary font-mono">{{
                    '#F00' | colorConvert : 'rgb'
                  }}</code>
                </div>
              </div>

              <!-- RGB to HEX -->
              <div>
                <div class="text-xs text-muted-foreground mb-2">RGB to HEX</div>
                <div class="flex items-center gap-4">
                  <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded"
                    >rgb(100, 150, 200)</code
                  >
                  <div class="h-px flex-1 bg-border"></div>
                  <code class="font-bold text-primary font-mono">{{
                    'rgb(100, 150, 200)' | colorConvert : 'hex'
                  }}</code>
                </div>
              </div>

              <!-- HEX with Alpha to RGBA -->
              <div>
                <div class="text-xs text-muted-foreground mb-2">
                  HEX with Alpha to RGBA
                </div>
                <div class="flex items-center gap-4">
                  <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded"
                    >#FF000080</code
                  >
                  <div class="h-px flex-1 bg-border"></div>
                  <code class="font-bold text-primary font-mono">{{
                    '#FF000080' | colorConvert : 'rgba'
                  }}</code>
                </div>
              </div>

              <!-- RGBA to HEX -->
              <div>
                <div class="text-xs text-muted-foreground mb-2">
                  RGBA to HEX (with alpha)
                </div>
                <div class="flex items-center gap-4">
                  <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded"
                    >rgba(0, 128, 255, 0.5)</code
                  >
                  <div class="h-px flex-1 bg-border"></div>
                  <code class="font-bold text-primary font-mono">{{
                    'rgba(0, 128, 255, 0.5)' | colorConvert : 'hex'
                  }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold"
            >1</span
          >
          <div>
            <h4 class="font-semibold">Multiple Input Formats</h4>
            <p class="text-sm text-muted-foreground">
              Accepts 3-digit, 6-digit, and 8-digit HEX, plus RGB and RGBA
              functional notation.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold"
            >2</span
          >
          <div>
            <h4 class="font-semibold">Alpha Channel Support</h4>
            <p class="text-sm text-muted-foreground">
              Full support for transparency with automatic alpha preservation
              when converting between formats.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold"
            >3</span
          >
          <div>
            <h4 class="font-semibold">Input Validation</h4>
            <p class="text-sm text-muted-foreground">
              Validates RGB values (0-255) and alpha values (0-1). Invalid
              inputs return the original value unchanged.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold"
            >4</span
          >
          <div>
            <h4 class="font-semibold">Flexible Whitespace</h4>
            <p class="text-sm text-muted-foreground">
              Handles various whitespace patterns in RGB/RGBA notation:
              <code class="text-xs">rgb(255,0,0)</code>,
              <code class="text-xs">rgb( 255 , 0 , 0 )</code>, etc.
            </p>
          </div>
        </div>
      </div>

      <div
        class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground"
      >
        <app-author-credit
          author="Mofiro Jean"
          url="https://github.com/mofirojean"
        />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{
              label: 'Text Transform',
              link: '/docs/pipes/text-transform'
            }"
          />
        </div>
      </div>
    </div>
  `,
})
export class ColorConvert {
  code = `
import { Component } from '@angular/core';
import { ColorConvertPipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ColorConvertPipe],
  template: \`
    <!-- Basic HEX to RGB -->
    <p>{{ '#FF5733' | colorConvert:'rgb' }}</p>
    <!-- Output: rgb(255, 87, 51) -->

    <!-- Short HEX support -->
    <p>{{ '#F00' | colorConvert:'rgb' }}</p>
    <!-- Output: rgb(255, 0, 0) -->

    <!-- RGB to HEX -->
    <p>{{ 'rgb(100, 150, 200)' | colorConvert:'hex' }}</p>
    <!-- Output: #6496C8 -->

    <!-- Alpha channel support -->
    <p>{{ '#FF000080' | colorConvert:'rgba' }}</p>
    <!-- Output: rgba(255, 0, 0, 0.5) -->

    <p>{{ 'rgba(0, 128, 255, 0.5)' | colorConvert:'hex' }}</p>
    <!-- Output: #0080FF80 -->
  \`
})
export class ExampleComponent {}
  `;
}
