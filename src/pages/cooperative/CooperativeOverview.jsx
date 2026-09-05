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
  Eye,
  ShieldCheck
} from 'lucide-react';
import { updateBookingStatusApi } from '../../api/apiClient';
import { generateWorkerId } from '../../data/mockData';

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
      
      {/* BANNER HEADER (Matching Sahakaar Hero Banner) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#3378BC]/10 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-[#3378BC]/20 border border-[#3378BC]/40 px-3.5 py-1 rounded-full text-blue-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
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
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <BrainCircuit className="w-4 h-4" /> AI Demand Forecast
            </Link>

            <Link
              to="/cooperative/welfare"
              className="bg-[#3378BC] hover:bg-[#28639d] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <HeartHandshake className="w-4 h-4" /> Worker Welfare
            </Link>
          </div>
        </div>
      </div>

      {/* 6 OVERVIEW METRIC CARDS (Clean Light Theme) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Total Workers</span>
            <Users className="w-4 h-4 text-[#3378BC]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalWorkers}</p>
          <span className="text-[10px] text-[#3378BC] font-semibold block">Verified Co-op Members</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Active Workers</span>
            <UserCheck className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-extrabold text-[#3378BC]">{activeWorkers}</p>
          <span className="text-[10px] text-slate-500 font-medium block">Ready for Dispatch</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">New Bookings</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600">{newBookingsCount}</p>
          <span className="text-[10px] text-amber-700 font-medium block">Action Needed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Completed Jobs</span>
            <CheckCircle2 className="w-4 h-4 text-[#3378BC]" />
          </div>
          <p className="text-2xl font-extrabold text-[#3378BC]">{completedJobsCount}</p>
          <span className="text-[10px] text-[#3378BC] font-medium block">Satisfied Customers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Total Earnings</span>
            <IndianRupee className="w-4 h-4 text-[#3378BC]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹{totalEarnings.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-slate-500 font-medium block">100% to Co-op Pool</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Pending Bookings</span>
            <AlertCircle className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600">{pendingBookingsCount}</p>
          <span className="text-[10px] text-blue-700 font-medium block">In Pipeline</span>
        </div>

      </div>

      {/* RECENT BOOKINGS SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900">Recent Customer Bookings</h3>
              <span className="bg-sky-50 text-[#3378BC] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-sky-200">
                Interactive Status Workflow
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Update booking progress directly. Status changes reflect immediately across the system.
            </p>
          </div>

          <Link
            to="/cooperative/bookings"
            className="text-xs font-bold text-[#3378BC] hover:text-[#28639d] flex items-center gap-1 shrink-0"
          >
            View All Bookings ({bookings.length}) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* BOOKINGS CARDS */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 rounded-2xl border border-slate-200">
              No recent bookings found.
            </div>
          ) : (
            bookings.slice(0, 5).map((booking) => {
              const statusColors = {
                'New': 'bg-amber-50 text-amber-800 border-amber-200',
                'Confirmed & Worker Dispatched': 'bg-sky-50 text-[#3378BC] border-sky-200',
                'Assigned': 'bg-sky-50 text-[#3378BC] border-sky-200',
                'In Progress': 'bg-purple-50 text-purple-800 border-purple-200',
                'Completed': 'bg-emerald-50 text-emerald-800 border-emerald-200'
              };

              const currentStatus = booking.status || 'New';

              return (
                <div 
                  key={booking.id} 
                  className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 hover:bg-slate-100/80 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-sm"
                >
                  {/* Left info */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-white text-slate-800 px-2.5 py-0.5 rounded border border-slate-200 shadow-sm">
                        {booking.id}
                      </span>
                      <span className="text-xs font-bold text-[#3378BC] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        {booking.serviceName || 'Service'}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColors[currentStatus] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                        {currentStatus}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {booking.createdAt || '2026-09-03'}
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {booking.customerName || 'Customer'} <span className="text-xs text-slate-500 font-normal">({booking.customerPhone || 'Ph: +91 98230XXXXX'})</span>
                      </h4>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#3378BC] shrink-0" />
                        {booking.address || booking.location || 'Nagpur Location'}
                      </p>
                      {booking.problem && (
                        <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200">
                          "{booking.problem}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right worker & action controls */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200">
                    
                    {/* Assigned Worker Info */}
                    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 min-w-[200px] shadow-sm">
                      <img 
                        src={booking.workerPhoto || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80'} 
                        alt="Worker" 
                        className="w-10 h-10 rounded-xl object-cover border border-[#3378BC]/40" 
                      />
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Worker</span>
                        <span className="text-xs font-extrabold text-slate-900">{booking.workerName || 'Unassigned'}</span>
                        <span className="text-[10px] text-[#3378BC] block font-medium">{booking.workerSkill || 'Service Expert'}</span>
                      </div>
                    </div>

                    {/* Amount & Interactive Workflow Buttons */}
                    <div className="space-y-2 w-full sm:w-auto text-right">
                      <span className="text-sm font-black text-[#3378BC] block">
                        Amount: {booking.amount || '₹349'}
                      </span>

                      <div className="flex flex-wrap items-center gap-1.5 justify-end">
                        
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
                            className="bg-[#3378BC] hover:bg-[#28639d] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-all"
                          >
                            Mark Completed
                          </button>
                        )}

                        {currentStatus === 'Completed' && (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Job Finished
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Assign Cooperative Worker</h3>
              <button 
                onClick={() => setSelectedBookingForAssign(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select an available verified worker for booking <strong className="text-[#3378BC]">{selectedBookingForAssign}</strong>:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {workers.map(w => (
                <div 
                  key={w.id}
                  onClick={() => setSelectedWorkerId(w.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedWorkerId === w.id 
                      ? 'bg-sky-50 border-[#3378BC] text-slate-900 shadow-sm' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={w.photo} className="w-10 h-10 rounded-xl object-cover border" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">{w.name}</h5>
                      <p className="text-[11px] text-[#3378BC] font-medium">{w.skill} • {w.experience}</p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {w.workerId || generateWorkerId(w.id) || w.id}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${w.availability === 'Available Now' ? 'bg-sky-100 text-[#3378BC]' : 'bg-slate-200 text-slate-600'}`}>
                    {w.availability}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedBookingForAssign(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAssignWorker(selectedBookingForAssign)}
                disabled={!selectedWorkerId}
                className="bg-[#3378BC] hover:bg-[#28639d] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
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
