import {Component} from '@angular/core';
import {CodePreview} from '../../reusables/code-preview/code-preview';
import {NextPrevNavigation} from '../../reusables/next-prev-navigation/next-prev-navigation';
import {MacosWindow} from '../../reusables/macos-window/macos-window';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';
import {GravatarGenerator} from '../../examples/gravatar-generator/gravatar-generator';
import {GravatarPipe} from '@ngx-transforms';
import {Breadcrumb} from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-gravatar',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    GravatarPipe,
    AuthorCredit,
    GravatarGenerator,
    Breadcrumb
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block"/>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Gravatar Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to generate a Gravatar URL from an email address.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Gravatar Generator">
        <div>
          <app-gravatar-generator/>
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="usageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border flex items-center justify-center">
          <img [src]="'example@example.com' | gravatar" alt="Gravatar" class="rounded-full h-24 w-24"/>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean"/>
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Replace', link: '/docs/pipes/replace' }"
            [next]="{ label: 'Reverse', link: '/docs/pipes/reverse' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class Gravatar {
  usageCode = `
import { Component } from '@angular/core';
import { GravatarPipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GravatarPipe],
  template: \
    <img [src]="'example@example.com' | gravatar" alt="Gravatar" />
  \
})
export class ExampleComponent {}
  `;
}
