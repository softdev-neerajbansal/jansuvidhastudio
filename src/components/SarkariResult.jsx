import { ExternalLink } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const RESULTS = [
  { name:'Sarkari Result',        url:'https://www.sarkariresult.com/',         desc:'Admit cards, Results, Syllabus',    icon:'📋', color:'#ef4444', popular:true },
  { name:'Sarkari Exam',          url:'https://www.sarkariexam.com/',           desc:'Exam notifications & results',      icon:'📝', color:'#f97316', popular:true },
  { name:'Results.gov.in',        url:'https://results.gov.in/',                desc:'Official Govt results portal',      icon:'🏛️', color:'#6366f1', popular:true },
  { name:'India Results',         url:'https://www.indiaresults.com/',          desc:'Board & university results',        icon:'🎓', color:'#8b5cf6', popular:false },
  { name:'SSC Results',           url:'https://ssc.nic.in/Portal/ResultDetails',desc:'Staff Selection Commission',        icon:'📊', color:'#16a34a', popular:true },
  { name:'UPSC Results',          url:'https://upsc.gov.in/examinations/results',desc:'IAS/IPS/IFS & other UPSC exams',  icon:'⭐', color:'#eab308', popular:true },
  { name:'Railway Results (RRB)', url:'https://www.rrbcdg.gov.in/',             desc:'Group D, NTPC, ALP results',       icon:'🚂', color:'#3b82f6', popular:true },
  { name:'IBPS Results',          url:'https://www.ibps.in/results/',           desc:'Bank PO, Clerk, SO results',       icon:'🏦', color:'#06b6d4', popular:false },
  { name:'UP Board Results',      url:'https://upmsp.edu.in/',                  desc:'Class 10 & 12 UP Board',           icon:'📚', color:'#ec4899', popular:true },
  { name:'CBSE Results',          url:'https://cbseresults.nic.in/',            desc:'Class 10 & 12 CBSE results',       icon:'📖', color:'#10b981', popular:true },
  { name:'UPPSC Results',         url:'https://uppsc.up.nic.in/',              desc:'UP State PSC results',             icon:'🗺️', color:'#f59e0b', popular:false },
  { name:'Police Result',         url:'https://uppbpb.gov.in/results',         desc:'UP Police Bharti results',         icon:'👮', color:'#6366f1', popular:false },
]

export default function SarkariResult({ isDark }) {
  const cls = isDark
  const popular = RESULTS.filter(r => r.popular)
  const others  = RESULTS.filter(r => !r.popular)

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', color:'#ef4444' }}>
          📋 Sarkari Result Links
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          <span style={{ background:'linear-gradient(135deg,#ef4444,#f97316)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Sarkari Results</span> & Admit Cards
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Quick access to all government exam results, answer keys and admit cards</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="card p-5">
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${cls?'text-white':'text-slate-900'}`}>
          🔥 Popular Result Portals
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popular.map(r => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02] group"
              style={{ background:isDark?`${r.color}08`:'#f8fafc', border:isDark?`1px solid ${r.color}25`:'1px solid #e5e7eb' }}>
              <span className="text-2xl">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm ${cls?'text-white':'text-slate-900'}`}>{r.name}</div>
                <div className="text-xs mt-0.5" style={{ color:r.color }}>{r.desc}</div>
              </div>
              <ExternalLink size={13} style={{ color:r.color }} className="opacity-60 group-hover:opacity-100 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <AdBanner size="in-article" />

      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>More Result Links</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {others.map(r => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] group"
              style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:isDark?'1px solid rgba(255,255,255,0.07)':'1px solid #e5e7eb' }}>
              <span className="text-xl">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm ${cls?'text-white':'text-slate-900'}`}>{r.name}</div>
                <div className={`text-xs ${cls?'text-slate-400':'text-slate-500'}`}>{r.desc}</div>
              </div>
              <ExternalLink size={13} className="opacity-40 group-hover:opacity-80 flex-shrink-0 text-slate-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
