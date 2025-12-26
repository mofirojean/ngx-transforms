import { CamelCasePipe } from './camel-case';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CamelCasePipe', () => {
  let pipe: CamelCasePipe;

  beforeEach(() => {
    pipe = new CamelCasePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert "hello world" to "helloWorld"', () => {
    expect(pipe.transform('hello world')).toBe('helloWorld');
  });

  it('should handle single word', () => {
    expect(pipe.transform('hello')).toBe('hello');
  });

  it('should handle multiple spaces and special characters', () => {
    expect(pipe.transform('hello   world!')).toBe('helloWorld');
  });

  it('should handle underscore-separated input', () => {
    expect(pipe.transform('hello_world')).toBe('helloWorld');
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
