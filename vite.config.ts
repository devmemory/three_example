import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [react()],
    build: {
      outDir: 'build'
    },
    resolve: {
      alias: {
        src: '/src'
      }
    },
    server: {
      port: 3000
    },
    esbuild: {
      drop: mode === 'build' ? ['console'] : undefined
    }
  };
});
