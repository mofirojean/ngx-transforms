import '@angular/compiler';
import { Injector, runInInjectionContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HtmlSanitizePipe } from './html-sanitize';

describe('HtmlSanitizePipe', () => {
  let pipe: HtmlSanitizePipe;

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
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize HTML, removing unsafe tags', () => {
    const input = '<p>Hello</p><script>alert("xss")</script>';
    pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });

  it('should allow safe HTML tags and attributes', () => {
    const input = '<b>Bold</b><p class="test">Text</p>';
    pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });

  it('should return empty SafeHtml for empty input', () => {
    pipe.transform('');
    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should return empty SafeHtml for null input', () => {
    pipe.transform(null as any);
    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should return empty SafeHtml for undefined input', () => {
    pipe.transform(undefined as any);
    expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should handle malformed HTML', () => {
    const input = '<p>Unclosed tag';
    pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });

  it('should remove unsafe attributes', () => {
    const input = '<p onclick="alert(1)">Text</p>';
    pipe.transform(input);
    expect(mockSanitizer.sanitize).toHaveBeenCalledWith(0, input);
  });
});
