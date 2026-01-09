import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HlmButton} from '@spartan-ng/helm/button';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideMenu, lucideX, lucidePipette} from '@ng-icons/lucide';
import {PIPES} from '../model';
import {SidebarService} from '../../reusables/services/sidebar.service';
import {HlmIcon} from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-pipes-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, HlmButton, NgIcon, HlmIcon],
  providers: [provideIcons({lucideMenu, lucideX, lucidePipette})],
  template: `
    <div class="container mx-auto flex flex-col md:flex-row relative">

      <!-- Sidebar -->
      <aside
        [class.translate-x-0]="isSidebarOpen()"
        [class.-translate-x-full]=  "!isSidebarOpen()"
        class="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border/40 transition-transform duration-300 md:translate-x-0 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto"
      >
        <!-- Header -->
        <div class="flex justify-between items-center p-4 md:hidden">
          <a href="/" class="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div class="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ng-icon hlm name="lucidePipette" size="sm"></ng-icon>
            </div>
            <span class="hidden sm:inline-block text-sm">Ngx<span class="text-primary">Transforms</span></span>
          </a>
          <div class="flex justify-end p-4 md:hidden">
            <button hlmBtn variant="ghost" size="icon" (click)="closeSidebar()">
              <ng-icon name="lucideX" class="h-5 w-5"></ng-icon>
            </button>
          </div>
        </div>

        <div class="py-6 px-4 md:px-6 md:py-8">
          <h4 class="mb-4 text-sm font-semibold leading-none tracking-tight">Getting Started</h4>
          <div class="grid grid-flow-row auto-rows-max text-sm mb-8">
            <a
              routerLink="/docs/introduction"
              routerLinkActive="font-medium text-primary bg-primary/10"
              (click)="closeSidebar()"
              class="group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              Introduction
            </a>
          </div>

          <h4 routerLink="/docs/pipes" class="mb-4 text-sm font-semibold cursor-pointer leading-none tracking-tight">
            Pipes</h4>
          <div class="grid grid-flow-row auto-rows-max text-sm">
            @for (pipe of pipes; track pipe.name) {
              <a
                [routerLink]="pipe.url"
                routerLinkActive="font-medium text-primary bg-primary/10"
                (click)="closeSidebar()"
                class="group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ pipe.name }}
              </a>
            }
          </div>
        </div>
      </aside>

      <!-- Overlay -->
      @if (isSidebarOpen()) {
        <div class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
             (click)="closeSidebar()"></div>
      }

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class PipesPage {
  private sidebarService = inject(SidebarService);
  isSidebarOpen = this.sidebarService.isOpen;
  protected pipes = PIPES;

  closeSidebar() {
    this.sidebarService.close();
  }
}
