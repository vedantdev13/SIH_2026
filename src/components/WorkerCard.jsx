import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Award, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { getDisplayWorkerName, getDisplayWorkerPhoto } from '../utils/privacyUtils';

export default function WorkerCard({ worker, onSelect, isSelected, isBooked = false }) {
  const displayName = getDisplayWorkerName(worker, isBooked);
  const displayPhoto = getDisplayWorkerPhoto(worker, isBooked);

  return (
    <div 
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        isSelected 
          ? 'border-[#3378BC] ring-2 ring-[#3378BC]/20 shadow-lg' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="p-5">
        {/* Worker Top Header with Photo, Name & Cooperative Badge */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img 
              src={displayPhoto} 
              alt={displayName} 
              className="w-16 h-16 rounded-xl object-cover border-2 border-[#3378BC]/20 p-1 bg-slate-50 shadow-sm" 
            />
            {worker.verified && (
              <div 
                className="absolute -bottom-1 -right-1 bg-[#3378BC] text-white p-1 rounded-full border-2 border-white shadow-sm"
                title="Verified Cooperative Member"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 truncate">
                {displayName ? (
                  displayName
                ) : (
                  <span>
                    {worker.skill} <span className="text-xs font-normal text-slate-500">• {worker.experience} exp</span>
                  </span>
                )}
              </h3>
              <div className="flex flex-col items-end shrink-0">
                <span className="font-extrabold text-[#3378BC] bg-[#3378BC]/10 text-sm px-2.5 py-1 rounded-lg border border-[#3378BC]/20">
                  {worker.approxPrice}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">Price may vary by task</span>
              </div>
            </div>

            {displayName && (
              <p className="text-sm font-semibold text-[#3378BC] flex items-center gap-1.5 mt-0.5">
                <span>{worker.skill}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-normal">{worker.experience} exp</span>
              </p>
            )}

            {/* Cooperative Member Banner */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-800 w-full sm:w-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3378BC] shrink-0" />
              <span className="truncate">{worker.cooperativeName}</span>
            </div>
          </div>
        </div>

        {/* Worker Stats Grid */}
        <div className="grid grid-cols-3 gap-2 my-4 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <div>
            <span className="text-xs text-slate-500 block">Rating</span>
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-slate-800">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              {worker.rating}
              <span className="text-[11px] text-slate-400 font-normal">({worker.reviewsCount})</span>
            </div>
          </div>

          <div className="border-x border-slate-200 px-1">
            <span className="text-xs text-slate-500 block">Completed</span>
            <span className="text-sm font-bold text-slate-800">{worker.completedJobs}+ jobs</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Distance</span>
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-[#3378BC]">
              <MapPin className="w-3.5 h-3.5 text-[#3378BC]" />
              {worker.distance} km
            </div>
          </div>
        </div>

        {/* Availability & Location tag */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1 text-slate-600 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {worker.locality}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
            worker.availability === 'Available Now'
              ? 'bg-[#3378BC]/10 text-[#3378BC] border border-[#3378BC]/20'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            {worker.availability}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            to={`/worker/${worker.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
          >
            View Profile
          </Link>

          <Link
            to={`/book/${worker.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl bg-[#3378BC] hover:bg-[#28639d] text-white text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            Book Service
          </Link>
        </div>
      </div>
    </div>
  );
}
