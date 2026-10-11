import { FileText, LogOut, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { templates, iconMap, accentColors } from '@/templates/registry';
import { useAuth } from '@/context/AuthContext';
import type { Page } from '@/App';

interface GalleryPageProps {
  onNavigate: (page: Page) => void;
  onSelectTemplate: (key: string) => void;
}

export default function GalleryPage({ onNavigate, onSelectTemplate }: GalleryPageProps) {
  const { user, signOut } = useAuth();
  const [search, setSearch] = useState('');
  const filtered = templates.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));
  const handleSignOut = async () => { await signOut(); onNavigate('landing'); };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center"><FileText className="w-5 h-5 text-white" /></div>
            <span className="font-bold text-slate-900 text-lg">DocGen</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block">{user?.email}</span>
            <button onClick={handleSignOut} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"><LogOut className="w-4 h-4" />Sign Out</button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Choose a Template</h1>
          <p className="text-slate-500">Select a document type to start generating</p>
        </div>
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20"><p className="text-slate-400 text-lg">No templates found matching your search.</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => {
              const Icon = iconMap[template.icon];
              const colors = accentColors[template.accentColor];
              return (
                <button key={template.key} onClick={() => onSelectTemplate(template.key)} className="group text-left p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all relative overflow-hidden">
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 rounded-full blur-2xl transition-opacity`} />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><Icon className="w-6 h-6" /></div>
                    <div className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} mb-3`}>{template.category}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">{template.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{template.description}</p>
                    <div className={`flex items-center gap-1.5 text-sm font-medium ${colors.text} group-hover:gap-2.5 transition-all`}>Generate Document<ArrowRight className="w-4 h-4" /></div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
