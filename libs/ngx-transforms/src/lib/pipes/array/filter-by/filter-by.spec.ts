import { FilterByPipe } from './filter-by';
import { describe, it, expect, beforeEach } from 'vitest';

describe('FilterByPipe', () => {
  let pipe: FilterByPipe;

  const users = [
    { name: 'Alice Chen', role: 'admin', email: 'alice@test.com' },
    { name: 'Bob Smith', role: 'editor', email: 'bob@test.com' },
    { name: 'Carol White', role: 'admin', email: 'carol@test.com' },
    { name: 'Dave Brown', role: 'viewer', email: 'dave@test.com' },
  ];

  beforeEach(() => {
    pipe = new FilterByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null input', () => {
    expect(pipe.transform(null as unknown as unknown[], 'test')).toEqual([]);
  });

  it('should return empty array for undefined input', () => {
    expect(pipe.transform(undefined as unknown as unknown[], 'test')).toEqual([]);
  });

  it('should return full copy when search is empty', () => {
    expect(pipe.transform(users, '')).toEqual(users);
  });

  it('should return full copy when search is null', () => {
    expect(pipe.transform(users, null as unknown as string)).toEqual(users);
  });

  it('should return empty array for empty array', () => {
    expect(pipe.transform([], 'test')).toEqual([]);
  });

  it('should filter by specific key', () => {
    const result = pipe.transform(users, 'admin', 'role');
    expect(result).toHaveLength(2);
    expect((result[0] as Record<string, unknown>)['name']).toBe('Alice Chen');
    expect((result[1] as Record<string, unknown>)['name']).toBe('Carol White');
  });

  it('should be case-insensitive', () => {
    const result = pipe.transform(users, 'ALICE', 'name');
    expect(result).toHaveLength(1);
    expect((result[0] as Record<string, unknown>)['name']).toBe('Alice Chen');
  });

  it('should do partial matching', () => {
    const result = pipe.transform(users, 'ali', 'name');
    expect(result).toHaveLength(1);
  });

  it('should return empty when no match found', () => {
    expect(pipe.transform(users, 'xyz', 'name')).toEqual([]);
  });

  it('should search all properties when no key provided', () => {
    const result = pipe.transform(users, 'bob');
    expect(result).toHaveLength(1);
    expect((result[0] as Record<string, unknown>)['name']).toBe('Bob Smith');
  });

  it('should match across different properties when no key', () => {
    const result = pipe.transform(users, 'admin');
    expect(result).toHaveLength(2);
  });

  it('should match email when no key', () => {
    const result = pipe.transform(users, 'carol@test');
    expect(result).toHaveLength(1);
  });

  it('should filter by nested key', () => {
    const data = [
      { id: 1, meta: { status: 'active' } },
      { id: 2, meta: { status: 'banned' } },
      { id: 3, meta: { status: 'active' } },
    ];
    const result = pipe.transform(data, 'active', 'meta.status');
    expect(result).toHaveLength(2);
  });

  it('should search nested objects when no key', () => {
    const data = [
      { name: 'Order 1', customer: { city: 'New York' } },
      { name: 'Order 2', customer: { city: 'London' } },
    ];
    const result = pipe.transform(data, 'london');
    expect(result).toHaveLength(1);
  });

  it('should work with primitive arrays', () => {
    const result = pipe.transform(['apple', 'banana', 'cherry', 'apricot'], 'ap');
    expect(result).toEqual(['apple', 'apricot']);
  });

  it('should match numbers as strings', () => {
    const data = [
      { name: 'Item A', price: 50 },
      { name: 'Item B', price: 199 },
      { name: 'Item C', price: 299 },
    ];
    const result = pipe.transform(data, '50', 'price');
    expect(result).toHaveLength(1);
    expect((result[0] as Record<string, unknown>)['name']).toBe('Item A');
  });

  it('should handle null property values gracefully', () => {
    const data = [
      { name: 'Alice', bio: null },
      { name: 'Bob', bio: 'Developer' },
    ];
    const result = pipe.transform(data, 'dev', 'bio');
    expect(result).toHaveLength(1);
  });

  it('should not mutate the original array', () => {
    const original = [...users];
    pipe.transform(users, 'admin', 'role');
    expect(users).toEqual(original);
  });
});
