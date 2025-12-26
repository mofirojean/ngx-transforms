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

  it('should mask credit card number', () => {
    expect(pipe.transform('1234567890123456')).toBe('**** **** **** 3456');
    expect(pipe.transform('1234-5678-9012-3456')).toBe('**** **** **** 3456');
  });

  it('should return input if less than 4 digits', () => {
    expect(pipe.transform('123')).toBe('123');
  });

  it('should handle empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle null/undefined input', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
