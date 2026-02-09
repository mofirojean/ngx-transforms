import { QrCodePipe } from './qr-code';
import { describe, it, expect, beforeEach } from 'vitest';

describe('QrCodePipe', () => {
  let pipe: QrCodePipe;

  beforeEach(() => {
    pipe = new QrCodePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a data URL for a given string', async () => {
    const data = await pipe.transform('hello world');
    expect(data).toMatch(/^data:image\/png;base64,/);
  });

  it('should return an empty string if no value is provided', async () => {
    const data = await pipe.transform('');
    expect(data).toBe('');
  });

  it('should return empty string for null input', async () => {
    const data = await pipe.transform(null as any);
    expect(data).toBe('');
  });

  it('should return empty string for undefined input', async () => {
    const data = await pipe.transform(undefined as any);
    expect(data).toBe('');
  });

  it('should generate different data URLs for different inputs', async () => {
    const data1 = await pipe.transform('hello');
    const data2 = await pipe.transform('world');
    expect(data1).not.toBe(data2);
  });

  it('should handle URL input', async () => {
    const data = await pipe.transform('https://example.com');
    expect(data).toMatch(/^data:image\/png;base64,/);
  });

  it('should handle special characters', async () => {
    const data = await pipe.transform('hello <world> & "test"');
    expect(data).toMatch(/^data:image\/png;base64,/);
  });

  it('should handle long input strings', async () => {
    const longInput = 'A'.repeat(500);
    const data = await pipe.transform(longInput);
    expect(data).toMatch(/^data:image\/png;base64,/);
  });

  it('should accept custom options', async () => {
    const data = await pipe.transform('test', { width: 200, margin: 2 });
    expect(data).toMatch(/^data:image\/png;base64,/);
  });

  it('should return a promise', () => {
    const result = pipe.transform('test');
    expect(result).toBeInstanceOf(Promise);
  });
});
