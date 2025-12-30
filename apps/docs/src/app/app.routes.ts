import { Route } from '@angular/router';
import { Landing } from './pages/landing';
import { Introduction } from './pages/introduction';
import { PipesPage } from './pages/pipes/pipes';
import { Count } from './pages/pipes/count';
import { JsonPrettyPage } from './pages/pipes/json-pretty';
import { QrCode } from './pages/pipes/qrcode';
import { PipesList } from './pages/pipes/pipes-list';

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
            component: JsonPrettyPage,
          },
          {
            path: 'qrcode',
            component: QrCode,
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
