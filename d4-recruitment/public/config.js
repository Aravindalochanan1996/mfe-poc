// Used ONLY when this remote runs standalone (npm start, port 3002) for
// local development/preview. When composed into the host shell, this file
// is never loaded — the host's own config.js (which includes
// RECRUITMENT_API_URL too) is what's actually present in the page, since
// that's the document Module Federation's code is really executing inside.
window.__D4_CONFIG__ = {
  RECRUITMENT_API_URL: "http://localhost:8002",
};
