import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, FileImage, FileText as FileTextIcon, Loader2, Save, Eye, Pencil, Check } from 'lucide-react';
import { getTemplate, accentColors } from '@/templates/registry';
import { useAuth } from '@/context/AuthContext';
import { downloadAsPDF, downloadAsImage } from '@/lib/export';
import { supabase } from '@/lib/supabase';
import type { FormData } from '@/types/templates';
import type { Page } from '@/App';

interface GeneratorPageProps { templateKey: string; onNavigate: (page: Page) => void; }

export default function GeneratorPage({ templateKey, onNavigate }: GeneratorPageProps) {
  const { user } = useAuth();
  const template = getTemplate(templateKey);
  const previewRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [view, setView] = useState<'split' | 'form' | 'preview'>('split');
  const [exporting, setExporting] = useState<'pdf' | 'image' | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!template) return;
    const defaults: FormData = {};
    template.fieldGroups.forEach((group) => { group.fields.forEach((field) => { defaults[field.key] = field.defaultValue; }); });
    setFormData(defaults);
  }, [templateKey, template]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Template not found</p>
          <button onClick={() => onNavigate('gallery')} className="text-blue-600 font-medium hover:underline">Back to templates</button>
        </div>
      </div>
    );
  }

  const colors = accentColors[template.accentColor];
  const TemplateComponent = template.component;
  const handleFieldChange = (key: string, value: string) => { setFormData((prev) => ({ ...prev, [key]: value })); setSaved(false); };
  const handleDownloadPDF = async () => { if (!previewRef.current) return; setExporting('pdf'); try { await downloadAsPDF(previewRef.current, `${template.name.replace(/\s+/g, '_')}.pdf`); } catch (err) { console.error('PDF export failed:', err); } setExporting(null); };
  const handleDownloadImage = async () => { if (!previewRef.current) return; setExporting('image'); try { await downloadAsImage(previewRef.current, `${template.name.replace(/\s+/g, '_')}.png`); } catch (err) { console.error('Image export failed:', err); } setExporting(null); };
  const handleSave = async () => { if (!user) return; setSaving(true); try { const title = formData.documentTitle || template.name; await supabase.from('documents').insert({ template_key: template.key, title, form_data: formData }); setSaved(true); } catch (err) { console.error('Save failed:', err); } setSaving(false); };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate('gallery')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"><ArrowLeft className="w-4 h-4" />Templates</button>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              <button onClick={() => setView('form')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${view === 'form' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><Pencil className="w-4 h-4" />Form</button>
              <button onClick={() => setView('split')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${view === 'split' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Form + Preview</button>
              <button onClick={() => setView('preview')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${view === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><Eye className="w-4 h-4" />Preview</button>
            </div>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}<span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span></button>
            <button onClick={handleDownloadImage} disabled={exporting !== null} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all disabled:opacity-50">{exporting === 'image' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />}<span className="hidden sm:inline">Image</span></button>
            <button onClick={handleDownloadPDF} disabled={exporting !== null} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50 bg-gradient-to-r ${colors.gradient} hover:shadow-lg`}>{exporting === 'pdf' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileTextIcon className="w-4 h-4" />}<span className="hidden sm:inline">PDF</span></button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="md:hidden mb-6 flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button onClick={() => setView('form')} className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${view === 'form' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}><Pencil className="w-4 h-4" />Form</button>
          <button onClick={() => setView('preview')} className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${view === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}><Eye className="w-4 h-4" />Preview</button>
        </div>
        <div className={`grid gap-8 ${view === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {(view === 'form' || view === 'split') && (
            <div className={`${view === 'split' ? 'lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto' : ''}`}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="mb-6"><h2 className="text-xl font-bold text-slate-900">{template.name}</h2><p className="text-sm text-slate-500 mt-1">{template.description}</p></div>
                {template.fieldGroups.map((group) => (
                  <div key={group.title} className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">{group.title}</h3>
                    <div className="space-y-4">
                      {group.fields.map((field) => (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
                          {field.type === 'textarea' ? (
                            <textarea value={formData[field.key] ?? ''} onChange={(e) => handleFieldChange(field.key, e.target.value)} placeholder={field.placeholder} rows={3} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm" />
                          ) : (
                            <input type={field.type === 'date' ? 'text' : field.type} value={formData[field.key] ?? ''} onChange={(e) => handleFieldChange(field.key, e.target.value)} placeholder={field.placeholder} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-2 border-t border-slate-100">
                  <button onClick={handleDownloadPDF} disabled={exporting !== null} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 bg-gradient-to-r ${colors.gradient} hover:shadow-lg`}>{exporting === 'pdf' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}Download PDF</button>
                  <button onClick={handleDownloadImage} disabled={exporting !== null} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-all disabled:opacity-50">{exporting === 'image' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />}Download Image</button>
                </div>
              </div>
            </div>
          )}
          {(view === 'preview' || view === 'split') && (
            <div className={`${view === 'split' ? 'lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto' : ''}`}>
              <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-4"><Eye className="w-4 h-4 text-slate-400" /><span className="text-sm font-medium text-slate-500">Live Preview</span></div>
                <div ref={previewRef} className="bg-white rounded-lg overflow-hidden"><TemplateComponent {...formData} /></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
