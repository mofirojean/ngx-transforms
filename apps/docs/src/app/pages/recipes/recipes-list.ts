import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideBookOpen } from '@ng-icons/lucide';
import { RECIPES, isNewRecipe } from '../model';

@Component({
  selector: 'app-recipes-list-page',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  providers: [provideIcons({ lucideArrowRight, lucideBookOpen })],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <div class="flex items-center gap-3 mb-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ng-icon name="lucideBookOpen" class="h-5 w-5"></ng-icon>
        </div>
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Recipes</h1>
      </div>
      <p class="leading-7 text-lg text-muted-foreground">
        Real-world patterns that compose multiple pipes simple copy-paste solutions
        for the problems you actually hit while building.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        @for (recipe of recipes; track recipe.name) {
          <a
            [routerLink]="recipe.url"
            class="group relative rounded-lg border border-border p-6 hover:border-foreground/50 transition-colors"
          >
            <h3 class="font-semibold leading-none tracking-tight mb-2 group-hover:bg-foreground/5">
              {{ recipe.name }}
              @if (isNew(recipe)) {
                <span class="ml-2 inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">New</span>
              }
            </h3>
            <p class="text-sm text-muted-foreground mb-4">{{ recipe.description }}</p>
            <div class="flex flex-wrap gap-1.5">
              @for (pipe of recipe.uses; track pipe) {
                <span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono text-foreground/80 ring-1 ring-inset ring-border">{{ pipe }}</span>
              }
            </div>
            <ng-icon name="lucideArrowRight" class="absolute bottom-6 right-6 h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"></ng-icon>
          </a>
        }
      </div>

      @if (recipes.length === 0) {
        <p class="mt-10 text-muted-foreground">No recipes published yet — check back soon.</p>
      }
    </div>
  `,
})
export class RecipesList {
  protected recipes = RECIPES;
  protected isNew = isNewRecipe;
}
