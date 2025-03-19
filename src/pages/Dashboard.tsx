
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { Material, User } from "@/types";
import { 
  BookOpen, Star, Upload, DownloadCloud, 
  FileText, Shield, Award, BookMarked 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import UserStatsCard from "@/components/UserStatsCard";
import MaterialsList from "@/components/MaterialsList";

// Mock senior user data
const mockUser: User = {
  id: "user1",
  name: "Jane Smith",
  email: "jane.smith@academix.edu",
  role: "senior",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  collegeId: "CS202456",
  verified: true,
  rating: 4.8,
  totalRatings: 45
};

// Mock materials data
const mockMaterials: Material[] = [
  {
    id: "material1",
    title: "Data Structures Complete Notes",
    description: "Comprehensive notes covering all DS topics for semester 3",
    subjectId: "cs201",
    subject: { id: "cs201", name: "Data Structures", code: "CS201", semester: 3 },
    type: "notes",
    fileUrl: "/files/ds-notes.pdf",
    uploadedBy: "user1",
    uploadedAt: "2023-08-15T10:30:00Z",
    downloads: 156,
    size: 3500000,
    rating: 4.9,
    totalRatings: 28
  },
  {
    id: "material2",
    title: "Operating Systems Mid-term Paper 2023",
    description: "Previous year mid-term examination paper with solutions",
    subjectId: "cs401",
    subject: { id: "cs401", name: "Operating Systems", code: "CS401", semester: 6 },
    type: "paper",
    fileUrl: "/files/os-paper.pdf",
    uploadedBy: "user1",
    uploadedAt: "2023-11-20T14:45:00Z",
    downloads: 87,
    size: 1200000,
    rating: 4.7,
    totalRatings: 17
  },
  {
    id: "material3",
    title: "Algorithms Textbook",
    description: "Digital copy of the recommended algorithms textbook",
    subjectId: "cs301",
    subject: { id: "cs301", name: "Algorithms", code: "CS301", semester: 5 },
    type: "book",
    fileUrl: "/files/algo-book.pdf",
    thumbnailUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    uploadedBy: "user1",
    uploadedAt: "2023-09-05T09:15:00Z",
    downloads: 210,
    size: 15000000,
    rating: 4.6,
    totalRatings: 32
  }
];

const Dashboard = () => {
  const [user] = useState<User>(mockUser);
  const [materials] = useState<Material[]>(mockMaterials);
  
  useEffect(() => {
    document.title = "Senior Dashboard - AcademiX";
  }, []);

  // Calculate aggregate stats
  const totalDownloads = materials.reduce((sum, material) => sum + material.downloads, 0);
  const totalMaterials = materials.length;
  const averageRating = user.rating || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Senior Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your uploaded materials and track your contribution impact
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`h-6 w-6 ${star <= Math.round(averageRating) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm ml-1">
                ({user.totalRatings} ratings)
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <UserStatsCard 
              title="Total Downloads"
              value={totalDownloads}
              icon={<DownloadCloud className="h-5 w-5 text-blue-600" />}
              description="Students helped with your materials"
              trend={+12}
            />
            
            <UserStatsCard 
              title="Materials Shared"
              value={totalMaterials}
              icon={<FileText className="h-5 w-5 text-green-600" />}
              description="Across all subjects and types"
              trend={+1}
            />
            
            <UserStatsCard 
              title="Contribution Score"
              value={86}
              icon={<Award className="h-5 w-5 text-purple-600" />}
              description="Based on quality and engagement"
              trend={+5}
              suffix="/100"
            />
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Verification Status
              </CardTitle>
              <CardDescription>
                Your college ID verification and account status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">College ID</p>
                      <p className="text-sm text-muted-foreground">{user.collegeId}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Contributor Status</p>
                      <p className="text-sm text-muted-foreground">Senior</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium">Contribution Milestones</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Bronze Contributor</span>
                      <span>Complete</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Silver Contributor</span>
                      <span>86%</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Gold Contributor</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Uploaded Materials</h2>
              <Button variant="outline" className="text-sm" asChild>
                <Link to="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Link>
              </Button>
            </div>
            
            <MaterialsList materials={materials} />
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary/80 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">AcademiX</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A mix of academics and rewards. © {new Date().getFullYear()} AcademiX
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
