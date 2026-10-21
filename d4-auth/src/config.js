// Reads the auth API's base URL from runtime config (window.__D4_CONFIG__,
// set by the host's public/config.js — see that file for why it must be the
// host's, not this package's own). Falls back to localhost for convenience
// when no config was ever injected (e.g. a unit test).
export function getAuthApiUrl() {
  if (typeof window !== "undefined" && window.__D4_CONFIG__ && window.__D4_CONFIG__.AUTH_API_URL) {
    return window.__D4_CONFIG__.AUTH_API_URL;
  }
  return "http://localhost:8003";
}
