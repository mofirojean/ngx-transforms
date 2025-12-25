import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideArrowRight} from '@ng-icons/lucide';

@Component({
  selector: 'app-pipes-list-page',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  providers: [provideIcons({lucideArrowRight})],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Pipes</h1>
      <p class="leading-7 [&:not(:first-child)]:mt-6 text-lg text-muted-foreground">
        Explore the collection of pipes available in NgxTransforms. Select a pipe from the sidebar to view its
        documentation.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <a routerLink="/docs/pipes/count"
           class="group relative rounded-lg border border-border p-6 hover:border-foreground/50 transition-colors">
          <h3 class="font-semibold leading-none tracking-tight mb-2 group-hover:underline">Count</h3>
          <p class="text-sm text-muted-foreground">Returns the length of an array or string.</p>
          <ng-icon name="lucideArrowRight"
                   class="absolute bottom-6 right-6 h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"></ng-icon>
        </a>
        <!-- Add more pipe cards here as they are implemented -->
      </div>
    </div>
  `
})
export class PipesList {
}
