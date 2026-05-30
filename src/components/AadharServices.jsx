import { ExternalLink } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const SERVICES = [
  { name:'Download Aadhar (e-Aadhar)',   url:'https://myaadhaar.uidai.gov.in/',             desc:'Download PDF/masked Aadhar',              icon:'⬇️', color:'#16a34a', hot:true },
  { name:'Update Aadhar Details Online', url:'https://myaadhaar.uidai.gov.in/update-aadhar',desc:'Update address, mobile, email online',     icon:'✏️', color:'#f97316', hot:true },
  { name:'Book Appointment (Offline)',   url:'https://appointments.uidai.gov.in/',          desc:'Book slot at Aadhar enrollment centre',    icon:'📅', color:'#6366f1', hot:false },
  { name:'Check Aadhar Status',          url:'https://myaadhaar.uidai.gov.in/checkAadhaarStatus', desc:'Track enrollment/update request',   icon:'🔍', color:'#3b82f6', hot:false },
  { name:'Lock/Unlock Biometrics',       url:'https://myaadhaar.uidai.gov.in/lock-unlock-biometrics', desc:'Protect biometric data', icon:'🔒', color:'#8b5cf6', hot:false },
  { name:'Lock/Unlock Aadhar Number',    url:'https://myaadhaar.uidai.gov.in/lock-unlock-uid',desc:'Lock your 12-digit Aadhar UID',         icon:'🛡️', color:'#ef4444', hot:false },
  { name:'Verify Aadhar Number',         url:'https://myaadhaar.uidai.gov.in/verifyAadhaar', desc:'Check if an Aadhar number is valid',     icon:'✅', color:'#10b981', hot:false },
  { name:'Order Aadhar Reprint (₹50)',   url:'https://aadhaarreprint.uidai.gov.in/',        desc:'Get physical PVC Aadhar card',             icon:'🖨️', color:'#f97316', hot:true },
  { name:'Retrieve Lost UID/EID',        url:'https://myaadhaar.uidai.gov.in/retrieveEid',  desc:'Find your Aadhar number via OTP',         icon:'🔄', color:'#06b6d4', hot:false },
  { name:'mAadhaar App',                 url:'https://maadhaar.uidai.gov.in/',              desc:'Official mobile app — carry digital Aadhar',icon:'📱', color:'#eab308', hot:true },
  { name:'UIDAI Official Website',       url:'https://uidai.gov.in/',                       desc:'All Aadhar related services',             icon:'🏛️', color:'#6366f1', hot:false },
  { name:'Aadhar Helpline 1947',         url:'tel:1947',                                    desc:'Call for queries (toll-free)',             icon:'📞', color:'#16a34a', hot:false },
]

const TIPS = [
  { icon:'🔒', tip:'Always use Virtual ID (VID) instead of actual Aadhar number for authentication.' },
  { icon:'📱', tip:'Link mobile number with Aadhar to use OTP-based services online.' },
  { icon:'🛡️', tip:'Enable biometric lock when not using biometric authentication.' },
  { icon:'📄', tip:'e-Aadhar (PDF) is equally valid as physical card for all purposes.' },
]

export default function AadharServices({ isDark }) {
  const cls = isDark
  const hot    = SERVICES.filter(s => s.hot)
  const others = SERVICES.filter(s => !s.hot)

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', color:'#10b981' }}>
          🔐 Aadhar Services
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          <span style={{ background:'linear-gradient(135deg,#10b981,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Aadhar (UIDAI)</span> Services
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Download, update, lock and manage your Aadhar card easily</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>🔥 Most Used Services</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {hot.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02] group"
              style={{ background:isDark?`${s.color}10`:`${s.color}10`, border:`1.5px solid ${s.color}35` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background:`${s.color}20` }}>{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm ${cls?'text-white':'text-slate-900'}`}>{s.name}</div>
                <div className={`text-xs mt-0.5 ${cls?'text-slate-400':'text-slate-500'}`}>{s.desc}</div>
              </div>
              <ExternalLink size={14} style={{ color:s.color }} className="flex-shrink-0 opacity-60 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>

      <AdBanner size="in-article" />

      <div className="card p-5">
        <h3 className={`font-bold mb-4 ${cls?'text-white':'text-slate-900'}`}>All Aadhar Services</h3>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {others.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl transition-all hover:scale-[1.01] group"
              style={{ background:isDark?'rgba(255,255,255,0.03)':'#f8fafc', border:isDark?'1px solid rgba(255,255,255,0.07)':'1px solid #e5e7eb' }}>
              <span className="text-lg">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-xs ${cls?'text-white':'text-slate-900'}`}>{s.name}</div>
                <div className={`text-xs ${cls?'text-slate-500':'text-slate-400'}`}>{s.desc}</div>
              </div>
              <ExternalLink size={12} style={{ color:s.color }} className="opacity-50 group-hover:opacity-100 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className={`font-bold mb-3 ${cls?'text-white':'text-slate-900'}`}>💡 Aadhar Security Tips</h3>
        <div className="flex flex-col gap-2.5">
          {TIPS.map(({ icon, tip }) => (
            <div key={tip} className="flex items-start gap-3 p-3 rounded-xl" style={{ background:isDark?'rgba(16,185,129,0.05)':'#f0fdf4', border:isDark?'1px solid rgba(16,185,129,0.12)':'1px solid #d1fae5' }}>
              <span className="text-lg flex-shrink-0">{icon}</span>
              <p className={`text-sm ${cls?'text-slate-300':'text-slate-700'}`}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
