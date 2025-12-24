import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import {Theme} from './reusables/theme/theme';
import {GithubStars} from './reusables/github/github-stars';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIconComponent, Theme, GithubStars],
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
    })
  ],
  templateUrl: './app.html',
  styles: ``,
})
export class App {
}
