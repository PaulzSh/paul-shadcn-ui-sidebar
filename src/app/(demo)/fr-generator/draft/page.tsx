"use client";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

type FRDraftData = {
  projectName: string;
  description: string;
  priority: string;
  generatedContent: string;
  sourceDocuments: string[];
};

export default function FRDraftPage() {
  const [draftData, setDraftData] = useState<FRDraftData | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // 模拟AI生成内容（打字机效果）
  const generateContentWithTyping = (targetContent: string) => {
    setIsGenerating(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i <= targetContent.length) {
        setEditedContent(targetContent.substring(0, i));
        previewRef.current?.scrollIntoView({ behavior: "smooth" });
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20); // 调整打字速度
  };

  useEffect(() => {
    // 从sessionStorage获取数据或使用默认值
    const storedData = sessionStorage.getItem('frDraftData');
    const mockData = storedData 
      ? JSON.parse(storedData) 
      : {
          projectName: "智能客服系统升级",
          description: "新一代AI驱动的客户支持解决方案",
          priority: "high",
          generatedContent: `# 功能需求文档\n\n## 项目概述\n**项目名称**: 智能客服系统升级\n\n## 核心需求\n1. 实现多轮对话能力\n2. 集成情感分析模块\n3. 支持Markdown格式知识库\n\n\`\`\`python\n# 示例代码\ndef handle_query(user_input):\n    return get_ai_response(user_input)\n\`\`\``,
          sourceDocuments: ["需求调研.pdf", "技术白皮书.docx"]
        };

    setDraftData(mockData);
    generateContentWithTyping(mockData.generatedContent);
  }, []);

  // Markdown渲染配置
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
          {children}
        </code>
      );
    }
  };

  const handleRegenerate = () => {
    if (!draftData) return;
    setEditedContent("");
    generateContentWithTyping(draftData.generatedContent);
  };

  if (!draftData) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );

  return (
    <ContentLayout title="FR Draft">
      <Breadcrumb>
        {/* ...面包屑导航保持不变... */}
      </Breadcrumb>

      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>FR Draft Editor</CardTitle>
              <Button 
                variant="outline" 
                onClick={handleRegenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    重新生成中...
                  </>
                ) : '重新生成'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Markdown 编辑器 */}
              <div className="space-y-2">
                <Label>编辑内容</Label>
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[500px] font-mono text-sm"
                  placeholder="输入Markdown格式内容..."
                />
              </div>

              {/* Markdown 实时预览 */}
              <div className="space-y-2">
                <Label>实时预览</Label>
                <div 
                  ref={previewRef}
                  className="border rounded-md p-4 min-h-[500px] prose dark:prose-invert max-w-none"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={MarkdownComponents}
                  >
                    {editedContent}
                  </ReactMarkdown>
                  {isGenerating && (
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gray-500 ml-1" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => alert("导出Word (模拟)")}>
                导出Word
              </Button>
              <Button onClick={() => alert("导出PDF (模拟)")}>
                导出PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 源文档展示 */}
        <Card>
          <CardHeader>
            <CardTitle>源文档</CardTitle>
          </CardHeader>
          <CardContent>
            {draftData.sourceDocuments.length > 0 ? (
              <ul className="space-y-2">
                {draftData.sourceDocuments.map((doc, index) => (
                  <li key={index} className="flex items-center p-2 border rounded-md">
                    <span className="flex-1 truncate">{doc}</span>
                    <Button variant="ghost" size="sm" className="ml-2">
                      查看
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">未上传源文档</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}