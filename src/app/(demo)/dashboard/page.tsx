"use client";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, /*...其他导入...*/ } from "@/components/ui/breadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { Chat, type ChatMessage } from "@/components/ui/chat"; // 导入类型
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // 模拟AI响应
    const aiResponse = `**Markdown响应示例**:\n\n- 您问的是: "${input}"\n\`\`\`python\n# 代码高亮\ndef hello():\n    print("世界你好")\n\`\`\``;
    
    // 打字机效果
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= aiResponse.length) {
        setMessages(prev => {
          const existingTyping = prev.find(msg => msg.id === "ai-typing");
          if (existingTyping) {
            return prev.map(msg => 
              msg.id === "ai-typing" 
                ? { ...msg, content: aiResponse.substring(0, i) }
                : msg
            );
          } else {
            return [
              ...prev,
              {
                id: "ai-typing",
                content: aiResponse.substring(0, i),
                role: "assistant",
                timestamp: new Date()
              }
            ];
          }
        });
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setMessages(prev => [
          ...prev.filter(msg => msg.id !== "ai-typing"),
          {
            id: Date.now().toString(),
            content: aiResponse,
            role: "assistant",
            timestamp: new Date()
          }
        ]);
      }
    }, 20);
  };

  if (!sidebar) return null;

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>{/* ...面包屑代码保持不变... */}</Breadcrumb>
      <TooltipProvider>
        <div className="flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex flex-1 overflow-hidden">
            <div className="w-64 border-r overflow-y-auto">
              {/* 侧边栏内容 */}
            </div>
            
            <main className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 flex-1 overflow-hidden">
                <div className="h-full">
                  <Chat
                    messages={messages}
                    input={input}
                    onInputChange={setInput}
                    onSend={handleSend}
                    isTyping={isTyping}
                    renderMessageContent={(message) => (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          code({node, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '');
                            return match ? (
                              <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            ) : (
                              <code className="bg-muted px-1 py-0.5 rounded-sm">
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </ContentLayout>
  );
}