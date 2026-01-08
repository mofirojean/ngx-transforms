import { Route } from '@angular/router';
import { Landing } from './pages/landing';
import { Introduction } from './pages/introduction';
import { PipesPage } from './pages/pipes/pipes';
import { Count } from './pages/pipes/count';
import { JsonPretty } from './pages/pipes/json-pretty';
import { QrCode } from './pages/pipes/qrcode';
import { PipesList } from './pages/pipes/pipes-list';
import { Barcode } from './pages/pipes/barcode';
import { Replace } from './pages/pipes/replace';
import { Gravatar } from './pages/pipes/gravatar';
import { Reverse } from './pages/pipes/reverse';
import { MorseCode } from './pages/pipes/morse-code';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing,
    pathMatch: 'full',
  },
  {
    path: 'docs',
    component: PipesPage,
    children: [
      {
        path: 'introduction',
        component: Introduction,
      },
      {
        path: 'pipes',
        children: [
          {
            path: '',
            component: PipesList,
          },
          {
            path: 'count',
            component: Count,
          },
          {
            path: 'json-pretty',
            component: JsonPretty,
          },
          {
            path: 'qrcode',
            component: QrCode,
          },
          {
            path: 'barcode',
            component: Barcode,
          },
          {
            path: 'replace',
            component: Replace,
          },
          {
            path: 'gravatar',
            component: Gravatar,
          },
          {
            path: 'reverse',
            component: Reverse,
          },
          {
            path: 'morse-code',
            component: MorseCode,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
