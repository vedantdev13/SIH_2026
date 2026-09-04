import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  IndianRupee, 
  UserCheck, 
  Power, 
  Building2, 
  AlertCircle, 
  HeartHandshake, 
  Sparkles,
  Home,
  FileText
} from 'lucide-react';
import { WORKERS } from '../data/mockData';
import { updateBookingStatusApi, updateWorkerApi } from '../api/apiClient';
import WorkerJobMapView from '../components/WorkerJobMapView';

export default function WorkerDashboard({ currentUser, bookings = [], setBookings, workers = [], setWorkers }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showMap, setShowMap] = useState(true);

  // Match logged-in worker or construct dynamic worker profile from currentUser session
  const allWorkers = Array.isArray(workers) && workers.length > 0 ? workers : WORKERS;
  const rawWorker = allWorkers.find(w => {
    if (!w) return false;
    const phoneMatch = currentUser?.phone && (String(w.phone) === String(currentUser.phone) || String(w.id || '').includes(String(currentUser.phone)));
    const nameMatch = currentUser?.name && String(w.name || '').toLowerCase() === String(currentUser.name || '').toLowerCase();
    return phoneMatch || nameMatch;
  });

  // Local state for duty availability status to guarantee reactive UI toggling
  const [availabilityStatus, setAvailabilityStatus] = useState(rawWorker?.availability || 'Available Now');

  useEffect(() => {
    if (rawWorker?.availability) {
      setAvailabilityStatus(rawWorker.availability);
    }
  }, [rawWorker?.availability]);

  // Local state for bookings to ensure immediate UI update when worker changes job status
  const [localBookings, setLocalBookings] = useState(bookings);

  useEffect(() => {
    if (Array.isArray(bookings) && bookings.length > 0) {
      setLocalBookings(bookings);
    }
  }, [bookings]);

  const currentWorker = {
    id: rawWorker?.id || currentUser?.id || `w-${currentUser?.phone || '101'}`,
    name: currentUser?.name || rawWorker?.name || 'Worker Member',
    phone: currentUser?.phone || rawWorker?.phone || '',
    photo: rawWorker?.photo || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    skill: currentUser?.tradeSkill || rawWorker?.skill || 'Plumber',
    experience: rawWorker?.experience || '5 years',
    rating: rawWorker?.rating || 4.9,
    reviewsCount: rawWorker?.reviewsCount || 38,
    completedJobs: rawWorker?.completedJobs || 0,
    approxPrice: rawWorker?.approxPrice || '₹349 per task',
    hourlyRate: rawWorker?.hourlyRate || 349,
    availability: availabilityStatus,
    cooperativeName: currentUser?.cooperativeName || rawWorker?.cooperativeName || 'Nagpur Labour Cooperative Society'
  };

  // Safe bookings filter for this worker
  const safeBookings = Array.isArray(localBookings) && localBookings.length > 0 ? localBookings : (Array.isArray(bookings) ? bookings : []);

  const workerBookings = safeBookings.filter(b => {
    if (!b) return false;
    const workerNameStr = String(currentWorker.name || '').toLowerCase();
    const workerSkillStr = String(currentWorker.skill || '').toLowerCase();

    const isAssignedToMe = (b.workerId && b.workerId === currentWorker.id) ||
                           (b.workerName && String(b.workerName).toLowerCase() === workerNameStr);
    const matchesTrade = workerSkillStr && b.workerSkill && String(b.workerSkill).toLowerCase().includes(workerSkillStr);
    return isAssignedToMe || matchesTrade;
  });

  const activeBookings = workerBookings.filter(b => b.status === 'Assigned' || b.status === 'In Progress' || b.status === 'New' || b.status === 'Confirmed & Worker Dispatched');
  const completedBookings = workerBookings.filter(b => b.status === 'Completed');

  // Total Earnings calculation
  const totalEarnings = completedBookings.reduce((sum, b) => {
    const num = parseInt(String(b.amount || '0').replace(/[^0-9]/g, '')) || currentWorker.hourlyRate || 349;
    return sum + num;
  }, 0);

  const displayBookings = workerBookings.filter(b => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Active') return b.status !== 'Completed';
    if (filterStatus === 'Completed') return b.status === 'Completed';
    return true;
  });

  // Toggle Availability Handler
  const handleToggleAvailability = async () => {
    const nextAvailability = availabilityStatus === 'Available Now' ? 'Off Duty' : 'Available Now';
    setAvailabilityStatus(nextAvailability); // Instant UI toggle!
    await updateWorkerApi(currentWorker.id, { availability: nextAvailability });
    if (setWorkers) {
      setWorkers(prev => {
        const list = Array.isArray(prev) ? prev : WORKERS;
        const exists = list.some(w => w.id === currentWorker.id);
        if (exists) {
          return list.map(w => w.id === currentWorker.id ? { ...w, availability: nextAvailability } : w);
        }
        return [{ ...currentWorker, availability: nextAvailability }, ...list];
      });
    }
  };

  // Status transition handlers (New / Assigned -> In Progress -> Completed)
  const handleStatusChange = async (bookingId, nextStatus) => {
    // 1. Instant local state update for zero lag
    setLocalBookings(prev => (Array.isArray(prev) ? prev : []).map(b => 
      (b.id === bookingId || b._id === bookingId) ? {
        ...b,
        status: nextStatus,
        workerId: currentWorker.id,
        workerName: currentWorker.name,
        workerPhoto: currentWorker.photo
      } : b
    ));

    // 2. Persist update through API & sync parent app state
    const updated = await updateBookingStatusApi(bookingId, nextStatus, currentWorker.id, currentWorker.name);
    if (updated && Array.isArray(updated) && setBookings) {
      setBookings(updated);
    } else if (setBookings) {
      setBookings(prev => (Array.isArray(prev) ? prev : []).map(b => 
        (b.id === bookingId || b._id === bookingId) ? {
          ...b,
          status: nextStatus,
          workerId: currentWorker.id,
          workerName: currentWorker.name,
          workerPhoto: currentWorker.photo
        } : b
      ));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* TOP WORKER BRAND BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <img 
              src={currentWorker.photo} 
              alt={currentWorker.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0 bg-white"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 rounded-full text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider">
                  VERIFIED WORKER MEMBER
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Welcome back, {currentWorker.name}!
              </h1>
              <p className="text-xs text-slate-300 flex flex-wrap items-center gap-3 mt-1">
                <span className="font-bold text-emerald-400">{currentWorker.skill} Specialist</span>
                <span>•</span>
                <span>Experience: <strong className="text-white">{currentWorker.experience}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {currentWorker.rating} ({currentWorker.reviewsCount} reviews)
                </span>
              </p>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2 shrink-0 text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Current Duty Status
            </span>
            <div className="flex items-center justify-end gap-3">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                currentWorker.availability === 'Available Now'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {currentWorker.availability}
              </span>
              <button
                onClick={handleToggleAvailability}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Power className="w-3.5 h-3.5" /> Toggle Status
              </button>
            </div>
          </div>

        </div>

        {/* AFFILIATED CO-OP NOTICE */}
        <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Affiliated Cooperative: <strong className="text-white">{currentWorker.cooperativeName}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Co-op Medical & Life Policy Active (Cover: ₹3,00,000)</span>
          </div>
        </div>

      </div>

      {/* 4 SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Total Earnings</span>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">₹{totalEarnings.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-emerald-700 font-semibold block">100% Fair Wage Direct Payout</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Active Jobs Queue</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{activeBookings.length}</p>
          <span className="text-[11px] text-amber-700 font-medium block">Ready for Dispatch / Action</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Completed Jobs</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600">{completedBookings.length + (currentWorker.completedJobs || 120)}</p>
          <span className="text-[11px] text-emerald-700 font-medium block">Verified Customer Reviews</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Member Welfare Pool</span>
            <HeartHandshake className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-purple-700">Active</p>
          <span className="text-[11px] text-purple-700 font-medium block">State Cooperative Pension Share</span>
        </div>

      </div>

      {/* INTERACTIVE WORK LOCATION MAP CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" /> Assigned Work Sites Map
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live map view of your assigned customer locations across the city
            </p>
          </div>

          <button
            onClick={() => setShowMap(!showMap)}
            className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all"
          >
            {showMap ? 'Hide Map' : 'Show Work Location Map'}
          </button>
        </div>

        {showMap && (
          <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
            <WorkerJobMapView
              jobs={displayBookings}
              selectedJob={selectedJob}
              onSelectJob={(job) => setSelectedJob(job)}
              workerLocation={{ lat: 21.1458, lng: 79.0882, name: 'Sitabuldi, Nagpur (Worker Base)' }}
            />
          </div>
        )}
      </div>

      {/* DISPATCHES & JOBS LIST SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">My Work Bookings & Dispatches</h2>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                {displayBookings.length} Assignments
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              View customer requests, accept jobs, update progress, and mark tasks completed.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setFilterStatus('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              All Jobs ({workerBookings.length})
            </button>
            <button
              onClick={() => setFilterStatus('Active')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'Active' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Active ({activeBookings.length})
            </button>
            <button
              onClick={() => setFilterStatus('Completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'Completed' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Completed ({completedBookings.length})
            </button>
          </div>
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-4">
          {displayBookings.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-sm">
              No job dispatches found for the selected filter.
            </div>
          ) : (
            displayBookings.map(b => {
              const statusColors = {
                'New': 'bg-amber-50 text-amber-800 border-amber-200',
                'Confirmed & Worker Dispatched': 'bg-blue-50 text-blue-800 border-blue-200',
                'Assigned': 'bg-blue-50 text-blue-800 border-blue-200',
                'In Progress': 'bg-purple-50 text-purple-800 border-purple-200',
                'Completed': 'bg-emerald-50 text-emerald-800 border-emerald-200'
              };

              const currentStatus = b.status || 'Assigned';

              return (
                <div 
                  key={b.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all space-y-4 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    
                    {/* Left Customer Info */}
                    <div className="space-y-2 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                          {b.id}
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          {b.serviceName || currentWorker.skill}
                        </span>
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${statusColors[currentStatus] || 'bg-slate-100 text-slate-700'}`}>
                          {currentStatus}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {b.date || '2026-09-04'} {b.time ? `• ${b.time}` : ''}
                        </span>
                      </div>

                      <div className="pt-1 space-y-1">
                        <h3 className="text-lg font-extrabold text-slate-900">
                          Customer: {b.customerName || 'Customer'}
                        </h3>
                        <p className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Phone: {b.customerPhone || '+91 98230 11223'}</span>
                        </p>
                        <p className="text-xs text-slate-600 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Address: {b.address || 'Nagpur Central'}</span>
                        </p>
                        {b.problem && (
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 italic">
                            <span className="font-bold text-slate-900 not-italic block mb-0.5">Problem Notes:</span>
                            "{b.problem}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Workflow Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                      
                      <div className="text-right space-y-1 w-full sm:w-auto">
                        <span className="text-xs text-slate-400 font-medium block">Task Fee Payout</span>
                        <span className="text-xl font-extrabold text-emerald-700 block">
                          {b.amount || currentWorker.approxPrice}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block">Price may vary by task</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded border block text-center font-bold ${
                          b.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}>
                          {b.paymentStatus === 'Paid' ? 'Paid Online' : 'Collect Cash/UPI on Job'}
                        </span>
                      </div>

                      {/* Interactive Buttons for Worker */}
                      <div className="w-full sm:w-auto flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedJob(b);
                            setShowMap(true);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Focus Map Location
                        </button>

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.address || 'Nagpur Central')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          🗺️ GPS Navigation →
                        </a>

                        {(currentStatus === 'Assigned' || currentStatus === 'New' || currentStatus === 'Confirmed & Worker Dispatched') && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'In Progress')}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                          >
                            <Clock className="w-4 h-4" /> Accept & Start Job
                          </button>
                        )}

                        {currentStatus === 'In Progress' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'Completed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Mark Job Finished
                          </button>
                        )}

                        {currentStatus === 'Completed' && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Finished & Credited
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* COOPERATIVE WELFARE & SOCIAL SECURITY CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> My Member Benefits & Social Security
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider block">Medical & Accident Cover</span>
            <p className="text-sm font-extrabold text-slate-900">₹3,00,000 State Insurance</p>
            <span className="text-emerald-700 font-semibold">✓ Premium fully covered by Cooperative</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider block">AGM Surplus Dividend</span>
            <p className="text-sm font-extrabold text-slate-900">Active Equity Shareholder</p>
            <span className="text-emerald-700 font-semibold">✓ Annual profit share credited at AGM</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider block">Skill Guild Certification</span>
            <p className="text-sm font-extrabold text-slate-900">Master Level {currentWorker.skill}</p>
            <span className="text-emerald-700 font-semibold">✓ Verified Police & Trade Clearance</span>
          </div>
        </div>
      </div>

    </div>
  );
}
