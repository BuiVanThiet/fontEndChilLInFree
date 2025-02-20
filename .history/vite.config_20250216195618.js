// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis'
  },
  server: {
    host: true, // Cho phép truy cập từ mạng LAN (nếu cần)
    port: 300,
    allowedHosts: ['c88b-42-113-16-22.ngrok-free.app']
  }
})
