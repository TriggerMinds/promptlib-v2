import React, { useState } from 'react';
import { X, Sparkles, Loader2, Copy } from 'lucide-react';
import { enhancePrompt } from '../services/geminiService';
import { db } from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import { PromptType } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePromptModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [category, setCategory] = useState('1'); // Default to first category
  const [type, setType] = useState<PromptType>(PromptType.TEXT);
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handleEnhance = async () => {
    if (!userPrompt.trim()) return;
    setIsEnhancing(true);
    try {
      const improved = await enhancePrompt(userPrompt);
      setSystemPrompt(improved); // Gemini usually generates system instructions
    } catch (e) {
      console.error(e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    await db.createPrompt({
      title,
      description,
      system_prompt: systemPrompt,
      user_prompt: userPrompt,
      category_id: Number(category),
      prompt_type: type,
      tags: tags.split(',').map(t => t.trim()).filter(t => t)
    }, user);

    onClose();
    // Reset form...
    setTitle('');
    setDescription('');
    setSystemPrompt('');
    setUserPrompt('');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create New Prompt</h2>
            <p className="text-sm text-slate-500">Share your prompt with the community.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 flex-grow">
          {/* Title & Desc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
               <input 
                 type="text" 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 outline-none"
                 placeholder="e.g., Senior React Dev"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
               <select 
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                 className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none"
               >
                 <option value="1">Academic</option>
                 <option value="2">Business</option>
                 <option value="3">Coding</option>
                 <option value="4">Creative</option>
               </select>
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none resize-none"
              placeholder="What does this prompt do?"
            />
          </div>

          {/* Prompt Fields */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                 <label className="block text-sm font-medium text-slate-700">System Prompt (Context/Persona)</label>
                 <button 
                  onClick={handleEnhance}
                  disabled={isEnhancing || !userPrompt}
                  className="text-xs flex items-center text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50"
                >
                  {isEnhancing ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3 mr-1" />
                  )}
                  {isEnhancing ? 'Generating...' : 'Auto-Generate from User Input'}
                </button>
              </div>
              <textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary font-mono text-sm bg-slate-50"
                placeholder="Act as a..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">User Prompt (Task/Input)</label>
              <textarea 
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary font-mono text-sm"
                placeholder="Analyze the following code..."
              />
            </div>
          </div>
          
           <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
               <input 
                 type="text" 
                 value={tags}
                 onChange={(e) => setTags(e.target.value)}
                 className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary outline-none"
                 placeholder="coding, react, web"
               />
             </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
          >
            Submit Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePromptModal;