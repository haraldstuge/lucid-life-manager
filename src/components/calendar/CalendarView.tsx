
import { CalendarEvent } from "@/types/event";
import { cn } from "@/lib/utils";
import { addDays, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isToday, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { fetchCalendarEvents } from "@/lib/apiRoutes";

interface CalendarViewProps {
  currentDate: Date;
}

const CalendarView = ({ currentDate }: CalendarViewProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCalendarEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load calendar events");
        setLoading(false);
        console.error("[CalendarView] Fetch error:", err);
      });
  }, [currentDate]);

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: startDate, end: endDate });
  const startDayOfWeek = getDay(startDate);
  const placeholderDays = Array.from({ length: startDayOfWeek }, (_, i) => addDays(startDate, -startDayOfWeek + i));
  const calendarDays = [...placeholderDays, ...monthDays];

  const getEventClassName = (category: CalendarEvent["category"]) => {
    switch (category) {
      case "work":
        return "calendar-event-work";
      case "personal":
        return "calendar-event-personal";
      default:
        return "calendar-event-other";
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      // Compare only year, month, day for a match
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-muted-foreground">Loading calendar events...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <span className="text-muted-foreground mb-1">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 text-center border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 min-h-[600px] auto-rows-fr">
        {calendarDays.map((day, i) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <div
              key={i}
              className={cn(
                "border-r border-b p-1 h-full",
                "min-h-[100px] max-h-[120px] overflow-y-auto",
                !isCurrentMonth && "text-muted-foreground/50 bg-muted/20",
                isToday(day) && "bg-blue-50/50 dark:bg-blue-900/10"
              )}
            >
              <div className="sticky top-0 z-10 flex justify-end p-1">
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                    isEqual(day, new Date()) && "bg-primary text-primary-foreground"
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn("calendar-event", getEventClassName(event.category))}
                  >
                    <div className="flex items-center">
                      <span className="mr-1">{format(new Date(event.startTime), "h:mm")}</span>
                      <span className="truncate">{event.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
