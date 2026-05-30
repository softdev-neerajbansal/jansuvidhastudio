import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Search, Copy, CheckCircle, AlertCircle, Building2,
  MapPin, CreditCard, ChevronDown, X
} from 'lucide-react'
import AdBanner from './AdBanner.jsx'
import { IFSC_API } from '../config.js'

/* ── Module-level IFSC index (persists across re-renders) ─── */
let ifscIndex = null   // { SBIN: [...records], HDFC: [...] }
let indexLoading = false

/* ── Banks list ──────────────────────────────────────────── */
const BANKS = [
  { name: 'State Bank of India',    code: 'SBIN' },
  { name: 'HDFC Bank',              code: 'HDFC' },
  { name: 'ICICI Bank',             code: 'ICIC' },
  { name: 'Axis Bank',              code: 'UTIB' },
  { name: 'Punjab National Bank',   code: 'PUNB' },
  { name: 'Bank of Baroda',         code: 'BARB' },
  { name: 'Bank of India',          code: 'BKID' },
  { name: 'Canara Bank',            code: 'CNRB' },
  { name: 'Union Bank of India',    code: 'UBIN' },
  { name: 'Kotak Mahindra Bank',    code: 'KKBK' },
  { name: 'Yes Bank',               code: 'YESB' },
  { name: 'IndusInd Bank',          code: 'INDB' },
  { name: 'IDFC First Bank',        code: 'IDFB' },
  { name: 'Federal Bank',           code: 'FDRL' },
  { name: 'RBL Bank',               code: 'RATN' },
  { name: 'South Indian Bank',      code: 'SIBL' },
  { name: 'Karur Vysya Bank',       code: 'KVBL' },
  { name: 'UCO Bank',               code: 'UCBA' },
  { name: 'Indian Bank',            code: 'IDIB' },
  { name: 'Bank of Maharashtra',    code: 'MAHB' },
  { name: 'Central Bank of India',  code: 'CBIN' },
  { name: 'Indian Overseas Bank',   code: 'IOBA' },
  { name: 'Punjab & Sind Bank',     code: 'PSIB' },
  { name: 'Bandhan Bank',           code: 'BDBL' },
  { name: 'DCB Bank',               code: 'DCBL' },
  { name: 'Jammu & Kashmir Bank',   code: 'JAKA' },
  { name: 'Karnataka Bank',         code: 'KARB' },
  { name: 'Saraswat Bank',          code: 'SRCB' },
  { name: 'Allahabad Bank',         code: 'ALLA' },
  { name: 'Dena Bank',              code: 'BKDN' },
]

const SAMPLE_IFSC = ['SBIN0005943', 'HDFC0000285', 'ICIC0000001', 'UTIB0000001', 'PUNB0000100']

/* ── Custom Bank Combobox ──────────────────────────────────── */
function BankCombobox({ value, onChange, isDark }) {
  const [open, setOpen]   = useState(false)
  const [q, setQ]         = useState('')
  const ref               = useRef(null)
  const inputRef          = useRef(null)

  const selected = BANKS.find(b => b.code === value)

  const filtered = q
    ? BANKS.filter(b =>
        b.name.toLowerCase().includes(q.toLowerCase()) ||
        b.code.toLowerCase().includes(q.toLowerCase())
      )
    : BANKS

  // Close on outside click
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const select = (code) => { onChange(code); setOpen(false); setQ('') }
  const clear  = (e)    => { e.stopPropagation(); onChange(''); setQ('') }

  const BANK_COLORS = {
    SBIN:'#2563eb', HDFC:'#dc2626', ICIC:'#b45309', UTIB:'#7c3aed',
    PUNB:'#059669', BARB:'#d97706', BKID:'#0891b2', CNRB:'#16a34a',
    UBIN:'#6d28d9', KKBK:'#dc2626', YESB:'#1d4ed8', INDB:'#0d9488',
    IDFB:'#9333ea', FDRL:'#c2410c', RATN:'#0369a1', SIBL:'#15803d',
    KVBL:'#b91c1c', UCBA:'#7c3aed', IDIB:'#1e40af', MAHB:'#065f46',
    CBIN:'#1e3a8a', IOBA:'#92400e', PSIB:'#5b21b6', BDBL:'#be185d',
    DCBL:'#0f766e', JAKA:'#1a56db', KARB:'#9d174d', SRCB:'#166534',
    ALLA:'#92400e', BKDN:'#1e40af',
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 50) }}
        className="inp flex items-center gap-3 text-left w-full cursor-pointer"
        style={{
          background: isDark ? '#0d1120' : '#ffffff',
          border: open
            ? '1.5px solid #f97316'
            : isDark ? '1.5px solid rgba(249,115,22,0.2)' : '1.5px solid #d1d5db',
          boxShadow: open ? '0 0 0 3px rgba(249,115,22,0.12)' : 'none',
        }}
      >
        {selected ? (
          <>
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: BANK_COLORS[selected.code] || '#475569' }}>
              {selected.code.substring(0,2)}
            </span>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm truncate ${isDark?'text-white':'text-slate-900'}`}>{selected.name}</div>
              <div className="text-xs text-slate-400 font-mono">{selected.code}</div>
            </div>
          </>
        ) : (
          <span className="text-slate-400 flex-1">— Choose a bank —</span>
        )}
        <div className="flex items-center gap-1 flex-shrink-0">
          {selected && (
            <span onClick={clear}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all">
              <X size={12} />
            </span>
          )}
          <ChevronDown size={16} className="text-slate-400 transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: isDark ? '#0d1120' : '#ffffff',
            border: isDark ? '1px solid rgba(249,115,22,0.2)' : '1px solid #e2e8f0',
            boxShadow: isDark
              ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.1)'
              : '0 20px 50px rgba(0,0,0,0.12)',
            maxHeight: 340,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search input */}
          <div className="p-2 flex-shrink-0" style={{ borderBottom: isDark?'1px solid rgba(255,255,255,0.06)':'1px solid #f1f5f9' }}>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg outline-none"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                  color: isDark ? '#e2e8f0' : '#0f172a',
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                }}
                placeholder="Search bank name or code…"
                value={q}
                onChange={e => setQ(e.target.value)}
              />
            </div>
          </div>

          {/* Options list */}
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">No banks found</div>
            ) : filtered.map(bank => (
              <button
                key={bank.code}
                type="button"
                onClick={() => select(bank.code)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                style={{
                  background: value === bank.code
                    ? isDark ? 'rgba(249,115,22,0.12)' : 'rgba(249,115,22,0.08)'
                    : 'transparent',
                  borderLeft: value === bank.code ? '3px solid #f97316' : '3px solid transparent',
                }}
                onMouseEnter={e => { if(value !== bank.code) e.currentTarget.style.background = isDark?'rgba(255,255,255,0.04)':'#f8fafc' }}
                onMouseLeave={e => { if(value !== bank.code) e.currentTarget.style.background = 'transparent' }}
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                  style={{ background: BANK_COLORS[bank.code] || '#475569' }}>
                  {bank.code.substring(0,2)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${isDark?'text-slate-200':'text-slate-800'}`}>{bank.name}</div>
                  <div className="text-xs text-slate-400 font-mono">{bank.code}</div>
                </div>
                {value === bank.code && <CheckCircle size={14} className="text-orange-500 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── CSV parser (handles quoted fields) ─────────────────── */
function parseCSVLine(line) {
  const result = []
  let cur = '', inQuote = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { inQuote = !inQuote }
    else if (ch === ',' && !inQuote) { result.push(cur.trim()); cur = '' }
    else cur += ch
  }
  result.push(cur.trim())
  return result
}

/* ── Build search index from CSV text ──────────────────── */
function buildIndex(csvText) {
  const lines = csvText.split('\n')
  const index = {}
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const cols = parseCSVLine(line)
    if (cols.length < 11) continue
    const [bank, ifsc, branch, centre, district, state, address, contact, imps, rtgs, city] = cols
    if (!ifsc || ifsc.length !== 11) continue
    const bankCode = ifsc.substring(0, 4)
    if (!index[bankCode]) index[bankCode] = []
    index[bankCode].push({
      BANK: bank, IFSC: ifsc, BRANCH: branch,
      CENTRE: centre, DISTRICT: district, STATE: state,
      ADDRESS: address, CITY: city || centre,
      IMPS: imps === 'true', RTGS: rtgs === 'true',
      NEFT: cols[12] === 'true', UPI: cols[14] === 'true',
      MICR: cols[13] || '',
    })
  }
  return index
}

/* ─────────────────────────────────────────────────────────── */

export default function IFSCFinder({ isDark }) {
  const [mode, setMode] = useState('ifsc2branch')

  /* IFSC → Branch */
  const [ifscQuery, setIfscQuery] = useState('')
  const [ifscData,  setIfscData]  = useState(null)
  const [ifscErr,   setIfscErr]   = useState('')
  const [ifscLoad,  setIfscLoad]  = useState(false)
  const [copied,    setCopied]    = useState(false)

  /* Branch → IFSC */
  const [selBank,   setSelBank]   = useState('')
  const [cityQ,     setCityQ]     = useState('')
  const [branchQ,   setBranchQ]   = useState('')
  const [srResults, setSrResults] = useState([])
  const [srLoad,    setSrLoad]    = useState(false)
  const [srErr,     setSrErr]     = useState('')
  const [srTotal,   setSrTotal]   = useState(0)
  const [dlProgress,setDlProgress]= useState(0)   // 0 = not started, 1-100 = loading, -1 = done
  const [dlStatus,  setDlStatus]  = useState('')   // loading status message

  /* ── Load IFSC index (download once, cache in memory) ── */
  const loadIndex = useCallback(async () => {
    if (ifscIndex) return ifscIndex
    if (indexLoading) {
      // wait for other call to finish
      return new Promise(resolve => {
        const check = setInterval(() => {
          if (!indexLoading) { clearInterval(check); resolve(ifscIndex) }
        }, 200)
      })
    }
    indexLoading = true
    setDlProgress(1)
    setDlStatus('Connecting to IFSC database…')

    try {
      const res = await fetch('/IFSC.csv')
      if (!res.ok) throw new Error('Could not load IFSC database')

      const contentLength = res.headers.get('content-length')
      const total = contentLength ? parseInt(contentLength) : 36155290
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let received = 0, csvText = ''

      setDlStatus('Downloading IFSC database (34 MB)…')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        received += value.length
        csvText += decoder.decode(value, { stream: true })
        const pct = Math.min(95, Math.round((received / total) * 90))
        setDlProgress(pct)
      }

      setDlStatus('Building search index…')
      setDlProgress(96)

      await new Promise(r => setTimeout(r, 30)) // let UI update
      ifscIndex = buildIndex(csvText)

      setDlProgress(100)
      setDlStatus('Index ready!')
      indexLoading = false
      return ifscIndex
    } catch (e) {
      indexLoading = false
      setDlProgress(0)
      throw e
    }
  }, [])

  /* ── IFSC → Branch lookup ────────────────────────────── */
  const searchByIFSC = async (code) => {
    const ifsc = (code || ifscQuery).trim().toUpperCase()
    if (!ifsc) return
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      setIfscErr('Invalid IFSC format. Example: SBIN0005943'); setIfscData(null); return
    }
    setIfscLoad(true); setIfscErr(''); setIfscData(null)
    try {
      const res = await fetch(`${IFSC_API}?code=${ifsc}`, { headers: { Accept: 'application/json' } })
      if (res.status === 404) throw new Error(`IFSC "${ifsc}" not found. Please verify the code.`)
      if (!res.ok) throw new Error(`Server error (${res.status}). Please try again.`)
      setIfscData(await res.json())
    } catch (e) {
      setIfscErr(e.message.includes('fetch') ? 'Network error — check your connection.' : e.message)
    }
    setIfscLoad(false)
  }

  /* ── Branch → IFSC search ───────────────────────────── */
  const searchByBranch = async () => {
    if (!selBank) { setSrErr('Please select a bank first.'); return }
    if (!cityQ.trim() && !branchQ.trim()) { setSrErr('Enter at least a city or branch name.'); return }

    setSrLoad(true); setSrErr(''); setSrResults([]); setSrTotal(0)
    try {
      const index = await loadIndex()
      const records = index[selBank] || []

      if (records.length === 0) {
        setSrErr(`No data found for selected bank. Try a different bank.`)
        setSrLoad(false); return
      }

      const city   = cityQ.trim().toLowerCase()
      const branch = branchQ.trim().toLowerCase()

      const filtered = records.filter(r => {
        const c = `${r.CITY} ${r.DISTRICT} ${r.CENTRE} ${r.ADDRESS}`.toLowerCase()
        const b = `${r.BRANCH} ${r.ADDRESS}`.toLowerCase()
        const matchCity   = !city   || c.includes(city)
        const matchBranch = !branch || b.includes(branch)
        return matchCity && matchBranch
      })

      setSrTotal(filtered.length)
      setSrResults(filtered.slice(0, 50))
      if (filtered.length === 0) setSrErr(`No branches found. Try a different city or branch name.`)
    } catch (e) {
      setSrErr(e.message || 'Search failed. Please try again.')
    }
    setSrLoad(false)
  }

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(text); setTimeout(() => setCopied(false), 2000)
  }

  const Badge = ({ ok }) => <span className={ok ? 'badge-yes' : 'badge-no'}>{ok ? '✓ Yes' : '✗ No'}</span>

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.2)', color:'#f97316' }}>
          🏦 IFSC Code Finder
        </div>
        <h2 className={`text-3xl font-black mb-2 ${isDark?'text-white':'text-slate-900'}`}>
          Find <span className="grad-text-saffron">IFSC Code</span> — Two Ways
        </h2>
        <p className={`text-sm ${isDark?'text-slate-400':'text-slate-500'}`}>
          Look up by IFSC code ↔ or search by bank + city/branch name
        </p>
      </div>

      <AdBanner size="leaderboard" />

      {/* Mode switcher */}
      <div className="flex gap-2 p-1.5 rounded-2xl w-fit mx-auto"
        style={{ background: isDark?'rgba(255,255,255,0.05)':'#e5e7eb' }}>
        <button className={`tab-btn ${mode==='ifsc2branch'?'active-saffron':''}`}
          onClick={() => { setMode('ifsc2branch'); setIfscData(null); setIfscErr('') }}>
          🔢 IFSC Code → Branch Details
        </button>
        <button className={`tab-btn ${mode==='branch2ifsc'?'active-saffron':''}`}
          onClick={() => { setMode('branch2ifsc'); setSrResults([]); setSrErr('') }}>
          🔍 Branch Name → IFSC Code
        </button>
      </div>

      {/* ══ MODE 1: IFSC → Branch ═══════════════════════════ */}
      {mode === 'ifsc2branch' && (
        <div className="flex flex-col gap-5">
          <div className="card p-6">
            <label className={`block text-sm font-semibold mb-2 ${isDark?'text-slate-300':'text-slate-700'}`}>
              Enter IFSC Code
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  className="inp uppercase font-mono tracking-widest text-lg"
                  placeholder="e.g. SBIN0005943"
                  value={ifscQuery}
                  onChange={e => { setIfscQuery(e.target.value.toUpperCase()); setIfscErr('') }}
                  onKeyDown={e => e.key === 'Enter' && searchByIFSC()}
                  maxLength={11}
                />
              </div>
              <button className="btn-saffron px-8" onClick={() => searchByIFSC()} disabled={ifscLoad}>
                {ifscLoad
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner" />
                  : <><Search size={16} /> Search</>}
              </button>
            </div>
            <div className="mt-4">
              <p className={`text-xs font-semibold mb-2 ${isDark?'text-slate-500':'text-slate-400'}`}>TRY SAMPLE:</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_IFSC.map(code => (
                  <button key={code} onClick={() => { setIfscQuery(code); searchByIFSC(code) }}
                    className="text-xs px-3 py-1.5 rounded-full font-mono font-bold"
                    style={{ background:'rgba(249,115,22,0.1)', color:'#f97316', border:'1px solid rgba(249,115,22,0.2)' }}>
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {ifscErr && (
            <div className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm font-medium">{ifscErr}</span>
            </div>
          )}

          {ifscData && (
            <div className="flex flex-col gap-4">
              {/* IFSC highlight card */}
              <div className="card p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 opacity-5 rounded-full"
                  style={{ background:'radial-gradient(circle,#f97316,transparent)', transform:'translate(30%,-30%)' }} />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${isDark?'text-slate-500':'text-slate-400'}`}>IFSC CODE</p>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-3xl font-mono tracking-widest grad-text-saffron">{ifscData.IFSC}</span>
                      <button className="copy-btn" onClick={() => copy(ifscData.IFSC)}>
                        {copied===ifscData.IFSC?<><CheckCircle size={12}/> Copied!</>:<><Copy size={12}/> Copy</>}
                      </button>
                    </div>
                    <p className={`text-xs mt-1 ${isDark?'text-slate-500':'text-slate-400'}`}>Bank Code: {ifscData.BANKCODE}</p>
                  </div>
                  <div className={`text-right ${isDark?'text-slate-200':'text-slate-800'}`}>
                    <p className="font-black text-xl">{ifscData.BANK}</p>
                    <p className={`text-sm ${isDark?'text-slate-400':'text-slate-500'}`}>{ifscData.BRANCH}</p>
                  </div>
                </div>
              </div>

              <AdBanner size="in-article" />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 size={18} className="text-orange-500" />
                    <h3 className={`font-bold ${isDark?'text-white':'text-slate-900'}`}>Branch Details</h3>
                  </div>
                  {[['Bank Name',ifscData.BANK],['Branch',ifscData.BRANCH],['MICR Code',ifscData.MICR||'N/A'],['Contact',ifscData.CONTACT||'N/A']].map(([label,val])=>(
                    <div key={label} className="field-row">
                      <span className={`text-xs font-semibold w-28 flex-shrink-0 ${isDark?'text-slate-500':'text-slate-400'}`}>{label}</span>
                      <span className={`text-sm font-medium flex-1 ${isDark?'text-slate-200':'text-slate-800'}`}>{val}</span>
                    </div>
                  ))}
                </div>
                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={18} className="text-green-500" />
                    <h3 className={`font-bold ${isDark?'text-white':'text-slate-900'}`}>Location</h3>
                  </div>
                  {[['Address',ifscData.ADDRESS],['City',ifscData.CITY],['District',ifscData.DISTRICT],['State',ifscData.STATE]].map(([label,val])=>(
                    <div key={label} className="field-row">
                      <span className={`text-xs font-semibold w-28 flex-shrink-0 ${isDark?'text-slate-500':'text-slate-400'}`}>{label}</span>
                      <span className={`text-sm font-medium flex-1 ${isDark?'text-slate-200':'text-slate-800'}`}>{val||'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={18} className="text-blue-500" />
                  <h3 className={`font-bold ${isDark?'text-white':'text-slate-900'}`}>Payment Modes</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[['RTGS',ifscData.RTGS],['NEFT',ifscData.NEFT],['IMPS',ifscData.IMPS],['UPI',ifscData.UPI]].map(([label,val])=>(
                    <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl"
                      style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:isDark?'1px solid rgba(255,255,255,0.06)':'1px solid #e5e7eb' }}>
                      <span className={`text-xs font-black tracking-widest ${isDark?'text-slate-400':'text-slate-500'}`}>{label}</span>
                      <Badge ok={val} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!ifscData && !ifscErr && !ifscLoad && (
            <div className="card p-6 text-center">
              <div className="text-5xl mb-3">🏦</div>
              <h3 className={`font-bold mb-2 ${isDark?'text-white':'text-slate-900'}`}>Where to find your IFSC Code?</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-left mt-4">
                {[{icon:'📄',title:'Cheque Book',desc:'On the MICR band at the bottom of your cheque leaf'},{icon:'📱',title:'Net Banking',desc:'In your bank\'s internet banking or mobile app'},{icon:'📔',title:'Passbook',desc:'Printed on the first page of your bank passbook'}].map(({icon,title,desc})=>(
                  <div key={title} className="p-4 rounded-xl" style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:isDark?'1px solid rgba(249,115,22,0.08)':'1px solid #e5e7eb' }}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className={`text-sm font-bold mb-1 ${isDark?'text-white':'text-slate-900'}`}>{title}</div>
                    <div className={`text-xs ${isDark?'text-slate-500':'text-slate-400'}`}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ MODE 2: Branch → IFSC ═══════════════════════════ */}
      {mode === 'branch2ifsc' && (
        <div className="flex flex-col gap-5">
          <div className="card p-6 flex flex-col gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark?'text-slate-300':'text-slate-700'}`}>Select Bank *</label>
              <BankCombobox
                value={selBank}
                onChange={code => { setSelBank(code); setSrResults([]); setSrErr('') }}
                isDark={isDark}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark?'text-slate-300':'text-slate-700'}`}>City / District</label>
                <input className="inp" placeholder="e.g. Meerut, Delhi, Mumbai"
                  value={cityQ} onChange={e=>{setCityQ(e.target.value);setSrErr('')}}
                  onKeyDown={e=>e.key==='Enter'&&searchByBranch()} />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark?'text-slate-300':'text-slate-700'}`}>
                  Branch Name <span className={isDark?'text-slate-500':'text-slate-400'}>(optional)</span>
                </label>
                <input className="inp" placeholder="e.g. Main Branch, Cantt"
                  value={branchQ} onChange={e=>{setBranchQ(e.target.value);setSrErr('')}}
                  onKeyDown={e=>e.key==='Enter'&&searchByBranch()} />
              </div>
            </div>

            <button className="btn-saffron w-fit" onClick={searchByBranch} disabled={srLoad}>
              {srLoad
                ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner" /> Searching…</>
                : <><Search size={16} /> Find IFSC Codes</>}
            </button>
          </div>

          {/* Download progress */}
          {srLoad && dlProgress > 0 && dlProgress < 100 && (
            <div className="card p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${isDark?'text-white':'text-slate-900'}`}>{dlStatus}</span>
                <span className="text-sm font-mono text-orange-500">{dlProgress}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background:isDark?'rgba(255,255,255,0.06)':'#e5e7eb' }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width:`${dlProgress}%`, background:'linear-gradient(90deg,#f97316,#16a34a)' }} />
              </div>
              <p className={`text-xs ${isDark?'text-slate-500':'text-slate-400'}`}>
                ⚡ Downloaded once and cached in memory for fast future searches
              </p>
            </div>
          )}

          {/* Error */}
          {srErr && (
            <div className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm font-medium">{srErr}</span>
            </div>
          )}

          {/* Results */}
          {srResults.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-sm ${isDark?'text-white':'text-slate-900'}`}>
                  {srTotal > 50 ? `Showing top 50 of ${srTotal}` : `${srTotal} branch${srTotal!==1?'es':''}`} found
                </span>
                {srTotal > 50 && <span className="text-xs text-orange-400">Narrow down with a specific branch name</span>}
              </div>

              <AdBanner size="in-article" />

              <div className="flex flex-col gap-3">
                {srResults.map((item, i) => (
                  <div key={i} className="card p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-black font-mono text-xl grad-text-saffron">{item.IFSC}</span>
                          <button className="copy-btn" onClick={() => copy(item.IFSC)}>
                            {copied===item.IFSC?<><CheckCircle size={11}/> Copied!</>:<><Copy size={11}/> Copy</>}
                          </button>
                        </div>
                        <p className={`font-semibold text-sm ${isDark?'text-white':'text-slate-900'}`}>{item.BRANCH}</p>
                        <p className={`text-xs mt-0.5 ${isDark?'text-slate-400':'text-slate-500'}`}>{item.ADDRESS}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:flex-col sm:items-end">
                        {item.CITY && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                            style={{ background:'rgba(22,163,74,0.1)', color:'#16a34a', border:'1px solid rgba(22,163,74,0.2)' }}>
                            📍 {item.CITY}
                          </span>
                        )}
                        {item.STATE && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                            style={{ background:'rgba(59,130,246,0.1)', color:'#3b82f6', border:'1px solid rgba(59,130,246,0.2)' }}>
                            {item.STATE}
                          </span>
                        )}
                        {item.DISTRICT && item.DISTRICT !== item.CITY && (
                          <span className={`text-xs ${isDark?'text-slate-500':'text-slate-400'}`}>{item.DISTRICT}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 pt-3 flex-wrap"
                      style={{ borderTop:isDark?'1px solid rgba(255,255,255,0.05)':'1px solid #f1f5f9' }}>
                      {[['RTGS',item.RTGS],['NEFT',item.NEFT],['IMPS',item.IMPS],['UPI',item.UPI]].map(([label,val])=>(
                        <span key={label} className={val?'badge-yes':'badge-no'}>{label}</span>
                      ))}
                      {item.MICR && <span className={`text-xs font-mono ${isDark?'text-slate-500':'text-slate-400'}`}>MICR: {item.MICR}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {srResults.length===0 && !srErr && !srLoad && (
            <div className="card p-6 text-center">
              <div className="text-5xl mb-3">🔍</div>
              <h3 className={`font-bold mb-2 ${isDark?'text-white':'text-slate-900'}`}>Search Any Branch → Get IFSC</h3>
              <p className={`text-sm mb-5 ${isDark?'text-slate-400':'text-slate-500'}`}>
                Select your bank, enter city or branch name. Uses Razorpay's free IFSC dataset with 1,82,000+ branch records.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-left">
                {[
                  {ex:'SBI + Meerut',       desc:'All SBI branches in Meerut'},
                  {ex:'HDFC + Delhi Cantt', desc:'HDFC branches near Delhi Cantt'},
                  {ex:'ICICI + Noida',      desc:'All ICICI branches in Noida'},
                  {ex:'Axis + Laxmi Nagar', desc:'Axis Bank Laxmi Nagar branch'},
                ].map(({ex,desc})=>(
                  <div key={ex} className="p-3 rounded-xl"
                    style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:isDark?'1px solid rgba(249,115,22,0.08)':'1px solid #e5e7eb' }}>
                    <div className="font-mono text-xs font-bold text-orange-500 mb-0.5">{ex}</div>
                    <div className={`text-xs ${isDark?'text-slate-500':'text-slate-400'}`}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
