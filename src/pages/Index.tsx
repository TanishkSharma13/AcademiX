import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { 
  Download, Upload, Book, GraduationCap, 
  Users, ArrowRight, BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Set title
    document.title = "AcademiX - A mix of academics and rewards";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-20 px-6 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How AcademiX Works</h2>
              <p className="text-lg text-muted-foreground">
                A simple platform built by students, for students, enabling the free exchange of study materials.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard 
                number={1} 
                title="Sign Up as Junior or Senior"
                description="Create an account with your college email to access or share material."
                icon={<Users className="h-8 w-8" />}
              />
              <StepCard 
                number={2} 
                title="Browse or Upload Resources"
                description="Find materials for your courses or share your own to help others."
                icon={<Book className="h-8 w-8" />}
              />
              <StepCard 
                number={3} 
                title="Download and Learn"
                description="Get the resources you need and make the most of your academic journey."
                icon={<Download className="h-8 w-8" />}
              />
            </div>
            
            <div className="mt-16 text-center">
              <Button size="lg" className="btn-hover" asChild>
                <Link to="/browse">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">For Juniors: Access Quality Study Resources</h2>
                  <p className="text-lg text-muted-foreground">
                    Enhance your learning experience with access to a curated collection of study materials shared by successful seniors.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Previous year question papers to practice",
                      "Comprehensive class notes and summaries",
                      "Selected reference materials and books",
                      "Assignment examples and templates"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="btn-hover" asChild>
                    <Link to="/browse">
                      <Download className="mr-2 h-4 w-4" />
                      Browse Materials
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 bg-secondary/30 p-8 rounded-xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl"></div>
                <div className="relative glass rounded-xl p-8 flex items-center justify-center">
                  <div className="w-full">
                    <div className="flex justify-center mb-6">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <BookOpen className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div className="text-center pb-6">
                      <h3 className="text-xl font-medium mb-2">Resource Library</h3>
                      <p className="text-muted-foreground text-sm">Access materials from all semesters</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        "Data Structures Notes",
                        "Algorithms Prev Year Paper",
                        "Operating Systems Reference",
                        "Database Systems Assignment"
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between bg-white/50 p-3 rounded-lg shadow-sm"
                        >
                          <span className="font-medium text-sm">{item}</span>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="bg-secondary/30 p-8 rounded-xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl"></div>
                <div className="relative glass rounded-xl p-8">
                  <div className="w-full">
                    <div className="mb-8 pb-6 border-b">
                      <h3 className="text-xl font-medium mb-4">Upload Study Material</h3>
                      <div className="bg-white/50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-center border-2 border-dashed border-primary/30 rounded-lg p-8">
                          <div className="text-center">
                            <Upload className="h-10 w-10 text-primary/60 mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium">Title</label>
                          <div className="bg-white/50 h-9 rounded-md shadow-sm"></div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium">Subject</label>
                          <div className="bg-white/50 h-9 rounded-md shadow-sm"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-6">
                        <label className="text-xs font-medium">Description</label>
                        <div className="bg-white/50 h-24 rounded-md shadow-sm"></div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-primary/80 h-9 w-32 rounded-md shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">For Seniors: Share Your Knowledge</h2>
                  <p className="text-lg text-muted-foreground">
                    Give back to your college community by sharing your study materials with juniors who can benefit from your experience.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Upload your class notes and summaries",
                      "Share previous exam papers and solutions",
                      "Provide your well-organized reference materials",
                      "Help build a stronger academic community"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="btn-hover" asChild>
                    <Link to="/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Share Materials
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Start Exchanging Study Materials Today</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join our academic community and contribute to collective knowledge sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hover" asChild>
                <Link to="/login?role=junior">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Join as Junior
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-hover" asChild>
                <Link to="/login?role=senior">
                  <Users className="mr-2 h-5 w-5" />
                  Join as Senior
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/80 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">AcademiX</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse Materials
              </Link>
              <Link to="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Upload Resources
              </Link>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AcademiX. A mix of academics and rewards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepCard = ({ number, title, description, icon }: StepCardProps) => {
  return (
    <div className="relative rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow hover:-translate-y-1">
      <div className="absolute -top-4 -left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
        {number}
      </div>
      <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
