import { TruncatePipe } from './truncate';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for invalid input', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should return original string if shorter than maxlength', () => {
    expect(pipe.transform('Hello', 10)).toBe('Hello');
    expect(pipe.transform('Hi', 5)).toBe('Hi');
  });

  it('should truncate with default settings', () => {
    expect(pipe.transform('Hello world!', 5)).toBe('He...');
  });

  it('should truncate at word boundary when preserveWords is true', () => {
    expect(pipe.transform('This is a test', 7, '...', true)).toBe('This...');
    expect(pipe.transform('Hello world', 8, '...', true)).toBe('Hello...');
  });

  it('should use custom ellipsis', () => {
    expect(pipe.transform('Hello world', 5, '***')).toBe('He***');
  });

  it('should truncate a string to default max length (10) with default ellipsis', () => {
    expect(pipe.transform('This is a long sentence')).toBe('This is...');
  });

  it('should truncate a string to specified max length with default ellipsis', () => {
    expect(pipe.transform('This is a long sentence', 20)).toBe('This is a long se...');
  });

  it('should truncate a string to specified max length with custom ellipsis', () => {
    expect(pipe.transform('This is a long sentence', 15, ' [more]')).toBe('This is [more]');
  });
});
