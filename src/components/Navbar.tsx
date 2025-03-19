
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, Sparkles } from "lucide-react";

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
          ? "bg-white/95 shadow-md backdrop-blur-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="h-3 w-3 text-amber-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-bold text-xl tracking-tight">AcademiX</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 ${
                  location.pathname === link.path
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-hover rounded-full px-6" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button className="btn-hover rounded-full px-6 shadow-sm" asChild>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t animate-slide-down">
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
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="w-full rounded-full shadow-sm" asChild>
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
