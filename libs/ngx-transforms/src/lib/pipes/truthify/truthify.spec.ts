import { TruthifyPipe } from './truthify';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TruthifyPipe', () => {
  let pipe: TruthifyPipe;

  beforeEach(() => {
    pipe = new TruthifyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // --- Null / invalid guards ---

  it('should return empty array for null', () => {
    expect(pipe.transform(null as unknown as unknown[])).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    expect(pipe.transform(undefined as unknown as unknown[])).toEqual([]);
  });

  it('should return empty array for string input', () => {
    expect(pipe.transform('hello' as unknown as unknown[])).toEqual([]);
  });

  it('should return empty array for empty array', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  // --- Falsy removal ---

  it('should remove null and undefined', () => {
    expect(pipe.transform([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  it('should remove false and 0', () => {
    expect(pipe.transform([false, 0, 1, true, 2])).toEqual([1, true, 2]);
  });

  it('should remove empty strings', () => {
    expect(pipe.transform(['', 'hello', '', 'world'])).toEqual(['hello', 'world']);
  });

  it('should remove NaN', () => {
    expect(pipe.transform([NaN, 1, NaN, 2])).toEqual([1, 2]);
  });

  it('should remove all falsy types at once', () => {
    expect(pipe.transform([0, 1, '', 'hello', null, undefined, false, true, NaN]))
      .toEqual([1, 'hello', true]);
  });

  it('should return all falsy array as empty', () => {
    expect(pipe.transform([0, '', null, undefined, false, NaN])).toEqual([]);
  });

  // --- Truthy edge cases ---

  it('should keep whitespace strings (they are truthy)', () => {
    expect(pipe.transform(['', ' ', '  '])).toEqual([' ', '  ']);
  });

  it('should keep empty arrays and objects (they are truthy)', () => {
    expect(pipe.transform([[], {}, null])).toEqual([[], {}]);
  });

  it('should keep negative numbers (they are truthy)', () => {
    expect(pipe.transform([-1, 0, 1])).toEqual([-1, 1]);
  });

  it('should return same array when no falsy values', () => {
    expect(pipe.transform([1, 'a', true, [1]])).toEqual([1, 'a', true, [1]]);
  });

  // --- Immutability ---

  it('should not mutate the original array', () => {
    const original = [1, null, 2, undefined, 3];
    const result = pipe.transform(original);
    expect(result).toEqual([1, 2, 3]);
    expect(original).toEqual([1, null, 2, undefined, 3]);
  });
});