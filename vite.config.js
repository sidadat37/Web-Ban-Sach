import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'] // Đảm bảo rằng Vite có thể xử lý cả .js và .jsx
  }
})
