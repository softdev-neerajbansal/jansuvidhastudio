import { ExternalLink } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const CARD_TYPES = [
  { type:'AAY', name:'Antyodaya Anna Yojana', color:'#ef4444', desc:'Poorest of the poor — 35 kg food grain per month', grain:'35 kg/month' },
  { type:'PHH', name:'Priority Household',    color:'#f97316', desc:'BPL families — 5 kg per person per month',         grain:'5 kg/person' },
  { type:'APL', name:'Above Poverty Line',    color:'#3b82f6', desc:'APL families — subsidised rates',                  grain:'Subsidised' },
  { type:'BPL', name:'Below Poverty Line',    color:'#8b5cf6', desc:'BPL families — reduced rates on food grains',      grain:'Reduced rates' },
]

const STATE_PORTALS = [
  { state:'Uttar Pradesh',  url:'https://fcs.up.gov.in/',               icon:'🗺️' },
  { state:'Maharashtra',    url:'https://rcms.mahafood.gov.in/',         icon:'🏙️' },
  { state:'Bihar',           url:'https://epds.bihar.gov.in/',           icon:'🌾' },
  { state:'Rajasthan',      url:'https://food.raj.nic.in/',             icon:'🏜️' },
  { state:'Madhya Pradesh', url:'https://rationmitra.nic.in/',          icon:'🌳' },
  { state:'Gujarat',        url:'https://ipds.gujarat.gov.in/',         icon:'💎' },
  { state:'Karnataka',      url:'https://ahara.kar.nic.in/',            icon:'🏛️' },
  { state:'West Bengal',    url:'https://wbpds.gov.in/',                icon:'🐯' },
  { state:'Andhra Pradesh', url:'https://epdsap.ap.gov.in/',            icon:'🌴' },
  { state:'Tamil Nadu',     url:'https://www.tnpds.gov.in/',            icon:'🎭' },
  { state:'Telangana',      url:'https://epds.telangana.gov.in/',       icon:'🕌' },
  { state:'Punjab',         url:'https://epos.punjab.gov.in/',          icon:'🌾' },
  { state:'Haryana',        url:'https://haryanafood.gov.in/',          icon:'🚜' },
  { state:'Jharkhand',      url:'https://aahar.jharkhand.gov.in/',      icon:'⛏️' },
  { state:'Odisha',         url:'https://pdsodisha.gov.in/',            icon:'🛕' },
  { state:'Chhattisgarh',   url:'https://khadya.cg.nic.in/',           icon:'🌲' },
]

export default function RationCard({ isDark }) {
  const cls = isDark
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.25)', color:'#f97316' }}>
          🍱 Ration Card Info
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          <span className="grad-text-saffron">Ration Card</span> Information
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Types of ration cards, state portals and how to apply or check status</p>
      </div>

      <AdBanner size="leaderboard" />

      {/* National portal */}
      <a href="https://nfsa.gov.in/" target="_blank" rel="noopener noreferrer"
        className="card p-5 flex items-center gap-4 hover:scale-[1.01] transition-all group">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background:'rgba(22,163,74,0.1)', border:'2px solid rgba(22,163,74,0.3)' }}>🇮🇳</div>
        <div className="flex-1">
          <div className={`font-black text-lg ${cls?'text-white':'text-slate-900'}`}>National Food Security Act (NFSA) Portal</div>
          <div className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Official Government of India — nfsa.gov.in</div>
        </div>
        <ExternalLink size={20} className="text-green-500 group-hover:text-green-400 flex-shrink-0" />
      </a>

      {/* Card types */}
      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>Types of Ration Cards</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {CARD_TYPES.map(c => (
            <div key={c.type} className="p-4 rounded-xl" style={{ background:isDark?`${c.color}08`:'#f8fafc', border:`1.5px solid ${c.color}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black text-white" style={{ background:c.color }}>{c.type}</span>
                <span className={`font-bold text-sm ${cls?'text-white':'text-slate-900'}`}>{c.name}</span>
              </div>
              <p className={`text-xs ${cls?'text-slate-400':'text-slate-500'} mb-1`}>{c.desc}</p>
              <span className="text-xs font-semibold" style={{ color:c.color }}>📦 {c.grain}</span>
            </div>
          ))}
        </div>
      </div>

      <AdBanner size="in-article" />

      {/* State portals */}
      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>State-wise Ration Card Portals</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {STATE_PORTALS.map(s => (
            <a key={s.state} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-xl transition-all hover:scale-[1.02] group"
              style={{ background:isDark?'rgba(249,115,22,0.06)':'#fff7ed', border:isDark?'1px solid rgba(249,115,22,0.15)':'1px solid #fed7aa' }}>
              <span>{s.icon}</span>
              <span className={`text-xs font-semibold flex-1 ${cls?'text-slate-200':'text-slate-800'}`}>{s.state}</span>
              <ExternalLink size={10} className="text-orange-400 opacity-60 group-hover:opacity-100 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
