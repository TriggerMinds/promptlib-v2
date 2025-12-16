import React from 'react';
import { Prompt } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  prompt: Prompt;
  onClick: (prompt: Prompt) => void;
}

const PromptOfTheDay: React.FC<Props> = ({ prompt, onClick }) => {
  return (
    <div className="mb-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-1 shadow-xl transform transition-all hover:scale-[1.01]">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center text-white">
            <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2 text-violet-200 font-semibold text-xs tracking-wider uppercase">
                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                    Prompt of the Day
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{prompt.title}</h2>
                <p className="text-indigo-100 leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                    {prompt.description}
                </p>
                <div className="mt-4 flex gap-2">
                    {prompt.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded border border-white/20">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <button 
                onClick={() => onClick(prompt)}
                className="group flex-shrink-0 flex items-center gap-2 bg-white text-indigo-600 px-5 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg shadow-black/10"
            >
                View Prompt
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </div>
  );
};

export default PromptOfTheDay;