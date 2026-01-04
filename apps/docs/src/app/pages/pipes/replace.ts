import {Component} from '@angular/core';
import {ReplacePipe} from '@ngx-transforms';
import {CodePreview} from '../../reusables/code-preview/code-preview';
import {NextPrevNavigation} from '../../reusables/next-prev-navigation/next-prev-navigation';
import {MacosWindow} from '../../reusables/macos-window/macos-window';
import {ReplaceText} from '../../examples/replace-text/replace-text';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';

@Component({
  selector: 'app-replace',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    ReplaceText,
    ReplacePipe,
    AuthorCredit,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <nav class="flex items-center text-sm text-muted-foreground mb-6">
        <a href="/docs/pipes" class="hover:text-foreground transition-colors">Pipes</a>
        <span class="h-4 w-4 mx-2">/</span>
        <span class="text-foreground font-medium">Replace</span>
      </nav>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Replace Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to replace parts of a string.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Text Editor">
        <div>
          <app-replace-text/>
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="usageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border">
          <div>{{ 'Hello World' | replace: 'World':'Angular' }}</div>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean"/>
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Barcode', link: '/docs/pipes/barcode' }"
            [next]="{ label: 'Reverse', link: '/docs/pipes/reverse' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class Replace {
  usageCode = `
import { Component } from '@angular/core';
import { ReplacePipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ReplacePipe],
  template: \`
    <div>{{ 'Hello World' | replace: 'World':'Angular' }}</div>
  \`
})
export class ExampleComponent {}
  `;
}
