import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// eslint-disable-next-line import/default
import eslintPlugin from 'vite-plugin-eslint';
import stylelitPlugin from 'vite-plugin-stylelint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      fix: true,
    }),
    stylelitPlugin({ fix: true }),
  ],
  server: {
    host: 'localhost',
    port: 7070,
    open: true,
  },
});
