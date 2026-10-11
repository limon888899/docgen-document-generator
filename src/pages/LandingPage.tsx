import { FileText, ArrowRight, Zap, Download, LayoutGrid, ShieldCheck } from 'lucide-react';
import type { Page } from '@/App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">DocGen</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('login')} className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors">Sign In</button>
            <button onClick={() => onNavigate('login')} className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors">Get Started</button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">6 professional templates ready to use</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">Generate professional documents in seconds</h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">Fill in the form, pick a template, and download polished PDF or image documents. No design skills needed — just enter your information and generate.</p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => onNavigate('login')} className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 flex items-center gap-2">Start Generating<ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" /></button>
            <button onClick={() => onNavigate('login')} className="bg-white hover:bg-slate-50 text-slate-900 font-semibold px-7 py-3.5 rounded-xl transition-all border border-slate-300 shadow-sm">Browse Templates</button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<LayoutGrid className="w-6 h-6" />} title="Multiple Templates" description="Choose from 6 document types — applications, offer letters, visas, medical reports and more." color="from-blue-500 to-blue-600" />
            <FeatureCard icon={<Zap className="w-6 h-6" />} title="Instant Generation" description="Fill out a simple form and your data auto-populates into a polished, professional layout." color="from-emerald-500 to-emerald-600" />
            <FeatureCard icon={<Download className="w-6 h-6" />} title="PDF & Image Export" description="Download your generated document as a high-quality PDF or PNG image with one click." color="from-amber-500 to-amber-600" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">How it works</h2>
          <p className="text-slate-600 text-center mb-14">Three simple steps from data to document</p>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard step="1" title="Pick a template" description="Browse the gallery and select the document type that fits your needs." />
            <StepCard step="2" title="Fill the form" description="Enter your information into the form fields tailored to that template." />
            <StepCard step="3" title="Download" description="Generate and export your document as PDF or image instantly." />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to create your first document?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">Sign in to start generating professional documents with ease.</p>
            <button onClick={() => onNavigate('login')} className="bg-white hover:bg-slate-100 text-slate-900 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg inline-flex items-center gap-2">Get Started Free<ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center"><FileText className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-slate-900">DocGen</span>
          </div>
          <p className="text-sm text-slate-500">Professional document generator</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <div className="group p-7 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all bg-white">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mx-auto mb-5 shadow-sm"><span className="text-xl font-bold text-slate-900">{step}</span></div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
