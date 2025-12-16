import React from 'react';
import { Prompt, PromptType } from '../types';
import { Copy, Heart, Terminal, Image as ImageIcon, FileText, CheckCircle2 } from 'lucide-react';
import { db } from '../services/mockDb';

interface PromptCardProps {
  prompt: Prompt;
  onClick: (id: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick, isFavorite = false, onToggleFavorite }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Copy the main content (either prompt_text or system+user)
    const contentToCopy = prompt.prompt_text || `${prompt.system_prompt}\n\n${prompt.user_prompt}`;
    navigator.clipboard.writeText(contentToCopy);
    
    // API Call
    await db.incrementCopyCount(prompt.id);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(prompt.id);
    }
  };

  const getTypeIcon = () => {
    switch (prompt.prompt_type) {
      case PromptType.IMAGE: return <ImageIcon className="w-4 h-4" />;
      case PromptType.CODE: return <Terminal className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div 
      onClick={() => onClick(prompt.id)}
      className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full hover:border-primary/30 dark:hover:border-primary/30"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <span className={`p-1.5 rounded-md ${prompt.prompt_type === PromptType.IMAGE ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
            {getTypeIcon()}
          </span>
          {prompt.is_featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="text-xs text-slate-400 font-medium">@{prompt.author_name}</div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight group-hover:text-primary transition-colors">
        {prompt.title}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3 flex-grow">
        {prompt.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs px-2 py-1 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 rounded-md border border-slate-100 dark:border-slate-700 font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center text-slate-400 text-xs font-semibold">
          <span className="mr-3">👁️ {prompt.view_count}</span>
          <span>📋 {prompt.copy_count}</span>
        </div>
        
        <button 
          onClick={handleCopy}
          className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            copied 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default PromptCard;