import { WrapPipe } from './wrap';
import { describe, it, expect, beforeEach } from 'vitest';

describe('WrapPipe', () => {
  let pipe: WrapPipe;

  beforeEach(() => {
    pipe = new WrapPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null', () => {
    expect(pipe.transform(null as unknown as string, '[', ']')).toBe('');
  });

  it('should return empty for undefined', () => {
    expect(pipe.transform(undefined as unknown as string, '[', ']')).toBe('');
  });

  it('should return empty for non-string', () => {
    expect(pipe.transform(42 as unknown as string, '[', ']')).toBe('');
  });

  it('should wrap with brackets', () => {
    expect(pipe.transform('value', '[', ']')).toBe('[value]');
  });

  it('should wrap with angle brackets', () => {
    expect(pipe.transform('tag', '<', '>')).toBe('<tag>');
  });

  it('should use prefix as suffix when suffix omitted', () => {
    expect(pipe.transform('bold', '**')).toBe('**bold**');
  });

  it('should use prefix as suffix with double quotes', () => {
    expect(pipe.transform('hello', '"')).toBe('"hello"');
  });

  it('should handle no prefix or suffix', () => {
    expect(pipe.transform('value')).toBe('value');
  });

  it('should handle empty string input', () => {
    expect(pipe.transform('', '[', ']')).toBe('[]');
  });

  it('should handle empty prefix', () => {
    expect(pipe.transform('value', '', ']')).toBe('value]');
  });

  it('should handle empty suffix', () => {
    expect(pipe.transform('value', '[', '')).toBe('[value');
  });

  it('should handle multi-character prefix/suffix', () => {
    expect(pipe.transform('content', '<!-- ', ' -->')).toBe('<!-- content -->');
  });

  it('should handle unicode characters', () => {
    expect(pipe.transform('value', '« ', ' »')).toBe('« value »');
  });

  it('should handle asymmetric wrap', () => {
    expect(pipe.transform('item', '- ', '.')).toBe('- item.');
  });

  it('should handle newlines in prefix/suffix', () => {
    expect(pipe.transform('body', '\n', '\n')).toBe('\nbody\n');
  });

  it('should wrap a number-like string', () => {
    expect(pipe.transform('42', '(', ')')).toBe('(42)');
  });

  it('should not mutate the original string', () => {
    const original = 'value';
    pipe.transform(original, '[', ']');
    expect(original).toBe('value');
  });
});