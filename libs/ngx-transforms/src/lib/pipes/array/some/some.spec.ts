import { SomePipe } from './some';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SomePipe', () => {
  let pipe: SomePipe;

  beforeEach(() => {
    pipe = new SomePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false for null input', () => {
    expect(pipe.transform(null as unknown as unknown[], true)).toBe(false);
  });

  it('should return false for undefined input', () => {
    expect(pipe.transform(undefined as unknown as unknown[], true)).toBe(false);
  });

  it('should return false for empty array', () => {
    expect(pipe.transform([], true)).toBe(false);
  });

  it('should return true when at least one element matches', () => {
    expect(pipe.transform([1, 2, 3], 2)).toBe(true);
  });

  it('should return false when no elements match', () => {
    expect(pipe.transform([1, 2, 3], 4)).toBe(false);
  });

  it('should work with booleans', () => {
    expect(pipe.transform([false, false, true], true)).toBe(true);
    expect(pipe.transform([false, false, false], true)).toBe(false);
  });

  it('should work with strings', () => {
    expect(pipe.transform(['no', 'no', 'yes'], 'yes')).toBe(true);
    expect(pipe.transform(['no', 'no', 'no'], 'yes')).toBe(false);
  });

  it('should return true for single matching element', () => {
    expect(pipe.transform([42], 42)).toBe(true);
  });

  it('should return false for single non-matching element', () => {
    expect(pipe.transform([42], 99)).toBe(false);
  });

  it('should return true when all elements match', () => {
    expect(pipe.transform([1, 1, 1], 1)).toBe(true);
  });

  it('should check objects by key', () => {
    const users = [
      { id: 1, role: 'viewer' },
      { id: 2, role: 'admin' },
      { id: 3, role: 'viewer' },
    ];
    expect(pipe.transform(users, 'admin', 'role')).toBe(true);
  });

  it('should return false when no objects match by key', () => {
    const users = [
      { id: 1, role: 'viewer' },
      { id: 2, role: 'editor' },
    ];
    expect(pipe.transform(users, 'admin', 'role')).toBe(false);
  });

  it('should check objects by nested key', () => {
    const orders = [
      { id: 1, meta: { status: 'shipped' } },
      { id: 2, meta: { status: 'failed' } },
      { id: 3, meta: { status: 'shipped' } },
    ];
    expect(pipe.transform(orders, 'failed', 'meta.status')).toBe(true);
  });

  it('should return false when nested key does not match any', () => {
    const orders = [
      { id: 1, meta: { status: 'shipped' } },
      { id: 2, meta: { status: 'shipped' } },
    ];
    expect(pipe.transform(orders, 'failed', 'meta.status')).toBe(false);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 'x' } },
      { a: {} },
    ];
    expect(pipe.transform(input, 'x', 'a.b')).toBe(true);
    expect(pipe.transform(input, 'z', 'a.b')).toBe(false);
  });

  it('should use strict equality', () => {
    expect(pipe.transform([1, 2, 3], '1')).toBe(false);
    expect(pipe.transform([0, false], false)).toBe(true);
  });

  it('should work with numeric object values', () => {
    const items = [
      { id: 1, priority: 3 },
      { id: 2, priority: 1 },
      { id: 3, priority: 2 },
    ];
    expect(pipe.transform(items, 1, 'priority')).toBe(true);
    expect(pipe.transform(items, 5, 'priority')).toBe(false);
  });
});
