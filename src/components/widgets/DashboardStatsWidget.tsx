
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
      color: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400",
      shadow: "shadow-blue-500/20",
    },
    {
      title: "Completed Tasks",
      value: loading ? "-" : completedTasks,
      icon: CalendarCheck,
      color: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 text-green-600 dark:text-green-400",
      shadow: "shadow-green-500/20",
    },
    {
      title: "Upcoming Events",
      value: loading ? "-" : upcomingEvents,
      icon: Clock,
      color: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 text-purple-600 dark:text-purple-400",
      shadow: "shadow-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`border-none overflow-hidden transition-all duration-300 hover:scale-[1.02] ${stat.shadow}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground/80">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold tracking-tight mt-1">
                  {stat.value}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStatsWidget;
