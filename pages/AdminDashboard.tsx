import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/mockDb';
import { Prompt } from '../types';
import { Trash2, Star, Edit, Eye } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    const data = await db.getAllPromptsAdmin();
    setPrompts(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this prompt?')) {
      await db.deletePrompt(id);
      loadData();
    }
  };

  const handleToggleFeature = async (id: number) => {
    await db.toggleFeature(id);
    loadData();
  };

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
                <tr key={prompt.id} className="hover:bg-slate-50">
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
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                       <button onClick={() => handleToggleFeature(prompt.id)} className={`p-1 rounded hover:bg-slate-100 ${prompt.is_featured ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`}>
                         <Star className="w-4 h-4" />
                       </button>
                       <button onClick={() => navigate(`/prompts/${prompt.id}`)} className="p-1 rounded hover:bg-slate-100 text-blue-600">
                         <Eye className="w-4 h-4" />
                       </button>
                       <button onClick={() => handleDelete(prompt.id)} className="p-1 rounded hover:bg-slate-100 text-red-600">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;