
import { CalendarEvent } from "@/types/event";
import { Task } from "@/types/task";
import { addDays, addHours, setHours, startOfDay, subDays } from "date-fns";

// Mock data for tasks
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review project proposal",
    description: "Read through the new project proposal and provide feedback",
    completed: false,
    dueDate: addDays(new Date(), 1),
    priority: "high",
    createdAt: subDays(new Date(), 2),
  },
  {
    id: "2",
    title: "Prepare presentation slides",
    description: "Create slides for the upcoming team meeting",
    completed: false,
    dueDate: addDays(new Date(), 3),
    priority: "medium",
    createdAt: subDays(new Date(), 1),
  },
  {
    id: "3",
    title: "Send follow-up emails",
    completed: true,
    priority: "low",
    createdAt: subDays(new Date(), 4),
  },
  {
    id: "4",
    title: "Update documentation",
    description: "Update the user manual with the latest features",
    completed: false,
    dueDate: addDays(new Date(), 5),
    priority: "medium",
    createdAt: subDays(new Date(), 3),
  },
  {
    id: "5",
    title: "Schedule team meeting",
    completed: true,
    priority: "high",
    createdAt: subDays(new Date(), 5),
  },
];

// Mock data for calendar events
export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily team standup meeting",
    startTime: setHours(startOfDay(new Date()), 9),
    endTime: setHours(startOfDay(new Date()), 10),
    category: "work",
    createdAt: subDays(new Date(), 7),
  },
  {
    id: "2",
    title: "Project Review",
    description: "Quarterly project review with stakeholders",
    startTime: addDays(setHours(startOfDay(new Date()), 14), 1),
    endTime: addDays(setHours(startOfDay(new Date()), 16), 1),
    category: "work",
    createdAt: subDays(new Date(), 14),
  },
  {
    id: "3",
    title: "Dinner with Friends",
    startTime: addDays(setHours(startOfDay(new Date()), 19), 2),
    endTime: addDays(setHours(startOfDay(new Date()), 21), 2),
    category: "personal",
    createdAt: subDays(new Date(), 3),
  },
  {
    id: "4",
    title: "Doctor Appointment",
    description: "Annual checkup",
    startTime: addDays(setHours(startOfDay(new Date()), 11), 3),
    endTime: addDays(setHours(startOfDay(new Date()), 12), 3),
    category: "personal",
    createdAt: subDays(new Date(), 10),
  },
  {
    id: "5",
    title: "Conference Call",
    description: "Product discussion with the client",
    startTime: addHours(new Date(), 3),
    endTime: addHours(new Date(), 4),
    category: "work",
    createdAt: subDays(new Date(), 1),
  },
];

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
    const eventDate = startOfDay(new Date(event.startTime)).getTime();
    return eventDate === targetDate;
  });
};
