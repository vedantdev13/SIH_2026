import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  AlertCircle, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { updateBookingStatusApi } from '../../api/apiClient';

export default function CooperativeBookings({ bookings = [], setBookings, workers = [] }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [assigningBookingId, setAssigningBookingId] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');

  const statuses = ['All', 'New', 'Assigned', 'In Progress', 'Completed'];

  const filteredBookings = bookings.filter(b => {
    const statusMatch = filterStatus === 'All' || 
      (filterStatus === 'New' && (b.status === 'New' || b.status === 'Confirmed & Worker Dispatched')) ||
      b.status === filterStatus;
    const searchMatch = (b.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const handleStatusUpdate = async (id, status) => {
    const updated = await updateBookingStatusApi(id, status);
    if (updated && Array.isArray(updated)) {
      setBookings(updated);
    } else if (updated && typeof updated === 'object') {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updated, status } : b));
    } else {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    }
  };

  const handleAssignWorker = async (id) => {
    if (!selectedWorkerId) return;
    const worker = workers.find(w => w.id === selectedWorkerId);
    if (!worker) return;

    const updated = await updateBookingStatusApi(id, 'Assigned', worker.id, worker.name);
    if (updated && Array.isArray(updated)) {
      setBookings(updated);
    } else {
      setBookings(prev => prev.map(b => b.id === id ? {
        ...b,
        status: 'Assigned',
        workerId: worker.id,
        workerName: worker.name,
        workerPhoto: worker.photo,
        workerSkill: worker.skill
      } : b));
    }
    setAssigningBookingId(null);
    setSelectedWorkerId('');
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER & FILTER BAR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">Booking Dispatch Center</h2>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                {filteredBookings.length} Bookings
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage booking requests, assign available cooperative workers, and monitor progress.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search booking ID, customer or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64 shadow-sm"
            />
          </div>
        </div>

        {/* STATUS TABS */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {st} {st !== 'All' && `(${bookings.filter(b => st === 'New' ? (b.status === 'New' || b.status === 'Confirmed & Worker Dispatched') : b.status === st).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* BOOKINGS LIST */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500 text-sm shadow-sm">
            No bookings found for the selected filter.
          </div>
        ) : (
          filteredBookings.map(b => {
            const statusColors = {
              'New': 'bg-amber-50 text-amber-800 border-amber-200',
              'Confirmed & Worker Dispatched': 'bg-blue-50 text-blue-800 border-blue-200',
              'Assigned': 'bg-blue-50 text-blue-800 border-blue-200',
              'In Progress': 'bg-purple-50 text-purple-800 border-purple-200',
              'Completed': 'bg-emerald-50 text-emerald-800 border-emerald-200'
            };

            const currentStatus = b.status || 'New';

            return (
              <div 
                key={b.id} 
                className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all space-y-4 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left Column: ID & Customer info */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                        {b.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        {b.serviceName || 'Service'}
                      </span>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${statusColors[currentStatus] || 'bg-slate-100 text-slate-700'}`}>
                        {currentStatus}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {b.date || '2026-09-04'} {b.time ? `• ${b.time}` : ''}
                      </span>
                    </div>

                    <div className="pt-1">
                      <h3 className="text-lg font-extrabold text-slate-900">
                        Customer: {b.customerName || 'Customer'} <span className="text-xs text-slate-500 font-normal">({b.customerPhone || '+91 98230XXXXX'})</span>
                      </h3>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        {b.address || b.location || 'Nagpur Location'}
                      </p>
                      {b.problem && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2">
                          "{b.problem}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Worker info & Workflow control buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 min-w-[210px]">
                      <img 
                        src={b.workerPhoto || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80'} 
                        alt="Worker" 
                        className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500/40" 
                      />
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Worker</span>
                        <h4 className="text-xs font-extrabold text-slate-900">{b.workerName || 'Unassigned'}</h4>
                        <span className="text-[10px] text-emerald-700 font-medium block">{b.workerSkill || 'Cooperative Member'}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-right w-full sm:w-auto">
                      <span className="text-sm font-black text-emerald-700 block">
                        Amount: {b.amount || '₹349'}
                      </span>

                      {/* WORKFLOW BUTTONS */}
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        
                        {(currentStatus === 'New' || currentStatus === 'Confirmed & Worker Dispatched') && (
                          <button
                            onClick={() => setAssigningBookingId(b.id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
                          >
                            Assign Worker
                          </button>
                        )}

                        {currentStatus === 'Assigned' && (
                          <button
                            onClick={() => handleStatusUpdate(b.id, 'In Progress')}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
                          >
                            Mark In Progress
                          </button>
                        )}

                        {currentStatus === 'In Progress' && (
                          <button
                            onClick={() => handleStatusUpdate(b.id, 'Completed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
                          >
                            Mark Completed
                          </button>
                        )}

                        {currentStatus === 'Completed' && (
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed
                          </span>
                        )}

                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ASSIGN WORKER MODAL */}
      {assigningBookingId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Assign Worker to {assigningBookingId}</h3>
              <button onClick={() => setAssigningBookingId(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <p className="text-xs text-slate-600">Choose a worker from the cooperative roster:</p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {workers.map(w => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorkerId(w.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedWorkerId === w.id ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={w.photo} className="w-10 h-10 rounded-xl object-cover border" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{w.name}</h4>
                      <p className="text-[11px] text-emerald-700">{w.skill} • {w.experience}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${w.availability === 'Available Now' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                    {w.availability}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setAssigningBookingId(null)} className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2">
                Cancel
              </button>
              <button
                onClick={() => handleAssignWorker(assigningBookingId)}
                disabled={!selectedWorkerId}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
              >
                Assign Worker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
