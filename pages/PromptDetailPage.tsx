import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Prompt } from '../types';
import { db } from '../services/mockDb';
import { ArrowLeft, Clock, Copy, Eye, User, Calendar, Tag, Check, Edit } from 'lucide-react';

const PromptDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'description'|'prompt'|'versions'>('prompt');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      db.getPromptById(Number(id)).then(p => {
        setPrompt(p || null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    db.incrementCopyCount(Number(id));
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  if (!prompt) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Prompt not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header onCreateClick={() => {}} />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to library
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide">
                   {prompt.prompt_type}
                 </span>
                 {prompt.is_featured && (
                   <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wide">
                     Featured
                   </span>
                 )}
               </div>
               <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{prompt.title}</h1>
               <div className="flex items-center gap-4 text-sm text-slate-500">
                 <span className="flex items-center gap-1"><User className="w-4 h-4" /> @{prompt.author_name}</span>
                 <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(prompt.created_at).toLocaleDateString()}</span>
               </div>
             </div>
             
             <div className="flex gap-4 text-center">
               <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                 <div className="text-xl font-bold text-slate-900">{prompt.view_count}</div>
                 <div className="text-xs text-slate-500 uppercase font-semibold">Views</div>
               </div>
               <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                 <div className="text-xl font-bold text-slate-900">{prompt.copy_count}</div>
                 <div className="text-xs text-slate-500 uppercase font-semibold">Copies</div>
               </div>
             </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
          <div className="border-b border-slate-200 px-2 flex gap-1">
            <button 
              onClick={() => setActiveTab('prompt')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'prompt' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Prompt Content
            </button>
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Description & Context
            </button>
            <button 
              onClick={() => setActiveTab('versions')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'versions' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              Version History
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose prose-slate max-w-none">
                <h3 className="text-lg font-bold mb-4">About this prompt</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{prompt.description}</p>
                
                <h4 className="text-md font-bold mt-8 mb-2">Category</h4>
                <p>{prompt.category_id}</p> {/* In real app map this to name */}
              </div>
            )}

            {activeTab === 'prompt' && (
              <div className="space-y-8">
                {prompt.system_prompt && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">System Prompt / Persona</label>
                      <button 
                        onClick={() => handleCopy(prompt.system_prompt!, 'system')}
                        className="text-xs flex items-center gap-1 text-primary hover:text-blue-700 font-medium"
                      >
                        {copyStatus === 'system' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copyStatus === 'system' ? 'Copied' : 'Copy System'}
                      </button>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 leading-relaxed overflow-x-auto shadow-inner">
                      {prompt.system_prompt}
                    </div>
                  </div>
                )}

                {prompt.user_prompt && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">User Prompt / Task</label>
                       <button 
                        onClick={() => handleCopy(prompt.user_prompt!, 'user')}
                        className="text-xs flex items-center gap-1 text-primary hover:text-blue-700 font-medium"
                      >
                        {copyStatus === 'user' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copyStatus === 'user' ? 'Copied' : 'Copy Task'}
                      </button>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm text-slate-300 leading-relaxed border border-slate-700 shadow-inner">
                      {prompt.user_prompt}
                    </div>
                  </div>
                )}

                {prompt.prompt_text && (
                   <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Full Prompt</label>
                       <button 
                        onClick={() => handleCopy(prompt.prompt_text!, 'full')}
                        className="text-xs flex items-center gap-1 text-primary hover:text-blue-700 font-medium"
                      >
                        {copyStatus === 'full' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copyStatus === 'full' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 leading-relaxed shadow-inner">
                      {prompt.prompt_text}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'versions' && (
              <div className="space-y-4">
                 {prompt.versions && prompt.versions.length > 0 ? (
                    prompt.versions.map(v => (
                      <div key={v.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold text-slate-900">Version {v.version_number}.0</span>
                          <span className="text-xs text-slate-400">{new Date(v.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-slate-600 italic">"{v.change_note}"</p>
                      </div>
                    ))
                 ) : (
                    <div className="text-center py-10 text-slate-400">
                      No version history available for this prompt.
                    </div>
                 )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromptDetailPage;