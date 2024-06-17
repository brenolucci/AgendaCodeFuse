import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
// Configuração para ambiente de dev onde defino o início da rota /api chamando o env.VITE_API_ADDR ignorando o cors.
// OBS: Pesquisar como ficaria pro ambiente de produção. *****
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_ADDR,
          changeOrigin: true,
          cors: false,
          // Request para http://localhost/api/get-cadastro.php
          // vai ser redirecionada para VITE_API_ADDR/get-cadastro.php
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})