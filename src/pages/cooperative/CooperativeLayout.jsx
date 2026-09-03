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
  Menu, 
  X, 
  RefreshCw,
  Server
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-900 leading-tight">Cooperative Admin</h2>
            <p className="text-[10px] text-emerald-700 font-semibold">{activeCoop.name}</p>
          </div>
        </div>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION (Light KaamSetu Theme) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 shadow-sm
        ${sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 space-y-6">
          
          {/* Header Brand Badge */}
          <div className="hidden md:flex items-center gap-3 px-2 pt-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 bg-clip-text text-transparent">
                  Co-op Portal
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate">
                {activeCoop.name}
              </p>
            </div>
          </div>

          {/* Cooperative Switcher */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
              Active Cooperative
            </label>
            <select
              value={selectedCoopId}
              onChange={(e) => setSelectedCoopId(e.target.value)}
              className="w-full bg-white border border-slate-300 text-emerald-800 font-bold text-xs rounded-xl py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            >
              {LABOUR_COOPERATIVES.map(coop => (
                <option key={coop.id} value={coop.id}>
                  {coop.name}
                </option>
              ))}
            </select>
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
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100/80'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : item.highlight ? 'text-emerald-600' : item.aiBadge ? 'text-purple-600' : 'text-slate-400 group-hover:text-emerald-600'}`} />
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
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${isBackendLive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                <Server className="w-3 h-3" />
                {isBackendLive ? 'MongoDB Live' : 'Mock Fallback'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              {isBackendLive ? 'REST API connected' : 'Local storage mock active'}
            </p>
          </div>

          <div className="text-[10px] text-slate-500 text-center font-medium">
            KaamSetu Co-op Platform v1.2
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{currentTabName}</h1>
              <span className="bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Co-op Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Managing <strong className="text-slate-800">{activeCoop.name}</strong> • Zone: {activeCoop.zone}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500">Reg No:</span>
              <span className="font-mono text-emerald-700 font-bold">{activeCoop.regNo}</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500">President:</span>
              <span className="text-slate-900 font-bold">{activeCoop.president}</span>
            </div>

            <button 
              onClick={() => checkBackendHealth().then(res => setIsBackendLive(!!res))}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-slate-200 transition-colors shadow-sm"
              title="Refresh API Connection"
            >
              <RefreshCw className="w-4 h-4 text-emerald-600" />
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

    </div>
  );
}
