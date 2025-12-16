import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Home, Search, Command } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <Header onCreateClick={() => {}} />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Command className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">4</span>
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">4</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            You can browse our prompt library or return to the homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Prompts
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">QUICK LINKS</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/categories" className="text-sm text-primary hover:text-blue-700">Categories</Link>
              <Link to="/tags" className="text-sm text-primary hover:text-blue-700">Tags</Link>
              <Link to="/admin" className="text-sm text-primary hover:text-blue-700">Admin</Link>
              <Link to="/login" className="text-sm text-primary hover:text-blue-700">Login</Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;