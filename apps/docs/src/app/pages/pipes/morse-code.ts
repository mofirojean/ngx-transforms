import {Component} from '@angular/core';
import {MorseCodePipe} from '@ngx-transforms';
import {CodePreview} from '../../reusables/code-preview/code-preview';
import {NextPrevNavigation} from '../../reusables/next-prev-navigation/next-prev-navigation';
import {MacosWindow} from '../../reusables/macos-window/macos-window';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';
import {MorseCodeGenerator} from '../../examples/morse-code-generator/morse-code-generator';
import {Breadcrumb} from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-morse-code',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    MorseCodePipe,
    AuthorCredit,
    MorseCodeGenerator,
    Breadcrumb
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Morse Code Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to convert a string into Morse code.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Morse Code Generator">
        <app-morse-code-generator />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="usageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border">
          <p class="text-lg text-center font-mono">{{ 'Hello World' | morseCode }}</p>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="John Doe" url="https://github.com/johndoe" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Reverse', link: '/docs/pipes/reverse' }"
            [next]="{ label: 'Snake Case', link: '/docs/pipes/snake-case' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class MorseCode {
  usageCode = `
import { Component } from '@angular/core';
import { MorseCodePipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MorseCodePipe],
  template: \
    <p>{{ 'Hello World' | morseCode }}</p>
  \
})
export class ExampleComponent {}
  `;
}
