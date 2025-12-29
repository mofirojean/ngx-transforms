import {Component, inject, OnInit, signal} from '@angular/core';
import {HlmButton} from '@spartan-ng/helm/button';
import {NgIcon, provideIcons} from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import {
  lucideGithub,
  lucideStar
} from '@ng-icons/lucide';
import {GithubService} from './service';

@Component({
  selector: 'app-github-stars',
  imports: [
    HlmButton,
    NgIcon
  ],
  template: `
    <a
      href="https://github.com/mofirojean/ngx-transforms"
      target="_blank"
      rel="noopener noreferrer"
      hlmBtn
      variant="ghost"
      class="text-muted-foreground hover:text-foreground gap-2 px-2"
    >
      <ng-icon name="lucideGithub" class="h-5 w-5"></ng-icon>
      @if (stars() !== null) {
        <span class="flex items-center justify-center text-sm font-medium">
          {{ stars() }}
              </span>
      }
      <span class="sr-only">GitHub</span>
    </a>
  `,
  styles: ``,
  providers: [
    provideIcons({
      lucideGithub,
      lucideStar
    })
  ]
})
export class GithubStars implements OnInit {
  private http = inject(HttpClient);
  protected stars = signal<number | null>(null);
  private githubService = inject(GithubService)

  ngOnInit() {
    this.githubService.getGithubStars().subscribe(data => {
      if (data.stargazers_count > 0) {
        this.stars.set(data.stargazers_count);
      }
    });
  }
}
