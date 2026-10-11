import { useState } from 'react';
import { FileText, Mail, Lock, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { Page } from '@/App';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = mode === 'signin' ? await signIn(email, password) : await signUp(email, password);
    setLoading(false);
    if (result.error) { setError(result.error); } else if (mode === 'signup') { setError('Account created! Please sign in with your credentials.'); setMode('signin'); }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center"><FileText className="w-6 h-6 text-white" /></div>
            <span className="font-bold text-xl">DocGen</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-6">Create professional documents effortlessly</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">Join DocGen to generate, manage, and download polished documents from customizable templates.</p>
          <div className="space-y-4">
            {['6 professional templates', 'Auto-filled document layouts', 'PDF & image export'].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0"><div className="w-2 h-2 rounded-full bg-blue-400" /></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 bg-slate-50">
        <div className="w-full max-w-md">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-8 transition-colors"><ArrowLeft className="w-4 h-4" />Back to home</button>
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center"><FileText className="w-5 h-5 text-white" /></div>
            <span className="font-bold text-slate-900 text-lg">DocGen</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
          <p className="text-slate-500 mb-8">{mode === 'signin' ? 'Sign in to access your document generator' : 'Sign up to start generating documents'}</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
            </div>
            {error && (
              <div className={`flex items-start gap-2 p-3 rounded-lg text-sm ${error.includes('Account created') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{error}</span>
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">{loading && <Loader2 className="w-5 h-5 animate-spin" />}{mode === 'signin' ? 'Sign In' : 'Create Account'}</button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-500">
            {mode === 'signin' ? (<>{"Don't have an account? "}<button onClick={() => { setMode('signup'); setError(null); }} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Sign up</button></>) : (<>Already have an account? <button onClick={() => { setMode('signin'); setError(null); }} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Sign in</button></>)}
          </div>
        </div>
      </div>
    </div>
  );
}
