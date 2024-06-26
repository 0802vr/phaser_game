import { defineConfig } from 'vite'
import {getHtmlEntries} from './buildVite'
 
export default defineConfig({
  build: {
    rollupOptions: {
      input: getHtmlEntries()
    }
},
 
  server: {
    port: 3000,
    
    proxy: {
      '/api': {
        /* target: 'http://localhost:8081',*/
        target: 'http://5.35.87.68:8081',
        changeOrigin: true,
        ws: true
      },
      '/socket.io': {
        /* target: 'ws://localhost:8081', */
         target: 'ws://5.35.87.68:8081',
        ws: true,
      },
    }
  }
})

 

