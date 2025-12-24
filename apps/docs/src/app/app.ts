import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucidePipette,
  lucideGithub,
  lucideMoon,
  lucideSun,
  lucideMonitor,
  lucideArrowRight,
  lucideZap,
  lucideShieldCheck,
  lucideBox,
  lucideCopy
} from '@ng-icons/lucide';
import { ThemeService } from './service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HlmButtonImports, NgIconComponent],
  providers: [
    provideIcons({
      lucidePipette,
      lucideGithub,
      lucideMoon,
      lucideSun,
      lucideMonitor,
      lucideArrowRight,
      lucideZap,
      lucideShieldCheck,
      lucideBox,
      lucideCopy
    })
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'docs';
  private themeService = inject(ThemeService);
  protected theme = this.themeService.theme;

  toggleTheme() {
    const current = this.theme();
    if (current === 'light') this.themeService.setTheme('dark');
    else if (current === 'dark') this.themeService.setTheme('system');
    else this.themeService.setTheme('light');
  }
}
