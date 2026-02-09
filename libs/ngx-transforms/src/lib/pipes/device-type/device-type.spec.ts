import { DeviceTypePipe } from './device-type';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DeviceTypePipe', () => {
  let pipe: DeviceTypePipe;

  beforeEach(() => {
    pipe = new DeviceTypePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should detect iPhone as mobile', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)';
    expect(pipe.transform(ua)).toBe('mobile');
  });

  it('should detect Android phone as mobile', () => {
    const ua = 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 Mobile Safari/537.36';
    expect(pipe.transform(ua)).toBe('mobile');
  });

  it('should detect Windows Phone as mobile', () => {
    const ua = 'Mozilla/5.0 (Windows Phone 10.0; Android 6.0) Edge/12.0';
    expect(pipe.transform(ua)).toBe('mobile');
  });

  it('should detect BlackBerry as mobile', () => {
    const ua = 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en)';
    expect(pipe.transform(ua)).toBe('mobile');
  });

  it('should detect iPad as tablet', () => {
    const ua = 'Mozilla/5.0 (iPad; CPU OS 13_2_3 like Mac OS X)';
    expect(pipe.transform(ua)).toBe('tablet');
  });

  it('should detect Kindle as tablet', () => {
    const ua = 'Mozilla/5.0 (Linux; U; en-us; Kindle Fire Build/KFOT)';
    expect(pipe.transform(ua)).toBe('tablet');
  });

  it('should detect Kindle with Android UA as mobile (mobile regex matches first)', () => {
    const ua = 'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; Kindle Fire Build/KFOT)';
    expect(pipe.transform(ua)).toBe('mobile');
  });

  it('should detect desktop browser', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0';
    expect(pipe.transform(ua)).toBe('desktop');
  });

  it('should detect macOS as desktop', () => {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Safari/537.36';
    expect(pipe.transform(ua)).toBe('desktop');
  });

  it('should detect Linux as desktop', () => {
    const ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0';
    expect(pipe.transform(ua)).toBe('desktop');
  });

  it('should return unknown for empty user agent', () => {
    expect(pipe.transform('')).toBe('unknown');
  });

  it('should use navigator.userAgent by default', () => {
    // The default parameter reads navigator.userAgent
    const result = pipe.transform();
    expect(['mobile', 'tablet', 'desktop', 'unknown']).toContain(result);
  });
});
