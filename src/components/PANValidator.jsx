import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const PAN_TYPES = {
  P:'Individual Person', C:'Company', H:'Hindu Undivided Family (HUF)',
  F:'Firm / Partnership', A:'Association of Persons (AOP)', T:'Trust',
  B:'Body of Individuals (BOI)', L:'Local Authority',
  J:'Artificial Juridical Person', G:'Government',
}

function validatePAN(pan) {
  const p = pan.trim().toUpperCase()
  if (!p) return null
  if (p.length !== 10) return { valid:false, msg:'PAN must be exactly 10 characters' }
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(p)) return { valid:false, msg:'Invalid PAN format. Must be 5 letters + 4 digits + 1 letter' }
  const type = PAN_TYPES[p[3]]
  if (!type) return { valid:false, msg:`Unknown entity type code: ${p[3]}` }
  return {
    valid: true,
    series: p.substring(0,3),
    entityCode: p[3],
    entityType: type,
    nameLetter: p[4],
    serial: p.substring(5,9),
    checkChar: p[9],
    full: p,
  }
}

export default function PANValidator({ isDark }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const check = () => setResult(validatePAN(input))
  const cls = isDark

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.25)', color:'#6366f1' }}>
          🪪 PAN Card Validator
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          Validate Your <span style={{ background:'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>PAN Card</span>
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Check PAN format, entity type and structure breakdown</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="card p-6 flex flex-col gap-4">
        <label className={`block text-sm font-semibold mb-1 ${cls?'text-slate-300':'text-slate-700'}`}>Enter PAN Number</label>
        <div className="flex gap-3">
          <input className="inp uppercase font-mono tracking-widest text-lg flex-1"
            placeholder="e.g. ABCDE1234F" maxLength={10}
            value={input} onChange={e => { setInput(e.target.value.toUpperCase()); setResult(null) }}
            onKeyDown={e => e.key==='Enter' && check()} />
          <button className="btn-saffron px-8" style={{ background:'linear-gradient(135deg,#6366f1,#4f46e5)' }} onClick={check}>
            Validate
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          <p className={`text-xs ${cls?'text-slate-500':'text-slate-400'}`}>Format: AAAAA9999A &nbsp;|&nbsp; 5 letters + 4 digits + 1 letter</p>
        </div>
      </div>

      {result && (
        result.valid ? (
          <div className="flex flex-col gap-4">
            <div className="card p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle size={28} className="text-emerald-500" />
                <div>
                  <div className={`font-black text-xl ${cls?'text-white':'text-slate-900'}`}>Valid PAN Card</div>
                  <div className="text-emerald-500 text-sm font-semibold">{result.full}</div>
                </div>
              </div>
              {/* Visual PAN breakdown */}
              <div className="flex gap-1 mb-5 flex-wrap">
                {[
                  { chars:result.series,     label:'Series',       color:'#6366f1' },
                  { chars:result.entityCode, label:'Entity Type',  color:'#f97316' },
                  { chars:result.nameLetter, label:'Name Initial', color:'#16a34a' },
                  { chars:result.serial,     label:'Serial No.',   color:'#06b6d4' },
                  { chars:result.checkChar,  label:'Check Digit',  color:'#ec4899' },
                ].map(({ chars, label, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className="flex">
                      {[...chars].map((c, i) => (
                        <div key={i} className="w-9 h-11 rounded-lg flex items-center justify-center font-mono font-black text-lg text-white mx-0.5"
                          style={{ background: color }}>
                          {c}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label:'Entity Type', val:result.entityType },
                  { label:'Series Code', val:result.series },
                  { label:'Name Initial', val:result.nameLetter },
                  { label:'Serial Number', val:result.serial },
                ].map(({ label, val }) => (
                  <div key={label} className="p-3 rounded-xl" style={{ background: isDark?'rgba(99,102,241,0.06)':'#f8fafc', border:isDark?'1px solid rgba(99,102,241,0.15)':'1px solid #e5e7eb' }}>
                    <div className={`text-xs font-semibold mb-0.5 ${cls?'text-slate-500':'text-slate-400'}`}>{label}</div>
                    <div className={`font-bold text-sm ${cls?'text-white':'text-slate-900'}`}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
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
        <h3 className={`font-bold mb-3 ${cls?'text-white':'text-slate-900'}`}>PAN Entity Types</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(PAN_TYPES).map(([code, name]) => (
            <div key={code} className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:isDark?'1px solid rgba(99,102,241,0.1)':'1px solid #e5e7eb' }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ background:'linear-gradient(135deg,#6366f1,#a855f7)' }}>{code}</span>
              <span className={`text-xs ${cls?'text-slate-300':'text-slate-700'}`}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
