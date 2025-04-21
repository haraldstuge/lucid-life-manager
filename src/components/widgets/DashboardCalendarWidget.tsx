
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarEvent } from "@/types/event";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowRight, Calendar, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRoutes } from "@/lib/apiRoutes";

const DashboardCalendarWidget = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(apiRoutes.calendar)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        // Try both array and data wrapper
        const json = await res.json();
        let data: CalendarEvent[] = Array.isArray(json) ? json : json.data;
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load events");
        setLoading(false);
      });
  }, []);

  // Show today's events only
  const today = new Date();
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.startTime);
    return (
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getDate() === today.getDate()
    );
  });

  // Sort by start time
  const sortedEvents = [...todayEvents].sort((a, b) =>
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

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

  let content = null;

  if (loading) {
    content = (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Circle className="h-6 w-6 animate-spin text-muted-foreground/50 mb-2" />
        <h3 className="font-medium text-muted-foreground">Loading events...</h3>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Calendar className="h-10 w-10 text-muted-foreground/50 mb-2" />
        <h3 className="font-medium text-muted-foreground">No data</h3>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
      </div>
    );
  } else if (!sortedEvents || sortedEvents.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Calendar className="h-10 w-10 text-muted-foreground/50 mb-2" />
        <h3 className="font-medium text-muted-foreground">No events today</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your calendar is clear!
        </p>
      </div>
    );
  } else {
    content = (
      <div className="divide-y">
        {sortedEvents.map((event) => (
          <div key={event.id} className="p-4 task-item-hover">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">{event.title}</h3>
              <span className={cn("calendar-event", getEventClassName(event.category))}>
                {event.category}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
            </div>
            {event.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {event.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 pb-2">
        <CardTitle className="text-lg font-medium">Today's Calendar</CardTitle>
        <Link to="/calendar">
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">{content}</CardContent>
    </Card>
  );
};

export default DashboardCalendarWidget;
