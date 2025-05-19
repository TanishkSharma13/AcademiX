
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UserRole } from "@/types";
import CollegeIdVerification from "@/components/CollegeIdVerification";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import LeftSidebar from "@/components/auth/LeftSidebar";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isSignUp = queryParams.get("signup") === "true";
  const defaultRole = queryParams.get("role") as UserRole | null;
  
  const {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    role,
    isLoading,
    showVerification,
    collegeId,
    isVerified,
    checkingUser,
    passwordErrors,
    handleToggleMode,
    handleVerified,
    validatePassword,
    handleSubmit
  } = useAuth(isSignUp, defaultRole);

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <div className="flex-1 flex flex-col md:flex-row">
        <LeftSidebar />
        
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
            
            {!isLogin && showVerification ? (
              <CollegeIdVerification onVerified={handleVerified} />
            ) : isLogin ? (
              <LoginForm 
                email={email}
                password={password}
                isLoading={isLoading}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onSubmit={handleSubmit}
                onToggleMode={handleToggleMode}
              />
            ) : (
              <SignupForm 
                email={email}
                password={password}
                name={name}
                role={role}
                isLoading={isLoading}
                checkingUser={checkingUser}
                isVerified={isVerified}
                collegeId={collegeId}
                passwordErrors={passwordErrors}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onNameChange={(e) => setName(e.target.value)}
                onRoleChange={(value) => setRole(value)}
                onSubmit={handleSubmit}
                onToggleMode={handleToggleMode}
                validatePassword={validatePassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
