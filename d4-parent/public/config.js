// Runtime configuration — read by the JS bundle at startup via
// `window.__D4_CONFIG__`, never baked into the build itself. To promote the
// exact same build from dev -> QA -> UAT -> prod, only THIS file changes
// (swapped by the deploy pipeline, or served from a different static host
// per environment) — the JS bundle is never rebuilt for a URL change.
//
// Because Module Federation remotes execute inside whichever page actually
// loaded them, composed Finance/Recruitment code reads this SAME global —
// not their own standalone config.js — so this file must list every
// service's URL, not just the host's own.
window.__D4_CONFIG__ = {
  AUTH_API_URL: "http://localhost:8003",
  FINANCE_API_URL: "http://localhost:8001",
  RECRUITMENT_API_URL: "http://localhost:8002",
};
