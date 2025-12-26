import { AsciiArtPipe } from './ascii-art';
import { describe, it, expect } from 'vitest';

describe('AsciiArtPipe', () => {
  it('create an instance', () => {
    const pipe = new AsciiArtPipe();
    expect(pipe).toBeTruthy();
  });
});
