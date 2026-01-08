import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {HlmButtonImports} from '@spartan-ng/helm/button';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideQrCode} from '@ng-icons/lucide';
import {QrCodePipe} from '@ngx-transforms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-qrcode-example',
  standalone: true,
  imports: [ReactiveFormsModule, HlmInputImports, HlmButtonImports, NgIconComponent, QrCodePipe, AsyncPipe],
  providers: [provideIcons({lucideQrCode}), QrCodePipe],
  template: `
    <div class="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-4">
      <div class="flex-1 w-full max-w-md flex flex-col items-center lg:items-start">
        <div class="text-center lg:text-left">
          <h3 class="text-2xl font-semibold">QR Code Generator</h3>
          <p class="text-sm text-muted-foreground mt-1">Enter a URL to generate a QR code instantly.</p>
        </div>

        <div class="w-full flex flex-col sm:flex-row items-center gap-2 mt-6">
          <input
            hlmInput
            [formControl]="url"
            placeholder="e.g., https://example.com"
            class="w-full"
          />
          <button hlmBtn (click)="generateQrCode()" [disabled]="isGenerating()" class="w-full sm:w-auto flex-shrink-0">
            {{ isGenerating() ? 'Generating...' : 'Generate' }}
          </button>
        </div>

        @if (urlToPipe()) {
          <button hlmBtn variant="outline" (click)="downloadQrCode()" class="mt-4 w-full sm:w-auto qr-fade-in">
            Download QR Code
          </button>
        }
      </div>

      <div class="flex-shrink-0 w-56 h-56">
        <div
          class="w-full h-full flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 transition-all duration-300">
          @if (isGenerating()) {
            <div class="spinner"></div>
          } @else if (urlToPipe(); as url) {
            @if (url | qrCode | async; as qrCodeUrl) {
              <img [src]="qrCodeUrl" alt="Generated QR Code"
                   class="w-full h-full object-contain rounded-md qr-fade-in"/>
            }
          } @else {
            <div class="flex flex-col items-center gap-2 text-muted-foreground">
              <ng-icon name="lucideQrCode" size="48"/>
              <span class="text-sm">QR code will appear here</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .qr-animation-enter {
      opacity: 0;
      transform: scale(0.9);
    }

    .qr-animation-enter-active {
      transition: all 0.5s ease-out;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid hsl(var(--border));
      border-top: 4px solid hsl(var(--primary));
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrcodeGenerator {
  protected readonly url = new FormControl('https://angular.dev/', {
    validators: [Validators.required, Validators.pattern('^(http|https)://[^ "]+$')],
    nonNullable: true,
  });
  protected readonly urlToPipe = signal<string | null>(null);
  protected readonly isGenerating = signal(false);

  private readonly qrCodePipe = inject(QrCodePipe);

  async generateQrCode(): Promise<void> {
    if (this.url.invalid) return;

    this.isGenerating.set(true);
    this.urlToPipe.set(null); // Reset previous QR code

    // Simulate network latency for a better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    this.urlToPipe.set(this.url.value);
    this.isGenerating.set(false);
  }

  async downloadQrCode(): Promise<void> {
    const url = this.urlToPipe();
    if (!url) return;

    // The pipe's transform method returns a Promise<string>
    const dataUrl = await this.qrCodePipe.transform(url);

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
