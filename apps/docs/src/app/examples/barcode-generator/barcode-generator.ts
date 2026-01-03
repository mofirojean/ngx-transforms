import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BarcodePipe } from '@ngx-transforms';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { AsyncPipe } from '@angular/common';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-barcode-generator',
  standalone: true,
  imports: [BarcodePipe, HlmSeparatorImports, HlmTextareaImports, AsyncPipe, HlmButtonImports],
  templateUrl: './barcode-generator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarcodeGeneratorComponent {
  protected readonly barcodeValue = signal('');
  protected readonly generatedBarcodeValue = signal('');

  generateBarcode(): void {
    this.generatedBarcodeValue.set(this.barcodeValue());
  }
}
