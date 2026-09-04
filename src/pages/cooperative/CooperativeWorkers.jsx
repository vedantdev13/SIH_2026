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
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerPhone, setNewWorkerPhone] = useState('');
  const [newWorkerSkill, setNewWorkerSkill] = useState('Plumber');
  const [newWorkerExperience, setNewWorkerExperience] = useState('4 years');
  const [newWorkerPrice, setNewWorkerPrice] = useState('349');
  const [newWorkerLocality, setNewWorkerLocality] = useState('Sitabuldi, Nagpur');

  const handleRegisterWorker = (e) => {
    e.preventDefault();
    const newWorkerObj = {
      id: `w-${Date.now()}`,
      name: newWorkerName,
      phone: newWorkerPhone,
      photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
      skill: newWorkerSkill,
      experience: newWorkerExperience,
      rating: 4.9,
      reviewsCount: 1,
      completedJobs: 0,
      distance: 1.5,
      approxPrice: `₹${newWorkerPrice} per task`,
      hourlyRate: parseInt(newWorkerPrice) || 349,
      verified: true,
      cooperativeName: activeCoop?.name || 'Nagpur Labour Cooperative',
      cooperativeId: activeCoop?.id || 'ngp-plumb-coop',
      badge: 'Verified Cooperative Member',
      availability: 'Available Now',
      locality: newWorkerLocality,
      about: `${newWorkerSkill} specialist member registered with ${activeCoop?.name || 'Nagpur Labour Cooperative'}.`,
      welfareStatus: 'Covered under State Cooperative Medical & Life Insurance Policy'
    };

    if (setWorkers) {
      setWorkers(prev => [newWorkerObj, ...prev]);
    }
    setShowRegisterModal(false);
    setNewWorkerName('');
    setNewWorkerPhone('');
  };

  const skillsList = ['All', 'Plumber', 'Electrician', 'Carpenter', 'Painter', 'Cleaner', 'Driver', 'Gardener', 'Technician'];

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = (w.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (w.skill || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (w.locality || '').toLowerCase().includes(searchTerm.toLowerCase());
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
      
      {/* PAGE HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Cooperative Worker Roster</h2>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {filteredWorkers.length} Members Registered
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Every worker is a verified member-owner of <strong className="text-slate-800">{activeCoop?.name || 'Nagpur Cooperative'}</strong>.
          </p>
        </div>

        {/* Filter & Add controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search worker by name or locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64 shadow-sm"
            />
          </div>

          <select
            value={selectedSkillFilter}
            onChange={(e) => setSelectedSkillFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs text-emerald-800 font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          >
            {skillsList.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4" /> Register New Worker Member
          </button>
        </div>
      </div>

      {/* WORKERS TABLE / GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map(w => (
          <div 
            key={w.id} 
            className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-4">
              
              {/* Header card info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={w.photo} 
                    alt={w.name} 
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-sm"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">{w.name}</h3>
                    <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      {w.skill} • {w.experience}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {w.id}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleAvailability(w.id, w.availability)}
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
                    w.availability === 'Available Now'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                  title="Click to toggle availability"
                >
                  {w.availability}
                </button>
              </div>

              {/* Badges & metrics */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Rating:</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {w.rating} ({w.reviewsCount || 45})
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Completed Jobs:</span>
                  <span className="font-bold text-slate-900">{w.completedJobs} jobs</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Standard Rate:</span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 block">{w.approxPrice}</span>
                    <span className="text-[10px] text-slate-400 font-normal block">Price may vary by task</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-200">
                  <span>Locality:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[140px]">{w.locality || 'Nagpur'}</span>
                </div>
              </div>

              {/* Cooperative badge tag */}
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-[11px] text-emerald-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {w.badge || 'Verified Co-op Member'}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Cooperative</span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedWorkerProfile(w)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" /> View Profile
              </button>
              
              <button
                onClick={() => toggleAvailability(w.id, w.availability)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1"
                title="Toggle availability"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Toggle
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* WORKER PROFILE DETAILED MODAL */}
      {selectedWorkerProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedWorkerProfile.photo} 
                  alt={selectedWorkerProfile.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-xl">{selectedWorkerProfile.name}</h3>
                    <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      VERIFIED CO-OP
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700 font-bold">
                    {selectedWorkerProfile.skill} • {selectedWorkerProfile.experience} Experience
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    📍 {selectedWorkerProfile.locality || 'Nagpur Central'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedWorkerProfile(null)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Profile Grid Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Cooperative Membership</span>
                <p className="text-sm font-extrabold text-slate-900">{selectedWorkerProfile.cooperativeName || activeCoop?.name}</p>
                <p className="text-xs text-emerald-700 font-medium">Status: Active Equity Shareholder</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Current Availability</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-emerald-700">{selectedWorkerProfile.availability}</span>
                  <button
                    onClick={() => {
                      toggleAvailability(selectedWorkerProfile.id, selectedWorkerProfile.availability);
                      setSelectedWorkerProfile(prev => ({ ...prev, availability: prev.availability === 'Available Now' ? 'On Assignment' : 'Available Now' }));
                    }}
                    className="text-[10px] bg-white hover:bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg border border-slate-300 shadow-sm"
                  >
                    Change Status
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Insurance Status</span>
                <p className="text-xs text-slate-800 font-semibold">{selectedWorkerProfile.welfareStatus || 'Covered under State Cooperative Medical & Life Insurance'}</p>
                <span className="text-[10px] text-emerald-700 font-bold block">✓ Premium Fully Paid by Co-op</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Track Record & Rating</span>
                <p className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">★ {selectedWorkerProfile.rating}</span>
                  <span className="text-slate-500 text-xs">({selectedWorkerProfile.completedJobs} Jobs Completed)</span>
                </p>
                <p className="text-xs text-slate-600">Task Fee: <strong className="text-emerald-700">{selectedWorkerProfile.approxPrice}</strong></p>
                <span className="text-[10px] text-slate-400 font-normal block mt-0.5">Price may vary by task</span>
              </div>

            </div>

            {/* About / Bio */}
            {selectedWorkerProfile.about && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Bio & Skill Summary</span>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{selectedWorkerProfile.about}"
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedWorkerProfile(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REGISTER NEW WORKER MEMBER MODAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Register New Worker Member</h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleRegisterWorker} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Worker Full Name</label>
                <input
                  type="text"
                  required
                  value={newWorkerName}
                  onChange={(e) => setNewWorkerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newWorkerPhone}
                  onChange={(e) => setNewWorkerPhone(e.target.value)}
                  placeholder="e.g. 9823011223"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Skill Trade</label>
                  <select
                    value={newWorkerSkill}
                    onChange={(e) => setNewWorkerSkill(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
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
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Experience</label>
                  <input
                    type="text"
                    value={newWorkerExperience}
                    onChange={(e) => setNewWorkerExperience(e.target.value)}
                    placeholder="e.g. 5 years"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Task Fee (₹)</label>
                  <input
                    type="number"
                    value={newWorkerPrice}
                    onChange={(e) => setNewWorkerPrice(e.target.value)}
                    placeholder="349"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Locality</label>
                  <input
                    type="text"
                    value={newWorkerLocality}
                    onChange={(e) => setNewWorkerLocality(e.target.value)}
                    placeholder="Sitabuldi, Nagpur"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
