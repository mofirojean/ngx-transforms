import { Component } from '@angular/core';
import { InitialsPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { ProfileInitialsGenerator } from '../../examples/profile-initials-generator/profile-initials-generator';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import {Breadcrumb} from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-initials-pipe-page',
  standalone: true,
  imports: [
    InitialsPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    ProfileInitialsGenerator,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2"
      >
        Initials Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A pipe that transforms a full name into initials.
      </p>

      <h2 class="text-2xl font-bold my-8">Example</h2>
      <app-macos-window title="Profile Initials Generator">
        <app-profile-initials-generator />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Generate Initials</h3>
            <div class="rounded-md bg-muted p-6 border border-border">
              <div class="mb-4">
                <code
                  class="text-sm font-mono bg-background/50 px-2 py-1 rounded"
                  >fullName = 'John Doe'</code
                >
              </div>
              <div class="flex items-center gap-4">
                <div class="text-sm font-mono text-muted-foreground">
                  {{ '{' }}{{ '{' }} fullName | initials {{ '}' }}{{ '}' }}
                </div>
                <div class="h-px flex-1 bg-border"></div>
                <div class="font-bold text-primary">
                  {{ fullName | initials }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <div
        class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground"
      >
        <app-author-credit
          author="Mofiro Jean"
          url="https://github.com/mofirojean"
        />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Morse Code', link: '/docs/pipes/morse-code' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class Initials {
  fullName = 'John Doe';

  code = `
import { Component } from '@angular/core';
import { InitialsPipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [InitialsPipe],
  template: \
    <p>Initials: {{ fullName | initials }}</p>
  \
})
export class ExampleComponent {
  fullName = 'John Doe';
}
  `;
}
