import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: 'path-browserify', // Alias 'path' to 'path-browserify' for browser compatibility
      fs: false, // Exclude or set to false to avoid importing 'fs'
    },
  },
});

