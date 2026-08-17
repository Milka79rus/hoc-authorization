import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/hoc-authorization/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',

  },
});
