# ngx-transforms

[![npm version](https://img.shields.io/npm/v/ngx-transforms.svg)](https://www.npmjs.com/package/ngx-transforms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-21+-dd0031.svg)](https://angular.dev)

A collection of **standalone Angular pipes** for common data transformations such as text formatting, masking, encoding, sanitization, and more.

## Installation

```bash
npm install ngx-transforms
```

### Peer Dependencies

This library requires Angular 17+:

```bash
npm install @angular/core @angular/platform-browser
```

## Quick Start

All pipes are **standalone** and are tree-shakable, so import only what you need directly into your component:

```typescript
import { Component } from '@angular/core';
import { CamelCasePipe, ReversePipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CamelCasePipe, ReversePipe],
  template: `
    <p>{{ 'hello world' | camelCase }}</p>   <!-- helloWorld -->
    <p>{{ 'angular' | reverse }}</p>          <!-- ralunga -->
  `,
})
export class ExampleComponent {}
```

## Available Pipes

### Text Transformation

| Pipe | Template Name | Description | Example |
|------|--------------|-------------|---------|
| `CamelCasePipe` | `camelCase` | Converts text to camelCase | `{{ 'hello world' \| camelCase }}` &rarr; `helloWorld` |
| `KebabCasePipe` | `kebabCase` | Converts text to kebab-case | `{{ 'hello world' \| kebabCase }}` &rarr; `hello-world` |
| `SnakeCasePipe` | `snakeCase` | Converts text to snake_case | `{{ 'hello world' \| snakeCase }}` &rarr; `hello_world` |
| `TitleCasePipe` | `titleCase` | Capitalizes first letter of each word | `{{ 'hello world' \| titleCase }}` &rarr; `Hello World` |
| `ReversePipe` | `reverse` | Reverses characters in a string | `{{ 'hello' \| reverse }}` &rarr; `olleh` |
| `TruncatePipe` | `truncate` | Truncates text to a max length | `{{ 'long text here' \| truncate:8 }}` &rarr; `long tex...` |
| `InitialsPipe` | `initials` | Extracts initials from a name | `{{ 'John Doe' \| initials }}` &rarr; `JD` |
| `CountPipe` | `count` | Counts elements in arrays, strings, or object keys | `{{ [1,2,3] \| count }}` &rarr; `3` |

### Data Masking

| Pipe | Template Name | Description | Example |
|------|--------------|-------------|---------|
| `CreditCardMaskPipe` | `creditCardMask` | Masks all but last 4 digits | `{{ '4111111111111111' \| creditCardMask }}` &rarr; `************1111` |
| `EmailMaskPipe` | `emailMask` | Masks the local part of an email | `{{ 'john@example.com' \| emailMask }}` &rarr; `j***n@example.com` |
| `IpAddressMaskPipe` | `ipAddressMask` | Masks last two octets of IPv4 | `{{ '192.168.1.1' \| ipAddressMask }}` &rarr; `192.168.*.*` |

### Encoding & Generation

| Pipe | Template Name | Description | Example |
|------|--------------|-------------|---------|
| `QrCodePipe` | `qrCode` | Generates a QR code data URL | `<img [src]="'data' \| qrCode \| async" />` |
| `BarcodePipe` | `barcode` | Generates a barcode (SVG/img/canvas) | `<div [innerHTML]="'123' \| barcode \| async"></div>` |
| `MorseCodePipe` | `morseCode` | Converts text to Morse code | `{{ 'SOS' \| morseCode }}` &rarr; `... --- ...` |
| `AsciiArtPipe` | `asciiArt` | Converts text to ASCII art | `{{ 'HI' \| asciiArt }}` |
| `GravatarPipe` | `gravatar` | Generates Gravatar URL from email | `<img [src]="email \| gravatar:100" />` |
| `ColorConvertPipe` | `colorConvert` | Converts colors between HEX, RGB, RGBA | `{{ '#FF0000' \| colorConvert:'rgb' }}` &rarr; `rgb(255, 0, 0)` |

### HTML & Security

| Pipe | Template Name | Description | Example |
|------|--------------|-------------|---------|
| `HtmlSanitizePipe` | `htmlSanitize` | Sanitizes HTML, removing unsafe elements | `<div [innerHTML]="html \| htmlSanitize"></div>` |
| `HtmlEscapePipe` | `htmlEscape` | Escapes HTML special characters | `{{ '<b>bold</b>' \| htmlEscape }}` &rarr; `&lt;b&gt;bold&lt;/b&gt;` |
| `HighlightPipe` | `highlight` | Highlights search term matches in text | `<span [innerHTML]="text \| highlight:'term'"></span>` |
| `JsonPrettyPipe` | `jsonPretty` | Formats JSON with syntax highlighting | `<pre [innerHTML]="data \| jsonPretty"></pre>` |
| `ReplacePipe` | `replace` | Replaces or highlights text by pattern | `{{ 'hello' \| replace:'ello':'ola' }}` &rarr; `hola` |

### Device & Browser

| Pipe | Template Name | Description | Example |
|------|--------------|-------------|---------|
| `DeviceTypePipe` | `device` | Detects device type (mobile/tablet/desktop) | `{{ '' \| device }}` &rarr; `desktop` |
| `TextToSpeechPipe` | `textToSpeech` | Speaks text using the Web Speech API | `<button (click)="speak('Hello' \| textToSpeech)">` |

## Provide All Pipes

To make all pipes available via dependency injection:

```typescript
import { ALL_PIPES } from 'ngx-transforms';

bootstrapApplication(AppComponent, {
  providers: [ALL_PIPES],
});
```

## Angular Compatibility

| ngx-transforms | Angular |
|----------|---------|
| 0.0.x    | 17+     |

## License

[MIT](./LICENSE) - Mofiro Jean
