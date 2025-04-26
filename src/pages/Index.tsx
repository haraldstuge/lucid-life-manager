
import AppLayout from "@/components/layout/AppLayout";
import DashboardCalendarWidget from "@/components/widgets/DashboardCalendarWidget";
import DashboardChatWidget from "@/components/widgets/DashboardChatWidget";
import DashboardStatsWidget from "@/components/widgets/DashboardStatsWidget";
import DashboardTasksWidget from "@/components/widgets/DashboardTasksWidget";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
        
        <div className="animate-fade-in">
          <DashboardStatsWidget />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-fade-in [animation-delay:200ms]">
            <DashboardTasksWidget />
          </div>
          <div className="animate-fade-in [animation-delay:400ms]">
            <DashboardCalendarWidget />
          </div>
        </div>
        
        <div className="animate-fade-in [animation-delay:600ms]">
          <DashboardChatWidget />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
