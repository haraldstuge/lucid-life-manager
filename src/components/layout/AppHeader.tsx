
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Bell, Search, Settings } from "lucide-react";
import { useState } from "react";

const AppHeader = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
      // Here we would call the search endpoint
      // GET /search?q=${searchQuery}
      setSearchQuery("");
    }
  };

  return (
    <header className={cn(
      "border-b px-4 py-3 flex items-center justify-between bg-card",
      "lg:px-6"
    )}>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        <Button className="ml-4 hidden md:flex" size="sm">
          AI Assistant
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
