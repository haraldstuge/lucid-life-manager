
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, CheckSquare, Home, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AppSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      title: "Calendar",
      path: "/calendar",
      icon: Calendar,
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Chat",
      path: "/chat",
      icon: MessageSquare,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border/50 p-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-md w-8 h-8 flex items-center justify-center">
            L
          </span>
          Lucid Assistant
        </h2>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
              >
                <Link to={item.path} className="flex items-center gap-3 py-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-sidebar-accent h-8 w-8"
          >
            <User className="h-4 w-4" />
          </Button>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User Name</span>
            <span className="text-xs text-sidebar-foreground/70">Free Plan</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
