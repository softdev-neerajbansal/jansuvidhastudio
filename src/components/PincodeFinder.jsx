import { useState } from 'react'
import { Search, MapPin, AlertCircle, Package, Building } from 'lucide-react'
import AdBanner from './AdBanner.jsx'
import { PINCODE_API, POSTOFF_API } from '../config.js'

const TYPE_COLOR = {
  'Sub Post Office': '#f97316',
  'Head Post Office': '#16a34a',
  'Branch Post Office': '#3b82f6',
}

export default function PincodeFinder({ isDark }) {
  const [mode,    setMode]    = useState('pin')   // 'pin' | 'city'
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [meta,    setMeta]    = useState(null)

  const search = async () => {
    const q = query.trim()
    if (!q) return
    if (mode === 'pin' && !/^\d{6}$/.test(q)) {
      setError('Please enter a valid 6-digit PIN code'); setResults(null); return
    }
    setLoading(true); setError(''); setResults(null); setMeta(null)
    try {
      const url = mode === 'pin'
        ? `${PINCODE_API}?pin=${q}`
        : `${POSTOFF_API}?name=${encodeURIComponent(q)}`
      const res = await fetch(url, { headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(`Server error (${res.status}). Please try again.`)
      const json = await res.json()
      const item = json[0]
      if (!item || item.Status !== 'Success' || !item.PostOffice?.length) {
        throw new Error(`No results found for ${mode === 'pin' ? 'PIN code' : 'city'} "${q}". Please check and try again.`)
      }
      setResults(item.PostOffice)
      setMeta({ message: item.Message, count: item.PostOffice.length })
    } catch (e) {
      if (e.message.includes('fetch')) {
        setError('Network error — please check your internet connection and try again.')
      } else {
        setError(e.message)
      }
    }
    setLoading(false)
  }

  const POPULAR_PINS = [
    { city:'Meerut',    pin:'250001' },
    { city:'Delhi',     pin:'110001' },
    { city:'Mumbai',    pin:'400001' },
    { city:'Chennai',   pin:'600001' },
    { city:'Kolkata',   pin:'700001' },
    { city:'Bangalore', pin:'560001' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', color: '#16a34a' }}>
          📮 PIN Code Finder
        </div>
        <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Find <span style={{ background:'linear-gradient(135deg,#16a34a,#15803d)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>PIN Code</span> Details
        </h2>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Search post offices by PIN code or city name — get delivery status & location details
        </p>
      </div>

      {/* Top Ad */}
      <AdBanner size="leaderboard" />

      {/* Search card */}
      <div className="card p-6">
        {/* Mode toggle */}
        <div className="flex gap-2 p-1 rounded-xl mb-5"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9' }}>
          <button className={`mode-btn ${mode === 'pin' ? 'active' : ''}`} onClick={() => { setMode('pin'); setQuery(''); setResults(null); setError('') }}>
            🔢 By PIN Code
          </button>
          <button className={`mode-btn ${mode === 'city' ? 'active' : ''}`} onClick={() => { setMode('city'); setQuery(''); setResults(null); setError('') }}>
            🏙 By City / Post Office
          </button>
        </div>

        <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {mode === 'pin' ? 'Enter 6-Digit PIN Code' : 'Enter City or Post Office Name'}
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              className={`inp ${mode === 'pin' ? 'font-mono tracking-widest text-lg' : ''}`}
              placeholder={mode === 'pin' ? 'e.g. 250001' : 'e.g. Meerut, Laxmi Nagar'}
              value={query}
              onChange={e => { setQuery(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && search()}
              maxLength={mode === 'pin' ? 6 : 60}
              type="text"
              inputMode={mode === 'pin' ? 'numeric' : 'text'}
            />
          </div>
          <button className="btn-green px-8" onClick={search} disabled={loading}>
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner" /> : <><Search size={16} /> Search</>}
          </button>
        </div>

        {/* Popular pins */}
        {mode === 'pin' && (
          <div className="mt-4">
            <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>POPULAR CITIES:</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_PINS.map(({ city, pin }) => (
                <button key={pin} onClick={() => { setQuery(pin); setMode('pin') }}
                  className="btn-ghost text-xs py-1.5 px-3"
                  style={{ borderColor: 'rgba(22,163,74,0.2)', color: isDark ? '#4ade80' : '#16a34a', background: 'rgba(22,163,74,0.08)' }}
                >{city} — {pin}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="flex flex-col gap-4">
          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500" />
              <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {meta.count} Post Office{meta.count > 1 ? 's' : ''} Found
              </span>
              {results[0]?.Pincode && (
                <span className="ml-2 px-3 py-0.5 rounded-full text-xs font-black font-mono"
                  style={{ background: 'rgba(22,163,74,0.12)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.25)' }}>
                  PIN: {results[0].Pincode}
                </span>
              )}
            </div>
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {results[0]?.State}, {results[0]?.Country}
            </span>
          </div>

          {/* Summary card */}
          <div className="card p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full"
              style={{ background: 'radial-gradient(circle,#16a34a,transparent)', transform: 'translate(30%,-30%)' }} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'District',  val: results[0]?.District },
                { label: 'Division',  val: results[0]?.Division },
                { label: 'Region',    val: results[0]?.Region },
                { label: 'State',     val: results[0]?.State },
              ].map(({ label, val }) => (
                <div key={label} className="text-center">
                  <div className={`text-xs font-semibold mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</div>
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{val || 'N/A'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* In-article ad */}
          <AdBanner size="in-article" />

          {/* Post offices grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((po, i) => {
              const color = TYPE_COLOR[po.BranchType] || '#6366f1'
              return (
                <div key={i} className="po-card">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                        style={{ background: `${color}22`, border: `1.5px solid ${color}40`, color }}>
                        📮
                      </div>
                      <div>
                        <div className={`text-sm font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{po.Name}</div>
                        <div className="text-xs mt-0.5" style={{ color }}>{po.BranchType}</div>
                      </div>
                    </div>
                    <span className={po.DeliveryStatus === 'Delivery' ? 'badge-yes' : 'badge-no'} style={{ flexShrink:0 }}>
                      {po.DeliveryStatus === 'Delivery' ? '✓ Delivery' : '✗ No Delivery'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { label: 'Block',     val: po.Block },
                      { label: 'Taluk',     val: po.Taluk },
                      { label: 'Circle',    val: po.Circle },
                      { label: 'PIN Code',  val: po.Pincode },
                    ].map(({ label, val }) => val && val !== 'NA' ? (
                      <div key={label} className="flex gap-2 text-xs">
                        <span className={`w-16 flex-shrink-0 font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</span>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{val}</span>
                      </div>
                    ) : null)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Info box */}
      {!results && !error && !loading && (
        <div className="card p-6 text-center">
          <div className="text-5xl mb-4">📮</div>
          <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>What is a PIN Code?</h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            PIN (Postal Index Number) is a 6-digit code used by India Post to identify each delivery area.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-left">
            {[
              { icon:'1️⃣', title:'First Digit', desc:'Identifies one of 9 postal zones in India' },
              { icon:'2️⃣', title:'Second Digit', desc:'Identifies the sub-zone within that region' },
              { icon:'3️⃣', title:'Next 4 Digits', desc:'Uniquely identify the post office in that sub-zone' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-4 rounded-xl"
                style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', border: isDark ? '1px solid rgba(22,163,74,0.1)' : '1px solid #e5e7eb' }}>
                <div className="text-2xl mb-2">{icon}</div>
                <div className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</div>
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
