
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { ArrowRight, CheckSquare, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRoutes } from "@/lib/apiRoutes";

const DashboardTasksWidget = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(apiRoutes.todos)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        // Attempt both: array of Task or {data: Task[]}
        const json = await res.json();
        let data: Task[] = Array.isArray(json) ? json : json.data;
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load tasks");
        setLoading(false);
      });
  }, []);

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-orange-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  let content = null;

  if (loading) {
    content = (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Circle className="h-6 w-6 animate-spin text-muted-foreground/50 mb-2" />
        <h3 className="font-medium text-muted-foreground">Loading tasks...</h3>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <CheckSquare className="h-10 w-10 text-muted-foreground/50 mb-2" />
        <h3 className="font-medium text-muted-foreground">No data</h3>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
      </div>
    );
  } else if (!tasks || tasks.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <CheckSquare className="h-10 w-10 text-muted-foreground/50 mb-2" />
        <h3 className="font-medium text-muted-foreground">No tasks for today</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your schedule is clear!
        </p>
      </div>
    );
  } else {
    content = (
      <div className="divide-y">
        {tasks.slice(0, 5).map((task) => (
          <div
            key={task.id}
            className={cn(
              "p-4 flex items-start gap-3 task-item-hover",
              task.completed && "opacity-60"
            )}
          >
            <Checkbox id={`task-${task.id}`} checked={task.completed} className="mt-1" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "font-medium cursor-pointer",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </label>
                <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>
                  {task.priority}
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {task.description}
                </p>
              )}
              {task.dueDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 pb-2">
        <CardTitle className="text-lg font-medium">Tasks</CardTitle>
        <Link to="/tasks">
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">{content}</CardContent>
    </Card>
  );
};

export default DashboardTasksWidget;
