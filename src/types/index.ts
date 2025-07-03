export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  profile?: {
    name: string;
    company?: string;
    businessType?: string;
  };
}

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: string[];
  weight: number;
  category: 'business' | 'financial' | 'legal' | 'operational';
}

export interface Recommendation {
  userId: string;
  entityType: 'individual' | 'corporation' | 'llc';
  reasoning: string[];
  score: number;
  details: {
    setupCost: number;
    taxImplications: string[];
    pros: string[];
    cons: string[];
  };
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  dueDate?: Date;
  tips?: string[];
  links?: string[];
  dependencies?: string[];
  category: 'setup' | 'legal' | 'financial' | 'operational';
}

export interface Checklist {
  userId: string;
  entityType: string;
  items: ChecklistItem[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EntityComparison {
  type: 'individual' | 'corporation' | 'llc';
  name: string;
  setupCost: number;
  taxRate: number;
  investmentEase: number;
  liability: string;
  management: string;
  pros: string[];
  cons: string[];
}