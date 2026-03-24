import { SnakeCasePipe } from './snake-case';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SnakeCasePipe', () => {
  let pipe: SnakeCasePipe;

  beforeEach(() => {
    pipe = new SnakeCasePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert "hello world" to "hello_world"', () => {
    expect(pipe.transform('hello world')).toBe('hello_world');
  });

  it('should handle single word', () => {
    expect(pipe.transform('hello')).toBe('hello');
  });

  it('should handle multiple spaces and special characters', () => {
    expect(pipe.transform('hello   world!')).toBe('hello_world');
  });

  it('should handle camelCase input', () => {
    expect(pipe.transform('helloWorld')).toBe('hello_world'); // Adjusted expectation
  });

  it('should handle underscore-separated input', () => {
    expect(pipe.transform('hello_world')).toBe('hello_world');
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
