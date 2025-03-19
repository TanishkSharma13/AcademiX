
import React from "react";
import { Material } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

interface MaterialsListProps {
  materials: Material[];
  onDelete?: (materialId: string) => void;
  onEdit?: (material: Material) => void;
}

const MaterialsList = ({ materials, onDelete, onEdit }: MaterialsListProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "notes": return "bg-blue-100 text-blue-800";
      case "paper": return "bg-orange-100 text-orange-800";
      case "book": return "bg-green-100 text-green-800";
      case "assignment": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-secondary/30">
            <th className="border-b p-4 pl-8 text-left font-medium text-muted-foreground">Title</th>
            <th className="border-b p-4 text-left font-medium text-muted-foreground hidden md:table-cell">Subject</th>
            <th className="border-b p-4 text-left font-medium text-muted-foreground hidden lg:table-cell">Uploaded</th>
            <th className="border-b p-4 text-left font-medium text-muted-foreground">Stats</th>
            <th className="border-b p-4 text-left font-medium text-muted-foreground">Rating</th>
            <th className="border-b p-4 pr-8 text-left font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-secondary/20">
              <td className="p-4 pl-8">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">{material.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(material.type)}`}>
                        {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4 hidden md:table-cell">
                <div className="font-medium">{material.subject.code}</div>
                <div className="text-xs text-muted-foreground">Semester {material.subject.semester}</div>
              </td>
              <td className="p-4 hidden lg:table-cell">
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(material.uploadedAt), { addSuffix: true })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(material.size)}
                </div>
              </td>
              <td className="p-4">
                <div className="font-medium">{material.downloads.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Downloads</div>
              </td>
              <td className="p-4">
                <div className="flex items-center">
                  <div className="font-medium">{material.rating?.toFixed(1) || "-"}</div>
                  <Star className="h-3.5 w-3.5 ml-1 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-muted-foreground ml-1">
                    ({material.totalRatings || 0})
                  </span>
                </div>
              </td>
              <td className="p-4 pr-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(material)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.(material.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialsList;
