import {Component} from '@angular/core';
import {QrCodePipe} from '@ngx-transforms';
import {CodePreview} from "../../reusables/code-preview/code-preview";
import {NextPrevNavigation} from "../../reusables/next-prev-navigation/next-prev-navigation";
import {MacosWindow} from "../../reusables/macos-window/macos-window";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-qrcode-example',
  standalone: true,
  imports: [QrCodePipe, AsyncPipe],
  template: `
    <div class="flex justify-center">
      <img class="rounded-md" [src]="text | qrCode | async" alt="QR Code">
    </div>
  `
})
export class QrCodeExample {
  text = 'https://www.npmjs.com/package/ngx-transforms';
}

@Component({
  selector: 'app-qrcode-pipe-page',
  standalone: true,
  imports: [CodePreview, NextPrevNavigation, MacosWindow, QrCodeExample, QrCodePipe, AsyncPipe],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <!-- Breadcrumb -->
      <nav class="flex items-center text-sm text-muted-foreground mb-6">
        <a href="/docs/pipes" class="hover:text-foreground transition-colors">Pipes</a>
        <span class="h-4 w-4 mx-2">/</span>
        <span class="text-foreground font-medium">QR Code</span>
      </nav>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">QR Code Pipe</h1>
      <p class="text-lg text-muted-foreground mb-8">A pipe to generate a QR code from a string.</p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="QR Code Generator">
        <app-qrcode-example />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Generate QR Code</h3>
            <div class="rounded-md bg-muted p-6 border border-border">
              <div class="mb-4">
                <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded">text = 'https://www.npmjs.com/package/ngx-transforms'</code>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground">{{ '{' }}{{ '{' }} text |
                  qrCode | async {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary">
                    <img class="rounded-md w-32 h-32" [src]="text | qrCode | async" alt="QR Code">
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Built by <a href="https://github.com/mofirojean" target="_blank"
                      class="font-medium underline underline-offset-4 hover:text-foreground">Mofiro Jean</a>
        </div>
        <div class="flex gap-4">
          <app-next-prev-navigation [previous]="{label: 'Pipes', link: '/docs/pipes'}" [next]="{label: 'Replace', link: '/docs/pipes/replace'}" />
        </div>
      </div>
    </div>
  `,
})
export class QrCode {
  text = 'https://www.npmjs.com/package/ngx-transforms';

  code = `
import { Component } } from '@angular/core';
import { QrCodePipe } from '@ngx-transforms';
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [QrCodePipe, AsyncPipe],
  template: \`
    <img [ngSrc]='text | qrCode | async' alt='QR Code'>
  \`
})
export class ExampleComponent {
  text = 'https://www.npmjs.com/package/ngx-transforms';
}
  `;
}
