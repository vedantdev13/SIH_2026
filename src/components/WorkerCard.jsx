import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Award, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function WorkerCard({ worker, onSelect, isSelected }) {
  return (
    <div 
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        isSelected 
          ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-lg' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="p-5">
        {/* Worker Top Header with Photo, Name & Cooperative Badge */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img 
              src={worker.photo} 
              alt={worker.name} 
              className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100 shadow-sm" 
            />
            {worker.verified && (
              <div 
                className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-sm"
                title="Verified Cooperative Member"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 truncate">{worker.name}</h3>
              <span className="shrink-0 font-extrabold text-emerald-700 bg-emerald-50 text-sm px-2.5 py-1 rounded-lg border border-emerald-200">
                {worker.approxPrice}
              </span>
            </div>

            <p className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5 mt-0.5">
              <span>{worker.skill}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-normal">{worker.experience} exp</span>
            </p>

            {/* Cooperative Member Banner - Key Differentiator */}
            <div className="mt-2 inline-flex items-center gap-1.5 bg-slate-50 border border-emerald-300/80 px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-900 w-full sm:w-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-emerald-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
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
          <span className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${
            worker.availability === 'Available Now'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {worker.availability}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            to={`/worker/${worker.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            View Profile
          </Link>

          <Link
            to={`/book/${worker.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            Book Service
          </Link>
        </div>
      </div>
    </div>
  );
}
