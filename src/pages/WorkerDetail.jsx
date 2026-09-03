import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { WORKERS } from '../data/mockData';
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
  Sparkles
} from 'lucide-react';

export default function WorkerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const worker = WORKERS.find(w => w.id === id) || WORKERS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-bold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Workers & Map
      </button>

      {/* WORKER MAIN CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Top Cover Banner */}
        <div className="h-32 bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 relative">
          <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Verified Cooperative Federation Member
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8 relative space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14">
            
            <div className="flex items-end gap-4">
              <img 
                src={worker.photo} 
                alt={worker.name} 
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white" 
              />
              <div className="mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                  {worker.name}
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" title="Verified Member" />
                </h1>
                <p className="text-sm font-semibold text-emerald-700">
                  {worker.skill} Tradesperson • {worker.experience} Professional Experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/book/${worker.id}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Book Service Now
              </Link>
            </div>

          </div>

          {/* KEY COOPERATIVE AFFILIATION BANNER - HIGHLIGHT */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Registered Labour Cooperative</span>
                <p className="font-bold text-slate-900 text-base">{worker.cooperativeName}</p>
                <span className="text-xs text-slate-500 font-mono">Member ID: {worker.cooperativeId.toUpperCase()}-{worker.id.replace('w-', '')}</span>
              </div>
            </div>

            <div className="shrink-0 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-800 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Skill Test Certified</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Police Verified</span>
              </div>
            </div>
          </div>

          {/* METRICS ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Rating</span>
              <div className="flex items-center gap-1.5 text-lg font-extrabold text-slate-900 mt-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                {worker.rating}
                <span className="text-xs font-normal text-slate-400">({worker.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Completed Jobs</span>
              <p className="text-lg font-extrabold text-slate-900 mt-1">{worker.completedJobs}+ Jobs</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Distance</span>
              <p className="text-lg font-extrabold text-emerald-700 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" /> {worker.distance} km away
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block">Approx Rate</span>
              <p className="text-lg font-extrabold text-slate-900 mt-1">{worker.approxPrice}</p>
            </div>
          </div>

          {/* ABOUT WORKER */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">About {worker.name}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{worker.about}</p>
          </div>

          {/* WORKER WELFARE & SOCIAL SECURITY - COOP DIFFERENTIATOR */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> Worker Welfare & Cooperative Benefits
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{worker.welfareStatus}</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Receives 100% direct payment per cooperative wage guidelines</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Annual cooperative profit share & dividend active</span>
              </p>
            </div>
          </div>

          {/* CTA BOTTOM BAR */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-medium">Visiting / Inspection Fee</span>
              <p className="text-xl font-extrabold text-slate-900">{worker.approxPrice}</p>
            </div>

            <Link
              to={`/book/${worker.id}`}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-center"
            >
              Proceed to Book Service
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
