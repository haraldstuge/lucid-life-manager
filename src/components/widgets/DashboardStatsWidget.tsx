
import { Card, CardContent } from "@/components/ui/card";
import { fetchTodos, fetchCalendarEvents } from "@/lib/apiRoutes";
import { CalendarCheck, CheckSquare, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { CalendarEvent } from "@/types/event";

const DashboardStatsWidget = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[DashboardStatsWidget] Fetching data for stats...");
    
    Promise.all([
      fetchTodos(),
      fetchCalendarEvents()
    ])
      .then(([todosData, eventsData]) => {
        console.log("[DashboardStatsWidget] Data fetched successfully");
        setTasks(todosData);
        setEvents(eventsData);
        setLoading(false);
      })
      .catch(err => {
        console.error("[DashboardStatsWidget] Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const upcomingEvents = events.filter(
    event => new Date(event.startTime) > new Date()
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: loading ? "-" : totalTasks,
      icon: CheckSquare,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Completed Tasks",
      value: loading ? "-" : completedTasks,
      icon: CalendarCheck,
      color: "text-green-500 bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Upcoming Events",
      value: loading ? "-" : upcomingEvents,
      icon: Clock,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm hover:shadow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStatsWidget;
