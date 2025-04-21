
/**
 * Central API routes module.
 * Update API_BASE whenever your backend changes location.
 */
const API_BASE = "http://localhost:8000";

export const apiRoutes = {
  todos: `${API_BASE}/todos`,
  calendar: `${API_BASE}/calendar`,
  items: `${API_BASE}/items`,
  search: (q: string, k?: number) =>
    `${API_BASE}/search?q=${encodeURIComponent(q)}${k ? `&k=${k}` : ""}`,
  health: `${API_BASE}/_health`,
};
