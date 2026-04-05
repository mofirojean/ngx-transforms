import { EveryPipe } from './every';
import { describe, it, expect, beforeEach } from 'vitest';

describe('EveryPipe', () => {
  let pipe: EveryPipe;

  beforeEach(() => {
    pipe = new EveryPipe();
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

  it('should return true when all elements match', () => {
    expect(pipe.transform([1, 1, 1], 1)).toBe(true);
  });

  it('should return false when not all elements match', () => {
    expect(pipe.transform([1, 2, 1], 1)).toBe(false);
  });

  it('should work with booleans', () => {
    expect(pipe.transform([true, true, true], true)).toBe(true);
    expect(pipe.transform([true, false, true], true)).toBe(false);
  });

  it('should work with strings', () => {
    expect(pipe.transform(['yes', 'yes', 'yes'], 'yes')).toBe(true);
    expect(pipe.transform(['yes', 'no', 'yes'], 'yes')).toBe(false);
  });

  it('should return true for single matching element', () => {
    expect(pipe.transform([42], 42)).toBe(true);
  });

  it('should return false for single non-matching element', () => {
    expect(pipe.transform([42], 99)).toBe(false);
  });

  it('should check objects by key', () => {
    const users = [
      { id: 1, status: 'active' },
      { id: 2, status: 'active' },
      { id: 3, status: 'active' },
    ];
    expect(pipe.transform(users, 'active', 'status')).toBe(true);
  });

  it('should return false when not all objects match by key', () => {
    const users = [
      { id: 1, status: 'active' },
      { id: 2, status: 'inactive' },
      { id: 3, status: 'active' },
    ];
    expect(pipe.transform(users, 'active', 'status')).toBe(false);
  });

  it('should check objects by nested key', () => {
    const orders = [
      { id: 1, meta: { state: 'shipped' } },
      { id: 2, meta: { state: 'shipped' } },
      { id: 3, meta: { state: 'shipped' } },
    ];
    expect(pipe.transform(orders, 'shipped', 'meta.state')).toBe(true);
  });

  it('should return false when nested key does not match for all', () => {
    const orders = [
      { id: 1, meta: { state: 'shipped' } },
      { id: 2, meta: { state: 'pending' } },
    ];
    expect(pipe.transform(orders, 'shipped', 'meta.state')).toBe(false);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 'x' } },
      { a: {} },
    ];
    expect(pipe.transform(input, 'x', 'a.b')).toBe(false);
  });

  it('should use strict equality', () => {
    expect(pipe.transform([1, 1, 1], '1')).toBe(false);
    expect(pipe.transform([0, 0], false)).toBe(false);
  });

  it('should work with numeric object values', () => {
    const items = [
      { id: 1, priority: 1 },
      { id: 2, priority: 1 },
      { id: 3, priority: 1 },
    ];
    expect(pipe.transform(items, 1, 'priority')).toBe(true);
  });
});
