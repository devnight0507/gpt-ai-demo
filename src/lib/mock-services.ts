import { User, Project } from './types';
import { appTemplates, defaultTemplate } from './templates';

// Mock AI Service
export const mockAIService = {
  async generateCode(prompt: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find matching template
    const normalizedPrompt = prompt.toLowerCase();
    const template = appTemplates.find(t => 
      normalizedPrompt.includes(t.prompt) || 
      t.prompt.includes(normalizedPrompt)
    ) || defaultTemplate;
    
    return {
      code: template.code,
      title: `${template.name} App`,
      description: `A ${template.name.toLowerCase()} built with LaunchAI`
    };
  }
};

// Mock Auth Service
export const mockAuthService = {
  currentUser: null as User | null,
  
  async signUp(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: User = {
      id: Date.now().toString(),
      email,
      plan: 'free'
    };
    
    this.currentUser = user;
    localStorage.setItem('launchai_user', JSON.stringify(user));
    
    return user;
  },
  
  async signIn(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, accept any email/password
    const user: User = {
      id: Date.now().toString(),
      email,
      plan: email.includes('pro') ? 'pro' : 'free'
    };
    
    this.currentUser = user;
    localStorage.setItem('launchai_user', JSON.stringify(user));
    
    return user;
  },
  
  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('launchai_user');
  },
  
  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('launchai_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  },
  
  async updateUserPlan(plan: 'free' | 'pro') {
    if (this.currentUser) {
      this.currentUser.plan = plan;
      localStorage.setItem('launchai_user', JSON.stringify(this.currentUser));
    }
  }
};

// Mock Storage Service
export const mockStorageService = {
  async saveProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const savedProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const projects = this.getProjects();
    projects.push(savedProject);
    localStorage.setItem('launchai_projects', JSON.stringify(projects));
    
    return savedProject;
  },
  
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...updates,
        updatedAt: new Date()
      };
      localStorage.setItem('launchai_projects', JSON.stringify(projects));
      return projects[index];
    }
    
    throw new Error('Project not found');
  },
  
  async getProject(id: string): Promise<Project | null> {
    const projects = this.getProjects();
    return projects.find(p => p.id === id) || null;
  },
  
  async getUserProjects(userId: string): Promise<Project[]> {
    const projects = this.getProjects();
    return projects.filter(p => p.userId === userId);
  },
  
  async deleteProject(id: string): Promise<void> {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem('launchai_projects', JSON.stringify(filtered));
  },
  
  getProjects(): Project[] {
    const stored = localStorage.getItem('launchai_projects');
    if (stored) {
      return JSON.parse(stored).map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      }));
    }
    return [];
  }
};

// Mock Deployment Service
export const mockDeploymentService = {
  async deployProject(projectId: string): Promise<string> {
    // Simulate deployment delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock deployment URL
    const deployUrl = `https://app.launchai.dev/${projectId}`;
    
    // Update project with deployed URL
    await mockStorageService.updateProject(projectId, {
      deployedUrl: deployUrl,
      isDeployed: true
    });
    
    return deployUrl;
  },
  
  async undeployProject(projectId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await mockStorageService.updateProject(projectId, {
      deployedUrl: undefined,
      isDeployed: false
    });
  }
};

// Mock Stripe Service
export const mockStripeService = {
  async createCheckoutSession(plan: 'pro'): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock checkout URL
    return 'https://checkout.stripe.com/mock-session-id';
  },
  
  async connectStripeAccount(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock Stripe account ID
    const accountId = `acct_${Date.now()}`;
    
    if (mockAuthService.currentUser) {
      mockAuthService.currentUser.stripeAccountId = accountId;
      localStorage.setItem('launchai_user', JSON.stringify(mockAuthService.currentUser));
    }
    
    return accountId;
  }
};