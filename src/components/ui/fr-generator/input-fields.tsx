"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InputFieldsProps {
  formData: {
    projectName: string;
    description: string;
    priority: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    projectName: string;
    description: string;
    priority: string;
  }>>;
}

export function InputFields({ formData, setFormData }: InputFieldsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name *</Label>
        <Input
          id="projectName"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          placeholder="e.g. Customer Portal Upgrade"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the FR..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) => 
            setFormData(prev => ({ ...prev, priority: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}