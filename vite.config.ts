import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/tv-shows-explorer/',
  plugins: [react()],
})
