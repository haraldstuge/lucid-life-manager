
/**
 * Central API routes and fetchers module.
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

/**
 * Utility: maps backend priority (number) to text label.
 */
const mapPriority = (value?: number): "low" | "medium" | "high" => {
  if (typeof value !== "number") return "medium";
  if (value >= 0.8) return "high";
  if (value >= 0.4) return "medium";
  return "low";
};

/**
 * Utility: maps backend status to completed boolean.
 */
const mapCompleted = (status?: string): boolean =>
  status === "completed" || status === "done" || status === "closed";

/**
 * Fetch TODOs from API, with robust logging.
 * Returns: Promise<Task[]>
 */
export async function fetchTodos() {
  console.log("[apiRoutes] Fetching todos from:", apiRoutes.todos);
  try {
    const response = await fetch(apiRoutes.todos);
    console.log("[apiRoutes] Response status:", response.status);
    const raw = await response.json();
    console.log("[apiRoutes] Raw todos payload:", raw);
    const data = Array.isArray(raw) ? raw : raw.data ?? [];
    const todos = data
      .filter((item: any) => item.type === "todo")
      .map((item: any, idx: number) => {
        const task = {
          id: item.id || String(idx),
          title: item.title ?? "(no title)",
          description: item.description,
          due_date: item.due_date ? new Date(item.due_date) : undefined,
          priority: item.priority,
          status: item.status,
          parent_id: item.parent_id,
          created_at: item.created_at ? new Date(item.created_at) : new Date(),
          updated_at: item.updated_at ? new Date(item.updated_at) : new Date(),
          // Frontend computed properties
          completed: "status" in item ? mapCompleted(item.status) : false,
          dueDate: item.due_date ? new Date(item.due_date) : undefined,
        };
        console.log("[apiRoutes] Parsed task:", task);
        return task;
      });
    return todos;
  } catch (err) {
    console.error("[apiRoutes] Error fetching/parsing todos:", err);
    throw err;
  }
}

/**
 * Fetch calendar events from API, with robust logging.
 * Returns: Promise<CalendarEvent[]>
 */
export async function fetchCalendarEvents() {
  console.log("[apiRoutes] Fetching calendar events from:", apiRoutes.calendar);
  try {
    const response = await fetch(apiRoutes.calendar);
    console.log("[apiRoutes] Response status:", response.status);
    const raw = await response.json();
    console.log("[apiRoutes] Raw calendar payload:", raw);
    const data = Array.isArray(raw) ? raw : raw.data ?? [];
    const events = data
      .filter((item: any) => item.type === "calendar")
      .map((item: any, idx: number) => {
        const event = {
          id: item.id || String(idx),
          title: item.title ?? "(no title)",
          description: item.description,
          starts_at: item.starts_at ? new Date(item.starts_at) : new Date(),
          ends_at: item.ends_at ? new Date(item.ends_at) : new Date(),
          location: item.location,
          recurrence: item.recurrence,
          created_at: item.created_at ? new Date(item.created_at) : new Date(),
          updated_at: item.updated_at ? new Date(item.updated_at) : new Date(),
          // Frontend computed properties
          startTime: item.start_time ? new Date(item.start_time) : new Date(),
          endTime: item.end_time ? new Date(item.end_time) : new Date(),
          category: item.category ?? "other",
        };
        console.log("[apiRoutes] Parsed calendar event:", event);
        return event;
      });
    return events;
  } catch (err) {
    console.error("[apiRoutes] Error fetching/parsing calendar events:", err);
    throw err;
  }
}
