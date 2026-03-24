import { IpAddressMaskPipe } from './ip-address-mask';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IpAddressMaskPipe', () => {
  let pipe: IpAddressMaskPipe;

  beforeEach(() => {
    pipe = new IpAddressMaskPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should mask last two octets of IPv4 address', () => {
    expect(pipe.transform('192.168.1.1')).toBe('192.168.*.*');
  });

  it('should mask different IP addresses', () => {
    expect(pipe.transform('10.0.0.255')).toBe('10.0.*.*');
    expect(pipe.transform('172.16.254.1')).toBe('172.16.*.*');
    expect(pipe.transform('255.255.255.255')).toBe('255.255.*.*');
  });

  it('should handle localhost', () => {
    expect(pipe.transform('127.0.0.1')).toBe('127.0.*.*');
  });

  it('should return empty string unchanged', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return null/undefined unchanged', () => {
    expect(pipe.transform(null as any)).toBe(null as any);
    expect(pipe.transform(undefined as any)).toBe(undefined as any);
  });

  it('should return invalid IP unchanged', () => {
    expect(pipe.transform('invalid')).toBe('invalid');
    expect(pipe.transform('abc.def.ghi.jkl')).toBe('abc.def.ghi.jkl');
  });

  it('should return string with dots but invalid format unchanged', () => {
    expect(pipe.transform('1.2.3')).toBe('1.2.3');
    expect(pipe.transform('1.2.3.4.5')).toBe('1.2.3.4.5');
  });

  it('should not mask if shouldMask is false', () => {
    expect(pipe.transform('192.168.1.1', false)).toBe('192.168.1.1');
  });

  it('should mask by default (shouldMask defaults to true)', () => {
    expect(pipe.transform('8.8.8.8')).toBe('8.8.*.*');
  });
});
