
import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PasswordRequirements from "./PasswordRequirements";
import { UserRole } from "@/types";

interface SignupFormProps {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isLoading: boolean;
  checkingUser: boolean;
  isVerified: boolean;
  collegeId: string;
  passwordErrors: {
    length: boolean;
    specialAndNumber: boolean;
    cases: boolean;
  };
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (value: UserRole) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
  validatePassword: () => boolean;
}

const SignupForm = ({
  email,
  password,
  name,
  role,
  isLoading,
  checkingUser,
  isVerified,
  collegeId,
  passwordErrors,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onRoleChange,
  onSubmit,
  onToggleMode,
  validatePassword,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={onNameChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            onChange={onPasswordChange}
            required
            className="pr-10"
          />
          <button 
            type="button" 
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        
        <PasswordRequirements passwordErrors={passwordErrors} />
      </div>
      
      {isVerified && (
        <div className="p-3 border rounded-md bg-green-50 text-green-800 text-sm">
          <span className="font-medium">Verified:</span> Your college ID ({collegeId}) confirms you as a {role} student.
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full mt-6 btn-hover"
        disabled={isLoading || checkingUser || !validatePassword()}
      >
        {isLoading || checkingUser ? (
          checkingUser ? "Checking account..." : "Creating account..."
        ) : (
          !isVerified ? "Verify College ID" : "Sign Up"
        )}
      </Button>
      
      {/* Error message when password requirements are not met */}
      {!validatePassword() && (
        <div className="p-3 border border-red-200 rounded-md bg-red-50 text-red-800 text-sm flex items-start">
          <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <span>Please meet all password requirements before proceeding.</span>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Already have an account?
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary font-medium ml-2 hover:underline focus:outline-none"
          >
            Log in
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
