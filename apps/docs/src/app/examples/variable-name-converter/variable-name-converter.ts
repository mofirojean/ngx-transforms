import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';
import {
  CamelCasePipe,
  KebabCasePipe,
  SnakeCasePipe,
  TitleCasePipe,
} from '@ngx-transforms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-variable-name-converter',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    NgIcon,
    HlmIcon,
  ],
  providers: [
    provideIcons({ lucideCopy, lucideCheck }),
    CamelCasePipe,
    KebabCasePipe,
    SnakeCasePipe,
    TitleCasePipe,
  ],
  templateUrl: './variable-name-converter.html',
})
export class VariableNameConverter {
  private camelCasePipe = inject(CamelCasePipe);
  private snakeCasePipe = inject(SnakeCasePipe);
  private kebabCasePipe = inject(KebabCasePipe);
  private titleCasePipe = inject(TitleCasePipe);
  private clipboard = inject(Clipboard);

  input = signal('user profile settings');
  copiedIndex = signal<number | null>(null);

  camelCaseValue = computed(() => this.camelCasePipe.transform(this.input()));
  snakeCaseValue = computed(() => this.snakeCasePipe.transform(this.input()));
  kebabCaseValue = computed(() => this.kebabCasePipe.transform(this.input()));
  titleCaseValue = computed(() => this.titleCasePipe.transform(this.input()));

  copyToClipboard(index: number): void {
    let text = '';
    switch (index) {
      case 0:
        text = this.camelCaseValue();
        break;
      case 1:
        text = this.snakeCaseValue();
        break;
      case 2:
        text = this.kebabCaseValue();
        break;
      case 3:
        text = this.titleCaseValue();
        break;
    }
    this.clipboard.copy(text);
    this.copiedIndex.set(index);
    setTimeout(() => this.copiedIndex.set(null), 2000);
  }
}
