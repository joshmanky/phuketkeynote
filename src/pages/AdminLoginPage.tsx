// Admin login page with simple password protection
import { useState } from 'react';
import { Shield, ArrowLeft, Lock } from 'lucide-react';

const ADMIN_PASSWORD = 'admin123';

interface Props {
  onLogin: () => void;
  onBack: () => void;
}

export function AdminLoginPage({ onLogin, onBack }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setError('Bitte Passwort eingeben');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true');
        onLogin();
      } else {
        setError('Falsches Passwort');
        setLoading(false);
        setPassword('');
      }
    }, 400);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gradient-bg-ocean relative overflow-hidden">
      <div className="ambient-glow w-[400px] h-[400px] bg-teal-500/8 top-0 right-0" />

      <div className="relative z-10 w-full max-w-sm mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/30 text-sm hover:text-white/60 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Zurueck
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/25 mb-4">
            <Shield size={24} className="text-teal-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Admin Login</h1>
          <p className="text-white/30 text-sm">Presenter-Zugang</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="glass-card-strong rounded-2xl p-6 space-y-4">
            <label className="block">
              <span className="text-white/60 text-sm font-medium block mb-2">Passwort</span>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Passwort eingeben"
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/20 transition-all"
                  autoFocus
                  disabled={loading}
                />
              </div>
            </label>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 text-teal-400 font-semibold text-sm rounded-xl py-3 transition-all disabled:opacity-30"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
              ) : (
                'Einloggen'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
