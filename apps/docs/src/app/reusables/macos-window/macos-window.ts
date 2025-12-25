import { Component, input } from '@angular/core';

@Component({
  selector: 'app-macos-window',
  standalone: true,
  templateUrl: './macos-window.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class MacosWindow {
  readonly title = input<string>('');
}
