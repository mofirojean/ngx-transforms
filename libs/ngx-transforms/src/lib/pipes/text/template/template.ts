import { Pipe, PipeTransform } from '@angular/core';

/**
 * TemplatePipe: Replaces `{key}` placeholders in a string with values from an object.
 *
 * Supports dot notation for nested keys. Missing keys are left as-is.
 *
 * @param {string} value - The template string containing placeholders like `{name}`.
 * @param {Record<string, unknown>} [values={}] - Map of keys to replacement values.
 *
 * @returns {string} - The interpolated string, or empty string if input is invalid.
 *
 * @example
 * {{ 'Hello {name}!' | template:{name:'Alice'} }}            // 'Hello Alice!'
 * {{ '{user.name} is {user.age}' | template:{user:{name:'Bob',age:30}} }}  // 'Bob is 30'
 * {{ 'Hi {missing}!' | template:{name:'Alice'} }}            // 'Hi {missing}!'
 */
@Pipe({
  name: 'template',
  standalone: true,
})
export class TemplatePipe implements PipeTransform {

  transform(value: string, values: Record<string, unknown> = {}): string {
    if (typeof value !== 'string') return '';
    if (!values || typeof values !== 'object') return value;

    return value.replace(/\{([\w.]+)\}/g, (match, key: string) => {
      const resolved = this.getNestedValue(values, key);
      return resolved === undefined || resolved === null ? match : String(resolved);
    });
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}