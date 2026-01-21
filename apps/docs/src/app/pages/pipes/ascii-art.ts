import { Component } from '@angular/core';
import { AsciiArtPipe, CharsetPreset } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AsciiArtStudio } from '../../examples/ascii-art-studio/ascii-art-studio';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-ascii-art-page',
  standalone: true,
  imports: [
    AsciiArtPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AsciiArtStudio,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        ASCII Art Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Transform text into stunning ASCII art banners with customizable character sets, fonts, and styles.
        Powered by the high-performance ts-ascii-engine library.
      </p>

      <!-- Features Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-sm font-bold">⚡</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">High Performance</h4>
                <p class="text-sm text-muted-foreground">Optimized with typed arrays and minimal garbage collection for fast rendering</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 text-sm font-bold">🎨</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Multiple Charsets</h4>
                <p class="text-sm text-muted-foreground">Choose from Standard, Block, Minimal, Extended, or create custom character sets</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 text-sm font-bold">🔒</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Security First</h4>
                <p class="text-sm text-muted-foreground">Built-in input validation, length limits, and XSS protection</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 text-sm font-bold">⚙️</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Highly Customizable</h4>
                <p class="text-sm text-muted-foreground">Control width, font size, weight, style, inversion, and aspect ratio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Studio</h2>
      <app-macos-window title="ASCII Art Studio">
        <app-ascii-art-studio />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="basicCode" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Basic Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-6">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Default (Standard charset)</div>
                <div class="font-mono text-xs overflow-x-auto" [innerHTML]="'HELLO' | asciiArt"></div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Block charset</div>
                <div class="font-mono text-xs overflow-x-auto" [innerHTML]="'CODE' | asciiArt:{ charset: charsetPreset.BLOCK, width: 60 }"></div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Minimal charset</div>
                <div class="font-mono text-xs overflow-x-auto" [innerHTML]="'OK' | asciiArt:{ charset: charsetPreset.MINIMAL, width: 40 }"></div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Advanced Usage</h2>

      <div class="space-y-4">
        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-xs">1</span>
            Custom Font Styling
          </h3>
          <app-code-preview [code]="customFontCode" [language]="'typescript'">
            <div class="p-6 bg-muted/30 rounded-lg">
              <h4 class="font-medium text-sm mb-4">Preview:</h4>
              <div class="font-mono text-xs overflow-x-auto" [innerHTML]="'BOLD' | asciiArt:{
                charset: charsetPreset.STANDARD,
                textOptions: { fontSize: 60, fontWeight: 'bold' }
              }"></div>
            </div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 text-xs">2</span>
            Inverted Colors
          </h3>
          <app-code-preview [code]="invertedCode" [language]="'typescript'">
            <div class="p-6 bg-muted/30 rounded-lg">
              <h4 class="font-medium text-sm mb-4">Preview:</h4>
              <div class="font-mono text-xs overflow-x-auto bg-black p-4 rounded" [innerHTML]="'DARK' | asciiArt:{
                charset: charsetPreset.BLOCK,
                inverted: true,
                width: 50
              }"></div>
            </div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-600 text-xs">3</span>
            Custom Width Control
          </h3>
          <app-code-preview [code]="widthCode" [language]="'typescript'">
            <div class="p-6 bg-muted/30 rounded-lg">
              <h4 class="font-medium text-sm mb-4">Preview:</h4>
              <div class="space-y-4">
                <div>
                  <div class="text-xs text-muted-foreground mb-2">Narrow (40 chars)</div>
                  <div class="font-mono text-xs overflow-x-auto" [innerHTML]="'SLIM' | asciiArt:{ width: 40 }"></div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground mb-2">Wide (100 chars)</div>
                  <div class="font-mono text-xs overflow-x-auto" [innerHTML]="'WIDE' | asciiArt:{ width: 100 }"></div>
                </div>
              </div>
            </div>
          </app-code-preview>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Character Sets</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">CharsetPreset.STANDARD</h4>
            <p class="text-xs text-muted-foreground">Classic ASCII characters</p>
            <code class="text-xs bg-muted px-2 py-1 rounded">&#64;%#*+=-:.</code>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">CharsetPreset.BLOCK</h4>
            <p class="text-xs text-muted-foreground">Solid block characters</p>
            <code class="text-xs bg-muted px-2 py-1 rounded">██▓▒░</code>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">CharsetPreset.MINIMAL</h4>
            <p class="text-xs text-muted-foreground">Simple, clean look</p>
            <code class="text-xs bg-muted px-2 py-1 rounded">&#64;+.</code>
          </div>
          <div class="space-y-2">
            <h4 class="font-semibold text-sm">CharsetPreset.EXTENDED</h4>
            <p class="text-xs text-muted-foreground">Full 70+ character set</p>
            <code class="text-xs bg-muted px-2 py-1 rounded">$&#64;B%8&WM#...</code>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Configuration Options</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-border">
          <thead class="bg-muted">
            <tr>
              <th class="border border-border px-4 py-2 text-left text-sm font-semibold">Option</th>
              <th class="border border-border px-4 py-2 text-left text-sm font-semibold">Type</th>
              <th class="border border-border px-4 py-2 text-left text-sm font-semibold">Default</th>
              <th class="border border-border px-4 py-2 text-left text-sm font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr>
              <td class="border border-border px-4 py-2"><code>charset</code></td>
              <td class="border border-border px-4 py-2"><code>CharsetPreset | string</code></td>
              <td class="border border-border px-4 py-2"><code>STANDARD</code></td>
              <td class="border border-border px-4 py-2">Character set for rendering</td>
            </tr>
            <tr>
              <td class="border border-border px-4 py-2"><code>width</code></td>
              <td class="border border-border px-4 py-2"><code>number</code></td>
              <td class="border border-border px-4 py-2"><code>80</code></td>
              <td class="border border-border px-4 py-2">Target width in characters</td>
            </tr>
            <tr>
              <td class="border border-border px-4 py-2"><code>inverted</code></td>
              <td class="border border-border px-4 py-2"><code>boolean</code></td>
              <td class="border border-border px-4 py-2"><code>false</code></td>
              <td class="border border-border px-4 py-2">Invert brightness mapping</td>
            </tr>
            <tr>
              <td class="border border-border px-4 py-2"><code>format</code></td>
              <td class="border border-border px-4 py-2"><code>'html' | 'text'</code></td>
              <td class="border border-border px-4 py-2"><code>'html'</code></td>
              <td class="border border-border px-4 py-2">Output format</td>
            </tr>
            <tr>
              <td class="border border-border px-4 py-2"><code>textOptions</code></td>
              <td class="border border-border px-4 py-2"><code>TextToAsciiOptions</code></td>
              <td class="border border-border px-4 py-2"><code>&#123;&#125;</code></td>
              <td class="border border-border px-4 py-2">Font rendering options</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Performance & Security</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Input Length Validation</h4>
            <p class="text-sm text-muted-foreground">Automatic truncation to 100 characters to prevent DoS attacks</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">XSS Protection</h4>
            <p class="text-sm text-muted-foreground">HTML escaping for text format and secure HTML generation</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Optimized Performance</h4>
            <p class="text-sm text-muted-foreground">Reuses generator instances and leverages typed arrays for minimal memory allocation</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Error Handling</h4>
            <p class="text-sm text-muted-foreground">Graceful degradation with error messages instead of crashes</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Reverse', link: '/docs/pipes/reverse' }"
            [next]="{ label: 'Barcode', link: '/docs/pipes/barcode' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class AsciiArtPage {
  charsetPreset = CharsetPreset;

  basicCode = `
import { Component } from '@angular/core';
import { AsciiArtPipe, CharsetPreset } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [AsciiArtPipe],
  template: \`
    <!-- Basic usage -->
    <div [innerHTML]="'HELLO' | asciiArt"></div>

    <!-- Block charset -->
    <div [innerHTML]="'CODE' | asciiArt:{ charset: CharsetPreset.BLOCK }"></div>

    <!-- Minimal charset with custom width -->
    <div [innerHTML]="'OK' | asciiArt:{ charset: CharsetPreset.MINIMAL, width: 40 }"></div>
  \`
})
export class ExampleComponent {
  CharsetPreset = CharsetPreset;
}
  `;

  customFontCode = `
// Bold text with larger font size
<div [innerHTML]="'BOLD' | asciiArt:{
  charset: CharsetPreset.STANDARD,
  textOptions: {
    fontSize: 60,
    fontWeight: 'bold'
  }
}"></div>

// Custom font family
<div [innerHTML]="'FANCY' | asciiArt:{
  textOptions: {
    font: 'Arial',
    fontSize: 72,
    fontWeight: 'bold'
  }
}"></div>
  `;

  invertedCode = `
// Inverted for dark backgrounds
<div class="bg-black p-4">
  <div [innerHTML]="'DARK' | asciiArt:{
    charset: CharsetPreset.BLOCK,
    inverted: true,
    width: 50
  }"></div>
</div>
  `;

  widthCode = `
// Narrow banner
<div [innerHTML]="'SLIM' | asciiArt:{ width: 40 }"></div>

// Wide banner
<div [innerHTML]="'WIDE' | asciiArt:{ width: 100 }"></div>

// Auto width (responsive)
<div [innerHTML]="'AUTO' | asciiArt:{ width: 0 }"></div>
  `;
}
