import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const UPI_HANDLES = {
  '@ybl':         { app:'PhonePe',       bank:'Yes Bank Limited',         icon:'💜' },
  '@ibl':         { app:'PhonePe',       bank:'IndusInd Bank',            icon:'💜' },
  '@axl':         { app:'PhonePe',       bank:'Axis Bank',                icon:'💜' },
  '@oksbi':       { app:'Google Pay',    bank:'State Bank of India',      icon:'🔵' },
  '@okaxis':      { app:'Google Pay',    bank:'Axis Bank',                icon:'🔵' },
  '@okicici':     { app:'Google Pay',    bank:'ICICI Bank',               icon:'🔵' },
  '@okhdfcbank':  { app:'Google Pay',    bank:'HDFC Bank',                icon:'🔵' },
  '@paytm':       { app:'Paytm',         bank:'Paytm Payments Bank',      icon:'🔷' },
  '@ptyes':       { app:'Paytm',         bank:'Yes Bank',                 icon:'🔷' },
  '@sbi':         { app:'YONO / SBI Pay',bank:'State Bank of India',      icon:'🏦' },
  '@hdfcbank':    { app:'HDFC Bank',     bank:'HDFC Bank',                icon:'🏦' },
  '@icici':       { app:'iMobile',       bank:'ICICI Bank',               icon:'🏦' },
  '@upi':         { app:'BHIM',          bank:'Multiple Banks (NPCI)',     icon:'🇮🇳' },
  '@naviaxis':    { app:'Navi',          bank:'Axis Bank',                icon:'🟢' },
  '@fbl':         { app:'Federal Bank',  bank:'Federal Bank',             icon:'🏦' },
  '@kotak':       { app:'Kotak',         bank:'Kotak Mahindra Bank',      icon:'🏦' },
  '@pnb':         { app:'PNB One',       bank:'Punjab National Bank',     icon:'🏦' },
  '@cnrb':        { app:'Canara Bank',   bank:'Canara Bank',              icon:'🏦' },
  '@barodampay':  { app:'Baroda MPay',   bank:'Bank of Baroda',           icon:'🏦' },
  '@rbl':         { app:'RBL Bank',      bank:'RBL Bank',                 icon:'🏦' },
  '@idbi':        { app:'IDBI Bank',     bank:'IDBI Bank',                icon:'🏦' },
  '@uboi':        { app:'Union Bank',    bank:'Union Bank of India',      icon:'🏦' },
  '@jupiteraxis': { app:'Jupiter',       bank:'Axis Bank',                icon:'🟣' },
  '@fi':          { app:'Fi Money',      bank:'Federal Bank',             icon:'🟢' },
  '@slice':       { app:'slice',         bank:'Multiple Banks',           icon:'⬛' },
  '@amazonpay':   { app:'Amazon Pay',    bank:'Axis Bank',                icon:'🟠' },
  '@apl':         { app:'Amazon Pay',    bank:'Airtel Payments Bank',     icon:'🔴' },
  '@airtel':      { app:'Airtel Money',  bank:'Airtel Payments Bank',     icon:'🔴' },
  '@jiojiogo':    { app:'JioMoney',      bank:'SBI',                      icon:'🔵' },
  '@cred':        { app:'CRED',          bank:'Multiple Banks',           icon:'⬛' },
}

function validateUPI(upi) {
  const u = upi.trim().toLowerCase()
  if (!u) return null
  if (!u.includes('@')) return { valid:false, msg:'UPI ID must contain @ symbol. Format: username@handle' }
  const parts = u.split('@')
  if (parts.length !== 2) return { valid:false, msg:'Invalid format — UPI ID must have exactly one @' }
  const [local, handle] = parts
  if (!local) return { valid:false, msg:'Username before @ cannot be empty' }
  if (local.length < 3) return { valid:false, msg:'Username must be at least 3 characters' }
  if (!/^[a-z0-9._-]+$/.test(local)) return { valid:false, msg:'Username can only contain letters, digits, dots, hyphens and underscores' }
  const full = `@${handle}`
  const bankInfo = UPI_HANDLES[full]
  return {
    valid: true,
    username: local,
    handle: full,
    app: bankInfo?.app || 'Unknown App',
    bank: bankInfo?.bank || 'Unknown Bank',
    icon: bankInfo?.icon || '🏦',
    known: !!bankInfo,
    upi: u,
  }
}

export default function UPIChecker({ isDark }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const cls = isDark

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', color:'#10b981' }}>
          💳 UPI ID Checker
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          Verify Your <span style={{ background:'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>UPI ID</span>
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Validate format and identify bank/app from UPI handle</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="card p-6 flex flex-col gap-4">
        <label className={`block text-sm font-semibold mb-1 ${cls?'text-slate-300':'text-slate-700'}`}>Enter UPI ID</label>
        <div className="flex gap-3">
          <input className="inp font-mono text-lg flex-1" placeholder="e.g. yourname@oksbi"
            value={input} onChange={e => { setInput(e.target.value.toLowerCase()); setResult(null) }}
            onKeyDown={e => e.key==='Enter' && setResult(validateUPI(input))} />
          <button className="btn-saffron px-8" style={{ background:'linear-gradient(135deg,#10b981,#059669)' }}
            onClick={() => setResult(validateUPI(input))}>
            Verify
          </button>
        </div>
      </div>

      {result && (
        result.valid ? (
          <div className="card p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle size={28} className="text-emerald-500" />
              <div>
                <div className={`font-black text-xl ${cls?'text-white':'text-slate-900'}`}>Valid UPI ID</div>
                <div className="text-emerald-500 font-mono font-semibold">{result.upi}</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label:'UPI Username', val:result.username, icon:'👤' },
                { label:'UPI Handle', val:result.handle, icon:'🔗' },
                { label:'Payment App', val:result.app, icon:result.icon },
                { label:'Bank / PSP', val:result.bank, icon:'🏦' },
              ].map(({ label, val, icon }) => (
                <div key={label} className="p-4 rounded-xl flex items-start gap-3" style={{ background:isDark?'rgba(16,185,129,0.06)':'#f0fdf4', border:isDark?'1px solid rgba(16,185,129,0.15)':'1px solid #d1fae5' }}>
                  <span className="text-xl">{icon}</span>
                  <div>
                    <div className={`text-xs font-semibold mb-0.5 ${cls?'text-slate-400':'text-slate-500'}`}>{label}</div>
                    <div className={`font-bold text-sm ${cls?'text-white':'text-slate-900'}`}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            {!result.known && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-sm" style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)' }}>
                <span>⚠️</span>
                <span className="text-amber-500">Handle @{result.handle.slice(1)} not in our database — may still be valid. Check with your bank.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)' }}>
            <XCircle size={20} className="text-red-400 flex-shrink-0" />
            <span className="text-red-400 font-medium text-sm">{result.msg}</span>
          </div>
        )
      )}

      <AdBanner size="in-article" />

      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>Popular UPI Handles</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(UPI_HANDLES).slice(0, 18).map(([handle, info]) => (
            <div key={handle} className="p-3 rounded-xl" style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:isDark?'1px solid rgba(16,185,129,0.1)':'1px solid #e5e7eb' }}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span>{info.icon}</span>
                <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">{handle}</span>
              </div>
              <div className={`text-xs ${cls?'text-slate-400':'text-slate-500'}`}>{info.app}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
