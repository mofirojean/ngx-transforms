# ngx-transforms

[![npm](https://img.shields.io/npm/v/ngx-transforms.svg)](https://www.npmjs.com/package/ngx-transforms)
[![Angular](https://img.shields.io/badge/Angular-17+-dd0031.svg)](https://angular.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 86+ standalone, tree-shakable Angular pipes for text, arrays, math, objects, and more.

**[Docs & live playground →](https://ngx-transforms.vercel.app)**

---

## Install

```bash
npm install ngx-transforms
```

## Use

```ts
import { Component } from '@angular/core';
import { TruncatePipe, TimeAgoPipePipe } from 'ngx-transforms';

@Component({
  standalone: true,
  imports: [TruncatePipe, TimeAgoPipePipe],
  template: `
    <p>{{ post.body | truncate:80 }}</p>
    <small>{{ post.createdAt | timeAgo }}</small>
  `,
})
export class PostCard {}
```

Every pipe is standalone — import only what you use, the rest is tree-shaken.

## What's inside

| Category     | Count | Examples                                                       |
| ------------ | ----- | -------------------------------------------------------------- |
| **Text**     | 27    | `truncate`, `slugify`, `latinize`, `template`, `wrap`          |
| **Array**    | 20    | `groupBy`, `orderBy`, `unique`, `chunk`, `intersection`        |
| **Math**     | 13    | `min`, `max`, `sum`, `average`, `bytes`, `percentage`          |
| **Object**   | 8     | `keys`, `pairs`, `pick`, `omit`, `invert`, `diffObj`           |
| **Data**     | 5     | `count`, `timeAgo`, `jsonPretty`, `device`, `textToSpeech`     |
| **Security** | 5     | `htmlSanitize`, `creditCardMask`, `emailMask`, `ipAddressMask` |
| **Media**    | 4     | `qrCode`, `barcode`, `gravatar`, `colorConvert`                |
| **Boolean**  | 4     | `isDefined`, `isNull`, `isString`, `isNumber`                  |

Full API reference at **[ngx-transforms.vercel.app](https://ngx-transforms.vercel.app)**.

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
