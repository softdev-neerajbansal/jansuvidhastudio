/**
 * JanSuvidhaStudio — Configuration
 * ─────────────────────────────────────────────────
 * SHOW_ADS  true  → Google AdSense ad spaces render
 *           false → No ads rendered, zero space taken
 *
 * Default: true (ads on by default)
 */
export const SHOW_ADS = false

/* ─────────────────────────────────────────────────────────
   Replace with your real Google AdSense Publisher ID and
   Ad Slot IDs from https://www.google.com/adsense/
   ───────────────────────────────────────────────────────── */
export const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX'   // ← your publisher ID

export const AD_SLOTS = {
  leaderboard : 'XXXXXXXXXX',   // 728×90  top / bottom banner
  rectangle   : 'XXXXXXXXXX',   // 300×250 sidebar
  inArticle   : 'XXXXXXXXXX',   // in-content responsive
}

/**
 * API routes — PHP proxy files handle production, Vite proxy handles local dev.
 * No .htaccess rewrite needed; PHP files are called directly with query params.
 */
export const IFSC_API    = '/api/ifsc.php'      // ?code=SBIN0005943
export const PINCODE_API = '/api/pincode.php'   // ?pin=250001
export const POSTOFF_API = '/api/postoffice.php' // ?name=Meerut
