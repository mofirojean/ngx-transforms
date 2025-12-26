import { GravatarPipe } from './gravatar';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import * as md5 from 'js-md5';

// Mock the entire js-md5 module
vi.mock('js-md5', () => ({
  default: vi.fn((value: string) => `mocked_hash_of_${value}`),
}));

describe('GravatarPipe', () => {
  let pipe: GravatarPipe;

  beforeEach(() => {
    pipe = new GravatarPipe();
    // Ensure md5 mock is reset before each test
    (md5.default as Mock).mockClear();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should generate Gravatar URL', () => {
    const result = pipe.transform('user@example.com', 100);
    expect(result).toContain('https://www.gravatar.com/avatar/');
    expect(result).toContain('s=100');
  });

  it('should handle empty input', () => {
    expect(pipe.transform('')).toBe('https://www.gravatar.com/avatar/?s=80');
  });

  it('should trim and lowercase the email before hashing', () => {
    const email = '  Test.User@EXAMPLE.COM  ';
    const processedEmail = 'test.user@example.com';
    pipe.transform(email);
    expect(md5.default).toHaveBeenCalledWith(processedEmail);
  });

  it('should return a default Gravatar URL if email is null', () => {
    expect(pipe.transform(null as any)).toBe('https://www.gravatar.com/avatar/?s=80');
    expect(md5.default).not.toHaveBeenCalled();
  });

  it('should return a default Gravatar URL if email is undefined', () => {
    expect(pipe.transform(undefined as any)).toBe('https://www.gravatar.com/avatar/?s=80');
    expect(md5.default).not.toHaveBeenCalled();
  });
});
