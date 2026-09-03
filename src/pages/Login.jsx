import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, ShieldCheck, ArrowRight, Building2, Lock, Phone } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'cooperative') {
      navigate('/cooperative');
    } else if (role === 'worker') {
      navigate('/services');
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Log in to KaamSetu</h1>
          <p className="text-xs text-slate-500">Access your cooperative account or book verified workers</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 rounded-lg transition-all ${
              role === 'customer' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('worker')}
            className={`py-2 rounded-lg transition-all ${
              role === 'worker' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            Worker
          </button>
          <button
            type="button"
            onClick={() => setRole('cooperative')}
            className={`py-2 rounded-lg transition-all ${
              role === 'cooperative' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            Cooperative
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Number / Email</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit mobile number..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            Log in as {role.toUpperCase()} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Login Preset Buttons */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Quick Demo Auto-Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setPhone('9823011223'); setPassword('demo123'); navigate('/services'); }}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 text-center"
            >
              Demo Customer
            </button>
            <button
              onClick={() => { setPhone('9422100998'); setPassword('coop123'); navigate('/cooperative'); }}
              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 text-center"
            >
              Demo Co-op Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-emerald-700 hover:underline">
            Register / Join Cooperative
          </Link>
        </div>

      </div>
    </div>
  );
}
