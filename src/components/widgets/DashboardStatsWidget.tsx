
import { Card, CardContent } from "@/components/ui/card";
import { mockEvents, mockTasks } from "@/data/mockData";
import { CalendarCheck, CheckSquare, Clock } from "lucide-react";

const DashboardStatsWidget = () => {
  // Calculate statistics
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(task => task.completed).length;
  const upcomingEvents = mockEvents.filter(
    event => new Date(event.startTime) > new Date()
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: CheckSquare,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: CalendarCheck,
      color: "text-green-500 bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents,
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
