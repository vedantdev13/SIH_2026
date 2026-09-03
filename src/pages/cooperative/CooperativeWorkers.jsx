import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Award, 
  HeartHandshake, 
  Briefcase, 
  Phone, 
  MapPin, 
  UserPlus,
  Clock,
  Eye,
  RefreshCw
} from 'lucide-react';
import { updateWorkerApi } from '../../api/apiClient';

export default function CooperativeWorkers({ workers = [], setWorkers, activeCoop, bookings = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [selectedWorkerProfile, setSelectedWorkerProfile] = useState(null);

  const skillsList = ['All', 'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Cleaner', 'Driver', 'Gardener', 'Technician'];

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          w.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.locality?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkillFilter === 'All' || w.skill === selectedSkillFilter;
    return matchesSearch && matchesSkill;
  });

  const toggleAvailability = async (workerId, currentAvailability) => {
    const nextAvailability = currentAvailability === 'Available Now' ? 'On Assignment' : 'Available Now';
    const updatedWorker = await updateWorkerApi(workerId, { availability: nextAvailability });
    if (updatedWorker) {
      setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, availability: nextAvailability } : w));
    } else {
      setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, availability: nextAvailability } : w));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Cooperative Worker Roster</h2>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              {filteredWorkers.length} Members Registered
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Every worker is a verified member-owner of <strong className="text-slate-200">{activeCoop?.name || 'Nagpur Cooperative'}</strong>.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search worker by name or locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64"
            />
          </div>

          <select
            value={selectedSkillFilter}
            onChange={(e) => setSelectedSkillFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {skillsList.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      {/* WORKERS TABLE / GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map(w => (
          <div 
            key={w.id} 
            className="bg-slate-950 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div className="space-y-4">
              
              {/* Header card info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={w.photo} 
                    alt={w.name} 
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-md"
                  />
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-snug">{w.name}</h3>
                    <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      {w.skill} • {w.experience}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">ID: {w.id}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleAvailability(w.id, w.availability)}
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
                    w.availability === 'Available Now'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Click to toggle availability"
                >
                  {w.availability}
                </button>
              </div>

              {/* Badges & metrics */}
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Rating:</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {w.rating} ({w.reviewsCount || 45})
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Completed Jobs:</span>
                  <span className="font-bold text-white">{w.completedJobs} jobs</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Standard Rate:</span>
                  <span className="font-bold text-emerald-400">{w.approxPrice}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800">
                  <span>Locality:</span>
                  <span className="font-semibold text-slate-300 truncate max-w-[140px]">{w.locality || 'Nagpur'}</span>
                </div>
              </div>

              {/* Cooperative badge tag */}
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-xl text-[11px] text-emerald-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {w.badge || 'Verified Co-op Member'}
                </span>
                <span className="text-[10px] text-slate-400">Cooperative</span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedWorkerProfile(w)}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-400" /> View Profile
              </button>
              
              <button
                onClick={() => toggleAvailability(w.id, w.availability)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-1"
                title="Toggle availability"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Toggle
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* WORKER PROFILE DETAILED MODAL */}
      {selectedWorkerProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedWorkerProfile.photo} 
                  alt={selectedWorkerProfile.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-xl">{selectedWorkerProfile.name}</h3>
                    <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      VERIFIED CO-OP
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-bold">
                    {selectedWorkerProfile.skill} • {selectedWorkerProfile.experience} Experience
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    📍 {selectedWorkerProfile.locality || 'Nagpur Central'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedWorkerProfile(null)}
                className="text-slate-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Cooperative Membership</span>
                <p className="text-sm font-extrabold text-white">{selectedWorkerProfile.cooperativeName || activeCoop?.name}</p>
                <p className="text-xs text-emerald-400 font-medium">Status: Active Equity Shareholder</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Current Availability</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-emerald-400">{selectedWorkerProfile.availability}</span>
                  <button
                    onClick={() => {
                      toggleAvailability(selectedWorkerProfile.id, selectedWorkerProfile.availability);
                      setSelectedWorkerProfile(prev => ({ ...prev, availability: prev.availability === 'Available Now' ? 'On Assignment' : 'Available Now' }));
                    }}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white font-bold px-2.5 py-1 rounded-lg border border-slate-700"
                  >
                    Change Status
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Insurance Status</span>
                <p className="text-xs text-slate-200 font-semibold">{selectedWorkerProfile.welfareStatus || 'Covered under State Cooperative Medical & Life Insurance'}</p>
                <span className="text-[10px] text-emerald-400 font-bold block">✓ Premium Fully Paid by Co-op</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Track Record & Rating</span>
                <p className="text-sm font-extrabold text-white flex items-center gap-2">
                  <span className="text-amber-400">★ {selectedWorkerProfile.rating}</span>
                  <span className="text-slate-400 text-xs">({selectedWorkerProfile.completedJobs} Jobs Completed)</span>
                </p>
                <p className="text-xs text-slate-400">Visit Fee: <strong className="text-emerald-400">{selectedWorkerProfile.approxPrice}</strong></p>
              </div>

            </div>

            {/* About / Bio */}
            {selectedWorkerProfile.about && (
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bio & Skill Summary</span>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{selectedWorkerProfile.about}"
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedWorkerProfile(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
