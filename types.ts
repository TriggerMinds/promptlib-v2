export enum PromptType {
  TEXT = 'Text',
  IMAGE = 'Image',
  CODE = 'Code',
  HYBRID = 'Hybrid'
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color?: string; // UI helper
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface PromptVersion {
  id: number;
  version_number: number;
  prompt_text: string; // The full combined content or user prompt
  change_note: string;
  created_at: string;
}

export interface Prompt {
  id: number;
  title: string;
  description: string;
  prompt_text: string; // Legacy/Simple
  system_prompt?: string;
  user_prompt?: string;
  prompt_type: PromptType;
  language: string;
  category_id: number;
  author_id: number;
  author_name: string; // Joined field
  is_featured: boolean;
  is_published: boolean;
  view_count: number;
  copy_count: number;
  created_at: string;
  updated_at: string;
  tags: string[]; // Simplification for UI
  versions?: PromptVersion[];
}

export interface FilterState {
  search: string;
  categoryId: string;
  type: PromptType | 'all';
  sort: 'newest' | 'popular' | 'views';
}