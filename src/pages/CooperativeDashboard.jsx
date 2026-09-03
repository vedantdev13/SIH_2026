import React, { useState } from 'react';
import { LABOUR_COOPERATIVES, WORKERS, INITIAL_BOOKINGS } from '../data/mockData';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  ShieldCheck, 
  Search, 
  UserPlus, 
  TrendingUp, 
  HeartHandshake, 
  Filter, 
  ArrowUpRight,
  Phone
} from 'lucide-react';

export default function CooperativeDashboard({ bookings = INITIAL_BOOKINGS }) {
  const [selectedCoopId, setSelectedCoopId] = useState('ngp-plumb-coop');
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'workers', 'welfare'

  const activeCoop = LABOUR_COOPERATIVES.find(c => c.id === selectedCoopId) || LABOUR_COOPERATIVES[0];
  const coopWorkers = WORKERS.filter(w => w.cooperativeId === selectedCoopId || selectedCoopId === 'ngp-multi-coop');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* COOPERATIVE SELECTOR HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold">
              <Building2 className="w-4 h-4 text-emerald-400" />
              LABOUR COOPERATIVE MANAGEMENT PORTAL
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">{activeCoop.name}</h1>
            <p className="text-sm text-slate-300 flex flex-wrap items-center gap-4">
              <span>Registration No: <strong className="text-emerald-400 font-mono">{activeCoop.regNo}</strong></span>
              <span>•</span>
              <span>Zone: <strong className="text-white">{activeCoop.zone}</strong></span>
              <span>•</span>
              <span>President: <strong className="text-white">{activeCoop.president}</strong></span>
            </p>
          </div>

          {/* Switch Cooperative Dropdown */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1.5 shrink-0">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Switch Cooperative Federation
            </label>
            <select
              value={selectedCoopId}
              onChange={(e) => setSelectedCoopId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-emerald-300 font-bold text-sm rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {LABOUR_COOPERATIVES.map(coop => (
                <option key={coop.id} value={coop.id}>
                  {coop.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* METRICS CARDS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700/80">
          
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block font-medium">Registered Member Workers</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-extrabold text-white">{activeCoop.memberCount}</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block font-medium">Active Bookings Queue</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-extrabold text-emerald-400">{bookings.length}</span>
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block font-medium">Co-op Welfare Pool</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-extrabold text-amber-400">{activeCoop.welfareFund}</span>
              <HeartHandshake className="w-5 h-5 text-amber-400" />
            </div>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 block font-medium">Fair Wage Payout Rate</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-extrabold text-emerald-400">100%</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

        </div>
      </div>

      {/* DASHBOARD TABS */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" /> Live Booking Dispatches ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('workers')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'workers'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" /> Worker Roster & Allocation ({coopWorkers.length})
        </button>

        <button
          onClick={() => setActiveTab('welfare')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'welfare'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" /> Worker Welfare & Dividends
        </button>
      </div>

      {/* TAB CONTENT: BOOKINGS QUEUE */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Active Customer Dispatch Queue</h3>
            <span className="text-xs text-slate-500 font-semibold">Real-time sync enabled</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No active bookings currently in queue.</div>
            ) : (
              bookings.map((booking, idx) => (
                <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                  
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                        {booking.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {booking.serviceName}
                      </span>
                      <span className="text-[11px] text-slate-400">{booking.createdAt}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">
                      Customer: {booking.customerName} ({booking.customerPhone})
                    </h4>
                    <p className="text-xs text-slate-600">
                      📍 <strong>Address:</strong> {booking.address}
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      "{booking.problem}"
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={booking.workerPhoto} className="w-10 h-10 rounded-xl object-cover border" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Assigned Worker</span>
                        <span className="text-sm font-bold text-slate-800">{booking.workerName}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block text-center">
                        {booking.status}
                      </span>
                      <span className="text-xs font-bold text-slate-800 block text-right">
                        Fee: {booking.amount}
                      </span>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: WORKER ROSTER */}
      {activeTab === 'workers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Cooperative Member Roster</h3>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
              <UserPlus className="w-4 h-4" /> Register New Worker Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coopWorkers.map(w => (
              <div key={w.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <img src={w.photo} alt={w.name} className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{w.name}</h4>
                    <p className="text-xs text-emerald-700 font-semibold">{w.skill} • {w.experience}</p>
                    <span className="text-[11px] text-slate-500">ID: {w.id}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Completed Jobs:</span>
                    <strong className="text-slate-800">{w.completedJobs}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Rating:</span>
                    <strong className="text-amber-500">★ {w.rating}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Status:</span>
                    <strong className="text-emerald-700">{w.availability}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-emerald-800">✓ Verified Co-op ID</span>
                  <span className="font-bold text-slate-800">{w.approxPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: WELFARE & DIVIDENDS */}
      {activeTab === 'welfare' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Cooperative Social Security & Dividend Fund</h3>
            <p className="text-sm text-slate-600 mt-1">
              Unlike private aggregators, KaamSetu allocates platform surplus to worker health policies and annual member dividends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Health & Accident Policy</span>
              <p className="text-2xl font-extrabold text-emerald-900">₹3,00,000</p>
              <p className="text-xs text-emerald-700">Cover per cooperative worker member</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Annual Dividend Surplus</span>
              <p className="text-2xl font-extrabold text-amber-900">₹1,50,000</p>
              <p className="text-xs text-amber-700">Pool to be distributed at AGM</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Skill Upgrade Guild Grants</span>
              <p className="text-2xl font-extrabold text-slate-900">₹85,000</p>
              <p className="text-xs text-slate-600">Tool kit & equipment subsidies</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
