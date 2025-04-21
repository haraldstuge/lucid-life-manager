
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInput from "@/components/chat/ChatInput";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardChatWidget = () => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 pb-2">
        <CardTitle className="text-lg font-medium">Quick Assistant</CardTitle>
        <Link to="/chat">
          <Button variant="ghost" size="sm" className="gap-1">
            Full Chat <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center gap-3 mb-4 bg-background p-3 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <MessagesSquare className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Ask me about your tasks or calendar, or tell me to create a new item:
            </p>
          </div>
        </div>
        <ChatInput onSendMessage={(message) => console.log(message)} placeholder="Type 'Create a task for tomorrow...' or 'What's on my agenda today?'" />
      </CardContent>
    </Card>
  );
};

export default DashboardChatWidget;
