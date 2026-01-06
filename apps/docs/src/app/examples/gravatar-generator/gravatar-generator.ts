
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GravatarPipe } from '@ngx-transforms';
import { SafeHtml } from '@angular/platform-browser';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideImage } from '@ng-icons/lucide';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import { HlmLabelImports } from '@spartan-ng/helm/label';


@Component({
  selector: 'app-gravatar-generator',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputImports,
    HlmButtonImports,
    NgIconComponent,
    HlmLabelImports
  ],
  providers: [provideIcons({ lucideImage })],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4">
      <!-- Left Column: Controls -->
      <div class="flex flex-col gap-4 mx-0 md:mx-5">
        <div>
          <h3 class="text-xl font-semibold">Gravatar Generator</h3>
          <p class="text-muted-foreground text-sm mt-1">
            Enter an email address to generate its associated Gravatar image.
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <label hlmLabel for="email-input">Email Address</label>
          <input
            hlmInput
            id="email-input"
            type="email"
            class="w-full"
            [(ngModel)]="email"
            placeholder="e.g., contact@example.com"
          />
        </div>
        <button hlmBtn (click)="generateGravatar()">Generate</button>
        <p class="text-xs text-center text-muted-foreground mt-2">
          Avatars are generated based on the public
          <a href="https://gravatar.com/" class="font-bold text-primary cursor-pointer hover:underline" target="_blank" rel="noopener noreferrer">Gravatar</a>
          service.
        </p>
      </div>

      <!-- Right Column: Image Display -->
      <div class="flex items-center justify-center rounded-md border border-border aspect-square w-full max-w-62.5 mx-auto">
        @if (gravatarUrl()) {
          <img [src]="gravatarUrl()" alt="Generated Gravatar" class="rounded-md h-full w-full" />
        } @else {
          <div class="flex flex-col items-center justify-center text-muted-foreground">
            <ng-icon name="lucideImage" class="h-16 w-16" />
            <span class="mt-2 text-sm">Gravatar will appear here</span>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GravatarGenerator {
  email = '';
  gravatarUrl = signal<string | SafeHtml>('');

  private readonly gravatarPipe = new GravatarPipe();

  generateGravatar(): void {
    if (this.email) {
      this.gravatarUrl.set(this.gravatarPipe.transform(this.email));
    }
  }
}
