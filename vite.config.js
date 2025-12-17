import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|js)$/, // .js 파일도 JSX로 처리
      jsxRuntime: 'automatic', // 자동 JSX 변환
    })
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // src 폴더의 .js 파일도 JSX로 처리
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  base: '/makkong1-github.io/'  // 유저 페이지라서 / 로 두면 됨
})
