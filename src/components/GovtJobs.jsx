import { ExternalLink } from 'lucide-react'
import AdBanner from './AdBanner.jsx'

const CATEGORIES = [
  {
    cat:'Central Government', icon:'🏛️', color:'#6366f1',
    jobs:[
      { name:'UPSC (IAS/IPS/IFS)', url:'https://www.upsc.gov.in/', tag:'Top Exams' },
      { name:'SSC (CGL/CHSL/MTS)', url:'https://ssc.nic.in/', tag:'Staff Selection' },
      { name:'Railways (RRB/RRC)', url:'https://indianrailways.gov.in/', tag:'Railway Jobs' },
      { name:'IBPS (Bank PO/Clerk)', url:'https://www.ibps.in/', tag:'Banking' },
      { name:'Defence (Army/Navy/Air)', url:'https://joinindianarmy.nic.in/', tag:'Defence' },
      { name:'NDA / CDS Exam',   url:'https://www.upsc.gov.in/', tag:'Defence' },
    ]
  },
  {
    cat:'Banking & Finance', icon:'🏦', color:'#f97316',
    jobs:[
      { name:'SBI Recruitment',   url:'https://sbi.co.in/web/careers', tag:'SBI' },
      { name:'RBI Recruitment',   url:'https://rbi.org.in/Scripts/Opportunities.aspx', tag:'RBI' },
      { name:'NABARD',             url:'https://www.nabard.org/jobs.aspx', tag:'NABARD' },
      { name:'LIC Recruitment',   url:'https://licindia.in/Careers', tag:'Insurance' },
      { name:'SEBI',               url:'https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&sid=7', tag:'SEBI' },
      { name:'NPS / PFRDA',       url:'https://www.pfrda.org.in/', tag:'Pension' },
    ]
  },
  {
    cat:'State Government (UP)', icon:'🗺️', color:'#16a34a',
    jobs:[
      { name:'UPPSC (UP PSC)',     url:'https://uppsc.up.nic.in/', tag:'UP State' },
      { name:'UP Police',          url:'https://uppbpb.gov.in/', tag:'Police' },
      { name:'UP TET / UPTET',    url:'https://updeled.gov.in/', tag:'Teaching' },
      { name:'UPSSSC',             url:'https://upsssc.gov.in/', tag:'Sub-ordinate' },
      { name:'UP Lekhpal',         url:'https://upsssc.gov.in/', tag:'Revenue' },
      { name:'UP Jail Warder',    url:'https://www.upcorrectional.in/', tag:'UP Jail' },
    ]
  },
  {
    cat:'Teaching & Education', icon:'📚', color:'#8b5cf6',
    jobs:[
      { name:'CTET (Central TET)', url:'https://ctet.nic.in/', tag:'Teaching' },
      { name:'KVS Recruitment',   url:'https://kvsangathan.nic.in/', tag:'KV School' },
      { name:'NVS Recruitment',   url:'https://www.navodaya.gov.in/', tag:'NV School' },
      { name:'DSSSB Delhi',       url:'https://dsssb.delhi.gov.in/', tag:'Delhi' },
      { name:'University Grants', url:'https://ugc.ac.in/', tag:'UGC' },
      { name:'CSIR / NET',        url:'https://csirhrdg.res.in/', tag:'Research' },
    ]
  },
  {
    cat:'Police & Security', icon:'👮', color:'#ef4444',
    jobs:[
      { name:'CISF Recruitment',  url:'https://cisf.gov.in/new/', tag:'CISF' },
      { name:'CRPF Recruitment',  url:'https://crpf.gov.in/', tag:'CRPF' },
      { name:'BSF Recruitment',   url:'https://bsf.gov.in/', tag:'BSF' },
      { name:'ITBP Recruitment',  url:'https://www.itbpolice.nic.in/', tag:'ITBP' },
      { name:'SSB Recruitment',   url:'https://ssbrectt.gov.in/', tag:'SSB' },
      { name:'CAPF Assistant Cmd',url:'https://www.upsc.gov.in/', tag:'UPSC' },
    ]
  },
  {
    cat:'Job Portals', icon:'🔍', color:'#06b6d4',
    jobs:[
      { name:'Sarkari Result',    url:'https://www.sarkariresult.com/', tag:'All Jobs' },
      { name:'Naukri.com (Govt)', url:'https://www.naukri.com/government-jobs', tag:'Portal' },
      { name:'Employment News',   url:'https://www.employmentnews.gov.in/', tag:'Official' },
      { name:'National Career',   url:'https://www.ncs.gov.in/', tag:'NCS Portal' },
      { name:'Rojgar Samachar',   url:'https://www.rojgarsamachar.com/', tag:'Portal' },
      { name:'Fresherslive Govt', url:'https://www.fresherslive.com/govt-jobs', tag:'Portal' },
    ]
  },
]

export default function GovtJobs({ isDark }) {
  const cls = isDark
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.25)', color:'#6366f1' }}>
          💼 Government Jobs Alerts
        </div>
        <h2 className={`text-3xl font-black mb-2 ${cls?'text-white':'text-slate-900'}`}>
          Latest <span style={{ background:'linear-gradient(135deg,#6366f1,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Govt Job</span> Alerts
        </h2>
        <p className={`text-sm ${cls?'text-slate-400':'text-slate-500'}`}>Direct links to official recruitment portals — Central & State Government</p>
      </div>

      <AdBanner size="leaderboard" />

      <div className="flex flex-col gap-5">
        {CATEGORIES.map(({ cat, icon, color, jobs }) => (
          <div key={cat} className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{icon}</span>
              <h3 className={`font-bold text-lg ${cls?'text-white':'text-slate-900'}`} style={{ color }}>{cat}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {jobs.map(job => (
                <a key={job.name} href={job.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl transition-all hover:scale-[1.02] group"
                  style={{ background:isDark?`${color}08`:'#f8fafc', border:isDark?`1px solid ${color}20`:'1px solid #e5e7eb' }}>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-xs ${cls?'text-white':'text-slate-900'} truncate`}>{job.name}</div>
                    <div className="text-xs mt-0.5" style={{ color }}>{job.tag}</div>
                  </div>
                  <ExternalLink size={13} className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color }} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AdBanner size="in-article" />
    </div>
  )
}
