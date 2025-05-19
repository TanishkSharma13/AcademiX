
import { Check, X } from "lucide-react";

interface PasswordRequirementsProps {
  passwordErrors: {
    length: boolean;
    specialAndNumber: boolean;
    cases: boolean;
  };
}

const PasswordRequirements = ({ passwordErrors }: PasswordRequirementsProps) => {
  return (
    <div className="mt-2 space-y-2 text-sm">
      <p className="font-medium text-gray-700">Password requirements:</p>
      <div className="flex items-center gap-2">
        {passwordErrors.length ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
        <span className={passwordErrors.length ? "text-green-700" : "text-gray-600"}>
          At least 8 characters
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {passwordErrors.specialAndNumber ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
        <span className={passwordErrors.specialAndNumber ? "text-green-700" : "text-gray-600"}>
          Include special characters and numbers
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {passwordErrors.cases ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
        <span className={passwordErrors.cases ? "text-green-700" : "text-gray-600"}>
          Uppercase and lowercase letters
        </span>
      </div>
    </div>
  );
};

export default PasswordRequirements;
