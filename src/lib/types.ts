export interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro';
  stripeAccountId?: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  prompt: string;
  code: {
    html: string;
    css: string;
    js: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deployedUrl?: string;
  isDeployed: boolean;
}

export interface AppTemplate {
  name: string;
  prompt: string;
  code: {
    html: string;
    css: string;
    js: string;
  };
}