import {Component} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {ReversePipe} from '@ngx-transforms';
import {CodePreview} from '../../reusables/code-preview/code-preview';
import {NextPrevNavigation} from '../../reusables/next-prev-navigation/next-prev-navigation';
import {MacosWindow} from '../../reusables/macos-window/macos-window';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';
import {ReverseText} from '../../examples/reverse-text/reverse-text';
import {ReverseArray} from '../../examples/reverse-array/reverse-array';
import {Breadcrumb} from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-reverse',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    ReversePipe,
    JsonPipe,
    AuthorCredit,
    ReverseText,
    ReverseArray,
    Breadcrumb
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block"/>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Reverse Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to reverse the characters in a string or the elements in an array.
      </p>

      <h2 class="text-2xl font-bold my-8">Array Example</h2>
      <app-macos-window title="Reverse Array Playground">
        <app-reverse-array />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage (Array)</h2>
      <app-code-preview [code]="arrayUsageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border space-y-3">
          <div>
            <div class="text-xs text-muted-foreground mb-1">Numbers reversed</div>
            <p class="text-sm font-mono">{{ sampleNumbers | reverse | json }}</p>
          </div>
          <div>
            <div class="text-xs text-muted-foreground mb-1">Fruits reversed</div>
            <p class="text-sm font-mono">{{ sampleFruits | reverse | json }}</p>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">String Example</h2>
      <app-macos-window title="Reverse Text">
        <div class="p-4">
          <app-reverse-text/>
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage (String)</h2>
      <app-code-preview [code]="stringUsageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border">
          <p class="text-lg text-center">{{ 'Hello World' | reverse }}</p>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="John Doe" url="https://github.com/johndoe"/>
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Replace', link: '/docs/pipes/replace' }"
            [next]="{ label: 'Text to Speech', link: '/docs/pipes/text-to-speech' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class Reverse {
  sampleNumbers = [1, 2, 3, 4, 5];
  sampleFruits = ['apple', 'banana', 'cherry'];

  stringUsageCode = `
import { Component } from '@angular/core';
import { ReversePipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ReversePipe],
  template: \`
    <p>{{ 'Hello World' | reverse }}</p>
  \`
})
export class ExampleComponent {}
  `;

  arrayUsageCode = `
import { Component } from '@angular/core';
import { ReversePipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ReversePipe],
  template: \`
    <!-- Array of numbers -->
    <p>{{ numbers | reverse }}</p>
    <!-- [5, 4, 3, 2, 1] -->

    <!-- Array of strings -->
    <p>{{ fruits | reverse }}</p>
    <!-- ['cherry', 'banana', 'apple'] -->
  \`
})
export class ExampleComponent {
  numbers = [1, 2, 3, 4, 5];
  fruits = ['apple', 'banana', 'cherry'];
}
  `;
}
