"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, FileEdit, CheckCircle2, XCircle, Eye, Plus } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { Input } from "@/components/ui/input";
import { FRViewModal } from "./fr-view-modal";
import { FREditModal } from "./fr-edit-modal";

// Demo data
const initialFrData = [
  {
    id: "FR-001",
    title: "User Authentication System",
    description: "Implement JWT based authentication for secure user access",
    status: "pending",
    created: "2023-10-15",
    author: "John Doe",
    priority: "high",
    comments: [
      {
        id: 1,
        author: "Jane Smith",
        text: "Should we include social login?",
        date: "2023-10-16"
      }
    ]
  },
  {
    id: "FR-002",
    title: "Document Upload Feature",
    description: "Allow PDF, DOCX uploads up to 10MB with preview functionality",
    status: "approved",
    created: "2023-10-10",
    author: "Jane Smith",
    priority: "medium",
    comments: []
  },
  {
    id: "FR-003",
    title: "Search Functionality",
    description: "Full-text search across documents with filters",
    status: "rejected",
    created: "2023-10-05",
    author: "Mike Johnson",
    priority: "low",
    comments: [
      {
        id: 1,
        author: "John Doe",
        text: "Rejected due to budget constraints",
        date: "2023-10-07"
      }
    ]
  },
];

export function FRManagement() {
  const [frData, setFrData] = useState(initialFrData);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingFr, setViewingFr] = useState(null);
  const [editingFr, setEditingFr] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredFRs = frData.filter(fr =>
    fr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fr.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fr.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id) => {
    setFrData(frData.map(fr => 
      fr.id === id ? { ...fr, status: "approved" } : fr
    ));
  };

  const handleReject = (id) => {
    setFrData(frData.map(fr => 
      fr.id === id ? { ...fr, status: "rejected" } : fr
    ));
  };

  const handleSaveEdit = (updatedFr) => {
    setFrData(frData.map(fr => 
      fr.id === updatedFr.id ? updatedFr : fr
    ));
    setEditingFr(null);
  };

  const handleCreateNew = (newFr) => {
    setFrData([...frData, {
      ...newFr,
      id: `FR-${(frData.length + 1).toString().padStart(3, '0')}`,
      created: new Date().toISOString().split('T')[0],
      status: "pending",
      comments: []
    }]);
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search FRs..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New FR
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFRs.map((fr) => (
              <TableRow key={fr.id}>
                <TableCell className="font-medium">{fr.id}</TableCell>
                <TableCell>{fr.title}</TableCell>
                <TableCell className="text-muted-foreground line-clamp-1">
                  {fr.description}
                </TableCell>
                <TableCell>
                  <StatusBadge status={fr.status} />
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    fr.priority === "high" ? "bg-red-100 text-red-800" :
                    fr.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {fr.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setViewingFr(fr)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingFr(fr)}
                    >
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    {fr.status === "pending" && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleApprove(fr.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleReject(fr.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Modal */}
      {viewingFr && (
        <FRViewModal 
          fr={viewingFr}
          onClose={() => setViewingFr(null)}
          onEdit={() => {
            setViewingFr(null);
            setEditingFr(viewingFr);
          }}
        />
      )}

      {/* Edit Modal */}
      {editingFr && (
        <FREditModal
          fr={editingFr}
          onSave={handleSaveEdit}
          onClose={() => setEditingFr(null)}
        />
      )}

      {/* Create Modal */}
      {isCreateOpen && (
        <FREditModal
          onSave={handleCreateNew}
          onClose={() => setIsCreateOpen(false)}
        />
      )}
    </div>
  );
}