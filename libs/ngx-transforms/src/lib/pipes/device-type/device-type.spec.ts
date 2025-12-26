import { DeviceTypePipe } from './device-type';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('DeviceTypePipe', () => {
  let pipe: DeviceTypePipe;

  beforeEach(() => {
    pipe = new DeviceTypePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should detect mobile device', () => {
    const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)';
    expect(pipe.transform(mobileUA)).toBe('mobile');
  });

  it('should detect tablet device', () => {
    const tabletUA = 'Mozilla/5.0 (iPad; CPU OS 13_2_3 like Mac OS X)';
    expect(pipe.transform(tabletUA)).toBe('tablet');
  });

  it('should detect desktop device', () => {
    const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    expect(pipe.transform(desktopUA)).toBe('desktop');
  });

  it('should return unknown for empty user agent', () => {
    expect(pipe.transform('')).toBe('unknown');
  });

  it('should use navigator.userAgent by default', () => {
    const mockUserAgent = 'Mock User Agent';
    Object.defineProperty(window.navigator, 'userAgent', { value: mockUserAgent, writable: true });
    expect(pipe.transform()).not.toBe('unknown');
  });
});
