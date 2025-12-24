import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <!-- Footer -->
    <footer class="border-t border-border/40 bg-background py-6 md:py-0">
      <div class="container mx-auto flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row px-4 md:px-8">
        <p class="text-center text-sm leading-loose text-muted-foreground">
          Built by <a href="#" class="font-medium underline underline-offset-4">Mofiro Jean</a>.
          The source code is available on <a href="https://github.com/mofirojean/ngx-transforms" class="font-medium underline underline-offset-4">GitHub</a>.
        </p>
      </div>
    </footer>
  `,
  styles: ``,
})
export class Footer {

}
