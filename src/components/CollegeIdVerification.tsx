
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, Check, AlertCircle } from "lucide-react";
import { UserRole } from "@/types";

interface CollegeIdVerificationProps {
  onVerified?: (collegeId: string, role: UserRole) => void;
}

const CollegeIdVerification = ({ onVerified }: CollegeIdVerificationProps) => {
  const [collegeId, setCollegeId] = useState("");
  const [idImage, setIdImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!collegeId || !idImage) {
      toast({
        title: "Validation Error",
        description: "Please provide both your College ID number and an image of your ID card",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check college ID format to determine user role
      // For demo: IDs starting with 'CS2' are seniors, others are juniors
      const role: UserRole = collegeId.startsWith('CS2') ? 'senior' : 'junior';
      
      setIsVerified(true);
      
      toast({
        title: "Verification Successful",
        description: `Your college ID has been verified. You are identified as a ${role} student.`,
      });
      
      onVerified?.(collegeId, role);
      
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "There was an error verifying your ID. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isVerified) {
    return (
      <div className="p-6 border rounded-lg bg-green-50 text-green-800 flex items-center">
        <Check className="h-6 w-6 mr-4 text-green-600" />
        <div>
          <h3 className="font-medium">Verification Complete</h3>
          <p className="text-sm">Your college ID has been successfully verified.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-blue-50 text-blue-800 flex items-start">
        <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium mb-1">College ID Verification</p>
          <p>Please provide your college ID number and upload a photo/scan of your college ID card to verify your status as a junior or senior student.</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="collegeId">College ID Number</Label>
        <Input
          id="collegeId"
          placeholder="Enter your college ID number (e.g., CS2045678)"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          This will be used to verify your role (junior/senior)
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="idUpload">Upload College ID Card</Label>
        <Input
          id="idUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          Upload a clear image of your college ID card (.jpg, .png formats only)
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Verifying..."
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Verify College ID
          </>
        )}
      </Button>
    </form>
  );
};

export default CollegeIdVerification;
