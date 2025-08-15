
import React, { useState } from 'react';
import { Upload, X, Image, Video, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { storageService } from '@/services/storageService';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (url: string) => void;
  type?: 'image' | 'video' | 'any';
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  currentUrl?: string;
  onRemove?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  type = 'any',
  accept,
  maxSize = 10,
  className = '',
  currentUrl,
  onRemove
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const getAcceptTypes = () => {
    if (accept) return accept;
    switch (type) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      default:
        return '*/*';
    }
  };

  const getFileTypeIcon = () => {
    switch (type) {
      case 'image':
        return <Image className="w-8 h-8 text-muted-foreground" />;
      case 'video':
        return <Video className="w-8 h-8 text-muted-foreground" />;
      default:
        return <FileIcon className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const validateFile = (file: File): boolean => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive"
      });
      return false;
    }

    const acceptedTypes = getAcceptTypes();
    if (acceptedTypes !== '*/*') {
      const isValidType = acceptedTypes.split(',').some(acceptType => {
        const trimmedType = acceptType.trim();
        if (trimmedType.endsWith('/*')) {
          return file.type.startsWith(trimmedType.slice(0, -1));
        }
        return file.type === trimmedType;
      });

      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `Please select a ${type} file`,
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    try {
      const path = type === 'image' ? 'images' : type === 'video' ? 'videos' : 'files';
      const url = await storageService.uploadFile(file, path);
      onUpload(url);
      toast({
        title: "Success",
        description: "File uploaded successfully"
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleRemove = async () => {
    if (currentUrl && onRemove) {
      try {
        await storageService.deleteFile(currentUrl);
        onRemove();
        toast({
          title: "Success",
          description: "File removed successfully"
        });
      } catch (error) {
        console.error('Remove error:', error);
        toast({
          title: "Remove failed",
          description: "Failed to remove file. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {currentUrl && (
        <div className="relative">
          <div className="p-3 bg-muted rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getFileTypeIcon()}
                <span className="text-sm font-medium">Current file uploaded</span>
              </div>
              {onRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {type === 'image' && (
              <img 
                src={currentUrl} 
                alt="Current upload" 
                className="mt-2 max-w-full h-20 object-cover rounded" 
              />
            )}
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          uploading ? "opacity-50 pointer-events-none" : "cursor-pointer hover:border-primary/50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={getAcceptTypes()}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-upload-${type}`}
          disabled={uploading}
        />
        
        <label htmlFor={`file-upload-${type}`} className="cursor-pointer">
          <div className="space-y-2">
            {uploading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {uploading ? 'Uploading...' : `Upload ${type} file`}
              </p>
              <p className="text-xs text-muted-foreground">
                Drag & drop or click to browse (max {maxSize}MB)
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
