import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HlmBreadCrumbImports } from '@spartan-ng/helm/breadcrumb';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideHome } from '@ng-icons/lucide';
import { TitleCasePipe } from '@angular/common';

interface BreadcrumbItem {
  label: string;
  url: string;
  isLast: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [HlmBreadCrumbImports, RouterModule, NgIconComponent, TitleCasePipe],
  providers: [provideIcons({ lucideChevronRight, lucideHome })],
  template: `
    <nav hlmBreadcrumb>
      <ol hlmBreadcrumbList>
        <li hlmBreadcrumbItem>
          <a hlmBreadcrumbLink [link]="'/'" class="flex cursor-pointer items-center gap-1">
            <ng-icon name="lucideHome" class="h-4 w-4"></ng-icon>
            <span class="sr-only">Home</span>
          </a>
        </li>

        @for (item of breadcrumbs(); track item.url) {
          <li hlmBreadcrumbSeparator>
            <ng-icon name="lucideChevronRight"></ng-icon>
          </li>
          <li hlmBreadcrumbItem>
            @if (item.isLast) {
              <span hlmBreadcrumbPage>{{ item.label | titlecase }}</span>
            } @else {
              <a class="cursor-pointer" hlmBreadcrumbLink [link]="item.url">{{ item.label | titlecase }}</a>
            }
          </li>
        }
      </ol>
    </nav>
  `
})
export class Breadcrumb implements OnInit {
  private router = inject(Router);
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  ngOnInit() {
    this.generateBreadcrumbs();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.generateBreadcrumbs();
    });
  }

  private generateBreadcrumbs() {
    const url = this.router.url;
    if (url === '/') {
      this.breadcrumbs.set([]);
      return;
    }

    const segments = url.split('/').filter(segment => segment !== '');
    const breadcrumbList: BreadcrumbItem[] = [];
    let currentUrl = '';

    segments.forEach((segment, index) => {
      currentUrl += `/${segment}`;
      breadcrumbList.push({
        label: segment.replace(/-/g, ' '),
        url: currentUrl,
        isLast: index === segments.length - 1
      });
    });

    this.breadcrumbs.set(breadcrumbList);
  }
}
