import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _platformId = inject(PLATFORM_ID);
  private _theme = signal<Theme>('system');
  public theme = this._theme.asReadonly();

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        this._theme.set(savedTheme);
      }
    }

    effect(() => {
      const theme = this._theme();
      if (!isPlatformBrowser(this._platformId)) return;

      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
      localStorage.setItem('theme', theme);
    });
  }

  setTheme(theme: Theme) {
    this._theme.set(theme);
  }
}
