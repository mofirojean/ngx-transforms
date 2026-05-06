// Smoke test for multi-version Angular compatibility.
// This file replaces src/main.ts in a freshly-scaffolded `ng new` project
// (one per Angular major version 17, 19, 21).
//
// The pipes here are chosen to exercise different categories so any
// AOT-compiler / runtime regression surfaces:
//
//   - TruncatePipe         — simple sync pipe, baseline
//   - TimeAgoPipe          — Intl-dependent, locale handling
//   - HtmlSanitizePipe     — depends on DomSanitizer (platform-browser)
//   - QrCodePipe           — async pipe, returns Promise<string>
//   - IsEmptyPipe          — newest pipe (boolean category, ships 1.0)
//   - GroupByPipe          — heavier array transform
//
// If `ng build` succeeds against this file in all three Angular majors,
// the lib's "Angular 17–21" peer-dep range is verified.

import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  TruncatePipe,
  TimeAgoPipe,
  HtmlSanitizePipe,
  QrCodePipe,
  IsEmptyPipe,
  GroupByPipe,
} from 'ngx-transforms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    TruncatePipe,
    TimeAgoPipe,
    HtmlSanitizePipe,
    QrCodePipe,
    IsEmptyPipe,
    GroupByPipe,
  ],
  template: `
    <p>{{ longText | truncate: 20 }}</p>
    <p>{{ now | timeAgo }}</p>
    <div [innerHTML]="dirtyHtml | htmlSanitize"></div>
    <img [src]="(qrUrl | qrCode | async) ?? ''" alt="qr" />
    <p>{{ list | isEmpty }}</p>
    <pre>{{ records | groupBy: 'role' | json }}</pre>
  `,
})
export class AppComponent {
  longText = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
  now = new Date();
  dirtyHtml = '<b>safe</b><script>alert(1)</script>';
  qrUrl = 'https://ngx-transforms.vercel.app';
  list: string[] = [];
  records = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'user' },
    { name: 'Carol', role: 'admin' },
  ];
}

bootstrapApplication(AppComponent).catch((err) => console.error(err));
