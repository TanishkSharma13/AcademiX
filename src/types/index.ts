
export type UserRole = 'junior' | 'senior';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
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
  uploadedAt: string;
  downloads: number;
  size: number;
}
