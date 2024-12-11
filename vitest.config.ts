import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{ts,tsx}', 'tests/**/*.spec.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
  },
});
