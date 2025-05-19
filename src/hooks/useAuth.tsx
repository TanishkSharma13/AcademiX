
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types";

export const useAuth = (initialIsSignUp: boolean = false, defaultRole: UserRole | null = null) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(!initialIsSignUp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(defaultRole || "junior");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [collegeId, setCollegeId] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{
    length: boolean;
    specialAndNumber: boolean;
    cases: boolean;
  }>({
    length: false,
    specialAndNumber: false,
    cases: false
  });

  useEffect(() => {
    // Set title based on login state
    document.title = isLogin ? "Log In - AcademiX" : "Sign Up - AcademiX";
  }, [isLogin]);

  // Password validation
  useEffect(() => {
    if (!isLogin && password) {
      const hasMinLength = password.length >= 8;
      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
      const hasNumber = /\d/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      
      setPasswordErrors({
        length: hasMinLength,
        specialAndNumber: hasSpecialChar && hasNumber,
        cases: hasUppercase && hasLowercase
      });
    }
  }, [password, isLogin]);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
    setShowVerification(false);
    setPasswordErrors({
      length: false,
      specialAndNumber: false,
      cases: false
    });
    
    // Update URL without reloading
    const newSearch = isLogin ? "?signup=true" : "";
    navigate({ pathname: location.pathname, search: newSearch }, { replace: true });
  };

  const handleVerified = (verifiedCollegeId: string, detectedRole: UserRole) => {
    setCollegeId(verifiedCollegeId);
    setRole(detectedRole);
    setIsVerified(true);
  };

  const validatePassword = () => {
    if (isLogin) return true;
    
    return passwordErrors.length && passwordErrors.specialAndNumber && passwordErrors.cases;
  };

  // Check if user exists in database
  const checkUserExists = async (email: string): Promise<boolean> => {
    try {
      setCheckingUser(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });

      // If there's no error or the error is not "User not found", the user exists
      return !error || error.message !== "User not found";
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return false;
    } finally {
      setCheckingUser(false);
    }
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

    // Password validation for signup
    if (!isLogin && !validatePassword()) {
      toast({
        title: "Password Requirements",
        description: "Your password does not meet all the requirements.",
        variant: "destructive",
      });
      return;
    }
    
    // For signup, check if user already exists before proceeding to verification
    if (!isLogin && !isVerified) {
      setIsLoading(true);
      const userExists = await checkUserExists(email);
      setIsLoading(false);
      
      if (userExists) {
        toast({
          title: "Account Already Exists",
          description: "An account with this email already exists. Please log in instead.",
          variant: "destructive",
        });
        
        // Switch to login mode
        setIsLogin(true);
        navigate({ pathname: location.pathname, search: "" }, { replace: true });
        return;
      }
      
      // If user doesn't exist, proceed to verification
      setShowVerification(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // TODO: Replace with Supabase authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: isLogin ? "Login Successful" : "Account Created",
        description: isLogin 
          ? "Welcome back to AcademiX!" 
          : `Your account has been created as a ${role} student.`,
      });
      
      // Redirect after successful authentication
      navigate(role === "junior" ? "/browse" : "/dashboard");
      
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

  return {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    role,
    setRole, // Make sure we return setRole
    isLoading,
    showVerification,
    setShowVerification,
    collegeId,
    isVerified,
    checkingUser,
    passwordErrors,
    handleToggleMode,
    handleVerified,
    validatePassword,
    handleSubmit
  };
};
