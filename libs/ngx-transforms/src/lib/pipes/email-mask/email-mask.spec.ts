import { EmailMaskPipe } from './email-mask';
import { describe, it, expect, beforeEach } from 'vitest';

describe('EmailMaskPipe', () => {
  let pipe: EmailMaskPipe;

  beforeEach(() => {
    pipe = new EmailMaskPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should mask email correctly with long local part', () => {
    expect(pipe.transform('test@gmail.com')).toBe('t***t@gmail.com');
    expect(pipe.transform('john.doe@example.com')).toBe('j***e@example.com');
  });

  it('should handle short local part (2 chars)', () => {
    expect(pipe.transform('ab@gmail.com')).toBe('a***@gmail.com');
  });

  it('should handle single character local part', () => {
    expect(pipe.transform('a@gmail.com')).toBe('a***@gmail.com');
  });

  it('should preserve the domain part', () => {
    const result = pipe.transform('user@company.co.uk');
    expect(result).toContain('@company.co.uk');
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

  it('should return string without @ unchanged', () => {
    expect(pipe.transform('not-an-email')).toBe('not-an-email');
  });

  it('should handle email with numbers in local part', () => {
    const result = pipe.transform('user123@test.com');
    expect(result).toBe('u***3@test.com');
  });

  it('should handle email with special characters in local part', () => {
    const result = pipe.transform('user.name+tag@test.com');
    expect(result).toContain('@test.com');
    expect(result).toContain('***');
  });
});
