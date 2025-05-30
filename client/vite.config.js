import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: `${import.meta.env.VITE_PORT}`,
  //   proxy: {
  //     "/api": {
  //       target: `${import.meta.env.VITE_BACKEND_URL}`,
  //     }
  //   }
  // }
})
