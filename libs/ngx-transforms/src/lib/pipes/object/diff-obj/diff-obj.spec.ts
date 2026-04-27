import { DiffObjPipe } from './diff-obj';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DiffObjPipe', () => {
  let pipe: DiffObjPipe;

  beforeEach(() => {
    pipe = new DiffObjPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null source', () => {
    expect(pipe.transform(null, { a: 1 })).toEqual({});
  });

  it('should return empty for undefined source', () => {
    expect(pipe.transform(undefined, { a: 1 })).toEqual({});
  });

  it('should return empty for primitive source', () => {
    expect(pipe.transform(42, { a: 1 })).toEqual({});
  });

  it('should return shallow copy when compareTo is null', () => {
    expect(pipe.transform({ a: 1, b: 2 }, null)).toEqual({ a: 1, b: 2 });
  });

  it('should return shallow copy when compareTo is undefined', () => {
    expect(pipe.transform({ a: 1, b: 2 }, undefined)).toEqual({ a: 1, b: 2 });
  });

  it('should return shallow copy when compareTo is primitive', () => {
    expect(pipe.transform({ a: 1 }, 42)).toEqual({ a: 1 });
  });

  it('should return empty object when objects are identical', () => {
    expect(pipe.transform({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual({});
  });

  it('should return changed entries only', () => {
    expect(pipe.transform({ a: 1, b: 2 }, { a: 1, b: 99 })).toEqual({ b: 2 });
  });

  it('should include keys missing from compareTo', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 }, { a: 1 })).toEqual({ b: 2, c: 3 });
  });

  it('should ignore keys only in compareTo', () => {
    expect(pipe.transform({ a: 1 }, { a: 1, b: 2 })).toEqual({});
  });

  it('should treat null and undefined as different from missing', () => {
    expect(pipe.transform({ a: null }, { a: undefined })).toEqual({ a: null });
  });

  it('should compare nested objects by reference', () => {
    const inner = { x: 1 };
    expect(pipe.transform({ a: inner }, { a: inner })).toEqual({});
    expect(pipe.transform({ a: { x: 1 } }, { a: { x: 1 } })).toEqual({ a: { x: 1 } });
  });

  it('should handle empty source', () => {
    expect(pipe.transform({}, { a: 1 })).toEqual({});
  });

  it('should handle empty compareTo', () => {
    expect(pipe.transform({ a: 1, b: 2 }, {})).toEqual({ a: 1, b: 2 });
  });

  it('should handle different value types', () => {
    expect(pipe.transform({ a: 1 }, { a: '1' })).toEqual({ a: 1 });
  });

  it('should handle boolean differences', () => {
    expect(pipe.transform({ active: true, valid: false }, { active: false, valid: false })).toEqual({
      active: true,
    });
  });

  it('should handle null vs value difference', () => {
    expect(pipe.transform({ a: 1 }, { a: null })).toEqual({ a: 1 });
  });

  it('should not include inherited prototype properties', () => {
    class Foo { x = 1; method() { return this.x; } }
    expect(pipe.transform(new Foo(), {})).toEqual({ x: 1 });
  });

  it('should not mutate the source object', () => {
    const original = { a: 1, b: 2 };
    pipe.transform(original, { a: 1 });
    expect(original).toEqual({ a: 1, b: 2 });
  });

  it('should not mutate the compareTo object', () => {
    const compareTo = { a: 1 };
    pipe.transform({ a: 2 }, compareTo);
    expect(compareTo).toEqual({ a: 1 });
  });
});