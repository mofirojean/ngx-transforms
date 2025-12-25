import { Route } from '@angular/router';
import { Landing } from './pages/landing';
import { Introduction } from './pages/introduction';
import { PipesPageComponent } from './pages/pipes/pipes';
import { Count } from './pages/pipes/count';
import { PipesList } from './pages/pipes/pipes-list';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing,
    pathMatch: 'full',
  },
  {
    path: 'docs',
    component: PipesPageComponent,
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
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
