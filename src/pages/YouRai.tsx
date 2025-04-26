
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import ChatConversation from "@/components/chat/ChatConversation";
import ChatInput from "@/components/chat/ChatInput";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/chat";
import ChatSuggestions from "@/components/chat/ChatSuggestions";

const YouRai = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm YouRai, your personal AI assistant. How can I help you today?",
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand your message. Let me help you with that.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual audio recording logic
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-130px)] gap-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            YouRai
          </h1>
        </div>

        <Card className="p-4 bg-gradient-to-br from-card/50 to-muted/30 border-none shadow-lg">
          <ChatSuggestions />
        </Card>
        
        <div className="flex-1 flex flex-col overflow-hidden border rounded-lg bg-card/50 backdrop-blur-sm shadow-lg">
          <div className="flex-1 overflow-auto p-4">
            <ChatConversation messages={messages} />
          </div>
          
          <div className="border-t p-4 bg-background/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <ChatInput onSendMessage={handleSendMessage} />
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={toggleRecording}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4 text-destructive" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default YouRai;
