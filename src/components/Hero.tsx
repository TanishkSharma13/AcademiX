
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Upload, User, Users, BookOpen, Sparkles } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`space-y-6 ${
              isVisible 
                ? "animate-slide-up opacity-100" 
                : "opacity-0"
            } transition-all duration-700`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
              <span>B.Tech Computer Science Resources</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Empower Your Academic Journey
            </h1>
            
            <p className="text-xl text-muted-foreground">
              A platform where seniors share knowledge and juniors access valuable study resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="btn-hover group rounded-full px-6 shadow-md" 
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
                className="btn-hover rounded-full px-6 border-2" 
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
              icon={<Download className="h-6 w-6 text-blue-600" />}
              title="Access Resources"
              description="Download notes, papers, and materials for your courses"
              delay="delay-100"
              to="/browse"
              gradient="from-blue-50 to-indigo-50 border-blue-200/40"
            />
            <FeatureCard
              icon={<Upload className="h-6 w-6 text-emerald-600" />}
              title="Share Knowledge"
              description="Upload your notes and papers to help juniors"
              delay="delay-200"
              to="/upload"
              gradient="from-emerald-50 to-teal-50 border-emerald-200/40"
            />
            <FeatureCard
              icon={<User className="h-6 w-6 text-purple-600" />}
              title="Junior Students"
              description="Find previous years' papers and quality notes"
              delay="delay-300"
              to="/login?role=junior"
              gradient="from-purple-50 to-fuchsia-50 border-purple-200/40"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-amber-600" />}
              title="Senior Students"
              description="Share resources to build a stronger community"
              delay="delay-400"
              to="/login?role=senior"
              gradient="from-amber-50 to-orange-50 border-amber-200/40"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  to: string;
  gradient: string;
}

const FeatureCard = ({ icon, title, description, delay, to, gradient }: FeatureCardProps) => {
  return (
    <Link 
      to={to}
      className={`relative overflow-hidden group rounded-xl border bg-gradient-to-br ${gradient} p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30`}
    >
      <div className="space-y-3">
        <div className="p-2 w-fit rounded-lg bg-white backdrop-blur-sm transition-colors group-hover:bg-primary/5">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </Link>
  );
};

export default Hero;
