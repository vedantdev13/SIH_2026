import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  AlertCircle, 
  ArrowUpRight, 
  Briefcase, 
  UserPlus, 
  Sparkles, 
  BrainCircuit, 
  HeartHandshake,
  MapPin,
  Calendar,
  ChevronRight,
  Eye
} from 'lucide-react';
import { updateBookingStatusApi } from '../../api/apiClient';

export default function CooperativeOverview({ bookings = [], workers = [], setBookings, setWorkers, activeCoop }) {
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');

  // Overview metrics calculations
  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(w => w.availability === 'Available Now').length;
  const newBookingsCount = bookings.filter(b => b.status === 'New' || b.status === 'Confirmed & Worker Dispatched').length;
  const completedJobsCount = bookings.filter(b => b.status === 'Completed').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Assigned' || b.status === 'In Progress' || b.status === 'New').length;
  
  const totalEarnings = bookings.reduce((sum, b) => {
    const numeric = parseInt((b.amount || '0').replace(/[^0-9]/g, '')) || 350;
    return sum + numeric;
  }, 0);

  const handleStatusChange = async (bookingId, newStatus) => {
    const updated = await updateBookingStatusApi(bookingId, newStatus);
    if (updated) {
      setBookings(updated);
    } else {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    }
  };

  const handleAssignWorker = async (bookingId) => {
    if (!selectedWorkerId) return;
    const worker = workers.find(w => w.id === selectedWorkerId);
    if (!worker) return;

    const updated = await updateBookingStatusApi(bookingId, 'Assigned', worker.id, worker.name);
    if (updated) {
      setBookings(updated);
    } else {
      setBookings(prev => prev.map(b => b.id === bookingId ? { 
        ...b, 
        status: 'Assigned', 
        workerId: worker.id, 
        workerName: worker.name,
        workerPhoto: worker.photo 
      } : b));
    }
    setSelectedBookingForAssign(null);
    setSelectedWorkerId('');
  };

  return (
    <div className="space-y-8">
      
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              COOPERATIVE WORKFORCE DASHBOARD
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {activeCoop?.name || 'Nagpur Labour Cooperative'}
            </h2>
            <p className="text-xs text-slate-300">
              Fair wages, worker social security, and direct customer dispatches managed by the cooperative.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/cooperative/ai-demand"
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all"
            >
              <BrainCircuit className="w-4 h-4" /> AI Demand Forecast
            </Link>

            <Link
              to="/cooperative/welfare"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all"
            >
              <HeartHandshake className="w-4 h-4" /> Worker Welfare
            </Link>
          </div>
        </div>
      </div>

      {/* 6 OVERVIEW METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Total Workers</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">{totalWorkers}</p>
          <span className="text-[10px] text-emerald-400 font-semibold block">Verified Co-op Members</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Active Workers</span>
            <UserCheck className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-black text-teal-400">{activeWorkers}</p>
          <span className="text-[10px] text-slate-400 font-medium block">Ready for Dispatch</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">New Bookings</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{newBookingsCount}</p>
          <span className="text-[10px] text-amber-400/80 font-medium block">Action Needed</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Completed Jobs</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{completedJobsCount}</p>
          <span className="text-[10px] text-emerald-400/80 font-medium block">Satisfied Customers</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Total Earnings</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">₹{totalEarnings.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-slate-400 font-medium block">100% to Co-op Pool</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold">Pending Bookings</span>
            <AlertCircle className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-blue-400">{pendingBookingsCount}</p>
          <span className="text-[10px] text-blue-400/80 font-medium block">In Pipeline</span>
        </div>

      </div>

      {/* RECENT BOOKINGS SECTION */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-white">Recent Customer Bookings</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Interactive Status Workflow
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Update booking progress directly. Status changes reflect immediately across the system.
            </p>
          </div>

          <Link
            to="/cooperative/bookings"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
          >
            View All Bookings ({bookings.length}) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* BOOKINGS TABLE / CARDS */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm bg-slate-900/50 rounded-2xl border border-slate-800">
              No recent bookings found.
            </div>
          ) : (
            bookings.slice(0, 5).map((booking) => {
              const statusColors = {
                'New': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                'Confirmed & Worker Dispatched': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                'Assigned': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                'In Progress': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                'Completed': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              };

              const currentStatus = booking.status || 'New';

              return (
                <div 
                  key={booking.id} 
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  {/* Left info */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                        {booking.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/80">
                        {booking.serviceName || 'Service'}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[currentStatus] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                        {currentStatus}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {booking.createdAt || '2026-09-03'}
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <h4 className="font-bold text-white text-base">
                        {booking.customerName || 'Customer'} <span className="text-xs text-slate-400 font-normal">({booking.customerPhone || 'Ph: +91 98230XXXXX'})</span>
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {booking.address || booking.location || 'Nagpur Location'}
                      </p>
                      {booking.problem && (
                        <p className="text-xs text-slate-400 italic bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                          "{booking.problem}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right worker & action controls */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
                    
                    {/* Assigned Worker Info */}
                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 min-w-[200px]">
                      <img 
                        src={booking.workerPhoto || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80'} 
                        alt="Worker" 
                        className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40" 
                      />
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Assigned Worker</span>
                        <span className="text-xs font-extrabold text-white">{booking.workerName || 'Unassigned'}</span>
                        <span className="text-[10px] text-emerald-400 block font-medium">{booking.workerSkill || 'Service Expert'}</span>
                      </div>
                    </div>

                    {/* Amount & Interactive Workflow Buttons */}
                    <div className="space-y-2 w-full sm:w-auto text-right">
                      <span className="text-sm font-black text-emerald-400 block">
                        Amount: {booking.amount || '₹349'}
                      </span>

                      <div className="flex flex-wrap items-center gap-1.5 justify-end">
                        
                        {/* VIEW / RE-ASSIGN BUTTON */}
                        {(currentStatus === 'New' || currentStatus === 'Confirmed & Worker Dispatched') && (
                          <button
                            onClick={() => setSelectedBookingForAssign(booking.id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-all"
                          >
                            Assign Worker
                          </button>
                        )}

                        {currentStatus === 'Assigned' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'In Progress')}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-all"
                          >
                            Mark In Progress
                          </button>
                        )}

                        {currentStatus === 'In Progress' && (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'Completed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-all"
                          >
                            Mark Completed
                          </button>
                        )}

                        {currentStatus === 'Completed' && (
                          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1.5 rounded-xl inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Job Finished
                          </span>
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

      {/* ASSIGN WORKER MODAL */}
      {selectedBookingForAssign && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-lg">Assign Cooperative Worker</h3>
              <button 
                onClick={() => setSelectedBookingForAssign(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Select an available verified cooperative worker for booking <strong className="text-emerald-400">{selectedBookingForAssign}</strong>:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {workers.map(w => (
                <div 
                  key={w.id}
                  onClick={() => setSelectedWorkerId(w.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedWorkerId === w.id 
                      ? 'bg-emerald-950/80 border-emerald-500 text-white' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={w.photo} className="w-10 h-10 rounded-xl object-cover border" />
                    <div>
                      <h5 className="font-bold text-xs text-white">{w.name}</h5>
                      <p className="text-[11px] text-emerald-400 font-medium">{w.skill} • {w.experience}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${w.availability === 'Available Now' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                    {w.availability}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedBookingForAssign(null)}
                className="text-xs font-bold text-slate-400 hover:text-white px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAssignWorker(selectedBookingForAssign)}
                disabled={!selectedWorkerId}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
