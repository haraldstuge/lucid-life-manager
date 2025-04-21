
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";

interface ChatConversationProps {
  messages: Message[];
}

const ChatConversation = ({ messages }: ChatConversationProps) => {
  return (
    <div className="space-y-4 pb-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-3 animate-fade-in",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground">
              L
            </div>
          )}
          
          <div
            className={cn(
              "rounded-lg px-4 py-2 max-w-[80%] break-words",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
            <div
              className={cn(
                "text-xs mt-1",
                message.role === "user"
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              )}
            >
              {format(new Date(message.timestamp), "h:mm a")}
            </div>
          </div>
          
          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
              U
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatConversation;
