import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL của backend server
        changeOrigin: true,  // Đảm bảo proxy không thay đổi host header
        // rewrite: (path) => path.replace(/^\/api/, ''),  // Thay đổi đường dẫn nếu cần thiết
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
