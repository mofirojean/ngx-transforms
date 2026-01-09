import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
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
  lucideCopy,
  lucideMenu
} from '@ng-icons/lucide';
import {Theme} from './reusables/theme/theme';
import {GithubStars} from './reusables/github/github-stars';
import { SidebarService } from './reusables/services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIconComponent, Theme, GithubStars, HlmButton],
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
      lucideCopy,
      lucideMenu
    })
  ],
  templateUrl: './app.html',
  styles: ``,
})
export class App {
  private sidebarService = inject(SidebarService);

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
