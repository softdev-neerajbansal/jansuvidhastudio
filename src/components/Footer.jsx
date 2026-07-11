import AdBanner from './AdBanner.jsx'

export default function Footer({ isDark }) {
  return (
    <footer style={{ background: isDark ? '#07090f' : '#fff', borderTop: isDark ? '1px solid rgba(249,115,22,0.1)' : '1px solid #e5e7eb' }}>
      {/* Bottom leaderboard ad */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <AdBanner size="leaderboard" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: 'linear-gradient(135deg,#f97316,#16a34a)' }}>JS</div>
              <span className="font-black"><span className="grad-text">JanSuvidha</span><span className={isDark?'text-white':'text-slate-900'}>Studio</span></span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              India's free information hub for IFSC codes and PIN codes. Accurate, fast, and always up-to-date.
            </p>
            {/* Indian flag strip */}
            <div className="flex h-1.5 rounded-full overflow-hidden mt-4 w-24">
              <div className="flex-1 bg-orange-500" />
              <div className="flex-1 bg-white" style={{ background: isDark ? '#e5e7eb' : '#d1d5db' }} />
              <div className="flex-1 bg-green-600" />
            </div>
          </div>

          {/* IFSC links */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>IFSC Codes</h4>
            <ul className="flex flex-col gap-2">
              {['SBI IFSC Codes','HDFC Bank IFSC','ICICI Bank IFSC','Axis Bank IFSC','PNB IFSC Codes','Bank of Baroda'].map(l => (
                <li key={l}><a href="#" className={`text-xs hover:text-orange-500 transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* PIN links */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>PIN Codes</h4>
            <ul className="flex flex-col gap-2">
              {['Delhi PIN Codes','Mumbai PIN Codes','Bangalore PIN Codes','Meerut PIN Codes','Chennai PIN Codes','Kolkata PIN Codes'].map(l => (
                <li key={l}><a href="#" className={`text-xs hover:text-green-500 transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className={`text-xs font-black uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Information</h4>
            <ul className="flex flex-col gap-2">
              {['About IFSC Codes','What is PIN Code?','Banking Glossary','RBI Guidelines','India Post','Contact Us'].map(l => (
                <li key={l}><a href="#" className={`text-xs hover:text-orange-400 transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f1f5f9' }}>
          <p className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            © 2025 JanSuvidhaStudio. All rights reserved.
          </p>
          <p className={`text-xs text-center ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            ⚠️ For informational purposes only. Always verify with your bank before transactions.
          </p>
        </div>
      </div>
    </footer>
  )
}
