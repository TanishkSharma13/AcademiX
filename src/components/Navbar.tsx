
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Browse", path: "/browse" },
    { title: "Upload", path: "/upload" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled || isOpen 
          ? "bg-white/90 shadow-sm backdrop-blur-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
          <span className="font-bold text-xl">AcademiX</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-hover" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button className="btn-hover" asChild>
              <Link to="/login?signup=true">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-t animate-slide-down">
          <div className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors py-2 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.title}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/login?signup=true">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
