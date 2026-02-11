import {Component} from '@angular/core';
import {JsonPrettyPipe} from '@ngx-transforms';
import {CodePreview} from '../../reusables/code-preview/code-preview';
import {NextPrevNavigation} from '../../reusables/next-prev-navigation/next-prev-navigation';
import {MacosWindow} from '../../reusables/macos-window/macos-window';
import {JsonPrettyEditor} from '../../examples/json-pretty-editor/json-pretty-editor';
import {AuthorCredit} from '../../reusables/author-credit/author-credit';
import {Breadcrumb} from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'ngx-transforms-json-pretty-page',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    JsonPrettyEditor,
    JsonPrettyPipe,
    AuthorCredit,
    Breadcrumb
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block"/>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        JSON Pretty Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to format JSON strings or objects with syntax highlighting.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="JSON Formatter">
        <div class="p-4 sm:p-6">
          <app-json-pretty-editor/>
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="usageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border">
          <div
            class="whitespace-pre-wrap"
            [innerHTML]="exampleJson | jsonPretty"
          ></div>
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean"/>
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Count', link: '/docs/pipes/count' }"
            [next]="{ label: 'QR Code', link: '/docs/pipes/qrcode' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class JsonPretty {
  exampleJson = {
    name: 'John Doe',
    age: 30,
  };

  usageCode = `
import { Component } from '@angular/core';
import { JsonPrettyPipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [JsonPrettyPipe],
  template: \`
    <pre [innerHTML]="jsonData | jsonPretty"></pre>
  \`
})
export class ExampleComponent {
  jsonData = {
    "name": "John Doe",
    "age": 30,
    "isStudent": false,
    "courses": [
      { "title": "History", "credits": 3 },
      { "title": "Math", "credits": 4 }
    ],
    "address": null
  };
}
  `;
}
