import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'

export const ALL_TABS = [
  { id:'home',    icon:'🏠', label:'Home',               short:'Home' },
  { id:'ifsc',    icon:'🏦', label:'IFSC Code',          short:'IFSC' },
  { id:'pin',     icon:'📮', label:'PIN Code',           short:'PIN' },
  { id:'pan',     icon:'🪪', label:'PAN Validator',      short:'PAN' },
  { id:'upi',     icon:'💳', label:'UPI Checker',        short:'UPI' },
  { id:'pnr',     icon:'🚂', label:'Train PNR',          short:'PNR' },
  { id:'jobs',    icon:'💼', label:'Govt Jobs',          short:'Jobs' },
  { id:'sarkari', icon:'📋', label:'Sarkari Results',    short:'Results' },
  { id:'ration',  icon:'🍱', label:'Ration Card',        short:'Ration' },
  { id:'voter',   icon:'🗳️', label:'Voter ID',          short:'Voter ID' },
  { id:'aadhar',  icon:'🔐', label:'Aadhar Services',    short:'Aadhar' },
]

export default function Navbar({ isDark, toggleTheme, activeTab, setActiveTab }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const tabsRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTabs = (dir) => {
    if (tabsRef.current) tabsRef.current.scrollBy({ left: dir * 180, behavior:'smooth' })
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* ── Row 1: Logo + actions ───────────────────── */}
      <div className={`transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}
        style={{
          background: isDark ? 'rgba(10,13,22,0.96)' : 'rgba(248,250,252,0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: isDark ? '1px solid rgba(249,115,22,0.1)' : '1px solid #e5e7eb',
        }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
              style={{ background:'linear-gradient(135deg,#f97316,#16a34a)' }}>JS</div>
            <div className="leading-none hidden sm:block">
              <div className="font-black text-base tracking-tight">
                <span className="grad-text">JanSuvidha</span>
                <span className={isDark?'text-white':'text-slate-900'}>Studio</span>
              </div>
              <div className="text-[9px] tracking-widest uppercase" style={{ color:'#94a3b8' }}>India's Info Hub</div>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={isDark
                ? { background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.2)', color:'#fb923c' }
                : { background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.2)', color:'#ea580c' }}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={isDark ? { background:'rgba(255,255,255,0.06)', color:'#e2e8f0' } : { background:'#e5e7eb', color:'#374151' }}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Scrollable tab strip ─────────────── */}
      <div className="relative"
        style={{ background: isDark ? '#0d1020' : '#ffffff', borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e5e7eb' }}>
        {/* Left scroll arrow */}
        <button onClick={() => scrollTabs(-1)}
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 pl-1"
          style={{ background: isDark ? 'linear-gradient(to right,#0d1020 60%,transparent)' : 'linear-gradient(to right,white 60%,transparent)' }}>
          <ChevronLeft size={16} className={isDark?'text-slate-400':'text-slate-500'} />
        </button>

        {/* Tabs */}
        <div ref={tabsRef} className="flex overflow-x-auto gap-0 px-8 scrollbar-hide"
          style={{ scrollbarWidth:'none', msOverflowStyle:'none' }}>
          {ALL_TABS.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMenuOpen(false) }}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex-shrink-0"
              style={{
                borderBottomColor: activeTab === tab.id ? '#f97316' : 'transparent',
                color: activeTab === tab.id ? '#f97316' : isDark ? '#94a3b8' : '#64748b',
                background: activeTab === tab.id ? isDark ? 'rgba(249,115,22,0.06)' : 'rgba(249,115,22,0.04)' : 'transparent',
              }}>
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.short}</span>
            </button>
          ))}
        </div>

        {/* Right scroll arrow */}
        <button onClick={() => scrollTabs(1)}
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 pr-1"
          style={{ background: isDark ? 'linear-gradient(to left,#0d1020 60%,transparent)' : 'linear-gradient(to left,white 60%,transparent)' }}>
          <ChevronRight size={16} className={isDark?'text-slate-400':'text-slate-500'} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden grid grid-cols-3 gap-2 p-3"
          style={{ background: isDark?'#0a0d16':'#f8fafc', borderBottom: isDark?'1px solid rgba(249,115,22,0.1)':'1px solid #e5e7eb' }}>
          {ALL_TABS.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMenuOpen(false) }}
              className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: activeTab===tab.id ? 'rgba(249,115,22,0.12)' : isDark?'rgba(255,255,255,0.04)':'white',
                border: activeTab===tab.id ? '1.5px solid rgba(249,115,22,0.35)' : isDark?'1px solid rgba(255,255,255,0.07)':'1px solid #e5e7eb',
                color: activeTab===tab.id ? '#f97316' : isDark?'#94a3b8':'#64748b',
              }}>
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.short}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
