
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category: "work" | "personal" | "other";
  createdAt: Date;
}
