import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';

export interface NavLink {
  label: string;
  link: string;
}

@Component({
  selector: 'app-next-prev-navigation',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  providers: [provideIcons({ lucideArrowLeft, lucideArrowRight })],
  templateUrl: './next-prev-navigation.html',
})
export class NextPrevNavigation {
  readonly next = input<NavLink>();
  readonly previous = input<NavLink>();
}
