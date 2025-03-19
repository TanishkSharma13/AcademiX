
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Upload, User, Users, BookOpen } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`space-y-6 ${
              isVisible 
                ? "animate-slide-up opacity-100" 
                : "opacity-0"
            } transition-all duration-700`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>B.Tech Computer Science Resources</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Empower Your Academic Journey
            </h1>
            
            <p className="text-xl text-muted-foreground">
              A platform where seniors share knowledge and juniors access valuable study resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="btn-hover group" 
                asChild
              >
                <Link to="/browse">
                  Find Study Materials
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-hover" 
                asChild
              >
                <Link to="/upload">
                  Share Your Resources
                </Link>
              </Button>
            </div>
          </div>
          
          <div 
            className={`grid grid-cols-2 gap-6 ${
              isVisible 
                ? "animate-slide-up opacity-100 delay-200" 
                : "opacity-0"
            } transition-all duration-700`}
          >
            <FeatureCard
              icon={<Download className="h-6 w-6 text-blue-500" />}
              title="Access Resources"
              description="Download notes, papers, and materials for your courses"
              delay="delay-100"
              to="/browse"
            />
            <FeatureCard
              icon={<Upload className="h-6 w-6 text-green-500" />}
              title="Share Knowledge"
              description="Upload your notes and papers to help juniors"
              delay="delay-200"
              to="/upload"
            />
            <FeatureCard
              icon={<User className="h-6 w-6 text-purple-500" />}
              title="Junior Students"
              description="Find previous years' papers and quality notes"
              delay="delay-300"
              to="/login?role=junior"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-orange-500" />}
              title="Senior Students"
              description="Share resources to build a stronger community"
              delay="delay-400"
              to="/login?role=senior"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  to: string;
}

const FeatureCard = ({ icon, title, description, delay, to }: FeatureCardProps) => {
  return (
    <Link 
      to={to}
      className={`relative overflow-hidden group rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/20`}
    >
      <div className="space-y-3">
        <div className="p-2 w-fit rounded-lg bg-primary/5 transition-colors group-hover:bg-primary/10">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </Link>
  );
};

export default Hero;
