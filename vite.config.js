import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://davidyuzhakov.github.io/calculator",
  plugins: [react()],
})
