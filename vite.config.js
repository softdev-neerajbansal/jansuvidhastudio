import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api/ifsc.php?code=SBIN0005943 → https://ifsc.razorpay.com/SBIN0005943
      '/api/ifsc.php': {
        target: 'https://ifsc.razorpay.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          const qs    = path.split('?')[1] || ''
          const params = new URLSearchParams(qs)
          const code  = params.get('code') || ''
          return '/' + code
        },
      },

      // /api/pincode.php?pin=250001 → https://api.postalpincode.in/pincode/250001
      '/api/pincode.php': {
        target: 'https://api.postalpincode.in',
        changeOrigin: true,
        secure: false,   // bypass expired SSL cert on postalpincode.in
        rewrite: (path) => {
          const qs    = path.split('?')[1] || ''
          const params = new URLSearchParams(qs)
          const pin   = params.get('pin') || ''
          return '/pincode/' + pin
        },
      },

      // /api/postoffice.php?name=Meerut → https://api.postalpincode.in/postoffice/Meerut
      '/api/postoffice.php': {
        target: 'https://api.postalpincode.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const qs    = path.split('?')[1] || ''
          const params = new URLSearchParams(qs)
          const name  = params.get('name') || ''
          return '/postoffice/' + encodeURIComponent(name)
        },
      },
    },
  },
})
