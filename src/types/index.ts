
export type UserRole = 'junior' | 'senior';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  collegeId?: string;
  verified: boolean;
  rating?: number; // Average rating (1-5)
  totalRatings?: number; // Number of ratings received
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
}

export type MaterialType = 'notes' | 'paper' | 'book' | 'assignment' | 'other';

export interface Material {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subject: Subject;
  type: MaterialType;
  fileUrl: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  uploadedByUser?: User;
  uploadedAt: string;
  downloads: number;
  size: number;
  rating?: number; // Average rating (1-5)
  totalRatings?: number; // Number of ratings received
  userRating?: number; // Current user's rating
}

export interface Rating {
  id: string;
  materialId: string; 
  userId: string;
  value: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
}
