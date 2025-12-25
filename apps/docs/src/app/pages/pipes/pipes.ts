import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HlmButton} from '@spartan-ng/helm/button';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideMenu, lucideX} from '@ng-icons/lucide';

@Component({
  selector: 'app-pipes-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, HlmButton, NgIconComponent],
  providers: [provideIcons({lucideMenu, lucideX})],
  template: `
    <div class="container mx-auto flex flex-col md:flex-row relative">

      <!-- Mobile Menu Button -->
      <div
        class="md:hidden py-4 px-4 border-b border-border/40 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
        <span class="font-semibold">Menu</span>
        <button hlmBtn variant="ghost" size="icon" (click)="isSidebarOpen.set(true)">
          <ng-icon name="lucideMenu" class="h-5 w-5"></ng-icon>
        </button>
      </div>

      <!-- Sidebar -->
      <aside
        [class.translate-x-0]="isSidebarOpen()"
        [class.-translate-x-full]="!isSidebarOpen()"
        class="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border/40 transition-transform duration-300 md:translate-x-0 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto"
      >
        <div class="flex justify-end p-4 md:hidden">
          <button hlmBtn variant="ghost" size="icon" (click)="isSidebarOpen.set(false)">
            <ng-icon name="lucideX" class="h-5 w-5"></ng-icon>
          </button>
        </div>

        <div class="py-6 px-4 md:px-6 md:py-8">
          <h4 class="mb-4 text-sm font-semibold leading-none tracking-tight">Getting Started</h4>
          <div class="grid grid-flow-row auto-rows-max text-sm mb-8">
            <a
              routerLink="/docs/introduction"
              routerLinkActive="font-medium text-primary bg-primary/10"
              (click)="isSidebarOpen.set(false)"
              class="group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              Introduction
            </a>
          </div>

          <h4 routerLink="/docs/pipes" class="mb-4 text-sm font-semibold cursor-pointer leading-none tracking-tight">Pipes</h4>
          <div class="grid grid-flow-row auto-rows-max text-sm">
            <a
              routerLink="/docs/pipes/count"
              routerLinkActive="font-medium text-primary bg-primary/10"
              (click)="isSidebarOpen.set(false)"
              class="group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              Count
            </a>
            <!-- Add more pipes here -->
          </div>
        </div>
      </aside>

      <!-- Overlay -->
      @if (isSidebarOpen()) {
        <div class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
             (click)="isSidebarOpen.set(false)"></div>
      }

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class PipesPageComponent {
  isSidebarOpen = signal(false);
}
