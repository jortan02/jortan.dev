import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['tests/setup.ts'],
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
      'config.json': path.resolve(rootDir, 'config.json'),
      'contentlayer/generated': path.resolve(rootDir, 'tests/mocks/contentlayer-generated.ts'),
      'next/font/google': path.resolve(rootDir, 'tests/mocks/next-font-google.ts'),
    },
  },
});


