import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UnipeptVisualizations',
      fileName: (format) => `unipept-visualizations.js`,
      formats: ['es'],
    },
    sourcemap: true,
    outDir: 'dist',
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      // Test helpers and specs live under src/ so that `tsc` checks them, but
      // their declarations have no business in the published package.
      exclude: ['src/test/**', 'src/**/__tests__/**'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
});
