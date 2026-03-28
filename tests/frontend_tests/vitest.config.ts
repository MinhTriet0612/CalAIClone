import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup.ts'],
    include: [
      './unit/**/*.test.ts',
      './unit/**/*.test.tsx',
      './components/**/*.test.ts',
      './components/**/*.test.tsx',
    ],
    coverage: {
      provider: 'v8',
      include: ['../../frontend/src/**/*.{ts,tsx}'],
      exclude: [
        '../../frontend/src/main.tsx',
        '../../frontend/src/vite-env.d.ts',
      ],
      thresholds: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': '../../frontend/src',
    },
  },
});
