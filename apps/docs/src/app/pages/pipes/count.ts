import {Component, signal} from '@angular/core';
import {CountPipe} from '@ngx-transforms';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideChevronRight} from '@ng-icons/lucide';
import {CodePreview} from "../../reusables/code-preview/code-preview";
import {CommandPreview} from "../../reusables/command-preview/command-preview";
import {NextPrevNavigationComponent} from "../../reusables/next-prev-navigation/next-prev-navigation";

@Component({
  selector: 'app-count-pipe-page',
  standalone: true,
  imports: [CountPipe, NgIconComponent, CodePreview, CommandPreview, NextPrevNavigationComponent],
  providers: [provideIcons({lucideChevronRight})],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <!-- Breadcrumb -->
      <nav class="flex items-center text-sm text-muted-foreground mb-6">
        <a href="/docs/pipes" class="hover:text-foreground transition-colors">Pipes</a>
        <ng-icon name="lucideChevronRight" class="h-4 w-4 mx-2"></ng-icon>
        <span class="text-foreground font-medium">Count</span>
      </nav>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">Count Pipe</h1>
      <p class="text-lg text-muted-foreground mb-8">Returns the length of an array or string.</p>

      <h2 class="text-2xl font-bold my-8">Installation</h2>
      <app-command-preview command="npm install @ngx-transforms/core"></app-command-preview>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Array Length</h3>
            <div class="rounded-md bg-muted p-6 border border-border">
              <div class="mb-4">
                <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded">items = [1, 2, 3, 4, 5]</code>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground">{{ '{' }}{{ '{' }} items |
                  count {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary">{{ items | count }}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-4">String Length</h3>
            <div class="rounded-md bg-muted p-6 border border-border">
              <div class="mb-4">
                <code class="text-sm font-mono bg-background/50 px-2 py-1 rounded">text = 'Hello World'</code>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground">{{ '{' }}{{ '{' }} text |
                  count {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary">{{ text | count }}</div>
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
          <app-next-prev-navigation [previous]="{label: 'Pipes', link: '/docs/pipes'}" [next]="{label: 'Debounce', link: '/docs/pipes/debounce'}" />
        </div>
      </div>
    </div>
  `,
})
export class Count {
  items = [1, 2, 3, 4, 5];
  text = 'Hello World';

  code = `
import { Component } from '@angular/core';
import { CountPipe } from '@ngx-transforms/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CountPipe],
  template: \`
    <p>Array Count: {{ items | count }}</p>
    <p>String Count: {{ text | count }}</p>
  \`
})
export class ExampleComponent {
  items = [1, 2, 3, 4, 5];
  text = 'Hello World';
}
  `;
}
