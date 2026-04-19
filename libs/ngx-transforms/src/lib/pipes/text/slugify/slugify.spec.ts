import { SlugifyPipe } from './slugify';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SlugifyPipe', () => {
  let pipe: SlugifyPipe;

  beforeEach(() => {
    pipe = new SlugifyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null value', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
  });

  it('should return empty for undefined value', () => {
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return empty for non-string value', () => {
    expect(pipe.transform(42 as unknown as string)).toBe('');
  });

  it('should return empty string unchanged', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should slugify basic input', () => {
    expect(pipe.transform('Hello World')).toBe('hello-world');
  });

  it('should lowercase input', () => {
    expect(pipe.transform('HELLO WORLD')).toBe('hello-world');
  });

  it('should remove punctuation', () => {
    expect(pipe.transform('Hello, World!')).toBe('hello-world');
  });

  it('should collapse multiple spaces', () => {
    expect(pipe.transform('hello   world')).toBe('hello-world');
  });

  it('should remove diacritics', () => {
    expect(pipe.transform('Café')).toBe('cafe');
  });

  it('should slugify a café sentence', () => {
    expect(pipe.transform('Café & Tea')).toBe('cafe-tea');
  });

  it('should handle accented characters', () => {
    expect(pipe.transform('naïve résumé')).toBe('naive-resume');
  });

  it('should trim leading dashes', () => {
    expect(pipe.transform('!!!hello')).toBe('hello');
  });

  it('should trim trailing dashes', () => {
    expect(pipe.transform('hello!!!')).toBe('hello');
  });

  it('should trim both sides', () => {
    expect(pipe.transform('  hello world  ')).toBe('hello-world');
  });

  it('should handle numbers', () => {
    expect(pipe.transform('article 42')).toBe('article-42');
  });

  it('should use custom separator', () => {
    expect(pipe.transform('My Blog Post', '_')).toBe('my_blog_post');
  });

  it('should collapse repeats with custom separator', () => {
    expect(pipe.transform('a   b   c', '_')).toBe('a_b_c');
  });

  it('should handle only symbols', () => {
    expect(pipe.transform('!!!')).toBe('');
  });

  it('should handle only whitespace', () => {
    expect(pipe.transform('   ')).toBe('');
  });

  it('should handle mixed case with special chars', () => {
    expect(pipe.transform('AngularJS & ngx-Transforms!')).toBe('angularjs-ngx-transforms');
  });

  it('should default to dash when empty separator given', () => {
    expect(pipe.transform('hello world', '')).toBe('hello-world');
  });

  it('should not mutate the original string', () => {
    const original = 'Hello World';
    pipe.transform(original);
    expect(original).toBe('Hello World');
  });
});