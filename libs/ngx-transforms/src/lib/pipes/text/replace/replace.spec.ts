import '@angular/compiler';
import { Injector, runInInjectionContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ReplacePipe } from './replace';

describe('ReplacePipe', () => {
  let pipe: ReplacePipe;

  const mockSanitizer = {
    bypassSecurityTrustHtml: vi.fn((value: string) => ({
      changingThisBreaksApplicationSecurity: value,
    }) as SafeHtml),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    const injector = Injector.create({
      providers: [
        { provide: ReplacePipe },
        { provide: DomSanitizer, useValue: mockSanitizer },
      ],
    });
    pipe = runInInjectionContext(injector, () => new ReplacePipe());
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace string pattern without highlighting when isReplace is true', () => {
    expect(pipe.transform('Hello World', 'World', 'Universe', undefined, true)).toBe('Hello Universe');
  });

  it('should replace regex pattern without highlighting when isReplace is true', () => {
    expect(pipe.transform('test123', /\d+/g, 'X', undefined, true)).toBe('testX');
  });

  it('should highlight matches only when isReplace is false and highlightClass is given', () => {
    const result = pipe.transform('Angular is great', 'great', 'awesome', 'highlight', false);
    const html = (result as any).changingThisBreaksApplicationSecurity;
    expect(html).toBe('Angular is <span class="highlight">great</span>');
  });

  it('should replace and highlight when isReplace is true and highlightClass is given', () => {
    const result = pipe.transform('Angular is great', 'great', 'awesome', 'highlight', true);
    const html = (result as any).changingThisBreaksApplicationSecurity;
    expect(html).toBe('Angular is <span class="highlight">awesome</span>');
  });

  it('should highlight regex matches when isReplace is false and highlightClass is given', () => {
    const result = pipe.transform('test123', /\d+/g, 'X', 'highlight', false);
    const html = (result as any).changingThisBreaksApplicationSecurity;
    expect(html).toBe('test<span class="highlight">123</span>');
  });

  it('should replace regex matches and highlight when isReplace is true and highlightClass is given', () => {
    const result = pipe.transform('test123', /\d+/g, 'X', 'highlight', true);
    const html = (result as any).changingThisBreaksApplicationSecurity;
    expect(html).toBe('test<span class="highlight">X</span>');
  });

  it('should return input as-is when highlightClass is not provided and isReplace is false', () => {
    expect(pipe.transform('Keep it', 'Keep', 'Hold', undefined, false)).toBe('Keep it');
  });

  it('should replace by default when highlightClass is not provided', () => {
    expect(pipe.transform('Keep it', 'Keep', 'Hold')).toBe('Hold it');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('', 'test', 'X')).toBe('');
    expect(pipe.transform('', 'test', 'X', 'highlight')).toBe('');
    expect(pipe.transform('', 'test', 'X', 'highlight', true)).toBe('');
  });
});
