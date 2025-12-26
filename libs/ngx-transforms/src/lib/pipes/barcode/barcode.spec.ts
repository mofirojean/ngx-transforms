import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import { BarcodeElementType, BarcodePipe } from './barcode';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

beforeAll(() => {
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
});

describe('BarcodePipe', () => {
  let pipe: BarcodePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [BarcodePipe],
    });
    pipe = TestBed.inject(BarcodePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should generate SVG barcode', async () => {
    const result = await pipe.transform('123456789', { elementType: 'svg' as BarcodeElementType });
    const html = (result as any).changingThisBreaksApplicationSecurity;
    expect(html).toContain('<svg');
  });

  it('should generate image data URL for img', async () => {
    const result = await pipe.transform('123456789', { elementType: 'img' as BarcodeElementType });
    const url = (result as any).changingThisBreaksApplicationSecurity;
    expect(url).toMatch(/^data:image\/png;base64,/);
  });

  it('should generate image data URL for canvas', async () => {
    const result = await pipe.transform('123456789', { elementType: 'canvas' as BarcodeElementType });
    const url = (result as any).changingThisBreaksApplicationSecurity;
    expect(url).toMatch(/^data:image\/png;base64,/);
  });

  it('should apply custom options', async () => {
    const result = await pipe.transform('123456789', {
      elementType: 'svg' as BarcodeElementType,
      format: 'CODE128',
      width: 3,
      height: 150,
      lineColor: '#FF0000',
      displayValue: false,
    });
    const html = (result as any).changingThisBreaksApplicationSecurity;
    expect(html).toContain('<svg');
    expect(html).toContain('width');
  });

  it('should handle empty input', async () => {
    const result = await pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle invalid value', async () => {
    const spy = vi.spyOn(console, 'error');
    const result = await pipe.transform('invalid', { format: 'EAN13' as any });
    expect(result).toBe('');
    expect(spy).toHaveBeenCalledWith('Barcode generation failed:', new Error('"invalid" is not a valid input for EAN13'));
  });
});
