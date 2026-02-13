import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    basicSsl(),
    VitePWA({ 
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'classic'
      },
      
      manifest: {
        name: 'Knowntain',
        short_name: 'Knowntain',
        description: 'A biodiversity map',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',

        icons: [
          {
            src: 'forest.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'forest.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'forest.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})
