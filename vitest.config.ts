import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    deps: {
      inline: [/d3/, /d3-.*/],
    },
  },
});