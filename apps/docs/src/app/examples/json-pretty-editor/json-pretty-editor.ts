import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { JsonPrettyPipe } from '@ngx-transforms';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { Clipboard } from '@angular/cdk/clipboard';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-json-pretty-editor',
  standalone: true,
  imports: [JsonPrettyPipe, NgIcon, HlmIcon, HlmSeparatorImports, HlmTextareaImports, HlmInputImports],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  templateUrl: './json-pretty-editor.html',
  styleUrl: './json-pretty-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonPrettyEditor {
  private readonly clipboard = inject(Clipboard);
  protected readonly copied = signal(false);
  protected readonly propToHighlight = signal('');

  protected readonly exampleJson = `{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "courses": [
    {
      "title": "History",
      "credits": 3
    },
    {
      "title": "Math",
      "credits": 4
    }
  ],
  "address": null
}`;
  protected readonly jsonInput = signal(this.exampleJson);

  copyToClipboard(text: string | object) {
    const jsonString = typeof text === 'string' ? text : JSON.stringify(text, null, 2);
    if (this.clipboard.copy(jsonString)) {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
