
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Set title
    document.title = "Page Not Found - AcademiX";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-secondary/30 to-white px-6 py-24">
      <Link to="/" className="flex items-center space-x-2 group mb-12">
        <BookOpen className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
        <span className="font-bold text-2xl">AcademiX</span>
      </Link>
      
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-9xl font-bold bg-gradient-to-br from-primary/80 to-primary/20 bg-clip-text text-transparent">404</div>
        
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button className="btn-hover rounded-full px-6 shadow-sm" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" className="btn-hover rounded-full px-6" asChild>
            <Link to="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default NotFound;
