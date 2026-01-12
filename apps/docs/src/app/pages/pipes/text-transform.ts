import { Component } from '@angular/core';
import {
  CamelCasePipe,
  KebabCasePipe,
  SnakeCasePipe,
  TitleCasePipe,
} from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { VariableNameConverter } from '../../examples/variable-name-converter/variable-name-converter';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-text-transform-page',
  standalone: true,
  imports: [
    CamelCasePipe,
    KebabCasePipe,
    SnakeCasePipe,
    TitleCasePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    VariableNameConverter,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2"
      >
        Text Transform Pipes
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A collection of pipes that transform text into different naming
        conventions used across programming languages and frameworks.
      </p>

      <!-- Available Pipes Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Available Pipes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-3">
            <code
              class="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded"
              >camelCase</code
            >
            <p class="text-sm text-muted-foreground mt-1">
              Converts to camelCase (JavaScript/TypeScript)
            </p>
          </div>
          <div class="rounded-md border border-border p-3">
            <code
              class="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded"
              >snakeCase</code
            >
            <p class="text-sm text-muted-foreground mt-1">
              Converts to snake_case (Python/Ruby)
            </p>
          </div>
          <div class="rounded-md border border-border p-3">
            <code
              class="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded"
              >kebabCase</code
            >
            <p class="text-sm text-muted-foreground mt-1">
              Converts to kebab-case (CSS/URLs)
            </p>
          </div>
          <div class="rounded-md border border-border p-3">
            <code
              class="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded"
              >titleCase</code
            >
            <p class="text-sm text-muted-foreground mt-1">
              Converts to Title Case (UI/Headings)
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Variable Name Converter">
        <app-variable-name-converter />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Transform Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div class="mb-4">
                <code
                  class="text-sm font-mono bg-background/50 px-2 py-1 rounded"
                  >text = 'hello world example'</code
                >
              </div>

              <!-- camelCase -->
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground min-w-50">
                  {{ '{' }}{{ '{' }} text | camelCase {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary font-mono">
                  {{ sampleText | camelCase }}
                </div>
              </div>

              <!-- snakeCase -->
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground min-w-50">
                  {{ '{' }}{{ '{' }} text | snakeCase {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary font-mono">
                  {{ sampleText | snakeCase }}
                </div>
              </div>

              <!-- kebabCase -->
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground min-w-50">
                  {{ '{' }}{{ '{' }} text | kebabCase {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary font-mono">
                  {{ sampleText | kebabCase }}
                </div>
              </div>

              <!-- titleCase -->
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground min-w-50">
                  {{ '{' }}{{ '{' }} text | titleCase {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary font-mono">
                  {{ sampleText | titleCase }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <!-- Use Cases Section -->
      <h2 class="text-2xl font-bold my-8">Common Use Cases</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold"
            >1</span
          >
          <div>
            <h4 class="font-semibold">API Response Normalization</h4>
            <p class="text-sm text-muted-foreground">
              Convert snake_case API responses to camelCase for JavaScript
              consumption.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold"
            >2</span
          >
          <div>
            <h4 class="font-semibold">CSS Class Generation</h4>
            <p class="text-sm text-muted-foreground">
              Generate kebab-case CSS class names from component properties.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold"
            >3</span
          >
          <div>
            <h4 class="font-semibold">URL Slug Creation</h4>
            <p class="text-sm text-muted-foreground">
              Transform titles into URL-friendly kebab-case slugs.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold"
            >4</span
          >
          <div>
            <h4 class="font-semibold">Display Formatting</h4>
            <p class="text-sm text-muted-foreground">
              Convert technical identifiers to readable Title Case for UI
              display.
            </p>
          </div>
        </div>
      </div>

      <div
        class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground"
      >
        <app-author-credit
          author="Mofiro Jean"
          url="https://github.com/mofirojean"
        />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Initials', link: '/docs/pipes/initials' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class TextTransform {
  sampleText = 'hello world example';

  code = `
import { Component } from '@angular/core';
import {
  CamelCasePipe,
  KebabCasePipe,
  SnakeCasePipe,
  TitleCasePipe
} from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CamelCasePipe,
    KebabCasePipe,
    SnakeCasePipe,
    TitleCasePipe
  ],
  template: \`
    <p>camelCase: {{ text | camelCase }}</p>
    <p>snake_case: {{ text | snakeCase }}</p>
    <p>kebab-case: {{ text | kebabCase }}</p>
    <p>Title Case: {{ text | titleCase }}</p>
  \`
})
export class ExampleComponent {
  text = 'hello world example';
}
  `;
}
