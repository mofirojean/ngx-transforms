import { Pipe, PipeTransform } from '@angular/core';

/**
 * SnakeCasePipe: Converts text to snake_case (e.g., "hello world" → "hello_world").
 *
 * @param {string} value - The input string to transform.
 * @returns {string} The string in snake_case, or an empty string if input is invalid.
 *
 * @example
 * ```html
 * {{ 'hello world' | snakeCase }} <!-- Outputs: hello_world -->
 * ```
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'snakeCase',
  standalone: true
})
export class SnakeCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || typeof value !== 'string') return '';
    return value
      .trim()
      .replace(/([A-Z])/g, '_$1') // Convert camelCase to snake_case (e.g., helloWorld -> hello_World)
      .toLowerCase() // Convert everything to lowercase
      .replace(/[\s-]+/g, '_') // Replace spaces and hyphens with underscores
      .replace(/[^a-z0-9_]+/g, '') // Remove all non-alphanumeric and non-underscore characters
      .replace(/_+/g, '_') // Collapse multiple underscores
      .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
  }
}
