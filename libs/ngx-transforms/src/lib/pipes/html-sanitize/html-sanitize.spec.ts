import '@angular/compiler';
import { Injector, runInInjectionContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { HtmlSanitizePipe } from './html-sanitize';

describe('HtmlSanitizePipe', () => {
  let pipe: HtmlSanitizePipe;
  let sanitizer: DomSanitizer;

  const mockSanitizer = {
    sanitize: vi.fn((_context: any, value: string) => value),
    bypassSecurityTrustHtml: vi.fn((value: string) => ({
      changingThisBreaksApplicationSecurity: value,
    }) as SafeHtml),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    const injector = Injector.create({
      providers: [
        { provide: HtmlSanitizePipe },
        { provide: DomSanitizer, useValue: mockSanitizer },
      ],
    });
    pipe = runInInjectionContext(injector, () => new HtmlSanitizePipe());
    sanitizer = injector.get(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize HTML, removing unsafe tags', () => {
    const input = '<p>Hello</p><script>alert("xss")</script>';
    const result = pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });

  it('should allow safe HTML tags and attributes', () => {
    const input = '<b>Bold</b><p class="test">Text</p>';
    const result = pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });

  it('should return empty SafeHtml for empty input', () => {
    const result = pipe.transform('');
    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should return empty SafeHtml for null input', () => {
    const result = pipe.transform(null as any);
    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should return empty SafeHtml for undefined input', () => {
    const result = pipe.transform(undefined as any);
    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should handle malformed HTML', () => {
    const input = '<p>Unclosed tag';
    const result = pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });

  it('should remove unsafe attributes', () => {
    const input = '<p onclick="alert(1)">Text</p>';
    const result = pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });
});
