"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, Trash2, Loader2, Edit, Eye, History, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// 增强的文档数据类型
type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded: string;
  category: string;
  path: string;
  status: "draft" | "published" | "deprecated";
  version: number;
  metadata?: {
    documentNumber?: string;
    effectiveDates?: string[];
    audience?: string[];
    regions?: string[];
    brand?: string[];
  };
};

const initialDocuments: Document[] = [
  {
    id: "DOC-001",
    name: "GLB 11100.5 Mastercard Announces Move to DigiCert.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "2025-02-26",
    category: "Security Bulletin",
    path: "/documents/GLB-11100.5.pdf",
    status: "published",
    version: 3,
    metadata: {
      documentNumber: "GLB 11100.5",
      effectiveDates: ["2025-03-04", "2025-03-24", "2025-03-31"],
      audience: ["Acquirer", "Issuer", "Merchant"],
      regions: ["Global"],
      brand: ["Mastercard", "Debit Mastercard"]
    }
  },
  {
    id: "DOC-002",
    name: "PCI DSS Compliance Requirements v4.0.docx",
    type: "Word",
    size: "1.7 MB",
    uploaded: "2025-01-15",
    category: "Compliance",
    path: "/documents/PCI-DSS-v4.docx",
    status: "published",
    version: 1,
    metadata: {
      documentNumber: "PCI DSS v4.0",
      effectiveDates: ["2025-01-01"],
      audience: ["All"],
      regions: ["Global"]
    }
  },
  {
    id: "DOC-003",
    name: "New Fraud Detection API Specs.md",
    type: "Markdown",
    size: "45 KB",
    uploaded: "2025-03-01",
    category: "Technical",
    path: "/documents/fraud-api-specs.md",
    status: "draft",
    version: 2
  },
];

export function KnowledgeBase() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.metadata?.documentNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (docId: string, docName: string) => {
    setIsDownloading(docId);
    setTimeout(() => {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        // 实际项目中这里应该是API调用
        toast({
          title: "Download Started",
          description: `${docName} is being downloaded`,
        });
      }
      setIsDownloading(null);
    }, 1000);
  };

  const handleDelete = (docId: string) => {
    setIsDeleting(docId);
    setTimeout(() => {
      setDocuments(documents.filter(doc => doc.id !== docId));
      setIsDeleting(null);
      toast({
        title: "Document Archived",
        description: "The document has been moved to archive",
      });
    }, 800);
  };

  const handleUpload = () => {
    if (!uploadFile) return;
    
    // 模拟上传处理
    const newDoc: Document = {
      id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: uploadFile.name,
      type: uploadFile.type.split('/')[1].toUpperCase() || "UNKNOWN",
      size: `${(uploadFile.size / 1024 / 1024).toFixed(1)} MB`,
      uploaded: new Date().toISOString().split('T')[0],
      category: "Uncategorized",
      path: `/uploads/${uploadFile.name}`,
      status: "draft",
      version: 1
    };
    
    setDocuments([...documents, newDoc]);
    setIsUploadDialogOpen(false);
    setUploadFile(null);
    
    toast({
      title: "Document Uploaded",
      description: `${uploadFile.name} has been added to drafts`,
    });
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "deprecated":
        return <Badge variant="destructive">Deprecated</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents by name, category or document number..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input 
                  id="document-upload" 
                  type="file" 
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                />
              </div>
              {uploadFile && (
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">{uploadFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {uploadFile.type} • {(uploadFile.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              )}
              <Button 
                onClick={handleUpload}
                disabled={!uploadFile}
                className="w-full"
              >
                Upload and Process
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Document Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  {doc.name}
                </TableCell>
                <TableCell>
                  {doc.metadata?.documentNumber || "-"}
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.category}</TableCell>
                <TableCell>v{doc.version}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedDocument(doc)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      {selectedDocument && (
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{selectedDocument.name}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="preview">
                            <TabsList>
                              <TabsTrigger value="preview">Preview</TabsTrigger>
                              <TabsTrigger value="metadata">Metadata</TabsTrigger>
                              <TabsTrigger value="history">Version History</TabsTrigger>
                            </TabsList>
                            <TabsContent value="preview" className="pt-4">
                              <div className="border rounded-lg p-4 h-[500px] overflow-auto">
                                {/* 这里应该是文档预览内容 */}
                                <p className="text-muted-foreground">
                                  Document preview would be rendered here. In a real implementation, 
                                  this would show the actual document content extracted from the file.
                                </p>
                              </div>
                            </TabsContent>
                            <TabsContent value="metadata" className="pt-4">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Document Number</label>
                                    <Input 
                                      value={selectedDocument.metadata?.documentNumber || ""}
                                      onChange={(e) => setSelectedDocument({
                                        ...selectedDocument,
                                        metadata: {
                                          ...selectedDocument.metadata,
                                          documentNumber: e.target.value
                                        }
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Category</label>
                                    <Input 
                                      value={selectedDocument.category}
                                      onChange={(e) => setSelectedDocument({
                                        ...selectedDocument,
                                        category: e.target.value
                                      })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Effective Dates</label>
                                  <Textarea 
                                    value={selectedDocument.metadata?.effectiveDates?.join("\n") || ""}
                                    onChange={(e) => setSelectedDocument({
                                      ...selectedDocument,
                                      metadata: {
                                        ...selectedDocument.metadata,
                                        effectiveDates: e.target.value.split("\n")
                                      }
                                    })}
                                  />
                                </div>
                                <div className="flex justify-end">
                                  <Button>Save Changes</Button>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="history" className="pt-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Changes</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>v3</TableCell>
                                    <TableCell>2025-02-26</TableCell>
                                    <TableCell>Added effective dates</TableCell>
                                    <TableCell>
                                      <Button variant="ghost" size="sm">
                                        <History className="h-4 w-4 mr-2" />
                                        Compare
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>v2</TableCell>
                                    <TableCell>2025-02-21</TableCell>
                                    <TableCell>Updated certificate details</TableCell>
                                    <TableCell>
                                      <Button variant="ghost" size="sm">
                                        <History className="h-4 w-4 mr-2" />
                                        Compare
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      )}
                    </Dialog>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownload(doc.id, doc.name)}
                      disabled={isDownloading === doc.id}
                    >
                      {isDownloading === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(doc.id)}
                      disabled={isDeleting === doc.id}
                    >
                      {isDeleting === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}