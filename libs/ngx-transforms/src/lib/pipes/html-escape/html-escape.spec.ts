import { HtmlEscapePipe } from './html-escape';
import { describe, it, expect, beforeEach } from 'vitest';

describe('HtmlEscapePipe', () => {
  let pipe: HtmlEscapePipe;

  beforeEach(() => {
    pipe = new HtmlEscapePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should escape HTML special characters', () => {
    const input = '<p>Hello & World</p>';
    const expected = '&lt;p&gt;Hello &amp; World&lt;/p&gt;';
    expect(pipe.transform(input)).toBe(expected);
  });

  it('should escape quotes and apostrophes', () => {
    const input = 'Quote " and apostrophe \'';
    const expected = 'Quote &quot; and apostrophe &apos;';
    expect(pipe.transform(input)).toBe(expected);
  });

  it('should handle plain text without special characters', () => {
    const input = 'Hello World';
    expect(pipe.transform(input)).toBe('Hello World');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return empty string for null input', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should escape complex HTML with multiple special characters', () => {
    const input = '<div class="test">&<script>alert("xss")</script></div>';
    const expected = '&lt;div class=&quot;test&quot;&gt;&amp;&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&lt;/div&gt;';
    expect(pipe.transform(input)).toBe(expected);
  });
});
