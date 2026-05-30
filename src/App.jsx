import { useState, useEffect } from 'react'
import Navbar, { ALL_TABS }  from './components/Navbar.jsx'
import IFSCFinder            from './components/IFSCFinder.jsx'
import PincodeFinder         from './components/PincodeFinder.jsx'
import PANValidator          from './components/PANValidator.jsx'
import UPIChecker            from './components/UPIChecker.jsx'
import TrainPNR              from './components/TrainPNR.jsx'
import GovtJobs              from './components/GovtJobs.jsx'
import SarkariResult         from './components/SarkariResult.jsx'
import RationCard            from './components/RationCard.jsx'
import VoterID               from './components/VoterID.jsx'
import AadharServices        from './components/AadharServices.jsx'
import AdBanner              from './components/AdBanner.jsx'
import Footer                from './components/Footer.jsx'
import { Search, ChevronRight } from 'lucide-react'

/* ── Home page ─────────────────────────────────────────────── */
function HomePage({ isDark, setActiveTab }) {
  const tools = ALL_TABS.filter(t => t.id !== 'home')
  const COLORS = {
    ifsc:'#f97316', pin:'#16a34a', pan:'#6366f1', upi:'#10b981',
    pnr:'#3b82f6', jobs:'#8b5cf6', sarkari:'#ef4444',
    ration:'#f59e0b', voter:'#6366f1', aadhar:'#10b981',
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <section className="text-center py-10 relative overflow-hidden"
        style={{ background: isDark
          ? 'radial-gradient(ellipse at 50% 0%,rgba(249,115,22,0.08) 0%,transparent 65%)'
          : 'radial-gradient(ellipse at 50% 0%,rgba(249,115,22,0.05) 0%,transparent 65%)' }}>
        <div className="flex h-1 w-28 mx-auto rounded-full overflow-hidden mb-8">
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1" style={{ background: isDark?'#e2e8f0':'#94a3b8' }} />
          <div className="flex-1 bg-green-600" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
          style={{ background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.2)', color:'#f97316' }}>
          🇮🇳 India's Complete Info Hub — 10+ Free Services
        </div>
        <h1 className={`text-4xl lg:text-5xl font-black mb-4 leading-tight ${isDark?'text-white':'text-slate-900'}`}>
          All Indian Services<br /><span className="grad-text">One Place, Free!</span>
        </h1>
        <p className={`text-lg max-w-2xl mx-auto ${isDark?'text-slate-400':'text-slate-500'}`}>
          IFSC codes, PIN codes, PAN validation, UPI checker, Train PNR, Govt Jobs, Voter ID, Aadhar and more.
        </p>
      </section>

      <AdBanner size="leaderboard" />

      {/* Tools grid */}
      <section>
        <h2 className={`text-xl font-black mb-5 ${isDark?'text-white':'text-slate-900'}`}>🛠 All Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tools.map(tab => {
            const color = COLORS[tab.id] || '#f97316'
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="card p-5 flex flex-col items-center gap-3 text-center hover:scale-[1.04] transition-all group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background:`${color}15`, border:`1.5px solid ${color}30` }}>
                  {tab.icon}
                </div>
                <div>
                  <div className={`font-bold text-sm leading-tight ${isDark?'text-white':'text-slate-900'}`}>{tab.label}</div>
                </div>
                <ChevronRight size={14} style={{ color }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )
          })}
        </div>
      </section>

      <AdBanner size="in-article" />

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { val:'10+', lbl:'Free Services',     icon:'⚡', c:'#f97316' },
          { val:'1L+', lbl:'IFSC Codes',        icon:'🏦', c:'#16a34a' },
          { val:'1.5L+',lbl:'PIN Codes',        icon:'📮', c:'#3b82f6' },
          { val:'100%',lbl:'Free Forever',      icon:'✅', c:'#8b5cf6' },
        ].map(({ val, lbl, icon, c }) => (
          <div key={lbl} className="card p-5 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="font-black text-2xl" style={{ color:c }}>{val}</div>
            <div className={`text-xs mt-1 ${isDark?'text-slate-400':'text-slate-500'}`}>{lbl}</div>
          </div>
        ))}
      </section>
    </div>
  )
}

/* ── Route map ─────────────────────────────────────────────── */
const PAGES = {
  home:    (p) => <HomePage     {...p} />,
  ifsc:    (p) => <IFSCFinder   {...p} />,
  pin:     (p) => <PincodeFinder {...p} />,
  pan:     (p) => <PANValidator  {...p} />,
  upi:     (p) => <UPIChecker    {...p} />,
  pnr:     (p) => <TrainPNR      {...p} />,
  jobs:    (p) => <GovtJobs      {...p} />,
  sarkari: (p) => <SarkariResult {...p} />,
  ration:  (p) => <RationCard    {...p} />,
  voter:   (p) => <VoterID       {...p} />,
  aadhar:  (p) => <AadharServices {...p} />,
}

/* ── App ───────────────────────────────────────────────────── */
export default function App() {
  const [isDark, setIsDark]       = useState(() => localStorage.getItem('js-theme') === 'dark')
  const [activeTab, setActiveTab] = useState('home')

  const toggleTheme = () => setIsDark(d => {
    const next = !d
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('js-theme', next ? 'dark' : 'light')
    return next
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const navigate = (tab) => { setActiveTab(tab); window.scrollTo(0,0) }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen" style={{ background: isDark ? '#0a0d16' : '#f3f4f8' }}>
        <Navbar isDark={isDark} toggleTheme={toggleTheme} activeTab={activeTab} setActiveTab={navigate} />

        {/* Offset for 2-row sticky header */}
        <main className="max-w-6xl mx-auto px-4 pb-12" style={{ paddingTop: '110px' }}>
          {(PAGES[activeTab] || PAGES.home)({ isDark, setActiveTab: navigate })}
        </main>

        <Footer isDark={isDark} />
      </div>
    </div>
  )
}
