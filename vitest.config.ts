import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{ts,tsx}', 'tests/**/*.spec.{ts,tsx}'],
    exclude: [
      'tests/excluded/**/*.test.{ts,tsx}',
      'tests/excluded/**/*.spec.{ts,tsx}',
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
