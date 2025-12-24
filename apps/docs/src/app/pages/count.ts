import {Component, signal} from '@angular/core';
import {CountPipe} from '@ngx-transforms';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideChevronRight} from '@ng-icons/lucide';

@Component({
  selector: 'app-count-pipe-page',
  standalone: true,
  imports: [CountPipe, NgIconComponent],
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

      <!-- Tabs -->
      <div class="w-full">
        <div class="flex items-center border-b border-border w-full mb-6">
          <button
            (click)="activeTab.set('preview')"
            [class.border-primary]="activeTab() === 'preview'"
            [class.text-primary]="activeTab() === 'preview'"
            [class.border-transparent]="activeTab() !== 'preview'"
            [class.text-muted-foreground]="activeTab() !== 'preview'"
            class="px-4 py-2 text-sm font-medium border-b-2 transition-colors hover:text-foreground focus-visible:outline-none"
          >
            Preview
          </button>
          <button
            (click)="activeTab.set('code')"
            [class.border-primary]="activeTab() === 'code'"
            [class.text-primary]="activeTab() === 'code'"
            [class.border-transparent]="activeTab() !== 'code'"
            [class.text-muted-foreground]="activeTab() !== 'code'"
            class="px-4 py-2 text-sm font-medium border-b-2 transition-colors hover:text-foreground focus-visible:outline-none"
          >
            Code
          </button>
        </div>

        @if (activeTab() === 'preview') {
          <div class="space-y-8 animate-in fade-in zoom-in-95 duration-300">
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
        } @else {
          <div
            class="rounded-md bg-muted p-4 overflow-x-auto border border-border animate-in fade-in zoom-in-95 duration-300">
<pre><code class="text-sm font-mono text-foreground">import &#123; Component &#125; from '&#64;angular/core';
import &#123; CountPipe &#125; from '&#64;ngx-transforms/core';

&#64;Component(&#123;
  selector: 'app-example',
  standalone: true,
  imports: [CountPipe],
  template: \`
    &lt;p&gt;Array Count: {{ '{' }}{{ '{' }} items | count {{ '}' }}{{ '}' }}&lt;/p&gt;
    &lt;p&gt;String Count: {{ '{' }}{{ '{' }} text | count {{ '}' }}{{ '}' }}&lt;/p&gt;
  \`
&#125;)
export class ExampleComponent &#123;
  items = [1, 2, 3, 4, 5];
  text = 'Hello World';
&#125;</code></pre>
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Built by <a href="https://github.com/your-github-profile" target="_blank"
                      class="font-medium underline underline-offset-4 hover:text-foreground">Mofiro Jean</a>
        </div>
        <div class="flex gap-4">
          <!-- Placeholder for Next/Prev navigation if needed later -->
        </div>
      </div>
    </div>
  `
})
export class Count {
  items = [1, 2, 3, 4, 5];
  text = 'Hello World';
  activeTab = signal<'preview' | 'code'>('preview');
}
