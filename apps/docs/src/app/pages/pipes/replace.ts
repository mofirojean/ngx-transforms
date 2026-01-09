import {Component} from '@angular/core';
import {ReplacePipe} from '@ngx-transforms';
import {CodePreview} from '../../reusables/code-preview/code-preview';
import {NextPrevNavigation} from '../../reusables/next-prev-navigation/next-prev-navigation';
import {MacosWindow} from '../../reusables/macos-window/macos-window';
import {ReplaceText} from '../../examples/replace-text/replace-text';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';
import {Breadcrumb} from '../../reusables/breadcrumb/breadcrumb';

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
    Breadcrumb
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block"/>

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
            [next]="{ label: 'Gravatar', link: '/docs/pipes/gravatar' }"
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
