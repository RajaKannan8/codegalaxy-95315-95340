//
// PUBLIC_INTERFACE
// Central API utility for DevArena frontend – replace fetch/\_endpoint stubs with real backend calls.
//
const API_BASE = "/api"; // TODO: Replace with actual host (from .env/CI or relative proxy)

// PUBLIC_INTERFACE
// Central API utility for DevArena frontend – connects to backend REST endpoints.
/** Standard API GET request */
export async function apiGet(endpoint, token = null) {
  const res = await fetch(API_BASE + endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

/** Standard API POST */
export async function apiPost(endpoint, body, token = null) {
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
export async function fetchProjects() {
  return apiGet("/projects");
}
export async function fetchLeaderboard() {
  return apiGet("/leaderboard");
}
export async function fetchUserProfile() {
  return apiGet("/me");
}
export async function fetchPRs() {
  return apiGet("/prs");
}
export async function fetchBugs(projectId = null) {
  let url = "/bugs";
  if (projectId) url += "?project_id=" + encodeURIComponent(projectId);
  return apiGet(url);
}
export async function submitBug(data) {
  return apiPost("/bugs", data);
}
export async function submitPR(data) {
  return apiPost("/prs", data);
}
export async function redeemReward(rewardType) {
  return apiPost("/rewards/redeem", { reward: rewardType });
}
export async function fetchRewards() {
  return apiGet("/rewards");
}
export async function fetchRules(scope = "global") {
  return apiGet("/rules?scope=" + encodeURIComponent(scope));
}
export async function fetchDisputes() {
  return apiGet("/disputes");
}
export async function login(credentials) {
  return apiPost("/auth/login", credentials);
}
// Export future REST endpoints when backend spec is available.
