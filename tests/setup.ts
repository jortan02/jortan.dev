import '@testing-library/jest-dom/vitest';
import React from 'react';
// Ensure React is globally available for classic JSX transforms in some test environments
// Not strictly necessary with jsx: automatic, but harmless.
// @ts-ignore
globalThis.React = React;

// Mock next/font to avoid calling into Next internals during tests
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'font-inter' }),
  JetBrains_Mono: () => ({ className: 'font-jetbrains' }),
}));

// Polyfill: Next.js may read these environment variables in API tests
process.env.HUGGINGFACE_API_KEY ||= 'test-hf';
process.env.QDRANT_URL ||= 'http://localhost:6333';
process.env.QDRANT_API_KEY ||= 'test-qdrant';
process.env.OPENROUTER_API_KEY ||= 'test-openrouter';

// Stub fetch if needed by tests (jsdom has fetch by default in Vitest >= v3)
// global.fetch = global.fetch ?? (async () => { throw new Error('fetch not mocked'); }) as any;


