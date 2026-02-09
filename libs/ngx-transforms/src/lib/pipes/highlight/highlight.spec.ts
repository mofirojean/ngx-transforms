import '@angular/compiler';
import { Injector, runInInjectionContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HighlightPipe } from './highlight';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  const mockSanitizer = {
    bypassSecurityTrustHtml: vi.fn((value: string) => ({
      changingThisBreaksApplicationSecurity: value,
    }) as SafeHtml),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    const injector = Injector.create({
      providers: [
        { provide: HighlightPipe },
        { provide: DomSanitizer, useValue: mockSanitizer },
      ],
    });
    pipe = runInInjectionContext(injector, () => new HighlightPipe());
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original string if no search term', () => {
    const result = pipe.transform('Hello World!', '');
    expect((result as any).changingThisBreaksApplicationSecurity).toBe('Hello World!');
  });

  it('should highlight search term', () => {
    const result = pipe.transform('Hello world', 'world');
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<span class="highlight">world</span>');
  });

  it('should handle case-insensitive highlighting', () => {
    const result = pipe.transform('Hello World', 'WORLD');
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<span class="highlight">World</span>');
  });

  it('should escape special characters', () => {
    const result = pipe.transform('Hello $10', '$10');
    expect((result as any).changingThisBreaksApplicationSecurity).toContain('<span class="highlight">$10</span>');
  });

  it('should return empty string for null input', () => {
    const result = pipe.transform(null as any, 'test');
    expect((result as any).changingThisBreaksApplicationSecurity).toBe('');
  });

  it('should return empty string for undefined input', () => {
    const result = pipe.transform(undefined as any, 'test');
    expect((result as any).changingThisBreaksApplicationSecurity).toBe('');
  });
});
