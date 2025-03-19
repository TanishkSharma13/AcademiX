
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FileCard from "@/components/FileCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Material, MaterialType, Subject } from "@/types";

// Mock subjects data
const subjects: Subject[] = [
  { id: "cs101", name: "Introduction to Programming", code: "CS101", semester: 1 },
  { id: "cs201", name: "Data Structures", code: "CS201", semester: 3 },
  { id: "cs301", name: "Algorithms", code: "CS301", semester: 5 },
  { id: "cs401", name: "Operating Systems", code: "CS401", semester: 6 },
  { id: "cs501", name: "Database Systems", code: "CS501", semester: 7 },
];

// Mock materials data
const mockMaterials: Material[] = [
  {
    id: "1",
    title: "Data Structures Comprehensive Notes",
    description: "Complete semester notes covering arrays, linked lists, trees, and graphs with examples and diagrams.",
    subjectId: "cs201",
    subject: subjects.find(s => s.id === "cs201")!,
    type: "notes",
    fileUrl: "/path/to/file1.pdf",
    uploadedBy: "prof.sharma",
    uploadedAt: new Date(2023, 9, 15).toISOString(),
    downloads: 145,
    size: 3.2 * 1024 * 1024
  },
  {
    id: "2",
    title: "Algorithms Previous Year Question Paper 2023",
    description: "Mid-semester and end-semester question papers from 2023 with solution hints.",
    subjectId: "cs301",
    subject: subjects.find(s => s.id === "cs301")!,
    type: "paper",
    fileUrl: "/path/to/file2.pdf",
    uploadedBy: "rahul.verma",
    uploadedAt: new Date(2023, 11, 5).toISOString(),
    downloads: 98,
    size: 1.8 * 1024 * 1024
  },
  {
    id: "3",
    title: "Operating Systems Reference Book",
    description: "Digital copy of recommended OS textbook with highlighted important sections.",
    subjectId: "cs401",
    subject: subjects.find(s => s.id === "cs401")!,
    type: "book",
    fileUrl: "/path/to/file3.pdf",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    uploadedBy: "prof.singh",
    uploadedAt: new Date(2023, 8, 20).toISOString(),
    downloads: 210,
    size: 12.4 * 1024 * 1024
  },
  {
    id: "4",
    title: "Database Systems Assignment Examples",
    description: "Sample SQL queries and database design assignments with solutions.",
    subjectId: "cs501",
    subject: subjects.find(s => s.id === "cs501")!,
    type: "assignment",
    fileUrl: "/path/to/file4.pdf",
    uploadedBy: "neha.gupta",
    uploadedAt: new Date(2023, 10, 12).toISOString(),
    downloads: 78,
    size: 950 * 1024
  },
  {
    id: "5",
    title: "Introduction to Programming Lab Manual",
    description: "Practical exercises and code examples for first-year programming course.",
    subjectId: "cs101",
    subject: subjects.find(s => s.id === "cs101")!,
    type: "notes",
    fileUrl: "/path/to/file5.pdf",
    uploadedBy: "prof.kumar",
    uploadedAt: new Date(2023, 7, 28).toISOString(),
    downloads: 187,
    size: 2.7 * 1024 * 1024
  },
  {
    id: "6",
    title: "Algorithms Cheat Sheet",
    description: "One-page summary of key algorithms and time complexities for quick revision.",
    subjectId: "cs301",
    subject: subjects.find(s => s.id === "cs301")!,
    type: "notes",
    fileUrl: "/path/to/file6.pdf",
    uploadedBy: "amit.sharma",
    uploadedAt: new Date(2023, 11, 2).toISOString(),
    downloads: 132,
    size: 450 * 1024
  },
];

const Browse = () => {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(mockMaterials);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<MaterialType | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Set title
    document.title = "Browse Study Materials - StudySwap";

    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = materials;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (subjectFilter) {
      filtered = filtered.filter((item) => item.subjectId === subjectFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((item) => item.type === typeFilter);
    }

    setFilteredMaterials(filtered);
  }, [materials, searchQuery, subjectFilter, typeFilter]);

  const handleDownload = (material: Material) => {
    // In a real app, this would handle the actual download
    toast({
      title: "Download Started",
      description: `${material.title} will download shortly`,
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSubjectFilter("");
    setTypeFilter("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Browse Study Materials</h1>
            <p className="text-lg text-muted-foreground">
              Find the resources you need for your B.Tech Computer Science courses.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[280px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, subject or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="btn-hover"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {(subjectFilter || typeFilter) && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {(subjectFilter ? 1 : 0) + (typeFilter ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg bg-background animate-slide-down">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filter Materials</h3>
                  {(subjectFilter || typeFilter) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="h-8 text-sm btn-hover"
                    >
                      <X className="h-3.5 w-3.5 mr-1.5" />
                      Clear filters
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Subject</label>
                    <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All subjects</SelectItem>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.code} - {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Material Type</label>
                    <Select 
                      value={typeFilter} 
                      onValueChange={(value) => setTypeFilter(value as MaterialType | "")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All types</SelectItem>
                        <SelectItem value="notes">Lecture Notes</SelectItem>
                        <SelectItem value="paper">Previous Year Papers</SelectItem>
                        <SelectItem value="book">Textbooks/References</SelectItem>
                        <SelectItem value="assignment">Assignments</SelectItem>
                        <SelectItem value="other">Other Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="rounded-xl border bg-card animate-pulse">
                  <div className="aspect-[4/3] bg-muted rounded-t-xl"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded-md w-3/4"></div>
                    <div className="h-4 bg-muted rounded-md w-1/2"></div>
                    <div className="h-20 bg-muted rounded-md"></div>
                    <div className="h-9 bg-muted rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMaterials.map((material) => (
                <FileCard
                  key={material.id}
                  material={material}
                  onDownload={() => handleDownload(material)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-muted-foreground">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium">No materials found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any study materials matching your search criteria. 
                Try changing your filters or search query.
              </p>
              <Button onClick={clearFilters} className="mt-4 btn-hover">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-secondary/80 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudySwap. Created for B.Tech Computer Science students.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Browse;
