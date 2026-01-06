import { Component } from '@angular/core';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { GravatarGenerator } from '../../examples/gravatar-generator/gravatar-generator';
import {GravatarPipe} from '@ngx-transforms';

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
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <nav class="flex items-center text-sm text-muted-foreground mb-6">
        <a href="/docs/pipes" class="hover:text-foreground transition-colors">Pipes</a>
        <span class="h-4 w-4 mx-2">/</span>
        <span class="text-foreground font-medium">Gravatar</span>
      </nav>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Gravatar Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe to generate a Gravatar URL from an email address.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Gravatar Generator">
        <div>
          <app-gravatar-generator />
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="usageCode" language="typescript">
        <div class="rounded-md bg-muted p-6 border border-border flex items-center justify-center">
          <img [src]="'example@example.com' | gravatar" alt="Gravatar" class="rounded-full h-24 w-24" />
        </div>
      </app-code-preview>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="John Doe" url="https://github.com/johndoe" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Highlight', link: '/docs/pipes/highlight' }"
            [next]="{ label: 'HTML Escape', link: '/docs/pipes/html-escape' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class Gravatar {
  usageCode = `
import { Component } from '@angular/core';
import { GravatarPipe } from '@ngx-transforms/ngx-transforms';

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
