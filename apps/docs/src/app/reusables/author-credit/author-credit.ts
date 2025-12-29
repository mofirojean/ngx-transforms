import {Component, input} from '@angular/core';
import {TitleCasePipe} from '@ngx-transforms';

@Component({
  selector: 'app-author-credit',
  imports: [TitleCasePipe],
  template: `
    <div>
      Built by
      <a
        [href]="url()"
        target="_blank"
        class="font-medium underline underline-offset-4 hover:text-foreground"
      >{{ author() | titleCase }}</a
      >
    </div>
  `,
  styles: ``,
})
export class AuthorCredit {
  author = input.required<string>();
  url = input.required<string>();
}
