
import { getEventsForDate, mockEvents } from "@/data/mockData";
import { CalendarEvent } from "@/types/event";
import { cn } from "@/lib/utils";
import { addDays, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isToday, startOfMonth } from "date-fns";

interface CalendarViewProps {
  currentDate: Date;
}

const CalendarView = ({ currentDate }: CalendarViewProps) => {
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  
  // Get all days in the month
  const monthDays = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startDayOfWeek = getDay(startDate);
  
  // Add placeholder days to align the first day correctly
  const placeholderDays = Array.from({ length: startDayOfWeek }, (_, i) => addDays(startDate, -startDayOfWeek + i));
  
  // Combine placeholder days and month days
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
          const dayEvents = getEventsForDate(mockEvents, day);
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
