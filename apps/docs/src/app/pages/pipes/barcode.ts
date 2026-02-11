import {Component} from '@angular/core';
import {BarcodePipe} from '@ngx-transforms';
import {CodePreview} from '../../reusables/code-preview/code-preview';
import {NextPrevNavigation} from '../../reusables/next-prev-navigation/next-prev-navigation';
import {MacosWindow} from '../../reusables/macos-window/macos-window';
import {BarcodeGenerator} from '../../examples/barcode-generator/barcode-generator';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';
import {AsyncPipe} from '@angular/common';
import {Breadcrumb} from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-barcode-page',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    BarcodeGenerator,
    BarcodePipe,
    AuthorCredit,
    AsyncPipe,
    Breadcrumb
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block"/>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Barcode Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to generate various types of barcodes.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Barcode Generator">
        <div class="p-4 sm:p-6">
          <app-barcode-generator/>
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="usageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border flex justify-center items-center">
          <div [innerHTML]="'ngx-transforms' | barcode | async"></div>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean"/>
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'QR Code', link: '/docs/pipes/qrcode' }"
            [next]="{ label: 'Replace', link: '/docs/pipes/replace' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class Barcode {
  usageCode = `
import { Component } from '@angular/core';
import { BarcodePipe } from 'ngx-transforms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [BarcodePipe, AsyncPipe],
  template: \`
    <div [innerHTML]="'ngx-transforms' | barcode | async"></div>
  \`
})
export class ExampleComponent {}
  `;
}
