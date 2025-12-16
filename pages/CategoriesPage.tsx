import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CATEGORIES } from '../constants';
import { Folder, ArrowRight } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <Header onCreateClick={() => {}} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Categories</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Browse prompts by category. Each category contains specialized prompts for different use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.filter(cat => cat.id > 0).map((category) => (
            <div 
              key={category.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${category.color || 'bg-blue-100 text-blue-800'} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                  {category.name}
                </div>
                <Folder className="w-5 h-5 text-slate-400" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{category.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                {category.description || `Prompts related to ${category.name.toLowerCase()}`}
              </p>
              
              <Link 
                to={`/?categoryId=${category.id}`}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-blue-700 transition-colors"
              >
                Browse prompts
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">How to use categories</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Categories help you find prompts tailored to specific domains. Click on any category to filter the main prompt library.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to all prompts
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;