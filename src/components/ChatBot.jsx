import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Trash2, Loader2 } from 'lucide-react'
import { CHAT_API } from '../config.js'

const STORAGE_KEY = 'jss-chat-messages'

const SUGGESTIONS = [
  'What is an IFSC code?',
  'How do I find my PIN code?',
  'How can I check my Train PNR status?',
  'What documents do I need for a Voter ID?',
]

function loadHistory() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function ChatBot({ isDark }) {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState(loadHistory)
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const scrollRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) } catch { /* ignore quota errors */ }
  }, [messages])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function send(text) {
    const content = text.trim()
    if (!content || loading) return

    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setError('')
    setLoading(true)

    try {
      const res  = await fetch(CHAT_API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message || 'Could not reach the chat service. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    send(input)
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  function clearChat() {
    setMessages([])
    setError('')
    try { sessionStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg,#f97316,#16a34a)', boxShadow: 'var(--shadow-lg)' }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-[60] flex flex-col overflow-hidden"
          style={{
            bottom: '5.5rem', right: '1.25rem',
            width: 'min(22rem, calc(100vw - 2rem))',
            height: 'min(32rem, calc(100vh - 8rem))',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs"
                style={{ background: 'linear-gradient(135deg,#f97316,#16a34a)' }}>JS</div>
              <div className="leading-tight">
                <div className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>JanSuvidha Assistant</div>
                <div className="text-[10px]" style={{ color: 'var(--text-3)' }}>Ask about any of our services</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearChat} aria-label="Clear conversation"
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-3)' }}>
                <Trash2 size={15} />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close chat"
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-3)' }}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                  Hi! I can help you find IFSC/PIN codes, check PNR status, understand PAN/Aadhar/Voter ID
                  requirements, and more. Try asking:
                </p>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="text-left text-xs font-medium px-3 py-2 rounded-xl transition-colors"
                    style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap"
                  style={m.role === 'user'
                    ? { background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', borderBottomRightRadius: 4 }
                    : { background: 'var(--bg-subtle)', color: 'var(--text-1)', border: '1px solid var(--border)', borderBottomLeftRadius: 4 }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-3 py-2 flex items-center gap-2"
                  style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderBottomLeftRadius: 4 }}>
                  <Loader2 size={14} className="animate-spin" style={{ color: '#f97316' }} />
                  <span className="text-xs" style={{ color: 'var(--text-3)' }}>Thinking…</span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs rounded-xl px-3 py-2"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="flex items-end gap-2 px-3 py-3 flex-shrink-0"
            style={{ borderTop: '1px solid var(--border)' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your question…"
              rows={1}
              className="flex-1 resize-none text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-1)', maxHeight: '5rem' }}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40 transition-opacity"
              style={{ background: 'linear-gradient(135deg,#f97316,#16a34a)' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
