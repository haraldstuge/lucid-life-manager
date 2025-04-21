
import AppLayout from "@/components/layout/AppLayout";
import CalendarView from "@/components/calendar/CalendarView";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import EventDialog from "@/components/calendar/EventDialog";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showEventDialog, setShowEventDialog] = useState(false);

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Calendar</h1>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "MMMM yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="month"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={() => setShowEventDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>

        <CalendarView currentDate={date} />
        
        <EventDialog 
          open={showEventDialog}
          onOpenChange={setShowEventDialog}
        />
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
