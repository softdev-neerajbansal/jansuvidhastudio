import { useEffect, useRef } from 'react'
import { SHOW_ADS, ADSENSE_CLIENT, AD_SLOTS } from '../config.js'

/**
 * AdBanner — Google AdSense component
 *
 * SHOW_ADS = false → renders nothing (zero DOM, zero space)
 * SHOW_ADS = true  → renders real AdSense <ins> tag + initialises adsbygoogle
 *
 * Replace ADSENSE_CLIENT and AD_SLOTS in src/config.js with your real IDs.
 *
 * Sizes:
 *   leaderboard  → 728×90   full-width top/bottom
 *   rectangle    → 300×250  sidebar
 *   in-article   → responsive in-content
 */

const SIZES = {
  leaderboard:  { minH: 90,  slot: AD_SLOTS.leaderboard, label: 'Leaderboard' },
  rectangle:    { minH: 250, slot: AD_SLOTS.rectangle,   label: 'Rectangle' },
  'in-article': { minH: 90,  slot: AD_SLOTS.inArticle,   label: 'In-Article' },
}

export default function AdBanner({ size = 'leaderboard', className = '' }) {
  const insRef = useRef(null)

  /* Ads disabled → render nothing */
  if (!SHOW_ADS) return null

  const { minH, slot, label } = SIZES[size] || SIZES.leaderboard

  return (
    <AdUnit
      client={ADSENSE_CLIENT}
      slot={slot}
      minH={minH}
      label={label}
      className={className}
      insRef={insRef}
    />
  )
}

/* Separate component so useEffect works correctly */
function AdUnit({ client, slot, minH, label, className, insRef }) {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      /* adsbygoogle not loaded yet — safe to ignore */
    }
  }, [])

  return (
    <div className={`w-full ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
