
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { fetchTodos } from "@/lib/apiRoutes";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import TaskDialog from "./TaskDialog";

interface TaskListProps {
  filter: string;
}

const TaskList = ({ filter }: TaskListProps) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  useEffect(() => {
    console.log("[TaskList] Fetching tasks with filter:", filter);
    setLoading(true);
    setError(null);
    
    fetchTodos()
      .then((data) => {
        console.log("[TaskList] Tasks fetched successfully:", data);
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[TaskList] Error fetching tasks:", err);
        setError("Could not load tasks");
        setLoading(false);
      });
  }, [filter]);
  
  const filterTasks = (tasks: Task[], filter: string): Task[] => {
    console.log("[TaskList] Filtering tasks with:", filter);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (filter) {
      case "today":
        return tasks.filter(
          task => 
            task.dueDate && 
            new Date(task.dueDate).setHours(0, 0, 0, 0) === today.getTime() &&
            !task.completed
        );
      case "upcoming":
        return tasks.filter(
          task => 
            task.dueDate && 
            new Date(task.dueDate).setHours(0, 0, 0, 0) > today.getTime() &&
            !task.completed
        );
      case "completed":
        return tasks.filter(task => task.completed);
      case "all":
      default:
        return tasks;
    }
  };
  
  const filteredTasks = filterTasks(tasks, filter);
  console.log("[TaskList] Filtered tasks count:", filteredTasks.length);
  
  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
    
    const task = tasks.find(task => task.id === taskId);
    
    toast({
      title: completed ? "Task completed" : "Task marked as incomplete",
      description: task?.title,
    });
    
    // In a real application, you would update the task in your backend
    // PUT /items/{taskId} with { completed: completed }
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
    toast({
      title: "Task deleted",
      description: "The task has been permanently removed",
    });
    
    // In a real application, you would delete the task from your backend
    // DELETE /items/{taskId}
  };

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mb-2"></div>
        <h3 className="font-medium text-muted-foreground">Loading tasks...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
        <h3 className="font-medium text-muted-foreground">Error</h3>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
      </div>
    );
  }

  return (
    <>
      {filteredTasks.length > 0 ? (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "border rounded-md p-4 task-item-hover",
                task.completed && "opacity-60"
              )}
              onClick={() => handleEditTask(task)}
            >
              <div className="flex items-start gap-3">
                <Checkbox 
                  id={`task-${task.id}`} 
                  checked={task.completed}
                  onCheckedChange={(checked) => {
                    handleTaskComplete(task.id, checked === true);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`task-${task.id}`}
                      className={cn(
                        "font-medium cursor-pointer",
                        task.completed && "line-through text-muted-foreground"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {task.title}
                    </label>
                    <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
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
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
          <h3 className="font-medium text-muted-foreground">No tasks found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {filter === "today"
              ? "You have no tasks scheduled for today."
              : filter === "upcoming"
              ? "You have no upcoming tasks."
              : filter === "completed"
              ? "You haven't completed any tasks yet."
              : "You have no tasks."}
          </p>
        </div>
      )}
      
      {editingTask && (
        <TaskDialog
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
          initialData={{
            id: editingTask.id,
            title: editingTask.title,
            description: editingTask.description,
            dueDate: editingTask.dueDate,
            completed: editingTask.completed,
            priority: editingTask.priority,
          }}
          onDelete={() => handleDeleteTask(editingTask.id)}
        />
      )}
    </>
  );
};

export default TaskList;
