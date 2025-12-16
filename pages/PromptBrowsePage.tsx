import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PromptCard from '../components/PromptCard';
import CreatePromptModal from '../components/CreatePromptModal';
import { Prompt, Category, PromptType } from '../types';
import { db } from '../services/mockDb';
import { Search, SlidersHorizontal, Sparkles, X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PromptBrowsePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Data State
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sort, setSort] = useState<'newest' | 'popular'>('newest');
  
  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedCategory, selectedType, sort]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cats, data] = await Promise.all([
        db.getCategories(),
        db.getPrompts({
          search: searchQuery,
          categoryId: selectedCategory,
          type: selectedType,
          sort: sort
        })
      ]);
      setCategories(cats);
      setPrompts(data.prompts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header onCreateClick={handleCreateClick} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* FILTERS BAR */}
        <section className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Explore Prompts
              <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {prompts.length}
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <div className="relative flex-grow sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>

              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </section>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map(prompt => (
              <PromptCard 
                key={prompt.id}
                prompt={prompt}
                onClick={(id) => navigate(`/prompts/${id}`)}
              />
            ))}
          </div>
        )}

        {!loading && prompts.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl">
             <p className="text-slate-500">No prompts found matching your criteria.</p>
             <button 
               onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
               className="mt-2 text-primary font-medium hover:underline"
             >
               Clear filters
             </button>
          </div>
        )}

      </main>

      <CreatePromptModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); fetchData(); }} 
      />
      <Footer />
    </div>
  );
};

export default PromptBrowsePage;