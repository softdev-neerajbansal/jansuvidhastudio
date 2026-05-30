import { ExternalLink } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const SERVICES = [
  { name:'Voter Registration (Form 6)',   url:'https://voters.eci.gov.in/signup/register', desc:'Register as a new voter',                icon:'📝', color:'#6366f1' },
  { name:'Search Your Name in Voter List',url:'https://electoralsearch.in/',              desc:'Find your name on electoral roll',        icon:'🔍', color:'#3b82f6' },
  { name:'Voter ID Download (e-EPIC)',    url:'https://voters.eci.gov.in/',               desc:'Download digital voter card (PDF)',        icon:'⬇️', color:'#16a34a' },
  { name:'Correct Voter Details (Form 8)',url:'https://voters.eci.gov.in/',               desc:'Update address, name, photo etc.',        icon:'✏️', color:'#f97316' },
  { name:'Know Your Polling Booth',       url:'https://electoralsearch.in/',              desc:'Find your booth & BLO details',          icon:'🏫', color:'#8b5cf6' },
  { name:'Apply for Overseas Voter',      url:'https://voters.eci.gov.in/',               desc:'Form 6A for NRI voters',                 icon:'✈️', color:'#06b6d4' },
  { name:'Track Application Status',      url:'https://voters.eci.gov.in/',               desc:'Track Form 6/7/8 application status',    icon:'📊', color:'#ec4899' },
  { name:'ECI Official Website',          url:'https://www.eci.gov.in/',                  desc:'Election Commission of India',            icon:'🏛️', color:'#eab308' },
  { name:'CEO UP (Uttar Pradesh)',         url:'https://ceouttarpradesh.nic.in/',          desc:'Chief Electoral Officer, UP',             icon:'🗺️', color:'#f97316' },
  { name:'Voter Helpline 1950',           url:'tel:1950',                                 desc:'Call for voter-related queries',         icon:'📞', color:'#16a34a' },
]

const EPIC_INFO = [
  { q:'Who can register?', a:'Any Indian citizen aged 18+ as on January 1 of the current year.' },
  { q:'Documents needed?',  a:'Age proof (DOB certificate/PAN/passport) and address proof (electricity bill/Aadhar/ration card).' },
  { q:'What is e-EPIC?',    a:'Electronic Voter ID Card — a PDF version downloadable from voterportal.eci.gov.in using mobile number or EPIC number.' },
  { q:'How long to register?', a:'Application is processed within 30 days. You get an SMS confirmation on your registered mobile.' },
]

export default function VoterID({ isDark }) {
  const cls = isDark
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.25)', color:'#6366f1' }}>
          🗳️ Voter ID Services
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          <span style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Voter ID</span> & Electoral Services
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Register, download e-EPIC, check name in voter list and more</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="grid sm:grid-cols-2 gap-3">
        {SERVICES.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
            className="card p-4 flex items-center gap-3 hover:scale-[1.01] transition-all group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background:`${s.color}15`, border:`1.5px solid ${s.color}30` }}>{s.icon}</div>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm ${cls?'text-white':'text-slate-900'}`}>{s.name}</div>
              <div className={`text-xs mt-0.5 ${cls?'text-slate-400':'text-slate-500'}`}>{s.desc}</div>
            </div>
            <ExternalLink size={14} style={{ color:s.color }} className="flex-shrink-0 opacity-60 group-hover:opacity-100" />
          </a>
        ))}
      </div>

      <AdBanner size="in-article" />

      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>Frequently Asked Questions</h3>
        <div className="flex flex-col gap-3">
          {EPIC_INFO.map(({ q, a }) => (
            <div key={q} className="p-4 rounded-xl" style={{ background:isDark?'rgba(99,102,241,0.05)':'#f5f3ff', border:isDark?'1px solid rgba(99,102,241,0.15)':'1px solid #ddd6fe' }}>
              <div className={`font-bold text-sm mb-1 ${cls?'text-purple-300':'text-purple-700'}`}>{q}</div>
              <div className={`text-sm ${cls?'text-slate-400':'text-slate-600'}`}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
