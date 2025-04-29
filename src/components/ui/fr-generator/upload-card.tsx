"use client";
import { FileUp, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

interface UploadCardProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export function UploadCard({ files, setFiles }: UploadCardProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
      >
        <input {...getInputProps()} />
        <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 font-medium">Drag & drop documents here</p>
        <p className="text-sm text-muted-foreground">
          PDF or Word documents (max 5 files)
        </p>
        <Button type="button" variant="outline" className="mt-4">
          Select Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={file.name + index}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <span className="truncate max-w-[180px]">{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}