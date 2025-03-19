
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/toast";
import { BookOpen, ArrowLeft } from "lucide-react";
import { UserRole } from "@/types";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isSignUp = queryParams.get("signup") === "true";
  const defaultRole = queryParams.get("role") as UserRole | null;
  
  const [isLogin, setIsLogin] = useState(!isSignUp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(defaultRole || "junior");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set title
    document.title = isLogin ? "Log In - StudySwap" : "Sign Up - StudySwap";
  }, [isLogin]);

  useEffect(() => {
    setIsLogin(!isSignUp);
  }, [isSignUp]);

  useEffect(() => {
    if (defaultRole) {
      setRole(defaultRole);
    }
  }, [defaultRole]);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
    
    // Update URL without reloading
    const newSearch = isLogin ? "?signup=true" : "";
    navigate({ pathname: location.pathname, search: newSearch }, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would handle authentication with a backend
      toast({
        title: isLogin ? "Login Successful" : "Account Created",
        description: isLogin 
          ? "Welcome back to StudySwap!" 
          : `Your account has been created as a ${role} student.`,
      });
      
      // Redirect after successful authentication
      navigate(role === "junior" ? "/browse" : "/upload");
      
    } catch (error) {
      toast({
        title: isLogin ? "Login Failed" : "Sign Up Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-primary p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 text-white max-w-md mx-auto">
            <Link to="/" className="inline-flex items-center space-x-2 group mb-12">
              <BookOpen className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="font-bold text-2xl">StudySwap</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {isLogin ? "Welcome Back!" : "Join Our Community"}
            </h1>
            <p className="text-lg opacity-90 mb-8">
              {isLogin 
                ? "Log in to access study materials shared by seniors or to upload your own resources."
                : "Create an account to access a wealth of study materials or share your own with juniors."}
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="opacity-90">Access notes and papers for B.Tech CS</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-5 w-5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <p className="opacity-90">Connect with seniors and juniors</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-6 flex md:hidden items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
            </div>
            
            <div className="hidden md:block mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">
              {isLogin ? "Log in to your account" : "Create a new account"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="space-y-3 pt-2">
                  <Label>I am a:</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="junior" id="junior" />
                        <Label htmlFor="junior" className="cursor-pointer">Junior Student</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="senior" id="senior" />
                        <Label htmlFor="senior" className="cursor-pointer">Senior Student</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full mt-6 btn-hover"
                disabled={isLoading}
              >
                {isLoading ? (
                  isLogin ? "Logging in..." : "Creating account..."
                ) : (
                  isLogin ? "Log In" : "Sign Up"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={handleToggleMode}
                  className="text-primary font-medium ml-2 hover:underline focus:outline-none"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
