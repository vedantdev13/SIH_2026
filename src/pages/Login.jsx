import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, ShieldCheck, ArrowRight, Building2, Lock, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { loginUserApi } from '../api/auth';

export default function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const result = await loginUserApi({
      identifier: phone,
      phone: phone,
      password: password,
      role: role
    });

    setLoading(false);

    if (result.success) {
      if (setCurrentUser) {
        setCurrentUser(result.data.user);
      }
      const userRole = result.data.user?.role || role;
      if (userRole === 'cooperative') {
        navigate('/cooperative');
      } else if (userRole === 'worker') {
        navigate('/worker-dashboard');
      } else {
        navigate('/services');
      }
    } else {
      setErrorMsg(result.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleQuickDemo = async (demoPhone, demoPass, demoRole) => {
    setPhone(demoPhone);
    setPassword(demoPass);
    setRole(demoRole);
    setLoading(true);
    
    const result = await loginUserApi({
      identifier: demoPhone,
      password: demoPass,
      role: demoRole
    });

    setLoading(false);

    if (result.success) {
      if (setCurrentUser) setCurrentUser(result.data.user);
      if (demoRole === 'cooperative') {
        navigate('/cooperative');
      } else if (demoRole === 'worker') {
        navigate('/worker-dashboard');
      } else {
        navigate('/services');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#3378BC] text-white flex items-center justify-center mx-auto shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#111827]">Log in to Sahakaar</h1>
          <p className="text-xs text-slate-500">Access your cooperative account with JWT & MongoDB</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 rounded-lg transition-all ${
              role === 'customer' ? 'bg-white text-[#3378BC] shadow-sm' : 'text-slate-600'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('worker')}
            className={`py-2 rounded-lg transition-all ${
              role === 'worker' ? 'bg-white text-[#3378BC] shadow-sm' : 'text-slate-600'
            }`}
          >
            Worker
          </button>
          <button
            type="button"
            onClick={() => setRole('cooperative')}
            className={`py-2 rounded-lg transition-all ${
              role === 'cooperative' ? 'bg-white text-[#3378BC] shadow-sm' : 'text-slate-600'
            }`}
          >
            Cooperative
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

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
                placeholder="Enter mobile number or email..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20 focus:border-[#3378BC]"
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20 focus:border-[#3378BC]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#3378BC] hover:bg-[#28639d] disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
              </>
            ) : (
              <>
                Log in as {role.toUpperCase()} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Preset Buttons */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Quick Demo Auto-Login (JWT)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo('9823011223', 'demo123', 'customer')}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 text-center"
            >
              Demo Customer
            </button>
            <button
              onClick={() => handleQuickDemo('9422100998', 'coop123', 'cooperative')}
              className="px-3 py-2 bg-[#3378BC]/10 hover:bg-[#3378BC]/20 border border-[#3378BC]/30 rounded-xl text-xs font-bold text-[#3378BC] text-center"
            >
              Demo Co-op Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#3378BC] hover:underline">
            Register / Join Cooperative
          </Link>
        </div>

      </div>
    </div>
  );
}
