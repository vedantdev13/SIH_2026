import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { WORKERS } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  CreditCard,
  ArrowLeft,
  FileText
} from 'lucide-react';

export default function BookingPage({ onAddBooking }) {
  const { workerId } = useParams();
  const navigate = useNavigate();

  const worker = WORKERS.find(w => w.id === workerId) || WORKERS[0];

  // Form State
  const [date, setDate] = useState('2026-09-04');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [customerName, setCustomerName] = useState('Rajesh Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98230 11223');
  const [address, setAddress] = useState('Flat 302, Sunrise Heights, Dharampeth, Nagpur');
  const [problemDescription, setProblemDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `KS-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking = {
      id: bookingId,
      workerId: worker.id,
      workerName: worker.name,
      workerSkill: worker.skill,
      cooperativeName: worker.cooperativeName,
      workerPhoto: worker.photo,
      serviceName: `${worker.skill} Service`,
      date,
      time: timeSlot,
      address,
      customerName,
      customerPhone,
      problem: problemDescription || 'Standard service inspection & repair.',
      amount: worker.approxPrice,
      status: 'Confirmed & Sent to Cooperative Dashboard',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setTimeout(() => {
      if (onAddBooking) onAddBooking(newBooking);
      navigate(`/confirmation/${bookingId}`, { state: { booking: newBooking } });
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-bold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Labour Cooperative Booking
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Book Cooperative Service</h1>
          <p className="text-slate-600 text-sm mt-1">Schedule your appointment with verified co-op tradesperson</p>
        </div>

        {/* Selected Worker Overview Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img src={worker.photo} alt={worker.name} className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">{worker.name}</h3>
              <p className="text-xs font-semibold text-emerald-700">{worker.skill} • {worker.experience}</p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate max-w-xs">{worker.cooperativeName}</span>
              </div>
            </div>
          </div>

          <div className="text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Estimated Fee</span>
            <span className="text-xl font-extrabold text-emerald-700">{worker.approxPrice}</span>
          </div>
        </div>

        {/* BOOKING FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" /> Preferred Service Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" /> Preferred Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="09:00 AM - 11:00 AM">Morning: 09:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 01:00 PM">Morning: 11:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 04:00 PM">Afternoon: 02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">Evening: 04:00 PM - 06:00 PM</option>
              </select>
            </div>

          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customer Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contact Phone</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Service Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" /> Full Service Address
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter street, building name, flat number, locality in Nagpur..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Optional Problem Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" /> Problem Description (Optional)
            </label>
            <textarea
              rows={3}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="e.g. Bathroom sink pipe leaking near main valve, needs new washer washer replacement..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* PAYMENT NOTICE SECTION - REQUIREMENT */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
            <CreditCard className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-extrabold text-amber-950">Payment Integration Coming Soon</p>
              <p className="text-amber-800">
                In this prototype version, payment will be settled in cash or via direct UPI after job completion. No advance online payment is charged right now.
              </p>
            </div>
          </div>

          {/* CONFIRM BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Dispatching to Cooperative Dashboard...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Confirm Booking ({worker.approxPrice})
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
