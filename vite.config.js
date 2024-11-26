import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward all requests from /api to the backend server (adjust path as needed)
      '/getsUsers': 'http://localhost:3001', // Backend server URL
    },
  },
})
