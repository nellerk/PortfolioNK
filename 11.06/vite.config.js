import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/PortfolioNK/11.06/docs/',
    build: {
        outDir: 'docs',
        emptyOutDir: true
    }
})
