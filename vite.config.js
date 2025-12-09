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
      
      manifest: {
        name: 'Knowntain',
        short_name: 'Knowntain',
        description: 'A biodiversity map',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
      }
    })
  ],
})
