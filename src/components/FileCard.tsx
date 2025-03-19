
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, File, FileText, BookOpen, 
  FileQuestion, FileClock, Clock 
} from "lucide-react";
import type { Material } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface FileCardProps {
  material: Material;
  onDownload: () => void;
}

const FileCard = ({ material, onDownload }: FileCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getIcon = () => {
    switch (material.type) {
      case 'notes':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'paper':
        return <FileClock className="h-6 w-6 text-orange-500" />;
      case 'book':
        return <BookOpen className="h-6 w-6 text-green-500" />;
      case 'assignment':
        return <FileQuestion className="h-6 w-6 text-purple-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would handle downloading from fileUrl
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      onDownload();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/20">
      <div className="aspect-[4/3] relative overflow-hidden bg-secondary/30">
        {material.thumbnailUrl ? (
          <img 
            src={material.thumbnailUrl} 
            alt={material.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="transform scale-[2.5] text-primary/40 transition-transform duration-500 group-hover:scale-[2.8]">
              {getIcon()}
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-sm">
            {getIcon()}
            <span className="ml-1.5">{material.type.charAt(0).toUpperCase() + material.type.slice(1)}</span>
          </span>
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-medium text-lg line-clamp-1">{material.title}</h3>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm mt-1">
            <span className="font-medium">{material.subject.code}</span>
            <span>•</span>
            <span>Semester {material.subject.semester}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {material.description}
        </p>
        
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDistanceToNow(new Date(material.uploadedAt), { addSuffix: true })}</span>
          </div>
          <div>
            <span>{formatFileSize(material.size)}</span>
          </div>
        </div>
        
        <Button 
          onClick={handleDownload} 
          className="w-full mt-3 btn-hover"
          disabled={isLoading}
        >
          {isLoading ? "Downloading..." : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
