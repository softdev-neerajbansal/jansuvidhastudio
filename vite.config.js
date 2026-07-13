import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const CHAT_SYSTEM_PROMPT = `You are the help assistant embedded on JanSuvidhaStudio, a free Indian public-services website.
The site offers: IFSC code finder, PIN code & post office finder, PAN card validator, UPI ID checker,
Train PNR status checker, Govt Jobs listings, Sarkari Result checker, Ration Card status check,
Voter ID search, and Aadhar card services — all free, no login required.

Help visitors find the right tool and answer general questions about these topics (banking codes,
postal system, PAN/Aadhar/Voter ID basics, train travel, government jobs and exams). When relevant,
tell the user which section of the site to open (e.g. "Open the IFSC Code Finder tab").
Keep answers short and clear — this is a small chat widget, not a long-form article.
If asked something unrelated to these services or to India-related public information, politely
redirect to what the site can help with. Never ask for or store sensitive personal data (full PAN,
Aadhar number, bank account numbers) — explain the user can look these up directly in the relevant tool.`

// Dev-only stand-in for public/api/chat.php (no local PHP server available under `vite dev`).
// Mirrors the PHP endpoint's request/response contract exactly; production always uses the real PHP file.
function chatDevMiddleware(apiKey) {
  return {
    name: 'chat-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/chat.php', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('{"error":"Method not allowed"}'); return }
        if (!apiKey) { res.statusCode = 500; res.end(JSON.stringify({ error: 'Set GEMINI_API_KEY in .env to use the chat widget locally.' })); return }

        let raw = ''
        req.on('data', (chunk) => { raw += chunk })
        req.on('end', async () => {
          try {
            const payload  = JSON.parse(raw || '{}')
            const messages = (Array.isArray(payload.messages) ? payload.messages : [])
              .slice(-10)
              .filter(m => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string' && m.content.trim() !== '')
              .map(m => ({ role: m.role, content: m.content.trim().slice(0, 2000) }))

            if (!messages.length || messages[messages.length - 1].role !== 'user') {
              res.statusCode = 400; res.end('{"error":"No message provided"}'); return
            }

            const model = 'gemini-2.0-flash'
            const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: { parts: [{ text: CHAT_SYSTEM_PROMPT }] },
                contents: messages.map(m => ({
                  role: m.role === 'assistant' ? 'model' : 'user',
                  parts: [{ text: m.content }],
                })),
                generationConfig: { maxOutputTokens: 1024 },
              }),
            })
            const data = await upstream.json()

            if (!upstream.ok) {
              res.statusCode = upstream.status
              res.end(JSON.stringify({ error: data?.error?.message || 'Chat service error.' }))
              return
            }

            let reply = ''
            const parts = data?.candidates?.[0]?.content?.parts
            if (parts) {
              reply = parts.filter(p => p.text).map(p => p.text).join('')
            } else if (data?.promptFeedback?.blockReason) {
              reply = "I can't help with that. Try asking about one of our services instead."
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ reply: reply || "Sorry, I didn't catch that — could you rephrase?" }))
          } catch (e) {
            res.statusCode = 502
            res.end(JSON.stringify({ error: 'Could not reach the chat service.' }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [react(), chatDevMiddleware(env.GEMINI_API_KEY)],
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
  }
})
