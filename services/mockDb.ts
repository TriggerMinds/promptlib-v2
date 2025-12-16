import { Prompt, PromptType, Category, User, Tag } from '../types';

// --- SEED DATA ---
const SEED_CATEGORIES: Category[] = [
  { id: 1, name: 'Academic', slug: 'academic', description: 'Prompts for education', color: 'bg-blue-100 text-blue-800' },
  { id: 2, name: 'Business', slug: 'business', description: 'Business strategy', color: 'bg-emerald-100 text-emerald-800' },
  { id: 3, name: 'Coding', slug: 'coding', description: 'Development prompts', color: 'bg-slate-100 text-slate-800' },
  { id: 4, name: 'Creative', slug: 'creative', description: 'Creative writing', color: 'bg-purple-100 text-purple-800' },
  { id: 5, name: 'Data Analysis', slug: 'data-analysis', description: 'Data science', color: 'bg-orange-100 text-orange-800' },
  { id: 6, name: 'Marketing', slug: 'marketing', description: 'Marketing & SEO', color: 'bg-pink-100 text-pink-800' },
  { id: 7, name: 'AI Agents', slug: 'ai-agents', description: 'Autonomous agents', color: 'bg-indigo-100 text-indigo-800' },
];

const SEED_USERS: User[] = [
  { id: 1, username: 'admin', email: 'admin@promptlib.com', role: 'admin' },
  { id: 2, username: 'prompt_wizard', email: 'wizard@promptlib.com', role: 'user' },
];

const SEED_PROMPTS: Prompt[] = [
  {
    id: 1,
    title: '$500/Hour AI Consultant',
    description: 'Act as a high-level business consultant to solve complex organizational problems.',
    prompt_text: '',
    system_prompt: 'Act as a top-tier management consultant (McKinsey/Bain style). Use MECE frameworks.',
    user_prompt: 'Analyze this business problem: [PROBLEM]',
    prompt_type: PromptType.TEXT,
    language: 'en',
    category_id: 2,
    author_id: 2,
    author_name: 'prompt_wizard',
    is_featured: true,
    is_published: true,
    view_count: 1240,
    copy_count: 450,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ['Business', 'Consulting', 'Strategy'],
    versions: [
       { id: 1, version_number: 1, prompt_text: 'Initial version', change_note: 'Initial commit', created_at: new Date().toISOString() }
    ]
  },
  {
    id: 2,
    title: 'React Component Generator',
    description: 'Create production-ready React components with Tailwind CSS.',
    prompt_text: '',
    system_prompt: 'You are a senior frontend engineer. Output only code.',
    user_prompt: 'Create a responsive navbar component using React and Tailwind.',
    prompt_type: PromptType.CODE,
    language: 'en',
    category_id: 3,
    author_id: 1,
    author_name: 'admin',
    is_featured: true,
    is_published: true,
    view_count: 3500,
    copy_count: 1200,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ['React', 'Tailwind', 'Web Development'],
    versions: []
  },
  {
    id: 3,
    title: 'Midjourney Photorealism',
    description: 'Generate hyper-realistic photography prompts for Midjourney v6.',
    prompt_text: '/imagine prompt: [SUBJECT], shot on 35mm film, 85mm lens, f/1.8, natural lighting --v 6.0',
    prompt_type: PromptType.IMAGE,
    language: 'en',
    category_id: 4,
    author_id: 2,
    author_name: 'prompt_wizard',
    is_featured: false,
    is_published: true,
    view_count: 890,
    copy_count: 300,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ['Midjourney', 'Photography', 'Art'],
    versions: []
  }
];

// --- MOCK DATABASE CLASS ---
class MockDatabase {
  private prompts: Prompt[];
  private categories: Category[];
  private users: User[];

  constructor() {
    // Load from localStorage or seed
    const storedPrompts = localStorage.getItem('db_prompts');
    this.prompts = storedPrompts ? JSON.parse(storedPrompts) : SEED_PROMPTS;
    this.categories = SEED_CATEGORIES;
    this.users = SEED_USERS;
  }

  private persist() {
    localStorage.setItem('db_prompts', JSON.stringify(this.prompts));
  }

  // --- API SIMULATION ---

  async getPrompts(params: { search?: string, categoryId?: string, type?: string, sort?: string }) {
    await new Promise(resolve => setTimeout(resolve, 300)); // Network delay

    let results = [...this.prompts].filter(p => p.is_published);

    if (params.search) {
      const q = params.search.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (params.categoryId && params.categoryId !== 'all') {
      results = results.filter(p => p.category_id.toString() === params.categoryId);
    }

    if (params.type && params.type !== 'all') {
      results = results.filter(p => p.prompt_type === params.type);
    }

    if (params.sort) {
      if (params.sort === 'newest') results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      if (params.sort === 'popular') results.sort((a, b) => b.view_count - a.view_count);
    }

    return { prompts: results, total: results.length };
  }

  async getPromptById(id: number) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const prompt = this.prompts.find(p => p.id === id);
    if (prompt) {
      // Increment view count
      prompt.view_count++;
      this.persist();
    }
    return prompt;
  }

  async getCategories() {
    return this.categories;
  }

  async incrementCopyCount(id: number) {
    const prompt = this.prompts.find(p => p.id === id);
    if (prompt) {
      prompt.copy_count++;
      this.persist();
      return true;
    }
    return false;
  }

  // Admin / Auth
  async login(email: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = this.users.find(u => u.email === email);
    if (user) return { token: 'mock-jwt-token', user };
    throw new Error('Invalid credentials');
  }

  // Admin Operations
  async getAllPromptsAdmin() {
    return this.prompts; // Returns drafted ones too
  }

  async deletePrompt(id: number) {
    this.prompts = this.prompts.filter(p => p.id !== id);
    this.persist();
  }

  async toggleFeature(id: number) {
    const p = this.prompts.find(p => p.id === id);
    if (p) {
      p.is_featured = !p.is_featured;
      this.persist();
    }
  }

  async createPrompt(data: Partial<Prompt>, user: User) {
    const newId = Math.max(...this.prompts.map(p => p.id)) + 1;
    const newPrompt: Prompt = {
      id: newId,
      title: data.title || 'Untitled',
      description: data.description || '',
      prompt_text: data.prompt_text || '',
      system_prompt: data.system_prompt,
      user_prompt: data.user_prompt,
      prompt_type: data.prompt_type || PromptType.TEXT,
      language: 'en',
      category_id: Number(data.category_id) || 1,
      author_id: user.id,
      author_name: user.username,
      is_featured: false,
      is_published: true,
      view_count: 0,
      copy_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: data.tags || [],
      versions: []
    };
    this.prompts.push(newPrompt);
    this.persist();
    return newPrompt;
  }

  async updatePrompt(id: number, data: Partial<Prompt>) {
    const prompt = this.prompts.find(p => p.id === id);
    if (!prompt) throw new Error('Prompt not found');
    
    // Update fields
    if (data.title !== undefined) prompt.title = data.title;
    if (data.description !== undefined) prompt.description = data.description;
    if (data.prompt_text !== undefined) prompt.prompt_text = data.prompt_text;
    if (data.system_prompt !== undefined) prompt.system_prompt = data.system_prompt;
    if (data.user_prompt !== undefined) prompt.user_prompt = data.user_prompt;
    if (data.prompt_type !== undefined) prompt.prompt_type = data.prompt_type;
    if (data.category_id !== undefined) prompt.category_id = Number(data.category_id);
    if (data.tags !== undefined) prompt.tags = data.tags;
    if (data.is_featured !== undefined) prompt.is_featured = data.is_featured;
    if (data.is_published !== undefined) prompt.is_published = data.is_published;
    
    prompt.updated_at = new Date().toISOString();
    
    // Add a version entry
    if (prompt.versions) {
      const newVersion = {
        id: prompt.versions.length + 1,
        version_number: prompt.versions.length + 1,
        prompt_text: prompt.prompt_text,
        change_note: 'Updated via edit',
        created_at: new Date().toISOString()
      };
      prompt.versions.push(newVersion);
    }
    
    this.persist();
    return prompt;
  }
}

export const db = new MockDatabase();