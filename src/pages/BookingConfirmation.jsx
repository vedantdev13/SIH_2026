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
  Printer,
  Star,
  Flag,
  ShieldAlert,
  Check,
  X
} from 'lucide-react';
import { INITIAL_BOOKINGS, WORKERS } from '../data/mockData';
import { fetchBookings, createReviewApi, createReportApi } from '../api/apiClient';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const location = useLocation();

  const [booking, setBooking] = useState(location.state?.booking || null);

  // Rating States
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(null);

  // Report States
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Overcharging / Demanded Extra Cash');
  const [reportNotes, setReportNotes] = useState('');
  const [reportUrgency, setReportUrgency] = useState('Normal');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(null);

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

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingRating(true);
    await createReviewApi({
      bookingId: activeBooking.id || bookingId,
      workerId: activeBooking.workerId || assignedWorker.id,
      workerName: workerName,
      rating: selectedStars,
      comment: reviewComment || 'Verified receipt review submitted.'
    });
    setRatingSubmitted({ rating: selectedStars, comment: reviewComment });
    setIsSubmittingRating(false);
    setIsRatingOpen(false);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReport(true);
    await createReportApi({
      bookingId: activeBooking.id || bookingId,
      workerId: activeBooking.workerId || assignedWorker.id,
      workerName: workerName,
      reason: reportReason,
      notes: reportNotes || 'Report submitted from receipt page.',
      urgency: reportUrgency
    });
    setReportSubmitted({ reason: reportReason, notes: reportNotes, urgency: reportUrgency });
    setIsSubmittingReport(false);
    setIsReportOpen(false);
  };

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

          {/* Assigned Worker Banner */}
          <div className="border border-sky-200 bg-sky-50/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#3378BC] border-b border-sky-200/80 pb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3378BC]" /> Dispatched Worker Verified Identity (Unlocked Post-Booking)
              </span>
              <span className="bg-[#3378BC] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Confirmed
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

              {/* RECEIPT WORKER ACTION BUTTON */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {!ratingSubmitted ? (
                  <button
                    onClick={() => setIsRatingOpen(true)}
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all"
                  >
                    <Star className="w-3.5 h-3.5 fill-white" /> Rate Worker
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 font-bold border border-amber-200 text-xs px-3 py-1.5 rounded-xl">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Rated {ratingSubmitted.rating}.0★
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SUBMITTED RATING NOTIFICATION BANNER */}
          {ratingSubmitted && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs space-y-1 text-amber-950">
              <div className="flex items-center justify-between font-extrabold">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> Rating Submitted ({ratingSubmitted.rating}.0★)
                </span>
                <span className="text-[10px] text-amber-700 uppercase">Receipt Review</span>
              </div>
              {ratingSubmitted.comment && (
                <p className="text-slate-700 italic">"{ratingSubmitted.comment}"</p>
              )}
            </div>
          )}

          {/* SUBMITTED REPORT NOTIFICATION BANNER */}
          {reportSubmitted && (
            <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 text-xs space-y-1 text-red-950">
              <div className="flex items-center justify-between font-extrabold text-red-800">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" /> Report Logged with Labour Co-op
                </span>
                <span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded-full border border-red-300">
                  {reportSubmitted.urgency}
                </span>
              </div>
              <p className="text-red-900 font-bold">Category: {reportSubmitted.reason}</p>
              {reportSubmitted.notes && (
                <p className="text-slate-700 italic">"{reportSubmitted.notes}"</p>
              )}
            </div>
          )}

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

          {/* ACTION BUTTONS AT BOTTOM */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 text-sm hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                title="Report issue or misconduct by worker"
              >
                <Flag className="w-4 h-4 text-red-600" /> Report Worker
              </button>

              <Link
                to="/services"
                className="flex-1 sm:flex-none text-center px-6 py-3 rounded-xl bg-[#3378BC] hover:bg-[#28639d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4 text-white" /> Return to Services
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* RATING MODAL */}
      {isRatingOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h3 className="font-extrabold text-slate-900 text-lg">Rate Tradesperson</h3>
              </div>
              <button onClick={() => setIsRatingOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRatingSubmit} className="space-y-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button" onClick={() => setSelectedStars(s)} className="p-1">
                    <Star className={`w-8 h-8 ${s <= selectedStars ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Your Review</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us about the worker performance..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsRatingOpen(false)} className="px-4 py-2 border rounded-xl text-xs font-bold">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmittingRating} className="px-5 py-2 bg-[#3378BC] text-white font-bold rounded-xl text-xs">
                  {isSubmittingRating ? 'Submitting...' : 'Submit Rating'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-red-100 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-red-600">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-extrabold text-slate-900 text-lg">Report Tradesperson</h3>
              </div>
              <button onClick={() => setIsReportOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Select Issue Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Overcharging / Demanded Extra Cash',
                    'Unprofessional / Rude Behavior',
                    'No Show / Extreme Unpunctuality',
                    'Substandard / Faulty Workmanship',
                    'Safety & Security Violation',
                    'Unverified Worker / Impersonation'
                  ].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReportReason(r)}
                      className={`p-2 rounded-xl text-xs font-bold text-left border ${
                        reportReason === r ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Details</label>
                <textarea
                  rows={3}
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  placeholder="Describe the incident..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsReportOpen(false)} className="px-4 py-2 border rounded-xl text-xs font-bold">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmittingReport} className="px-5 py-2 bg-red-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5">
                  <Flag className="w-3.5 h-3.5 fill-white" /> Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

