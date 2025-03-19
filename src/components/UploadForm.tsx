
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { MaterialType, Subject } from "@/types";

// Mock subjects data
const subjects: Subject[] = [
  { id: "cs101", name: "Introduction to Programming", code: "CS101", semester: 1 },
  { id: "cs201", name: "Data Structures", code: "CS201", semester: 3 },
  { id: "cs301", name: "Algorithms", code: "CS301", semester: 5 },
  { id: "cs401", name: "Operating Systems", code: "CS401", semester: 6 },
  { id: "cs501", name: "Database Systems", code: "CS501", semester: 7 },
];

const materialTypes: { value: MaterialType; label: string }[] = [
  { value: "notes", label: "Lecture Notes" },
  { value: "paper", label: "Previous Year Paper" },
  { value: "book", label: "Textbook/Reference" },
  { value: "assignment", label: "Assignment" },
  { value: "other", label: "Other Material" },
];

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [materialType, setMaterialType] = useState<MaterialType | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !subjectId || !materialType || !file) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would send data to a backend API
      toast({
        title: "Upload Successful",
        description: "Your study material has been uploaded successfully",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setSubjectId("");
      setMaterialType("");
      setFile(null);
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={subjectId} onValueChange={setSubjectId}>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.code} - {subject.name} (Sem {subject.semester})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="type">Material Type</Label>
          <Select value={materialType} onValueChange={(value) => setMaterialType(value as MaterialType)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select material type" />
            </SelectTrigger>
            <SelectContent>
              {materialTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <div className="flex items-center gap-2">
            {!file ? (
              <Input
                id="file"
                type="file"
                className="cursor-pointer"
                onChange={handleFileChange}
                required
              />
            ) : (
              <div className="flex items-center justify-between w-full bg-secondary rounded-md px-3 py-2">
                <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={removeFile}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Provide details about this material (e.g., course year, professor, topics covered)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>
      
      <div className="border-t pt-6">
        <Button 
          type="submit" 
          className="w-full md:w-auto btn-hover"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Material
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
