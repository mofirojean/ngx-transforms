import { Component } from '@angular/core';
import { QrCodePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import {AsyncPipe} from '@angular/common';
import {QrcodeGenerator} from '../../examples/qrcode-generator';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';

@Component({
  selector: 'app-qrcode-pipe-page',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    QrcodeGenerator,
    QrCodePipe,
    AsyncPipe,
    AuthorCredit
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <nav class="flex items-center text-sm text-muted-foreground mb-6">
        <a href="/docs/pipes" class="hover:text-foreground transition-colors">Pipes</a>
        <span class="h-4 w-4 mx-2">/</span>
        <span class="text-foreground font-medium">QR Code</span>
      </nav>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        QR Code Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to generate a QR code from a string.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="QR Code Generator">
        <div class="p-4 sm:p-6 flex justify-center">
          <app-qrcode-example />
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border">
          <div class="flex items-center gap-4">
            <div class="text-sm font-mono text-muted-foreground">
              {{ '{' }}{{ '{' }} 'https://example.com' | qrCode | async {{ '}' }}{{ '}' }}
            </div>
            <div class="h-px flex-1 bg-border"></div>
            <img
              class="rounded-md w-32 h-32"
              [src]="'https://example.com' | qrCode | async"
              alt="QR Code"
            />
          </div>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Pipes', link: '/docs/pipes' }"
            [next]="{ label: 'Replace', link: '/docs/pipes/replace' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class QrCode {
  code = `
import { Component } from '@angular/core';
import { QrCodePipe } from '@ngx-transforms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [QrCodePipe, AsyncPipe],
  template: \`
    <img [src]="'https://example.com' | qrCode | async" alt="QR Code">
  \`
})
export class ExampleComponent {}
  `;
}
