import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// eslint-disable-next-line no-unused-vars
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})
