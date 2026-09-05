import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Menu, 
  X, 
  Briefcase, 
  UserCheck, 
  LogOut,
  User,
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link to={currentUser?.role === 'worker' ? "/worker-dashboard" : "/"} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#3378BC] text-white flex items-center justify-center shadow-md shadow-[#3378BC]/20 group-hover:bg-[#28639d] transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-[#111827] block leading-tight">
              SAHAKAAR
            </span>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {currentUser?.role === 'worker' ? 'Member Worker Portal' : 'Local Skilled Workers. Trusted Services.'}
            </p>
          </div>
        </Link>

        {/* Action Buttons / User Session Profile with Dropdown */}
        <div className="hidden md:flex items-center gap-3 relative">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20"
              >
                <div className="w-8 h-8 rounded-xl bg-[#3378BC] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#111827] block leading-tight truncate max-w-[130px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#3378BC] uppercase tracking-wider block">
                    {currentUser.role === 'worker' ? 'Worker Member' : (currentUser.role || 'Member')}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${accountMenuOpen ? 'rotate-180 text-[#3378BC]' : ''}`} />
              </button>

              {/* ACCOUNT DROPDOWN MENU */}
              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Signed in as</span>
                    <span className="text-xs font-extrabold text-[#111827] truncate block">{currentUser.name}</span>
                    <span className="text-[10px] font-semibold text-[#3378BC] uppercase block mt-0.5">
                      {currentUser.role === 'worker' ? 'Verified Worker Member' : 'Member'}
                    </span>
                  </div>

                  <div className="py-1">
                    {currentUser.role !== 'worker' && (
                      <Link
                        to="/my-bookings"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-[#3378BC]/10 hover:text-[#3378BC] transition-colors"
                      >
                        <Receipt className="w-4 h-4 text-[#3378BC]" />
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
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-bold text-[#111827] hover:text-[#3378BC] px-2.5 sm:px-3.5 py-2 transition-colors whitespace-nowrap shrink-0"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="bg-[#3378BC] hover:bg-[#28639d] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>Register / Join</span>
              </Link>
            </div>
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
              className="block px-3 py-2 rounded-lg text-base font-bold text-[#3378BC] bg-[#3378BC]/10 border border-[#3378BC]/20"
            >
              My Worker Dashboard
            </Link>
          )}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#3378BC]" />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">{currentUser.name}</span>
                    <span className="text-xs text-[#3378BC] uppercase font-bold">{currentUser.role || 'Member'}</span>
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
                  className="w-full text-center px-4 py-2 border border-slate-300 rounded-lg font-bold text-slate-700"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 bg-[#3378BC] text-white rounded-lg font-bold"
                >
                  Register / Join Platform
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
