
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventsForDate, mockEvents } from "@/data/mockData";
import { CalendarEvent } from "@/types/event";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardCalendarWidget = () => {
  // Get today's events
  const todayEvents = getEventsForDate(mockEvents, new Date());
  
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
      <CardContent className="p-0">
        {sortedEvents.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/50 mb-2" />
            <h3 className="font-medium text-muted-foreground">No events today</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your calendar is clear!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCalendarWidget;
