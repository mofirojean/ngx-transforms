import { CountPipe } from './count';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CountPipe', () => {
  let pipe: CountPipe;

  beforeEach(() => {
    pipe = new CountPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the length of an array', () => {
    expect(pipe.transform([1, 2, 3])).toBe(3);
  });

  it('should return the length of a string', () => {
    expect(pipe.transform('hello')).toBe(5);
  });

  it('should return the number of keys in an object', () => {
    expect(pipe.transform({ a: 1, b: 2 })).toBe(2);
  });

  it('should return 0 for null input', () => {
    expect(pipe.transform(null)).toBe(0);
  });

  it('should return 0 for undefined input', () => {
    expect(pipe.transform(undefined)).toBe(0);
  });

  it('should return 0 for other types of input', () => {
    expect(pipe.transform(123)).toBe(0);
  });
});
