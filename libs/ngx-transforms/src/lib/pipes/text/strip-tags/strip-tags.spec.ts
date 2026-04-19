import { StripTagsPipe } from './strip-tags';
import { describe, it, expect, beforeEach } from 'vitest';

describe('StripTagsPipe', () => {
  let pipe: StripTagsPipe;

  beforeEach(() => {
    pipe = new StripTagsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null value', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
  });

  it('should return empty for undefined value', () => {
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return empty for non-string value', () => {
    expect(pipe.transform(42 as unknown as string)).toBe('');
  });

  it('should return empty string unchanged', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should leave plain text unchanged', () => {
    expect(pipe.transform('plain text')).toBe('plain text');
  });

  it('should strip a single tag', () => {
    expect(pipe.transform('<p>Hello</p>')).toBe('Hello');
  });

  it('should strip multiple tags', () => {
    expect(pipe.transform('<p>Hi <b>there</b></p>')).toBe('Hi there');
  });

  it('should strip self-closing tag', () => {
    expect(pipe.transform('hello<br/>world')).toBe('helloworld');
  });

  it('should strip tags with attributes', () => {
    expect(pipe.transform('<a href="/x">link</a>')).toBe('link');
  });

  it('should strip script content', () => {
    expect(pipe.transform('<script>alert(1)</script>Safe')).toBe('Safe');
  });

  it('should strip style content', () => {
    expect(pipe.transform('<style>body{color:red}</style>Safe')).toBe('Safe');
  });

  it('should strip comments', () => {
    expect(pipe.transform('Before<!-- comment -->After')).toBe('BeforeAfter');
  });

  it('should strip multiline comments', () => {
    expect(pipe.transform('A<!-- multi\nline\ncomment -->B')).toBe('AB');
  });

  it('should strip DOCTYPE', () => {
    expect(pipe.transform('<!DOCTYPE html><p>Hi</p>')).toBe('Hi');
  });

  it('should preserve allowed tag', () => {
    expect(pipe.transform('<p>Hi <b>bold</b></p>', ['b'])).toBe('Hi <b>bold</b>');
  });

  it('should preserve multiple allowed tags', () => {
    expect(pipe.transform('<p>Hi <b>bold</b> and <i>italic</i></p>', ['b', 'i'])).toBe('Hi <b>bold</b> and <i>italic</i>');
  });

  it('should strip disallowed tags when allowlist is set', () => {
    expect(pipe.transform('<p>text</p><div>more</div>', ['p'])).toBe('<p>text</p>more');
  });

  it('should preserve allowed tag with attributes', () => {
    expect(pipe.transform('<a href="/x">link</a>', ['a'])).toBe('<a href="/x">link</a>');
  });

  it('should be case-insensitive for allowed tags', () => {
    expect(pipe.transform('<B>hi</B>', ['b'])).toBe('<B>hi</B>');
  });

  it('should treat empty allowlist as strip-all', () => {
    expect(pipe.transform('<p>Hi</p>', [])).toBe('Hi');
  });

  it('should preserve whitespace', () => {
    expect(pipe.transform('  <p>  hi  </p>  ')).toBe('    hi    ');
  });

  it('should handle nested tags', () => {
    expect(pipe.transform('<div><p><span>nested</span></p></div>')).toBe('nested');
  });

  it('should not mutate the original string', () => {
    const original = '<p>Hi</p>';
    pipe.transform(original);
    expect(original).toBe('<p>Hi</p>');
  });
});
