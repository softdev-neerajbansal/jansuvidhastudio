import { useState } from 'react'
import { ExternalLink, Train } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const PNR_SITES = [
  { name:'Indian Railways Official', url:'https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html', icon:'🚂', tag:'Official' },
  { name:'IRCTC',                    url:'https://www.irctc.co.in/nget/train-search',                  icon:'🎫', tag:'Official' },
  { name:'Rail Yatri',               url:'https://www.railyatri.in/pnr-status',                       icon:'📱', tag:'Popular' },
  { name:'Where is My Train',        url:'https://enquiry.indianrail.gov.in/',                        icon:'📍', tag:'Live' },
  { name:'Ixigo Trains',             url:'https://www.ixigo.com/pnr-status/pnr-enquiry',             icon:'🔍', tag:'Popular' },
  { name:'MakeMyTrip',               url:'https://www.makemytrip.com/railways/pnrcheck.html',        icon:'✈️', tag:'Popular' },
]

const STATUS_CODES = [
  { code:'CNF',  desc:'Confirmed',           color:'#16a34a' },
  { code:'WL',   desc:'Waiting List',         color:'#f97316' },
  { code:'RAC',  desc:'Reservation Against Cancellation', color:'#eab308' },
  { code:'PQWL', desc:'Pooled Quota Waiting List', color:'#f97316' },
  { code:'GNWL', desc:'General Waiting List', color:'#f97316' },
  { code:'CAN',  desc:'Cancelled',           color:'#ef4444' },
  { code:'REGRET', desc:'No Berth Available', color:'#ef4444' },
  { code:'AVAILABLE', desc:'Seat Available',  color:'#16a34a' },
]

export default function TrainPNR({ isDark }) {
  const [pnr, setPnr] = useState('')
  const cls = isDark

  const openSite = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const openWithPNR = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.25)', color:'#3b82f6' }}>
          🚂 Train PNR Status
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          Check <span style={{ background:'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Train PNR</span> Status
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Enter your 10-digit PNR and check status on official railways portal</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="card p-6 flex flex-col gap-4">
        <label className={`block text-sm font-semibold mb-1 ${cls?'text-slate-300':'text-slate-700'}`}>Enter 10-Digit PNR Number</label>
        <div className="flex gap-3">
          <input className="inp font-mono tracking-widest text-lg flex-1" placeholder="e.g. 2345678901"
            maxLength={10} inputMode="numeric" value={pnr}
            onChange={e => setPnr(e.target.value.replace(/\D/g,''))} />
          <button className="btn-saffron px-6"
            style={{ background:'linear-gradient(135deg,#3b82f6,#4f46e5)' }}
            onClick={() => openWithPNR(`https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html`)}>
            <ExternalLink size={16} /> Check Status
          </button>
        </div>
        <p className={`text-xs ${cls?'text-slate-500':'text-slate-400'}`}>
          PNR is printed on your ticket — top left corner. It is a 10-digit number.
        </p>
      </div>

      {/* Quick check buttons */}
      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>Check PNR on Official Sites</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {PNR_SITES.map(site => (
            <button key={site.name} onClick={() => openWithPNR(site.url)}
              className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ background:isDark?'rgba(59,130,246,0.06)':'#eff6ff', border:isDark?'1px solid rgba(59,130,246,0.15)':'1px solid #bfdbfe' }}>
              <span className="text-2xl">{site.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm ${cls?'text-white':'text-slate-900'}`}>{site.name}</div>
                <div className="text-xs text-blue-500">{site.tag}</div>
              </div>
              <ExternalLink size={14} className="text-blue-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <AdBanner size="in-article" />

      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>PNR Status Codes Explained</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATUS_CODES.map(({ code, desc, color }) => (
            <div key={code} className="p-3 rounded-xl" style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:`1px solid ${color}25` }}>
              <div className="font-black font-mono text-base mb-1" style={{ color }}>{code}</div>
              <div className={`text-xs ${cls?'text-slate-400':'text-slate-500'}`}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
