import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Wrench, 
  IndianRupee, 
  HeartHandshake, 
  BrainCircuit, 
  Building2, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X, 
  RefreshCw,
  Server,
  Home,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { LABOUR_COOPERATIVES } from '../../data/mockData';
import { checkBackendHealth } from '../../api/apiClient';

import CooperativeOverview from './CooperativeOverview';
import CooperativeWorkers from './CooperativeWorkers';
import CooperativeBookings from './CooperativeBookings';
import CooperativeServices from './CooperativeServices';
import CooperativeEarnings from './CooperativeEarnings';
import CooperativeWelfare from './CooperativeWelfare';
import AIDemandForecast from './AIDemandForecast';

export default function CooperativeLayout({ bookings = [], workers = [], setWorkers, setBookings, services = [], setServices }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCoopId, setSelectedCoopId] = useState('ngp-plumb-coop');
  const [isBackendLive, setIsBackendLive] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [societyPresident, setSocietyPresident] = useState('Shri Rajesh Sharma');
  const [welfareReserve, setWelfareReserve] = useState('₹14,50,000');

  const activeCoop = LABOUR_COOPERATIVES.find(c => c.id === selectedCoopId) || LABOUR_COOPERATIVES[0];

  useEffect(() => {
    checkBackendHealth().then(res => {
      setIsBackendLive(!!res);
    });
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/cooperative/dashboard', icon: LayoutDashboard },
    { name: 'Workers', path: '/cooperative/workers', icon: Users, badge: workers.length },
    { name: 'Bookings', path: '/cooperative/bookings', icon: CalendarCheck, badge: bookings.length },
    { name: 'Services', path: '/cooperative/services', icon: Wrench },
    { name: 'Earnings', path: '/cooperative/earnings', icon: IndianRupee },
    { name: 'Worker Welfare', path: '/cooperative/welfare', icon: HeartHandshake, highlight: true },
    { name: 'AI Demand Forecast', path: '/cooperative/ai-demand', icon: BrainCircuit, aiBadge: true }
  ];

  const currentTabName = navItems.find(item => location.pathname === item.path || (location.pathname === '/cooperative' && item.path === '/cooperative/dashboard'))?.name || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      
      {/* MOBILE SIDEBAR TOGGLE HEADER */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-16 z-30 shadow-sm">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#3378BC] flex items-center justify-center text-white font-bold shadow-sm shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold text-sm text-slate-900 leading-tight">Cooperative Admin</h2>
            <p className="text-[10px] text-[#3378BC] font-semibold truncate">{activeCoop.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/"
            className="p-2 rounded-lg bg-sky-50 text-[#3378BC] hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-1"
            title="Back to Customer Site"
          >
            <Home className="w-4 h-4" />
          </Link>

          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 shadow-sm
        ${sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 space-y-5">
          
          {/* Header Brand Badge (with proper flex bounds to prevent overflow) */}
          <div className="hidden md:flex items-center gap-3 px-2 pt-2 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3378BC] to-sky-500 flex items-center justify-center text-white shadow-md shadow-[#3378BC]/20 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-blue-900 via-[#3378BC] to-slate-900 bg-clip-text text-transparent truncate">
                  Co-op Portal
                </span>
                <span className="bg-sky-100 text-[#3378BC] text-[10px] font-bold px-1.5 py-0.5 rounded border border-sky-200 shrink-0">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate" title={activeCoop.name}>
                {activeCoop.name}
              </p>
            </div>
          </div>

          {/* Back to Homepage Button in Sidebar */}
          <div className="px-1">
            <Link
              to="/"
              className="w-full bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-[#3378BC] border border-slate-200 hover:border-sky-300 text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-[#3378BC] transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Main Homepage</span>
            </Link>
          </div>

          {/* Premium Dropdown Menu for Switching Cooperative */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
              Active Cooperative
            </label>
            <div className="relative">
              <select
                value={selectedCoopId}
                onChange={(e) => setSelectedCoopId(e.target.value)}
                className="w-full bg-white border border-slate-300 text-blue-950 font-bold text-xs rounded-xl py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#3378BC] focus:border-[#3378BC] shadow-sm cursor-pointer hover:border-sky-400 transition-colors truncate"
              >
                {LABOUR_COOPERATIVES.map(coop => (
                  <option key={coop.id} value={coop.id}>
                    {coop.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#3378BC] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Management Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path || (location.pathname === '/cooperative' && item.path === '/cooperative/dashboard');
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all group
                    ${active 
                      ? 'bg-[#3378BC] text-white shadow-sm' 
                      : 'text-slate-600 hover:text-[#3378BC] hover:bg-slate-100/80'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : item.highlight ? 'text-[#3378BC]' : item.aiBadge ? 'text-purple-600' : 'text-slate-400 group-hover:text-[#3378BC]'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.aiBadge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>
                      AI PRO
                    </span>
                  )}
                  {item.highlight && !active && (
                    <span className="w-2 h-2 rounded-full bg-[#3378BC] animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-200 space-y-3 bg-slate-50/50">
          <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700">Backend API</span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${isBackendLive ? 'bg-sky-100 text-[#3378BC] border border-sky-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                <Server className="w-3 h-3" />
                {isBackendLive ? 'MongoDB Live' : 'Mock Fallback'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              {isBackendLive ? 'REST API connected' : 'Local storage mock active'}
            </p>
          </div>

          <div className="text-[10px] text-slate-500 text-center font-medium">
            Sahakaar Co-op Platform v1.2
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm backdrop-blur-md">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{currentTabName}</h1>
              <span className="bg-sky-100 border border-sky-200 text-[#3378BC] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3378BC]" /> Verified Co-op Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Managing <strong className="text-slate-800">{activeCoop.name}</strong> • Zone: {activeCoop.zone}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* PROMINENT BACK TO HOMEPAGE BUTTON IN TOP HEADER */}
            <Link
              to="/"
              className="bg-[#3378BC] hover:bg-[#28639d] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-sky-100" />
              <span>Back to Customer Homepage</span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500">Reg No:</span>
              <span className="font-mono text-[#3378BC] font-bold">{activeCoop.regNo}</span>
            </div>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 border border-slate-200 transition-all shadow-sm"
              title="Cooperative Society Settings"
            >
              <Settings className="w-4 h-4 text-[#3378BC]" />
              <span className="hidden sm:inline">Society Profile</span>
            </button>

            <button 
              onClick={() => checkBackendHealth().then(res => setIsBackendLive(!!res))}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#3378BC] hover:bg-slate-200 transition-colors shadow-sm"
              title="Refresh API Connection"
            >
              <RefreshCw className="w-4 h-4 text-[#3378BC]" />
            </button>
          </div>
        </header>

        {/* NESTED CONTENT VIEW */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/cooperative/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <CooperativeOverview 
                  bookings={bookings} 
                  workers={workers} 
                  setBookings={setBookings}
                  setWorkers={setWorkers}
                  activeCoop={activeCoop}
                />
              } 
            />
            <Route 
              path="/workers" 
              element={
                <CooperativeWorkers 
                  workers={workers} 
                  setWorkers={setWorkers}
                  bookings={bookings}
                  activeCoop={activeCoop}
                />
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <CooperativeBookings 
                  bookings={bookings} 
                  setBookings={setBookings}
                  workers={workers}
                />
              } 
            />
            <Route 
              path="/services" 
              element={
                <CooperativeServices 
                  services={services}
                  setServices={setServices}
                  workers={workers}
                />
              } 
            />
            <Route 
              path="/earnings" 
              element={
                <CooperativeEarnings 
                  bookings={bookings}
                  activeCoop={activeCoop}
                />
              } 
            />
            <Route 
              path="/welfare" 
              element={
                <CooperativeWelfare 
                  workers={workers}
                  activeCoop={activeCoop}
                />
              } 
            />
            <Route 
              path="/ai-demand" 
              element={
                <AIDemandForecast 
                  bookings={bookings}
                  workers={workers}
                  services={services}
                />
              } 
            />
          </Routes>
        </div>

      </main>

      {/* SOCIETY PROFILE & SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#3378BC]" />
                <h3 className="font-extrabold text-slate-900 text-lg">Cooperative Society Profile & Settings</h3>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registered Society Name</span>
                <p className="text-base font-extrabold text-slate-900">{activeCoop.name}</p>
                <span className="text-[#3378BC] font-bold">State Registration Code: {activeCoop.regNo}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider block">Elected President</label>
                  <input
                    type="text"
                    value={societyPresident}
                    onChange={(e) => setSocietyPresident(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider block">Welfare Reserve Pool</label>
                  <input
                    type="text"
                    value={welfareReserve}
                    onChange={(e) => setWelfareReserve(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-[#3378BC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium block">Headquarters Zone</span>
                  <span className="font-extrabold text-slate-900">{activeCoop.district || 'Nagpur Central'}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium block">Active Members</span>
                  <span className="font-extrabold text-[#3378BC]">{workers.length} Verified Tradespeople</span>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 text-blue-900 p-3.5 rounded-2xl space-y-1">
                <span className="font-bold block">✓ Government Cooperative Registrar Audit Status</span>
                <p className="text-[11px] text-blue-800">
                  Fully compliant under Maharashtra Cooperative Societies Act 1960. Next statutory AGM audit scheduled Q4 2026.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="bg-[#3378BC] hover:bg-[#28639d] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
              >
                Save Settings & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
