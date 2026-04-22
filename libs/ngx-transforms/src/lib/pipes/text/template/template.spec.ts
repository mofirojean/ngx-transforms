import { TemplatePipe } from './template';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TemplatePipe', () => {
  let pipe: TemplatePipe;

  beforeEach(() => {
    pipe = new TemplatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null', () => {
    expect(pipe.transform(null as unknown as string, {})).toBe('');
  });

  it('should return empty for undefined', () => {
    expect(pipe.transform(undefined as unknown as string, {})).toBe('');
  });

  it('should return empty for non-string', () => {
    expect(pipe.transform(42 as unknown as string, {})).toBe('');
  });

  it('should leave value unchanged when no placeholders present', () => {
    expect(pipe.transform('plain text', { name: 'Alice' })).toBe('plain text');
  });

  it('should return string unchanged when values is null', () => {
    expect(pipe.transform('Hello {name}', null as unknown as Record<string, unknown>)).toBe('Hello {name}');
  });

  it('should replace a simple placeholder', () => {
    expect(pipe.transform('Hello {name}!', { name: 'Alice' })).toBe('Hello Alice!');
  });

  it('should replace multiple placeholders', () => {
    expect(pipe.transform('{greeting} {name}, age {age}', { greeting: 'Hi', name: 'Bob', age: 30 })).toBe('Hi Bob, age 30');
  });

  it('should handle numeric values', () => {
    expect(pipe.transform('Score: {value}', { value: 42 })).toBe('Score: 42');
  });

  it('should handle boolean values', () => {
    expect(pipe.transform('Active: {active}', { active: true })).toBe('Active: true');
  });

  it('should leave missing keys unchanged', () => {
    expect(pipe.transform('Hi {missing}!', { name: 'Alice' })).toBe('Hi {missing}!');
  });

  it('should leave placeholder unchanged for undefined value', () => {
    expect(pipe.transform('Hi {name}!', { name: undefined })).toBe('Hi {name}!');
  });

  it('should leave placeholder unchanged for null value', () => {
    expect(pipe.transform('Hi {name}!', { name: null })).toBe('Hi {name}!');
  });

  it('should resolve nested keys with dot notation', () => {
    expect(pipe.transform('Welcome {user.name}!', { user: { name: 'Carol' } })).toBe('Welcome Carol!');
  });

  it('should resolve deep nested keys', () => {
    expect(pipe.transform('{a.b.c}', { a: { b: { c: 'deep' } } })).toBe('deep');
  });

  it('should leave deeply missing key unchanged', () => {
    expect(pipe.transform('{a.b.c}', { a: { b: {} } })).toBe('{a.b.c}');
  });

  it('should replace the same placeholder multiple times', () => {
    expect(pipe.transform('{x} + {x} = {y}', { x: 2, y: 4 })).toBe('2 + 2 = 4');
  });

  it('should handle empty values object', () => {
    expect(pipe.transform('Hello {name}!', {})).toBe('Hello {name}!');
  });

  it('should handle empty string input', () => {
    expect(pipe.transform('', { name: 'Alice' })).toBe('');
  });

  it('should handle zero values correctly', () => {
    expect(pipe.transform('Count: {n}', { n: 0 })).toBe('Count: 0');
  });

  it('should not mutate the original template', () => {
    const original = 'Hello {name}!';
    pipe.transform(original, { name: 'Alice' });
    expect(original).toBe('Hello {name}!');
  });
});