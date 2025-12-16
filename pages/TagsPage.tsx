import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MOCK_PROMPTS } from '../constants';
import { Tag as TagIcon, Hash, ArrowRight } from 'lucide-react';

const TagsPage: React.FC = () => {
  // Extract all unique tags from mock prompts
  const allTags = Array.from(
    new Set(MOCK_PROMPTS.flatMap(prompt => prompt.tags || []))
  ).sort();

  // Group tags by first letter for organization
  const tagsByLetter = allTags.reduce((acc, tag) => {
    const firstLetter = tag.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(tag);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      <Header onCreateClick={() => {}} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tags</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Browse prompts by tags. Tags help you find specific topics and technologies.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <TagIcon className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {allTags.length} tags available
            </span>
          </div>
        </div>

        {/* Popular tags */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 15).map((tag) => (
              <Link
                key={tag}
                to={`/?search=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
              >
                <Hash className="w-3 h-3 mr-2 text-slate-400 group-hover:text-primary" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tag}</span>
                <span className="ml-2 text-xs text-slate-400">
                  {MOCK_PROMPTS.filter(p => p.tags?.includes(tag)).length}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* All tags organized by letter */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">All Tags</h2>
          
          {Object.keys(tagsByLetter).sort().map((letter) => (
            <div key={letter} className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-lg mr-3">
                  {letter}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tags starting with "{letter}"</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 ml-11">
                {tagsByLetter[letter].map((tag) => (
                  <Link
                    key={tag}
                    to={`/?search=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
                  >
                    <TagIcon className="w-3 h-3 mr-1.5 text-slate-400" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to all prompts
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TagsPage;