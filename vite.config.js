import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/makkong1-github.io/'  // 유저 페이지라서 / 로 두면 됨
})
