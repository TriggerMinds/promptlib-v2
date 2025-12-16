import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/mockDb';
import { Prompt } from '../types';
import { Trash2, Star, Eye, Loader2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    // Wacht tot auth klaar is met laden
    if (isLoading) return;

    // Als er geen user is, of de user is geen admin -> redirect
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    // Als we hier zijn, is het veilig om data te laden
    loadData();
  }, [user, isLoading, navigate]);

  const loadData = async () => {
    setIsDataLoading(true);
    const data = await db.getAllPromptsAdmin();
    setPrompts(data);
    setIsDataLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this prompt? This cannot be undone.')) {
      await db.deletePrompt(id);
      loadData();
    }
  };

  const handleToggleFeature = async (id: number) => {
    await db.toggleFeature(id);
    loadData();
  };

  // Toon een loader terwijl we wachten op auth check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Beveiliging: Render niets als er geen admin is (redirect gebeurt in useEffect)
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onCreateClick={() => {}} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-3xl font-bold text-primary">{prompts.length}</div>
            <div className="text-sm text-slate-500 font-medium uppercase">Total Prompts</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="text-3xl font-bold text-emerald-600">
               {prompts.reduce((acc, p) => acc + p.view_count, 0).toLocaleString()}
             </div>
             <div className="text-sm text-slate-500 font-medium uppercase">Total Views</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isDataLoading ? (
            <div className="p-12 flex justify-center text-slate-400">Loading data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {prompts.map((prompt) => (
                    <tr key={prompt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">#{prompt.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{prompt.title}</div>
                        <div className="text-xs text-slate-500">{prompt.prompt_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">@{prompt.author_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {prompt.view_count} views
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {prompt.is_published ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggleFeature(prompt.id)} 
                            title={prompt.is_featured ? "Remove from featured" : "Add to featured"}
                            className={`p-1.5 rounded transition-colors ${prompt.is_featured ? 'bg-amber-50 text-amber-500 hover:bg-amber-100' : 'text-slate-400 hover:bg-slate-100'}`}
                          >
                            <Star className={`w-4 h-4 ${prompt.is_featured ? 'fill-current' : ''}`} />
                          </button>
                          <button 
                            onClick={() => navigate(`/prompts/${prompt.id}`)} 
                            title="View Details"
                            className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(prompt.id)} 
                            title="Delete Prompt"
                            className="p-1.5 rounded hover:bg-red-50 text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;