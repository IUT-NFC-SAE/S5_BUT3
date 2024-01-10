import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
  server: {
    port: process.env.VUE_APP_PORT,
    host: process.env.VUE_APP_HOSTNAME,
  },
  plugins: [vue(),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [
        'vue-router'
      ]
    }
  },
  defines: {
    'process.env.SERVER_URL':  process.env.SERVER_PROTOCOLE + '://' + process.env.SERVER_HOSTNAME + ':' + process.env.SERVER_PORT,
    'process.env.VUE_APP_URL':  process.env.VUE_APP_PROTOCOLE + '://' + process.env.VUE_APP_HOSTNAME + ':' + process.env.VUE_APP_PORT
  },
});
