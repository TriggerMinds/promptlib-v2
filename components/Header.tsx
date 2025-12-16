import React from 'react';
import { Menu, Search, PlusCircle, Command, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onCreateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5 text-white">
              <Command className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Prompt<span className="text-primary">Lib</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium text-slate-900 hover:text-primary transition-colors border-b-2 border-primary pb-0.5">Prompts</Link>
            <Link to="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Categories</Link>
            <Link to="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Tags</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1">
                <LayoutDashboard className="w-3 h-3" />
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onCreateClick}
              className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Prompt</span>
            </button>

            {user ? (
               <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
                 <div className="flex flex-col items-end hidden md:block">
                   <span className="text-xs font-bold text-slate-700">{user.username}</span>
                   <span className="text-[10px] text-slate-400 uppercase">{user.role}</span>
                 </div>
                 <button 
                   onClick={logout}
                   className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                   title="Logout"
                 >
                   <LogOut className="w-5 h-5" />
                 </button>
               </div>
            ) : (
              <Link 
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;