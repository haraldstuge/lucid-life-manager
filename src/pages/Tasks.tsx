
import AppLayout from "@/components/layout/AppLayout";
import TaskDialog from "@/components/tasks/TaskDialog";
import TaskList from "@/components/tasks/TaskList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";

const TasksPage = () => {
  const [showTaskDialog, setShowTaskDialog] = useState(false);

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button onClick={() => setShowTaskDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <TaskList filter="all" />
          </TabsContent>
          <TabsContent value="today" className="mt-4">
            <TaskList filter="today" />
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <TaskList filter="upcoming" />
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <TaskList filter="completed" />
          </TabsContent>
        </Tabs>
        
        <TaskDialog 
          open={showTaskDialog}
          onOpenChange={setShowTaskDialog}
        />
      </div>
    </AppLayout>
  );
};

export default TasksPage;
