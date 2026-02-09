import { CreditCardMaskPipe } from './credit-card-mask';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CreditCardMaskPipe', () => {
  let pipe: CreditCardMaskPipe;

  beforeEach(() => {
    pipe = new CreditCardMaskPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should mask a 16-digit credit card number', () => {
    expect(pipe.transform('1234567890123456')).toBe('**** **** **** 3456');
  });

  it('should mask a hyphenated credit card number', () => {
    expect(pipe.transform('1234-5678-9012-3456')).toBe('**** **** **** 3456');
  });

  it('should mask a spaced credit card number', () => {
    expect(pipe.transform('1234 5678 9012 3456')).toBe('**** **** **** 3456');
  });

  it('should mask a 15-digit card number (Amex-style)', () => {
    const result = pipe.transform('123456789012345');
    expect(result).toContain('345');
    expect(result).toContain('***');
  });

  it('should return input if less than 4 digits', () => {
    expect(pipe.transform('123')).toBe('123');
  });

  it('should handle exactly 4 digits', () => {
    const result = pipe.transform('1234');
    expect(result).toContain('1234');
  });

  it('should not mask when shouldMask is false', () => {
    expect(pipe.transform('1234567890123456', false)).toBe('1234567890123456');
  });

  it('should handle empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle null input', () => {
    expect(pipe.transform(null)).toBeNull();
  });

  it('should handle undefined input', () => {
    expect(pipe.transform(undefined)).toBeUndefined();
  });

  it('should mask a 13-digit card number', () => {
    const result = pipe.transform('1234567890123');
    expect(result).toContain('0123');
    expect(result).toContain('*');
  });
});
