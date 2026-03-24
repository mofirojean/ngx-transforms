import { KebabCasePipe } from './kebab-case';
import { describe, it, expect, beforeEach } from 'vitest';

describe('KebabCasePipe', () => {
  let pipe: KebabCasePipe;

  beforeEach(() => {
    pipe = new KebabCasePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert "hello world" to "hello-world"', () => {
    expect(pipe.transform('hello world')).toBe('hello-world');
  });

  it('should handle single word', () => {
    expect(pipe.transform('hello')).toBe('hello');
  });

  it('should handle multiple spaces and special characters', () => {
    expect(pipe.transform('hello   world!')).toBe('hello-world');
  });

  it('should handle camelCase input', () => {
    expect(pipe.transform('helloWorld')).toBe('hello-world');
  });

  it('should handle underscore-separated input', () => {
    expect(pipe.transform('hello_world')).toBe('hello-world');
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
});
