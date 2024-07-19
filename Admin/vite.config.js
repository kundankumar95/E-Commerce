// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,  // Generate manifest.json
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.jsx'),  // Main entry point
    },
  },
  server: {
    hmr: {
      overlay: false,  // Disable HMR overlay
    },
    cors: true,  // Enable CORS
  },
});



