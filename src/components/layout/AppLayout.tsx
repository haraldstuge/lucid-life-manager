
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        <AppSidebar />
        <div className="w-full">
          <AppHeader />
          <main className="overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
