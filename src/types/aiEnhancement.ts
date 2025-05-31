
export interface AIEnhancement {
  id: string;
  ai_summary?: string;
  ai_tags?: string[];
  ai_extra?: Record<string, any>;
  embedding?: number[];
  last_enriched_at?: Date;
  todo_id?: string;
  event_id?: string;
}
