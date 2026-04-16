import { BytesPipe } from './bytes';
import { describe, it, expect, beforeEach } from 'vitest';

describe('BytesPipe', () => {
  let pipe: BytesPipe;

  beforeEach(() => {
    pipe = new BytesPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return undefined for null value', () => {
    expect(pipe.transform(null as unknown as number)).toBeUndefined();
  });

  it('should return undefined for undefined value', () => {
    expect(pipe.transform(undefined as unknown as number)).toBeUndefined();
  });

  it('should return undefined for NaN value', () => {
    expect(pipe.transform(NaN)).toBeUndefined();
  });

  it('should return undefined for non-number value', () => {
    expect(pipe.transform('abc' as unknown as number)).toBeUndefined();
  });

  it('should return undefined for negative value', () => {
    expect(pipe.transform(-100)).toBeUndefined();
  });

  it('should return "0 B" for 0', () => {
    expect(pipe.transform(0)).toBe('0 B');
  });

  // Decimal (1000-based) tests
  it('should format bytes', () => {
    expect(pipe.transform(500)).toBe('500.0 B');
  });

  it('should format kilobytes', () => {
    expect(pipe.transform(1500)).toBe('1.5 KB');
  });

  it('should format megabytes', () => {
    expect(pipe.transform(1500000)).toBe('1.5 MB');
  });

  it('should format gigabytes', () => {
    expect(pipe.transform(1500000000)).toBe('1.5 GB');
  });

  it('should format terabytes', () => {
    expect(pipe.transform(1500000000000)).toBe('1.5 TB');
  });

  it('should format petabytes', () => {
    expect(pipe.transform(1500000000000000)).toBe('1.5 PB');
  });

  it('should format exactly 1 KB', () => {
    expect(pipe.transform(1000)).toBe('1.0 KB');
  });

  it('should format exactly 1 MB', () => {
    expect(pipe.transform(1000000)).toBe('1.0 MB');
  });

  // Decimal precision
  it('should format with 0 decimals', () => {
    expect(pipe.transform(1536, 0)).toBe('2 KB');
  });

  it('should format with 2 decimals', () => {
    expect(pipe.transform(1048576, 2)).toBe('1.05 MB');
  });

  it('should format with 3 decimals', () => {
    expect(pipe.transform(1536, 3)).toBe('1.536 KB');
  });

  // Binary (1024-based) tests
  it('should format binary kilobytes', () => {
    expect(pipe.transform(1024, 1, 'binary')).toBe('1.0 KiB');
  });

  it('should format binary megabytes', () => {
    expect(pipe.transform(1048576, 1, 'binary')).toBe('1.0 MiB');
  });

  it('should format binary gigabytes', () => {
    expect(pipe.transform(1073741824, 1, 'binary')).toBe('1.0 GiB');
  });

  it('should format 1536 bytes in binary', () => {
    expect(pipe.transform(1536, 1, 'binary')).toBe('1.5 KiB');
  });

  it('should format binary with 2 decimals', () => {
    expect(pipe.transform(1073741824, 2, 'binary')).toBe('1.00 GiB');
  });

  // Edge cases
  it('should handle 1 byte', () => {
    expect(pipe.transform(1)).toBe('1.0 B');
  });

  it('should handle 999 bytes', () => {
    expect(pipe.transform(999)).toBe('999.0 B');
  });

  it('should handle very large numbers', () => {
    const result = pipe.transform(5e18);
    expect(result).toBe('5.0 EB');
  });
});
