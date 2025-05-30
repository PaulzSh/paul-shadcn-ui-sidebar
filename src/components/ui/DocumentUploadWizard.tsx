import { useState, useCallback } from 'react';
import { useDocumentStore } from '@/lib/stores/document-store';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, FileText, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function DocumentUploadWizard() {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [metadata, setMetadata] = useState({
    documentNumber: '',
    category: '',
    effectiveDates: '',
    audience: '',
    regions: '',
    brands: ''
  });
  
  const { uploadDocument } = useDocumentStore();

  const handleUpload = useCallback(async () => {
    if (!file) return;
    
    setProgress(30);
    try {
      // 模拟处理步骤
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(60);
      
      // 实际上传逻辑
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(metadata).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      await uploadDocument(formData);
      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsOpen(false);
      setStep(1);
      setProgress(0);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [file, metadata, uploadDocument]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={() => setIsOpen(true)}>
        <Upload className="h-4 w-4 mr-2" />
        Upload Document
      </Button>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Compliance Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="document-upload">Select Document</Label>
                <Input 
                  id="document-upload" 
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              {file && (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.type} • {(file.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-number">Document Number</Label>
                  <Input
                    id="doc-number"
                    placeholder="GLB 11100.5"
                    value={metadata.documentNumber}
                    onChange={(e) => setMetadata({...metadata, documentNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Security Bulletin"
                    value={metadata.category}
                    onChange={(e) => setMetadata({...metadata, category: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="effective-dates">Effective Dates (one per line)</Label>
                <Textarea
                  id="effective-dates"
                  placeholder="2025-03-04\n2025-03-24"
                  value={metadata.effectiveDates}
                  onChange={(e) => setMetadata({...metadata, effectiveDates: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Input
                    id="audience"
                    placeholder="Acquirer, Issuer"
                    value={metadata.audience}
                    onChange={(e) => setMetadata({...metadata, audience: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regions">Regions</Label>
                  <Input
                    id="regions"
                    placeholder="Global, APAC"
                    value={metadata.regions}
                    onChange={(e) => setMetadata({...metadata, regions: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brands">Brands</Label>
                  <Input
                    id="brands"
                    placeholder="Mastercard, Debit"
                    value={metadata.brands}
                    onChange={(e) => setMetadata({...metadata, brands: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          
          {progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing document...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
          
          <div className="flex justify-between">
            {step === 1 ? (
              <div />
            ) : (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            
            {step < 2 ? (
              <Button 
                onClick={() => setStep(step + 1)} 
                disabled={!file}
              >
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleUpload}
                disabled={progress > 0}
              >
                {progress > 0 ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Upload and Process
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}