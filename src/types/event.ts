
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  starts_at: Date;
  ends_at: Date;
  location?: string;
  recurrence?: string;
  created_at: Date;
  updated_at: Date;
  
  // Frontend computed properties
  startTime?: Date;
  endTime?: Date;
  category?: "work" | "personal" | "other";
}
