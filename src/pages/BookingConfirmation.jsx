import React from 'react';
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
import { INITIAL_BOOKINGS } from '../data/mockData';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const location = useLocation();

  const booking = location.state?.booking || INITIAL_BOOKINGS[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* CONFIRMATION CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center">
        
        {/* Top Status Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 space-y-3">
          <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="bg-emerald-800/60 text-emerald-100 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Booking Confirmed
          </span>
          <h1 className="text-3xl font-extrabold">Service Successfully Scheduled!</h1>
          <p className="text-emerald-100 text-sm max-w-md mx-auto">
            Your request has been registered and dispatched to the Labour Cooperative Society dashboard.
          </p>
        </div>

        {/* BOOKING DETAILS BODY */}
        <div className="p-6 sm:p-8 space-y-6 text-left">
          
          {/* Booking ID & Status Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Booking Reference ID</span>
              <span className="text-lg font-mono font-extrabold text-slate-900">{booking.id || bookingId}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              {booking.status || 'Confirmed & Worker Dispatched'}
            </div>
          </div>

          {/* Assigned Worker Banner */}
          <div className="border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
            <img 
              src={booking.workerPhoto} 
              alt={booking.workerName} 
              className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-600 shadow-sm" 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg truncate">{booking.workerName}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Co-op Member
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-700">{booking.serviceName || booking.workerSkill}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                {booking.cooperativeName}
              </p>
            </div>
          </div>

          {/* SCHEDULE DETAILS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Scheduled Date
              </span>
              <p className="font-bold text-slate-800">{booking.date}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Scheduled Time Slot
              </span>
              <p className="font-bold text-slate-800">{booking.time}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Service Location
              </span>
              <p className="font-semibold text-slate-800">{booking.address}</p>
            </div>

            {booking.problem && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" /> Customer Problem Note
                </span>
                <p className="text-slate-700 italic">"{booking.problem}"</p>
              </div>
            )}
          </div>

          {/* Cooperative Notice */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 space-y-1">
            <p className="font-extrabold flex items-center gap-1.5 text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Labour Cooperative Dispatch Protocol
            </p>
            <p className="text-slate-600">
              The worker will arrive at your specified time window equipped with cooperative identity badge. Payment will be settled after service completion according to cooperative rate guidelines.
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
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4 text-white" /> Browse More Services
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
