"use client";
import { useState, useRef, useEffect, ReactNode } from "react";
import { Send, Copy, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
};

export type ChatProps = {
  messages: ChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isTyping?: boolean;
  renderMessageContent?: (message: ChatMessage) => ReactNode;
};

export function Chat({
  messages = [],
  input = "",
  onInputChange,
  onSend,
  isTyping = false,
  renderMessageContent = (message) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <pre className="bg-muted p-2 rounded-md overflow-x-auto">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="bg-muted px-1 py-0.5 rounded-sm">{children}</code>
          );
        }
      }}
    >
      {message.content}
    </ReactMarkdown>
  )
}: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/ai-avatar.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {renderMessageContent(message)}
                {message.isTyping && (
                  <span className="inline-block ml-2 h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
                )}
                <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                  <span>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.role === "assistant" && (
                    <div className="flex gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => navigator.clipboard.writeText(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>复制</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>有帮助</TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/user-avatar.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-100" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-200" />
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="输入您的问题..."
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <Button onClick={onSend} size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}