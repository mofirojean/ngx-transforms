# ngx-transforms

[![npm](https://img.shields.io/npm/v/ngx-transforms.svg)](https://www.npmjs.com/package/ngx-transforms)
[![Angular](https://img.shields.io/badge/Angular-17+-dd0031.svg)](https://angular.dev)
[![gzip](https://img.shields.io/badge/gzip-28_KB-success.svg)](#bundle-size)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 90 standalone, tree-shakable Angular pipes for text, arrays, math, objects, and more.

**[Docs & live playground →](https://ngx-transforms.vercel.app)**

---

## Install

```bash
npm install ngx-transforms
```

## Use

```ts
import { Component } from '@angular/core';
import { TruncatePipe, TimeAgoPipe } from 'ngx-transforms';

@Component({
  standalone: true,
  imports: [TruncatePipe, TimeAgoPipe],
  template: `
    <p>{{ post.body | truncate:80 }}</p>
    <small>{{ post.createdAt | timeAgo }}</small>
  `,
})
export class PostCard {}
```

Every pipe is standalone meaning you import only what you use, the rest is tree-shaken.

## What's inside

| Category     | Count | Examples                                                       |
| ------------ | ----- | -------------------------------------------------------------- |
| **Text**     | 27    | `truncate`, `slugify`, `latinize`, `template`, `wrap`          |
| **Array**    | 20    | `groupBy`, `orderBy`, `unique`, `chunk`, `intersection`        |
| **Math**     | 13    | `min`, `max`, `sum`, `average`, `bytes`, `percentage`          |
| **Object**   | 8     | `keys`, `pairs`, `pick`, `omit`, `invert`, `diffObj`           |
| **Boolean**  | 8     | `isDefined`, `isString`, `isArray`, `isObject`, `isEmpty`      |
| **Data**     | 5     | `count`, `timeAgo`, `jsonPretty`, `device`, `textToSpeech`     |
| **Security** | 5     | `htmlSanitize`, `creditCardMask`, `emailMask`, `ipAddressMask` |
| **Media**    | 4     | `qrCode`, `barcode`, `gravatar`, `colorConvert`                |

Full API reference at **[ngx-transforms.vercel.app](https://ngx-transforms.vercel.app)**.

## Bundle size

The complete library includes all 90 pipes, and it is **27.9 KB gzipped** / **23.3 KB brotli**. What you actually ship is much smaller, because Angular's CLI tree-shakes any pipe you don't import.

| Measure              | Size     |
| -------------------- | -------- |
| FESM bundle (raw)    | 169 KB   |
| FESM bundle (gzip)   | 27.9 KB  |
| FESM bundle (brotli) | 23.3 KB  |

```ts
// Only TruncatePipe and its transitive imports lands in your bundle.
import { TruncatePipe } from 'ngx-transforms';
```

A handful of pipes pull their own dependencies — `qrCode` (qrcode), `barcode` (jsbarcode), `gravatar` (js-md5), `asciiArt` (ts-ascii-engine). If you skip those, the rest of the library is pure standalone-pipe code.

## Provide all at once

```ts
import { ALL_PIPES } from 'ngx-transforms';

bootstrapApplication(AppComponent, {
  providers: [ALL_PIPES],
});
```

## Compatibility

Supports **Angular 17–21**. Pipes use only the stable standalone-pipe API.

## License

MIT © [Mofiro Jean](https://github.com/mofirojean)
