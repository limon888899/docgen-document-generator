import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import GalleryPage from '@/pages/GalleryPage';
import GeneratorPage from '@/pages/GeneratorPage';

export type Page = 'landing' | 'login' | 'gallery' | 'generator';

function AppContent() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState<Page>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const navigate = (target: Page) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  const selectTemplate = (key: string) => {
    setSelectedTemplate(key);
    navigate('generator');
  };

  useEffect(() => {
    if (loading) return;
    if (page === 'gallery' && !user) navigate('login');
    if (page === 'generator' && !user) navigate('login');
    if (page === 'login' && user) navigate('gallery');
  }, [user, loading, page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-3 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (page === 'landing') return <LandingPage onNavigate={navigate} />;
  if (page === 'login') return <LoginPage onNavigate={navigate} />;
  if (page === 'gallery') return <GalleryPage onNavigate={navigate} onSelectTemplate={selectTemplate} />;
  if (page === 'generator') return <GeneratorPage templateKey={selectedTemplate} onNavigate={navigate} />;

  return <LandingPage onNavigate={navigate} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
