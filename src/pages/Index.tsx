
import AppLayout from "@/components/layout/AppLayout";
import DashboardCalendarWidget from "@/components/widgets/DashboardCalendarWidget";
import DashboardChatWidget from "@/components/widgets/DashboardChatWidget";
import DashboardStatsWidget from "@/components/widgets/DashboardStatsWidget";
import DashboardTasksWidget from "@/components/widgets/DashboardTasksWidget";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DashboardStatsWidget />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardTasksWidget />
          <DashboardCalendarWidget />
        </div>
        <DashboardChatWidget />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
