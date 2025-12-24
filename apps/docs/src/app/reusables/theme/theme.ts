import {Component, inject} from '@angular/core';
import {ThemeService} from './service';
import {HlmButton} from '@spartan-ng/helm/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideMoon,
  lucideSun,
  lucideMonitor,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-theme',
  imports: [HlmButton, NgIconComponent],
  template: `
    <button
      hlmBtn
      variant="ghost"
      size="icon"
      (click)="toggleTheme()"
      class="text-muted-foreground hover:text-foreground"
    >
      @if (theme() === 'dark') {
        <ng-icon name="lucideMoon" class="h-5 w-5 transition-all"></ng-icon>
      } @else if (theme() === 'light') {
        <ng-icon name="lucideSun" class="h-5 w-5 transition-all"></ng-icon>
      } @else {
        <ng-icon name="lucideMonitor" class="h-5 w-5 transition-all"></ng-icon>
      }
      <span class="sr-only">Toggle theme</span>
    </button>
  `,
  styles: ``,
  providers: [
    provideIcons({
      lucideMoon,
      lucideSun,
      lucideMonitor,
    })
  ]
})
export class Theme {
  private themeService = inject(ThemeService);
  protected theme = this.themeService.theme;

  toggleTheme() {
    const current = this.theme();
    if (current === 'light') this.themeService.setTheme('dark');
    else if (current === 'dark') this.themeService.setTheme('system');
    else this.themeService.setTheme('light');
  }
}
