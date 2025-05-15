"use client";
import { Button } from "@/components/ui/button";
import { X, FileEdit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusBadge } from "./status-badge";

export function FRViewModal({ fr, onClose, onEdit }) {
  return (
    <Dialog open={!!fr} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Functional Requirement Details</DialogTitle>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{fr.title}</h3>
              <p className="text-sm text-muted-foreground">{fr.id}</p>
            </div>
            <div className="flex items-center space-x-2">
              <StatusBadge status={fr.status} />
              <Button variant="outline" size="sm" onClick={onEdit}>
                <FileEdit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm">{fr.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Details</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Author:</span> {fr.author}</p>
                <p><span className="text-muted-foreground">Created:</span> {fr.created}</p>
                <p>
                  <span className="text-muted-foreground">Priority:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    fr.priority === "high" ? "bg-red-100 text-red-800" :
                    fr.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {fr.priority}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {fr.comments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Comments</h4>
              <div className="space-y-4">
                {fr.comments.map((comment) => (
                  <div key={comment.id} className="border rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}