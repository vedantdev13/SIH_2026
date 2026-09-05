import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  FileText, 
  Phone, 
  Home, 
  Wrench,
  Printer
} from 'lucide-react';
import { INITIAL_BOOKINGS, WORKERS } from '../data/mockData';
import { fetchBookings } from '../api/apiClient';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const location = useLocation();

  const [booking, setBooking] = useState(location.state?.booking || null);

  useEffect(() => {
    let isMounted = true;
    const resolveBooking = async () => {
      // Try to find booking in existing list or fetch from API
      const allBookings = await fetchBookings();
      const match = allBookings.find(b => b.id === bookingId || b._id === bookingId);
      
      if (isMounted) {
        if (match) {
          setBooking(prev => ({ ...(prev || {}), ...match }));
        } else if (!location.state?.booking) {
          setBooking(INITIAL_BOOKINGS[0]);
        }
      }
    };

    resolveBooking();

    return () => {
      isMounted = false;
    };
  }, [bookingId, location.state]);

  const activeBooking = booking || location.state?.booking || INITIAL_BOOKINGS[0];

  // Resolve worker fallback details if workerId is present
  const assignedWorker = WORKERS.find(w => w.id === activeBooking.workerId) || WORKERS[0];

  const workerPhoto = activeBooking.workerPhoto || assignedWorker.photo;
  const workerName = activeBooking.workerName || assignedWorker.name;
  const workerSkill = activeBooking.serviceName || activeBooking.workerSkill || `${assignedWorker.skill} Service`;
  const cooperativeName = activeBooking.cooperativeName || assignedWorker.cooperativeName;
  const scheduledDate = activeBooking.date || activeBooking.bookingDate || 'Today';
  const scheduledTime = activeBooking.time || '10:00 AM - 12:00 PM';
  const serviceAddress = activeBooking.address || activeBooking.location || 'Nagpur Locality';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* CONFIRMATION CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center">
        
        {/* Top Status Header */}
        <div className="bg-gradient-to-r from-[#3378BC] to-[#1e4d7b] text-white p-8 space-y-3">
          <div className="w-16 h-16 bg-white text-[#3378BC] rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="bg-[#111827]/40 text-blue-100 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Booking Confirmed
          </span>
          <h1 className="text-3xl font-extrabold">Service Successfully Scheduled!</h1>
          <p className="text-sky-100 text-sm max-w-md mx-auto">
            Your request has been registered and dispatched to the Labour Cooperative Society dashboard.
          </p>
        </div>

        {/* BOOKING DETAILS BODY */}
        <div className="p-6 sm:p-8 space-y-6 text-left">
          
          {/* Booking ID & Status Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Booking Reference ID</span>
              <span className="text-lg font-mono font-extrabold text-slate-900">{activeBooking.id || bookingId}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-sky-100 border border-sky-300 text-blue-900 font-bold px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-[#3378BC] animate-pulse"></span>
              {activeBooking.status || 'Confirmed & Worker Dispatched'}
            </div>
          </div>

          {/* Assigned Worker Banner - Unlocked Identity Post Booking */}
          <div className="border border-sky-200 bg-sky-50/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#3378BC] border-b border-sky-200/80 pb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3378BC]" /> Dispatched Worker Verified Identity (Unlocked Post-Booking)
              </span>
              <span className="bg-[#3378BC] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Confirmed
              </span>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src={workerPhoto} 
                alt={workerName} 
                className="w-16 h-16 rounded-xl object-cover border-2 border-[#3378BC] shadow-sm" 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-lg truncate">{workerName}</h3>
                  <span className="bg-sky-100 text-[#3378BC] text-[10px] font-bold px-2 py-0.5 rounded">
                    Co-op Member
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#3378BC]">{workerSkill}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
                  <Building2 className="w-3.5 h-3.5 text-[#3378BC] shrink-0" />
                  {cooperativeName}
                </p>
              </div>
            </div>
          </div>

          {/* SCHEDULE DETAILS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#3378BC]" /> Scheduled Date
              </span>
              <p className="font-bold text-slate-800">{scheduledDate}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#3378BC]" /> Scheduled Time Slot
              </span>
              <p className="font-bold text-slate-800">{scheduledTime}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#3378BC]" /> Service Location
              </span>
              <p className="font-semibold text-slate-800">{serviceAddress}</p>
            </div>

            {activeBooking.problem && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#3378BC]" /> Customer Problem Note
                </span>
                <p className="text-slate-700 italic">"{activeBooking.problem}"</p>
              </div>
            )}
          </div>

          {/* PAYMENT & RECEIPT SUMMARY */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3378BC]" /> Payment & Transaction Receipt
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                activeBooking.paymentStatus === 'Paid'
                  ? 'bg-sky-100 text-blue-900 border-sky-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {activeBooking.paymentStatus || 'Pending'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Payment Method</span>
                <span className="font-bold text-slate-900">{activeBooking.paymentMethod || 'Cash after Service'}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Transaction Reference</span>
                <span className="font-mono font-bold text-slate-900">{activeBooking.transactionId || 'N/A'}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Total Amount</span>
                <span className="font-extrabold text-[#3378BC] text-sm">{activeBooking.amount || assignedWorker.approxPrice}</span>
              </div>
            </div>
          </div>

          {/* Cooperative Notice */}
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl text-xs text-blue-950 space-y-1">
            <p className="font-extrabold flex items-center gap-1.5 text-blue-900">
              <ShieldCheck className="w-4 h-4 text-[#3378BC]" /> Labour Cooperative Dispatch Protocol
            </p>
            <p className="text-slate-600">
              {activeBooking.paymentStatus === 'Paid' 
                ? 'Your payment is safely authorized via the cooperative digital ledger. The worker will arrive at your specified time window.'
                : 'The worker will arrive at your specified time window equipped with cooperative identity badge. Payment can be settled directly in cash or UPI after service completion.'
              }
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 text-sm hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-[#3378BC] hover:bg-[#28639d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4 text-white" /> Return to Services Page
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
