
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const ChatSuggestions = () => {
  const { data: suggestion, isLoading } = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => "Based on your calendar, you might want to prepare for tomorrow's meeting", // Mock data
    // In reality, you would fetch from your suggestion endpoint
  });

  if (isLoading) return null;

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium mb-1">Suggested Action</h3>
        <p className="text-sm text-muted-foreground">{suggestion}</p>
      </div>
    </div>
  );
};

export default ChatSuggestions;
