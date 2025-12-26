import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { JsonPrettyPipe } from './json-pretty';

describe('JsonPrettyPipe', () => {
  let pipe: JsonPrettyPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JsonPrettyPipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (value: string) => ({
              changingThisBreaksApplicationSecurity: value,
            }) as SafeHtml,
          },
        },
      ],
    });
    pipe = TestBed.inject(JsonPrettyPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format JSON string with default indentation', () => {
    const input = '{"name":"John","age":30}';
    const result = pipe.transform(input) as any;
    const html = result.changingThisBreaksApplicationSecurity;
    expect(html).toContain('<pre class="json-pretty">');
    expect(html).toContain('<span class="json-key">"name"</span>');
    expect(html).toContain('<span class="json-key">"age"</span>');
    expect(html).toContain('<span class="json-string">"John"</span>');
    expect(html).toContain('<span class="json-number">30</span>');
  });

  it('should format JSON object with custom indentation', () => {
    const input = { name: 'John', age: 30 };
    const result = pipe.transform(input, 4) as any;
    const html = result.changingThisBreaksApplicationSecurity;
    expect(html).toContain('<pre class="json-pretty">');
    expect(html).toMatch(/<span class="json-key">"name"<\/span>":\s+<span class="json-string">"John"<\/span>/); // Check 4-space indent
    expect(html).toMatch(/<span class="json-key">"age"<\/span>":\s+<span class="json-number">30<\/span>/);
  });

  it('should apply syntax highlighting', () => {
    const input = '{"name":"John","age":30,"active":true,"data":null}';
    const result = pipe.transform(input) as any;
    const html = result.changingThisBreaksApplicationSecurity;
    expect(html).toContain('<span class="json-key">"name"</span>');
    expect(html).toContain('<span class="json-string">"John"</span>');
    expect(html).toContain('<span class="json-number">30</span>');
    expect(html).toContain('<span class="json-boolean">true</span>');
    expect(html).toContain('<span class="json-null">null</span>');
    expect(html).toContain('<span class="json-punctuation">{</span>');
  });

  it('should handle invalid JSON', () => {
    const input = '{"name":"John",}';
    const result = pipe.transform(input) as any;
    const html = result.changingThisBreaksApplicationSecurity;
    expect(html).toContain('<span class="json-error">Invalid JSON');
  });

  it('should handle empty input', () => {
    const result = pipe.transform('') as any;
    const html = result.changingThisBreaksApplicationSecurity;
    expect(html).toContain('<span class="json-error">Invalid JSON');
  });

  it('should escape HTML characters', () => {
    const input = '{"name":"<script>alert(1)</script>"}';
    const result = pipe.transform(input) as any;
    const html = result.changingThisBreaksApplicationSecurity;
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<script>');
  });
});
