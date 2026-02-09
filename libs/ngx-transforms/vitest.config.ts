/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: 'libs/ngx-transforms/tsconfig.spec.json',
    }),
  ],
  test: {
    globals: true,
    setupFiles: ['libs/ngx-transforms/src/test-setup.ts'],
    environment: 'jsdom',
    include: ['libs/ngx-transforms/src/**/*.spec.ts'],
    reporters: ['default'],
  },
});
