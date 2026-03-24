import { InitialsPipe } from './initials';
import { describe, it, expect, beforeEach } from 'vitest';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should extract initials from two words', () => {
    expect(pipe.transform('John Doe')).toBe('JD');
  });

  it('should extract initials from three words', () => {
    expect(pipe.transform('Mary Jane Watson')).toBe('MJW');
  });

  it('should handle single name', () => {
    expect(pipe.transform('Alice')).toBe('A');
  });

  it('should handle lowercase input', () => {
    expect(pipe.transform('john doe')).toBe('JD');
  });

  it('should handle names with multiple spaces', () => {
    expect(pipe.transform('  Peter   Pan  ')).toBe('PP');
  });

  it('should handle tab-separated names', () => {
    expect(pipe.transform("John\tDoe")).toBe('JD');
  });

  it('should handle empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return empty string for null input', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should handle four or more names', () => {
    expect(pipe.transform('John Ronald Reuel Tolkien')).toBe('JRRT');
  });
});
