import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PromptBrowsePage from './pages/PromptBrowsePage';
import PromptDetailPage from './pages/PromptDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import CategoriesPage from './pages/CategoriesPage';
import TagsPage from './pages/TagsPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PromptBrowsePage />} />
      <Route path="/prompts/:id" element={<PromptDetailPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/tags" element={<TagsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;