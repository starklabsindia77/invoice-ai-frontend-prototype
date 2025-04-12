import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FileUp, Upload, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { Invoice } from '@/types/invoice';

interface UploadExpenseInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (invoice: Invoice) => void;
}

const UploadExpenseInvoiceModal: React.FC<UploadExpenseInvoiceModalProps> = ({ 
  open, 
  onOpenChange,
  onSuccess 
}) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check if file is PDF or image
      if (!/\.(pdf|jpg|jpeg|png)$/i.test(selectedFile.name)) {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a PDF or image file (JPG, JPEG, PNG)"
        });
        return;
      }
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Maximum file size is 10MB"
        });
        return;
      }
      setFile(selectedFile);
      setUploadComplete(false);
      setProcessingStatus('idle');
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const simulateProcessing = () => {
    setProcessingStatus('processing');
    
    setTimeout(() => {
      // Generate mock expense invoice data
      const mockInvoiceData: Invoice = {
        id: `EINV-${Math.floor(1000 + Math.random() * 9000)}`,
        vendor: file?.name.split('.')[0] || 'Vendor Company',
        amount: Math.floor(100 + Math.random() * 2000) + Math.random(),
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        gstId: `GST${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        category: 'expense',
        tags: ['uploaded', 'expense'],
        language: 'en',
        currency: 'USD',
        items: [
          { 
            description: 'Service/Product Purchase', 
            quantity: 1, 
            price: Math.floor(100 + Math.random() * 1000)
          }
        ]
      };

      setProcessingStatus('success');
      
      setTimeout(() => {
        onSuccess(mockInvoiceData);
        resetForm();
        onOpenChange(false);
      }, 1000);
    }, 3000);
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload"
      });
      return;
    }

    simulateUpload();
  };

  const resetForm = () => {
    setFile(null);
    setProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    setProcessingStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Expense Invoice</DialogTitle>
          <DialogDescription>
            Upload a PDF or image file of your expense invoice to automatically extract the information.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {!uploadComplete && processingStatus === 'idle' && (
            <div className="grid w-full gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="invoice-file">Select Expense Invoice File</Label>
                <div className="flex gap-2">
                  <Input
                    id="invoice-file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={isUploading}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, JPG, PNG. Max file size: 10MB
                </p>
              </div>
            
              {file && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              )}
            
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
            </div>
          )}
          
          {uploadComplete && processingStatus === 'idle' && (
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Upload Complete</h3>
                <p className="text-sm text-muted-foreground">
                  Your expense invoice has been uploaded successfully.
                </p>
              </div>
            </div>
          )}
          
          {processingStatus === 'processing' && (
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="h-20 w-20 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin" />
              <div className="text-center">
                <h3 className="text-lg font-medium">Processing Expense Invoice</h3>
                <p className="text-sm text-muted-foreground">
                  We're extracting data from your invoice...
                </p>
              </div>
            </div>
          )}
          
          {processingStatus === 'success' && (
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Processing Complete</h3>
                <p className="text-sm text-muted-foreground">
                  Your expense invoice has been processed successfully.
                </p>
              </div>
            </div>
          )}
          
          {processingStatus === 'error' && (
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Processing Failed</h3>
                <p className="text-sm text-muted-foreground">
                  We couldn't process your expense invoice. Please try again or upload a different file.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between">
          {!uploadComplete && processingStatus === 'idle' && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </>
          )}
          
          {uploadComplete && processingStatus === 'idle' && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Upload Another
              </Button>
              <Button 
                type="button"
                onClick={simulateProcessing}
              >
                <FileUp className="mr-2 h-4 w-4" />
                Process Invoice
              </Button>
            </>
          )}
          
          {(processingStatus === 'processing' || processingStatus === 'success') && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={processingStatus === 'processing'}
            >
              {processingStatus === 'success' ? 'Close' : 'Please Wait...'}
            </Button>
          )}
          
          {processingStatus === 'error' && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Try Again
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadExpenseInvoiceModal;
