
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Set title
    document.title = "Page Not Found - StudySwap";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 px-6 py-24">
      <Link to="/" className="flex items-center space-x-2 group mb-12">
        <BookOpen className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
        <span className="font-bold text-2xl">StudySwap</span>
      </Link>
      
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-9xl font-bold text-primary/20">404</div>
        
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Button className="mt-6 btn-hover" asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
