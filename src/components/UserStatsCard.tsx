
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface UserStatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  trend?: number;
  suffix?: string;
}

const UserStatsCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend = 0,
  suffix = ""
}: UserStatsCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline mt-1">
              <span className="text-2xl font-bold">{value.toLocaleString()}{suffix}</span>
              
              {trend !== 0 && (
                <div className={`flex items-center ml-2 text-xs ${
                  trend > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {trend > 0 ? 
                    <TrendingUp className="h-3 w-3 mr-0.5" /> : 
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  }
                  <span>{Math.abs(trend)}%</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStatsCard;
