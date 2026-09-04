import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  Briefcase, 
  UserCheck, 
  LogOut,
  User,
  Sparkles,
  Receipt,
  ChevronDown
} from 'lucide-react';
import { clearAuthSession } from '../api/auth';

export default function Navbar({ currentUser, setCurrentUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    clearAuthSession();
    if (setCurrentUser) setCurrentUser(null);
    setAccountMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner highlighting Cooperative Model */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-300" />
        <span>100% Cooperative-Owned Platform — Fair Wages & Verified Worker Welfare</span>
        <span className="hidden md:inline text-emerald-300">|</span>
        <span className="hidden md:inline-flex items-center gap-1 font-semibold text-emerald-200">
          <Sparkles className="w-3.5 h-3.5" /> SIH 2026 Innovation
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link to={currentUser?.role === 'worker' ? "/worker-dashboard" : "/"} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 bg-clip-text text-transparent">
                SAHAKAAR
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                {currentUser?.role === 'worker' ? 'WORKER' : 'CO-OP'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {currentUser?.role === 'worker' ? 'Member Worker Portal' : 'Local Workers. Trusted Services.'}
            </p>
          </div>
        </Link>



        {/* Action Buttons / User Session Profile with Dropdown */}
        <div className="hidden md:flex items-center gap-3 relative">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm transition-all text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight truncate max-w-[130px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block">
                    {currentUser.role === 'worker' ? 'Worker Member' : (currentUser.role || 'Member')}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${accountMenuOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {/* ACCOUNT DROPDOWN MENU */}
              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Signed in as</span>
                    <span className="text-xs font-extrabold text-slate-900 truncate block">{currentUser.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-600 uppercase block mt-0.5">
                      {currentUser.role === 'worker' ? 'Verified Worker Member' : 'Member'}
                    </span>
                  </div>

                  <div className="py-1">
                    {currentUser.role !== 'worker' && (
                      <Link
                        to="/my-bookings"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      >
                        <Receipt className="w-4 h-4 text-emerald-600" />
                        My Bookings & Receipts
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 py-2 transition-colors"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                Register / Join
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {currentUser && currentUser.role !== 'worker' && (
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200"
            >
              My Bookings & Receipts
            </Link>
          )}

          {currentUser?.role === 'worker' && (
            <Link
              to="/worker-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-bold text-emerald-800 bg-emerald-50 border border-emerald-200"
            >
              My Worker Dashboard
            </Link>
          )}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">{currentUser.name}</span>
                    <span className="text-xs text-emerald-700 uppercase font-bold">{currentUser.role || 'Member'}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold"
                >
                  Register / Join Cooperative
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
