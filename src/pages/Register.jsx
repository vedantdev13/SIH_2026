import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, ShieldCheck, ArrowRight, Building2, UserCheck, CheckCircle2 } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('customer'); // 'customer', 'worker', 'cooperative'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [coopName, setCoopName] = useState('');
  const [tradeSkill, setTradeSkill] = useState('Plumber');

  const handleRegister = (e) => {
    e.preventDefault();
    if (accountType === 'cooperative') {
      navigate('/cooperative');
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Join Sahakaar Network</h1>
          <p className="text-xs text-slate-500">Register as a customer, worker, or Labour Cooperative Society</p>
        </div>

        {/* Account Type Selection Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAccountType('customer')}
            className={`py-2.5 rounded-xl transition-all ${
              accountType === 'customer' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setAccountType('worker')}
            className={`py-2.5 rounded-xl transition-all ${
              accountType === 'worker' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            Worker Member
          </button>
          <button
            type="button"
            onClick={() => setAccountType('cooperative')}
            className={`py-2.5 rounded-xl transition-all ${
              accountType === 'cooperative' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
            }`}
          >
            Cooperative Society
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {accountType === 'cooperative' ? 'Cooperative Society Name' : 'Full Name'}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={accountType === 'cooperative' ? 'e.g. Nagpur Plumbing Labour Cooperative' : 'e.g. Ramesh Kumar'}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {accountType === 'worker' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Skill / Trade</label>
                <select
                  value={tradeSkill}
                  onChange={(e) => setTradeSkill(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                >
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Driver">Driver</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Affiliated Labour Cooperative</label>
                <input
                  type="text"
                  value={coopName}
                  onChange={(e) => setCoopName(e.target.value)}
                  placeholder="e.g. Nagpur Plumbing Labour Co-op (or leave empty for assignment)"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>
            </>
          )}

          {accountType === 'cooperative' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">State Cooperative Registration Number</label>
              <input
                type="text"
                required
                placeholder="e.g. NGP/COP/2022/104"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
              />
            </div>
          )}

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Registration includes skill verification and cooperative membership approval</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Log in here
          </Link>
        </div>

      </div>
    </div>
  );
}
