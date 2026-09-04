import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WORKERS } from '../data/mockData';
import { fetchReviewsApi, createReviewApi } from '../api/apiClient';
import { getDisplayWorkerName, getDisplayWorkerPhoto } from '../utils/privacyUtils';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Calendar, 
  PhoneCall, 
  ArrowLeft, 
  Heart, 
  UserCheck, 
  Building2,
  FileCheck,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Check,
  X,
  Lock
} from 'lucide-react';

export default function WorkerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const worker = WORKERS.find(w => w.id === id) || WORKERS[0];

  // Check if current user has an active/confirmed booking with this worker
  const storedBookingsRaw = typeof window !== 'undefined' ? localStorage.getItem('sahakaar_bookings') : null;
  const bookingsList = storedBookingsRaw ? JSON.parse(storedBookingsRaw) : [];
  const isBooked = bookingsList.some(b => b.workerId === worker.id && b.status !== 'Cancelled');

  const displayName = getDisplayWorkerName(worker, isBooked);
  const displayPhoto = getDisplayWorkerPhoto(worker, isBooked);

  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedStars, setSelectedStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Punctual & On Time', 'Expert Craftsmanship']);
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTags = [
    'Punctual & On Time', 
    'Polite Behavior', 
    'Expert Craftsmanship', 
    'Clean Worksite', 
    'Fair Co-op Rate'
  ];

  useEffect(() => {
    fetchReviewsApi(worker.id).then(data => {
      if (data) setReviews(data);
    });
  }, [worker.id]);

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReview = {
      workerId: worker.id,
      workerName: worker.name,
      customerName: customerName || 'Verified Customer',
      rating: selectedStars,
      comment: reviewComment || 'Very satisfied with the cooperative service provided.',
      tags: selectedTags,
      date: new Date().toISOString().split('T')[0]
    };

    const saved = await createReviewApi(newReview);
    setReviews(prev => [saved || newReview, ...prev]);
    setIsSubmitting(false);
    setShowReviewModal(false);
    setReviewComment('');
  };

  const ratingLabels = ['1.0 - Poor', '2.0 - Fair', '3.0 - Good', '4.0 - Very Good', '5.0 - Excellent!'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#3378BC] font-bold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Workers & Map
      </button>

      {/* WORKER MAIN CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Top Cover Banner */}
        <div className="h-32 bg-[#111827] relative border-b border-slate-800">
          <div className="absolute top-4 right-4 bg-slate-800/90 border border-slate-700 text-[#3378BC] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#3378BC]" />
            Verified Cooperative Federation Member
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8 relative space-y-6">
          
          {!isBooked && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 font-medium flex items-center gap-2 mt-4">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Worker Safety & Privacy Shield Active:</strong> Full worker identity, direct phone number, and photo are dispatched upon booking confirmation.
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10">
            
            <div className="flex items-end gap-4">
              <img 
                src={displayPhoto} 
                alt={displayName} 
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-50 p-1" 
              />
              <div className="mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] flex items-center gap-2">
                  {displayName ? displayName : worker.skill}
                  <CheckCircle2 className="w-6 h-6 text-[#3378BC] shrink-0" title="Verified Member" />
                </h1>
                <p className="text-sm font-semibold text-[#3378BC]">
                  {worker.experience} Professional Experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Star className="w-4 h-4 fill-white" /> Write Review
              </button>

              <Link
                to={`/book/${worker.id}`}
                className="bg-[#3378BC] hover:bg-[#28639d] text-white font-bold text-base px-6 py-3 rounded-xl shadow-lg shadow-[#3378BC]/20 hover:shadow transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Book Service Now
              </Link>
            </div>

          </div>

          {/* KEY COOPERATIVE AFFILIATION BANNER - HIGHLIGHT */}
          <div className="bg-[#3378BC]/10 border border-[#3378BC]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3378BC] text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#3378BC] uppercase tracking-wider block">Registered Labour Cooperative</span>
                <p className="font-bold text-[#111827] text-base">{worker.cooperativeName}</p>
                <span className="text-xs text-slate-500 font-mono">Member ID: {worker.cooperativeId.toUpperCase()}-{worker.id.replace('w-', '')}</span>
              </div>
            </div>

            <div className="shrink-0 bg-white px-3.5 py-2 rounded-xl border border-[#3378BC]/20 text-xs font-semibold text-[#3378BC] space-y-0.5">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#3378BC]" />
                <span>Skill Test Certified</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#3378BC]" />
                <span>Police Verified</span>
              </div>
            </div>
          </div>

          {/* METRICS ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Rating</span>
              <div className="flex items-center gap-1.5 text-lg font-extrabold text-[#111827] mt-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                {worker.rating}
                <span className="text-xs font-normal text-slate-400">({worker.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Completed Jobs</span>
              <p className="text-lg font-extrabold text-[#111827] mt-1">{worker.completedJobs}+ Jobs</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Distance</span>
              <p className="text-lg font-extrabold text-[#3378BC] mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#3378BC]" /> {worker.distance} km away
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Approx Rate</span>
              <p className="text-lg font-extrabold text-[#111827] mt-1">{worker.approxPrice}</p>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Price may vary by task</span>
            </div>
          </div>

          {/* ABOUT WORKER */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-[#111827]">About {displayName || worker.skill}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{worker.about}</p>
          </div>

          {/* WORKER WELFARE & SOCIAL SECURITY - COOP DIFFERENTIATOR */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#3378BC]" /> Worker Welfare & Cooperative Benefits
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3378BC] shrink-0" />
                <span>{worker.welfareStatus}</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3378BC] shrink-0" />
                <span>Receives 100% direct payment per cooperative wage guidelines</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3378BC] shrink-0" />
                <span>Annual cooperative profit share & dividend active</span>
              </p>
            </div>
          </div>

          {/* CUSTOMER REVIEWS & RATINGS SECTION */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#111827] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#3378BC]" /> Customer Ratings & Reviews
                </h3>
                <p className="text-xs text-slate-500">Verified feedback from co-op service bookings</p>
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> Add Rating
              </button>
            </div>

            <div className="space-y-3">
              {reviews.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-xs">
                  No written reviews yet. Be the first customer to leave a review!
                </div>
              ) : (
                reviews.map((rev, idx) => (
                  <div key={rev.id || idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#3378BC] text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                          {rev.customerName ? rev.customerName.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block">{rev.customerName}</span>
                          <span className="text-[10px] text-slate-400">{rev.date || 'Recent'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-full font-extrabold text-[11px]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        {rev.rating}.0
                      </div>
                    </div>

                    <p className="text-slate-700 italic pt-1">"{rev.comment}"</p>

                    {rev.tags && rev.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {rev.tags.map((t, tIdx) => (
                          <span key={tIdx} className="bg-[#3378BC]/10 text-[#111827] text-[10px] font-bold px-2 py-0.5 rounded border border-[#3378BC]/30">
                            ✓ {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CTA BOTTOM BAR */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-medium">Task / Inspection Fee</span>
              <p className="text-xl font-extrabold text-[#111827]">{worker.approxPrice}</p>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Price may vary by task</span>
            </div>

            <Link
              to={`/book/${worker.id}`}
              className="w-full sm:w-auto bg-[#3378BC] hover:bg-[#28639d] text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-[#3378BC]/20 transition-all text-center"
            >
              Proceed to Book Service
            </Link>
          </div>

        </div>
      </div>

      {/* DIRECT WRITE REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h3 className="font-extrabold text-slate-900 text-lg">Write a Review for {worker.name}</h3>
              </div>
              <button 
                onClick={() => setShowReviewModal(false)} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 font-bold hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              
              {/* Customer Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name (e.g. Priya Sharma)..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20 focus:border-[#3378BC]"
                />
              </div>

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
                  Review Details
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share details of work quality, punctuality, and behavior..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20 focus:border-[#3378BC]"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#3378BC] hover:bg-[#28639d] text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>Submitting Review...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Submit Review
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
