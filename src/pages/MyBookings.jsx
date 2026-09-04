import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Building2, 
  FileText, 
  ShieldCheck, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  IndianRupee, 
  Receipt, 
  Sparkles,
  ExternalLink,
  User,
  Filter,
  Wrench,
  Home,
  Star,
  ThumbsUp,
  Check,
  X
} from 'lucide-react';
import { WORKERS } from '../data/mockData';
import { createReviewApi } from '../api/apiClient';

export default function MyBookings({ bookings = [], currentUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'completed' | 'transactions'
  const [searchQuery, setSearchQuery] = useState('');

  // Rating Modal State
  const [ratingModalBooking, setRatingModalBooking] = useState(null);
  const [selectedStars, setSelectedStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Punctual & On Time', 'Expert Craftsmanship']);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [localRatings, setLocalRatings] = useState({}); // bookingId -> { rating, comment, tags }

  const availableTags = [
    'Punctual & On Time', 
    'Polite Behavior', 
    'Expert Craftsmanship', 
    'Clean Worksite', 
    'Fair Co-op Rate'
  ];

  // Filter bookings strictly by logged-in customer when logged in
  const userBookings = currentUser?.name
    ? bookings.filter(b => 
        b.customerName?.toLowerCase() === currentUser.name.toLowerCase() || 
        b.customerId === currentUser.id ||
        (currentUser.phone && b.customerPhone === currentUser.phone)
      )
    : [];

  // Display user's bookings if logged in, or all bookings if viewing for demo
  const displayableBookings = currentUser ? userBookings : bookings;

  // Filter by Search Query
  const searchedBookings = displayableBookings.filter(b => {
    const q = searchQuery.toLowerCase();
    return (
      (b.id || '').toLowerCase().includes(q) ||
      (b.workerName || '').toLowerCase().includes(q) ||
      (b.serviceName || b.workerSkill || '').toLowerCase().includes(q) ||
      (b.address || '').toLowerCase().includes(q) ||
      (b.paymentMethod || '').toLowerCase().includes(q) ||
      (b.transactionId || '').toLowerCase().includes(q)
    );
  });

  // Filter by Tab
  const filteredBookings = searchedBookings.filter(b => {
    const st = b.status || 'New';
    if (activeTab === 'active') {
      return st === 'New' || st === 'Confirmed & Worker Dispatched' || st === 'Assigned' || st === 'In Progress';
    }
    if (activeTab === 'completed') {
      return st === 'Completed';
    }
    return true;
  });

  // Stats calculation
  const totalCount = displayableBookings.length;
  const activeCount = displayableBookings.filter(b => (b.status || 'New') !== 'Completed').length;
  const completedCount = displayableBookings.filter(b => b.status === 'Completed').length;
  
  // Total Spent Calculation (extract numbers from amount string like "₹349")
  const totalSpent = displayableBookings.reduce((sum, b) => {
    const match = (b.amount || '349').toString().match(/\d+/);
    const num = match ? parseInt(match[0], 10) : 0;
    return sum + num;
  }, 0);

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleOpenRatingModal = (booking) => {
    setRatingModalBooking(booking);
    setSelectedStars(5);
    setHoverStars(0);
    setReviewComment('');
    setSelectedTags(['Punctual & On Time', 'Expert Craftsmanship']);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!ratingModalBooking) return;

    setIsSubmittingReview(true);

    const reviewPayload = {
      bookingId: ratingModalBooking.id,
      workerId: ratingModalBooking.workerId || 'w-101',
      workerName: ratingModalBooking.workerName,
      customerName: currentUser?.name || ratingModalBooking.customerName || 'Customer',
      rating: selectedStars,
      comment: reviewComment || 'Great service delivered by cooperative tradesperson.',
      tags: selectedTags,
      date: new Date().toISOString().split('T')[0]
    };

    await createReviewApi(reviewPayload);

    setLocalRatings(prev => ({
      ...prev,
      [ratingModalBooking.id]: {
        rating: selectedStars,
        comment: reviewComment || 'Great service delivered by cooperative tradesperson.',
        tags: selectedTags
      }
    }));

    setIsSubmittingReview(false);
    setRatingModalBooking(null);
  };

  const ratingLabels = ['1.0 - Poor', '2.0 - Fair', '3.0 - Good', '4.0 - Very Good', '5.0 - Excellent!'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Action Bar with Distinct Targets */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 text-slate-600 hover:text-[#3378BC] font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <Home className="w-4 h-4 text-[#3378BC]" /> Back to Homepage
        </Link>

        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-2 bg-[#3378BC] hover:bg-[#28639d] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
        >
          <Wrench className="w-4 h-4 text-white" /> Return to Services Page
        </Link>
      </div>

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#1e4d7b] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#3378BC]/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-[#3378BC]/20 border border-[#3378BC]/30 px-3 py-1 rounded-full text-blue-200 text-xs font-bold uppercase tracking-wider">
              <Receipt className="w-4 h-4 text-[#3378BC]" /> Customer Account Ledger
            </div>
            <h1 className="text-3xl font-extrabold text-white">My Bookings & Transactions</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Track your active worker dispatches, service history, and official co-op payment receipts.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 text-right shrink-0">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Service Expenditure</span>
            <span className="text-2xl font-black text-[#3378BC]">₹{totalSpent.toLocaleString()}</span>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 relative z-10">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-white block">{totalCount}</span>
            <span className="text-[11px] text-slate-300">Total Bookings</span>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-2xl p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-amber-400 block">{activeCount}</span>
            <span className="text-[11px] text-slate-300">Active Dispatches</span>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-2xl p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 block">{completedCount}</span>
            <span className="text-[11px] text-slate-300">Completed Services</span>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-2xl p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-[#3378BC] block">100%</span>
            <span className="text-[11px] text-slate-300">Fair Co-op Wage</span>
          </div>
        </div>

      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* View Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'all' 
                ? 'bg-[#3378BC] text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CalendarCheck className="w-4 h-4" /> All Bookings ({displayableBookings.length})
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'active' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" /> Active ({activeCount})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'completed' 
                ? 'bg-[#3378BC] text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Completed ({completedCount})
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'transactions' 
                ? 'bg-[#111827] text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#3378BC]" /> Transactions Ledger
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by worker, ID, transaction, or address..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20 focus:border-[#3378BC]"
          />
        </div>

      </div>

      {/* VIEW CONTENT */}
      {activeTab === 'transactions' ? (
        
        /* TRANSACTIONS LEDGER TABLE VIEW */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#3378BC]" /> Financial Transactions Summary
              </h2>
              <p className="text-xs text-slate-500">Recorded payments and payment receipts for your bookings</p>
            </div>
            <span className="bg-[#3378BC]/10 border border-[#3378BC]/20 text-[#3378BC] text-xs font-bold px-3 py-1 rounded-full">
              {searchedBookings.length} Receipts Listed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-extrabold text-slate-500 text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Transaction ID</th>
                  <th className="py-3.5 px-6">Booking Reference</th>
                  <th className="py-3.5 px-6">Worker & Trade</th>
                  <th className="py-3.5 px-6">Date / Time</th>
                  <th className="py-3.5 px-6">Payment Mode</th>
                  <th className="py-3.5 px-6 text-right">Amount</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {searchedBookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {b.transactionId || 'N/A'}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-[#3378BC]">
                      <Link to={`/confirmation/${b.id}`} className="hover:underline flex items-center gap-1">
                        {b.id} <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-extrabold text-slate-900 block">{b.workerName || 'Assigned Tradesperson'}</span>
                      <span className="text-[10px] text-slate-500">{b.serviceName || b.workerSkill}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {b.date || '2026-09-04'}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {b.paymentMethod || 'Cash after Service'}
                    </td>
                    <td className="py-4 px-6 text-right font-extrabold text-slate-900 text-sm">
                      {b.amount || '₹349'}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        b.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {b.paymentStatus || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      ) : (

        /* BOOKINGS LIST CARD VIEW */
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">No Bookings Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No service appointments match your selected filter or search query.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm"
              >
                Browse & Book Services
              </Link>
            </div>
          ) : (
            filteredBookings.map(b => {
              const assignedWorker = WORKERS.find(w => w.id === b.workerId) || WORKERS[0];
              const workerPhoto = b.workerPhoto || assignedWorker.photo;
              const workerName = b.workerName || assignedWorker.name;
              const workerSkill = b.serviceName || b.workerSkill || assignedWorker.skill;
              const cooperativeName = b.cooperativeName || assignedWorker.cooperativeName;

              const statusColors = {
                'New': 'bg-amber-50 text-amber-800 border-amber-200',
                'Confirmed & Worker Dispatched': 'bg-blue-50 text-blue-800 border-blue-200',
                'Assigned': 'bg-blue-50 text-blue-800 border-blue-200',
                'In Progress': 'bg-purple-50 text-purple-800 border-purple-200',
                'Completed': 'bg-emerald-50 text-emerald-800 border-emerald-200'
              };

              const currentStatus = b.status || 'New';
              const ratingData = localRatings[b.id] || (b.userRating ? { rating: b.userRating, comment: b.userReview, tags: b.userTags } : null);

              return (
                <div 
                  key={b.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-5"
                >
                  {/* Top Bar: ID, Status & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-extrabold bg-slate-100 text-slate-900 px-3 py-1 rounded-lg border border-slate-200">
                        Ref: {b.id}
                      </span>
                      <span className={`font-extrabold px-3 py-1 rounded-full border text-[11px] ${statusColors[currentStatus] || 'bg-slate-100 text-slate-700'}`}>
                        {currentStatus}
                      </span>
                      <span className="text-slate-500 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {b.date || '2026-09-04'} {b.time ? `• ${b.time}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/confirmation/${b.id}`}
                        state={{ booking: b }}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#3378BC] bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors"
                      >
                        <Receipt className="w-4 h-4 text-[#3378BC]" /> Receipt
                      </Link>

                      {/* RATING BUTTON OR RATED BADGE */}
                      {!ratingData ? (
                        <button
                          onClick={() => handleOpenRatingModal(b)}
                          className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" /> Rate Worker
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-xl">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Rated {ratingData.rating}.0★
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Grid: Worker details + Location & Problem details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Worker Info (5 cols) */}
                    <div className="md:col-span-5 flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <img 
                        src={workerPhoto} 
                        alt={workerName} 
                        className="w-14 h-14 rounded-xl object-cover border-2 border-[#3378BC]/40 shadow-sm shrink-0" 
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-slate-900 text-base truncate">{workerName}</h3>
                        <p className="text-xs font-semibold text-[#3378BC]">{workerSkill}</p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 truncate">
                          <Building2 className="w-3.5 h-3.5 text-[#3378BC] shrink-0" />
                          {cooperativeName}
                        </p>
                      </div>
                    </div>

                    {/* Location & Problem Notes (7 cols) */}
                    <div className="md:col-span-7 space-y-2 text-xs">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#3378BC]" /> Service Location
                        </span>
                        <p className="font-semibold text-slate-800">{b.address || 'Nagpur Address'}</p>
                      </div>

                      {b.problem && (
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-slate-700 italic">
                          <span className="font-bold text-slate-900 not-italic block mb-0.5">Problem Details:</span>
                          "{b.problem}"
                        </div>
                      )}
                    </div>

                  </div>

                  {/* SUBMITTED RATING PREVIEW BANNER IF RATED */}
                  {ratingData && (
                    <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs text-amber-950">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-extrabold">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star 
                                key={s} 
                                className={`w-4 h-4 ${s <= ratingData.rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} 
                              />
                            ))}
                          </div>
                          <span>{ratingData.rating}.0 / 5.0 Rating Provided</span>
                        </div>
                        <span className="text-[10px] font-bold text-amber-700 uppercase">Verified Review</span>
                      </div>
                      
                      {ratingData.comment && (
                        <p className="text-slate-700 italic">"{ratingData.comment}"</p>
                      )}

                      {ratingData.tags && ratingData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {ratingData.tags.map((t, idx) => (
                            <span key={idx} className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">
                              ✓ {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Payment Bar */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                      <div>
                        <span className="text-slate-400 font-medium block">Payment Method</span>
                        <span className="font-bold text-slate-900">{b.paymentMethod || 'Cash after Service'}</span>
                      </div>

                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-slate-400 font-medium block">Txn Reference</span>
                        <span className="font-mono font-bold text-slate-900">{b.transactionId || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${
                        b.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {b.paymentStatus || 'Pending'}
                      </span>
                      <span className="text-lg font-black text-[#3378BC]">{b.amount || '₹349'}</span>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      )}

      {/* RATING & REVIEW MODAL */}
      {ratingModalBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h3 className="font-extrabold text-slate-900 text-lg">Rate Tradesperson</h3>
              </div>
              <button 
                onClick={() => setRatingModalBooking(null)} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 font-bold hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Worker Overview */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
              <img 
                src={ratingModalBooking.workerPhoto || WORKERS[0].photo} 
                alt="Worker" 
                className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm shrink-0" 
              />
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">{ratingModalBooking.workerName}</h4>
                <p className="text-xs font-semibold text-[#3378BC]">{ratingModalBooking.serviceName || ratingModalBooking.workerSkill}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{ratingModalBooking.cooperativeName}</p>
              </div>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              
              {/* STAR RATING PICKER */}
              <div className="text-center space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Select Rating (1 to 5 Stars)
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(starIndex => (
                    <button
                      key={starIndex}
                      type="button"
                      onMouseEnter={() => setHoverStars(starIndex)}
                      onMouseLeave={() => setHoverStars(0)}
                      onClick={() => setSelectedStars(starIndex)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        className={`w-9 h-9 transition-colors ${
                          starIndex <= (hoverStars || selectedStars)
                            ? 'fill-amber-400 text-amber-500 shadow-sm'
                            : 'text-slate-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="inline-block text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  {ratingLabels[selectedStars - 1]}
                </span>
              </div>

              {/* QUICK QUALITY TAGS */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Service Highlights (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#3378BC] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />} {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* REVIEW COMMENT */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Write Your Review / Feedback
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details of your service experience, worker behavior, and work quality..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20 focus:border-[#3378BC]"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRatingModalBooking(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="bg-[#3378BC] hover:bg-[#28639d] text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  {isSubmittingReview ? (
                    <span>Submitting Rating...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Submit Worker Rating
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
