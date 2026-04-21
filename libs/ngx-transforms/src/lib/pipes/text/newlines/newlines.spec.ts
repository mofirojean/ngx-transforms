import { NewlinesPipe } from './newlines';
import { describe, it, expect, beforeEach } from 'vitest';

describe('NewlinesPipe', () => {
  let pipe: NewlinesPipe;

  beforeEach(() => {
    pipe = new NewlinesPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
  });

  it('should return empty for undefined', () => {
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return empty for non-string', () => {
    expect(pipe.transform(42 as unknown as string)).toBe('');
  });

  it('should return empty string unchanged', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should leave text without newlines unchanged', () => {
    expect(pipe.transform('no breaks here')).toBe('no breaks here');
  });

  it('should replace \\n with <br> by default', () => {
    expect(pipe.transform('a\nb\nc')).toBe('a<br>b<br>c');
  });

  it('should replace \\r\\n with <br> by default', () => {
    expect(pipe.transform('a\r\nb')).toBe('a<br>b');
  });

  it('should replace \\r with <br> by default', () => {
    expect(pipe.transform('a\rb')).toBe('a<br>b');
  });

  it('should replace with custom separator', () => {
    expect(pipe.transform('a\nb\nc', ' | ')).toBe('a | b | c');
  });

  it('should flatten with space', () => {
    expect(pipe.transform('line1\nline2\nline3', ' ')).toBe('line1 line2 line3');
  });

  it('should replace with empty string', () => {
    expect(pipe.transform('a\nb\nc', '')).toBe('abc');
  });

  it('should handle mixed line breaks', () => {
    expect(pipe.transform('a\nb\r\nc\rd')).toBe('a<br>b<br>c<br>d');
  });

  it('should handle consecutive newlines', () => {
    expect(pipe.transform('a\n\nb')).toBe('a<br><br>b');
  });

  it('should handle trailing newline', () => {
    expect(pipe.transform('a\n')).toBe('a<br>');
  });

  it('should handle leading newline', () => {
    expect(pipe.transform('\nb')).toBe('<br>b');
  });

  it('should not mutate the original string', () => {
    const original = 'a\nb';
    pipe.transform(original);
    expect(original).toBe('a\nb');
  });
});