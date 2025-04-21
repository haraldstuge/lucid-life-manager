
import AppLayout from "@/components/layout/AppLayout";
import ChatConversation from "@/components/chat/ChatConversation";
import ChatInput from "@/components/chat/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Message } from "@/types/chat";

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your personal assistant. How can I help you today?",
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
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
        content: getAssistantResponse(content.trim()),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };
  
  // Simple mock response function
  const getAssistantResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes("create task") || lowercaseMessage.includes("add task")) {
      return "I've created a new task for you. Would you like to add more details to it?";
    } else if (lowercaseMessage.includes("calendar") || lowercaseMessage.includes("schedule")) {
      return "I can help you manage your calendar. What would you like to do?";
    } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
      return "Hello! How can I assist you with your tasks or calendar today?";
    } else {
      return "I'm your personal assistant for managing tasks and calendar events. How can I help you today?";
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-130px)]">
        <h1 className="text-2xl font-bold mb-6">Chat with Assistant</h1>
        
        <div className="flex-1 flex flex-col overflow-hidden border rounded-lg bg-card">
          <ScrollArea className="flex-1 p-4">
            <ChatConversation messages={messages} />
          </ScrollArea>
          
          <div className="border-t p-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
