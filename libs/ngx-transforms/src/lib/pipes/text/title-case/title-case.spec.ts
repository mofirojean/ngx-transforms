import { TitleCasePipe } from './title-case';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TitleCasePipe', () => {
  let pipe: TitleCasePipe;

  beforeEach(() => {
    pipe = new TitleCasePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert "hello world" to "Hello World"', () => {
    expect(pipe.transform('hello world')).toBe('Hello World');
  });

  it('should handle single word', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should handle multiple spaces', () => {
    expect(pipe.transform('hello   world')).toBe('Hello World');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return empty string for null input', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should handle numbers and special characters', () => {
    expect(pipe.transform('hello-world 123')).toBe('Hello-world 123'); // "123" is a word
  });
});
