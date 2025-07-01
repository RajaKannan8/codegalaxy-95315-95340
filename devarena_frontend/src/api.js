//
// PUBLIC_INTERFACE
// Central API utility for DevArena frontend – replace fetch/\_endpoint stubs with real backend calls.
//
const API_BASE = "/api"; // TODO: Replace with actual host (from .env/CI or relative proxy)

/** Standard API GET request */
export async function apiGet(endpoint, token = null) {
  // PUBLIC_INTERFACE
  const res = await fetch(API_BASE + endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

/** Standard API POST */
export async function apiPost(endpoint, body, token = null) {
  // PUBLIC_INTERFACE
  const res = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// Export future REST endpoints when backend spec is available.
