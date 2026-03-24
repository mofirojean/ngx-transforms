import { GravatarPipe } from './gravatar';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('js-md5', () => ({
  md5: vi.fn((value: string) => `mocked_hash_of_${value}`),
}));

import { md5 } from 'js-md5';

describe('GravatarPipe', () => {
  let pipe: GravatarPipe;

  beforeEach(() => {
    pipe = new GravatarPipe();
    vi.clearAllMocks();
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
    pipe.transform(email);
    expect(md5).toHaveBeenCalledWith('test.user@example.com');
  });

  it('should return a default Gravatar URL if email is null', () => {
    expect(pipe.transform(null as any)).toBe('https://www.gravatar.com/avatar/?s=80');
    expect(md5).not.toHaveBeenCalled();
  });

  it('should return a default Gravatar URL if email is undefined', () => {
    expect(pipe.transform(undefined as any)).toBe('https://www.gravatar.com/avatar/?s=80');
    expect(md5).not.toHaveBeenCalled();
  });

  it('should use default size of 80', () => {
    const result = pipe.transform('user@example.com');
    expect(result).toContain('s=80');
  });
});
