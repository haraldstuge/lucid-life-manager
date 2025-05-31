
import { CalendarEvent } from "@/types/event";
import { Task } from "@/types/task";
import { addDays, addHours, setHours, startOfDay, subDays } from "date-fns";

// Utility functions

// Function to filter tasks
export const filterTasks = (tasks: Task[], filter: string): Task[] => {
  const today = startOfDay(new Date());
  
  switch (filter) {
    case "today":
      return tasks.filter(
        task => 
          task.dueDate && 
          startOfDay(new Date(task.dueDate)).getTime() === today.getTime() &&
          !task.completed
      );
    case "upcoming":
      return tasks.filter(
        task => 
          task.dueDate && 
          startOfDay(new Date(task.dueDate)).getTime() > today.getTime() &&
          !task.completed
      );
    case "completed":
      return tasks.filter(task => task.completed);
    case "all":
    default:
      return tasks;
  }
};

// Function to filter events by date
export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const targetDate = startOfDay(date).getTime();
  
  return events.filter(event => {
    const eventDate = startOfDay(new Date(event.startTime || event.starts_at)).getTime();
    return eventDate === targetDate;
  });
};
