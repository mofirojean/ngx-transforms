import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { HtmlSanitizePipe } from './html-sanitize';

describe('HtmlSanitizePipe', () => {
  let pipe: HtmlSanitizePipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HtmlSanitizePipe,
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: vi.fn((_context: any, value: string) => value),
            bypassSecurityTrustHtml: (value: string) => ({
              changingThisBreaksApplicationSecurity: value,
            }) as SafeHtml,
          },
        },
      ],
    });
    pipe = TestBed.inject(HtmlSanitizePipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize HTML, removing unsafe tags', () => {
    const input = '<p>Hello</p><script>alert("xss")</script>';
    const result = pipe.transform(input);
    expect((result as any).changingThisBreaksApplicationSecurity).not.toContain('<script>');
    expect((sanitizer.sanitize as Mock)).toHaveBeenCalledWith(0, input);
  });

  it('should allow safe HTML tags and attributes', () => {
    const input = '<b>Bold</b><p class="test">Text</p>';
    const result = pipe.transform(input);
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<b>Bold</b>');
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<p class="test">Text</p>');
    expect((sanitizer.sanitize as Mock)).toHaveBeenCalledWith(0, input);
  });

  it('should return empty string for empty input', () => {
    const result = pipe.transform('');
    expect((result as any).changingThisBreaksApplicationSecurity).toBe('');
    expect((sanitizer.bypassSecurityTrustHtml as Mock)).toHaveBeenCalledWith('');
  });

  it('should return empty string for null input', () => {
    const result = pipe.transform(null as any);
    expect((result as any).changingThisBreaksApplicationSecurity).toBe('');
    expect((sanitizer.bypassSecurityTrustHtml as Mock)).toHaveBeenCalledWith('');
  });

  it('should return empty string for undefined input', () => {
    const result = pipe.transform(undefined as any);
    expect((result as any).changingThisBreaksApplicationSecurity).toBe('');
    expect((sanitizer.bypassSecurityTrustHtml as Mock)).toHaveBeenCalledWith('');
  });

  it('should handle malformed HTML', () => {
    const input = '<p>Unclosed tag';
    const result = pipe.transform(input);
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<p>Unclosed tag</p>'); // Sanitizer might close tags
    expect((sanitizer.sanitize as Mock)).toHaveBeenCalledWith(0, input);
  });

  it('should remove unsafe attributes', () => {
    const input = '<p onclick="alert(1)">Text</p>';
    const result = pipe.transform(input);
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<p>Text</p>');
    expect((result as any).changingThisBreaksApplicationSecurity).not.toContain('onclick');
    expect((sanitizer.sanitize as Mock)).toHaveBeenCalledWith(0, input);
  });
});
