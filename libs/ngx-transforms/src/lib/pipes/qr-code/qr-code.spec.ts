import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { QRCodeElementType, QRCodePipe } from './qr-code';
import * as QrCode from 'qrcode';

describe('QRCodePipe', () => {
  let pipe: QRCodePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QRCodePipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (value: string) => ({
              changingThisBreaksApplicationSecurity: value,
            }) as SafeHtml,
            bypassSecurityTrustResourceUrl: (value: string) => ({
              changingThisBreaksApplicationSecurity: value,
            }) as SafeResourceUrl,
          },
        },
      ],
    });
    pipe = TestBed.inject(QRCodePipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for invalid input', async () => {
    expect(await pipe.transform('')).toBe('');
    expect(await pipe.transform(null as any)).toBe('');
    expect(await pipe.transform(undefined as any)).toBe('');
  });

  it('should generate SVG QR code', async () => {
    const value = 'https://example.com';
    const result = await pipe.transform(value, { elementType: 'svg' as QRCodeElementType });
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<svg');
  });

  it('should generate image data URL for img', async () => {
    const value = 'https://example.com';
    const result = await pipe.transform(value, { elementType: 'img' as QRCodeElementType });
    expect((result as any).changingThisBreaksApplicationSecurity).toMatch(/^data:image\/png;base64,/);
  });

  it('should generate image data URL for canvas', async () => {
    const value = 'https://example.com';
    const result = await pipe.transform(value, { elementType: 'canvas' as QRCodeElementType });
    expect((result as any).changingThisBreaksApplicationSecurity).toMatch(/^data:image\/png;base64,/);
  });

  it('should apply custom options', async () => {
    const value = 'https://example.com';
    const result = await pipe.transform(value, {
      elementType: 'svg' as QRCodeElementType,
      width: 300,
      colorDark: '#FF0000',
    });
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('width="300"');
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('fill="#FF0000"');
  });

  it('should handle errors gracefully', async () => {
    const spy = vi.spyOn(console, 'error');
    // Temporarily mock QrCode.toString to throw an error
    const originalToString = QrCode.toString;
    (QrCode as any).toString = vi.fn(() => Promise.reject(new Error('Mock QR error')));

    const result = await pipe.transform('test', { elementType: 'svg' });
    expect(result).toBe('');
    expect(spy).toHaveBeenCalledWith('QRCode generation failed:', new Error('Mock QR error'));

    // Restore original QrCode.toString
    (QrCode as any).toString = originalToString;
    spy.mockRestore();
  });
});
