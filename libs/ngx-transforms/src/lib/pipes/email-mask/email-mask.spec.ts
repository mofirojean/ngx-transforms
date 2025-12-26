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

  it('should return empty string for null input', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should mask email correctly', () => {
    expect(pipe.transform('test@gmail.com')).toBe('t***t@gmail.com');
    expect(pipe.transform('john.doe@example.com')).toBe('j***e@example.com');
  });

  it('should handle short local part', () => {
    expect(pipe.transform('ab@gmail.com')).toBe('a***@gmail.com');
  });

  it('should return invalid email unchanged', () => {
    expect(pipe.transform('not-an-email')).toBe('not-an-email');
  });
});
