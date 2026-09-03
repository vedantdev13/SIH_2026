import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Users, 
  Star, 
  Sparkles, 
  Building2,
  Clock,
  ShieldAlert
} from 'lucide-react';

export default function CooperativeWelfare({ workers = [], activeCoop }) {
  return (
    <div className="space-y-8">
      
      {/* BRAND DIFFERENTIATOR BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 rounded-full text-emerald-300 text-xs font-bold w-fit">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          KEY DIFFERENTIATOR VS PRIVATE GIG PLATFORMS
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Verified Cooperative Worker Welfare & Social Security
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Unlike private aggregators (such as Urban Company) that treat gig workers as disposable contracts, <strong className="text-emerald-400">KaamSetu is 100% cooperative-owned</strong>. Every worker is a voting member with medical insurance, accident cover, skill upgrade grants, and annual AGM profit dividends.
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700/80">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <span className="text-[11px] text-slate-300 block font-bold uppercase tracking-wider">Health & Medical Cover</span>
            <p className="text-2xl font-black text-emerald-400">₹3,00,000</p>
            <p className="text-xs text-slate-300">Policy per worker & family member</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <span className="text-[11px] text-slate-300 block font-bold uppercase tracking-wider">Annual Co-op Dividend Surplus</span>
            <p className="text-2xl font-black text-amber-400">₹1,50,000</p>
            <p className="text-xs text-slate-300">Annual profit share distributed at AGM</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <span className="text-[11px] text-slate-300 block font-bold uppercase tracking-wider">Skill Guild Subsidies</span>
            <p className="text-2xl font-black text-teal-300">₹85,000</p>
            <p className="text-xs text-slate-300">Tool upgrades & safety gear kits</p>
          </div>
        </div>
      </div>

      {/* WORKERS WELFARE ROSTER TABLE / GRID */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Cooperative Member Social Security Status</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time verification of member skill certifications, insurance policies, and welfare fund active status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workers.map(w => {
            const isAvailable = w.availability === 'Available Now';
            const isVerified = w.verified !== false;

            return (
              <div 
                key={w.id}
                className="bg-slate-50/80 border border-slate-200 rounded-3xl p-5 hover:bg-slate-100/80 transition-all space-y-4 shadow-sm"
              >
                {/* Header worker info */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={w.photo} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-sm" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{w.name}</h4>
                      <p className="text-xs text-emerald-700 font-bold">{w.skill} • {w.experience}</p>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {w.id}</span>
                    </div>
                  </div>

                  {/* Availability badge */}
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                    isAvailable ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {isAvailable ? 'Active' : 'Not Available'}
                  </span>
                </div>

                {/* 5 KEY WELFARE INDICATORS */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs shadow-sm">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Skill Verified:</span>
                    <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Cooperative Member:</span>
                    <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active Member
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Insurance Status:</span>
                    <span className="text-teal-800 font-bold bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-teal-600" /> Full Cover (₹3L)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Welfare Support:</span>
                    <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-600" /> Co-op Pension
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-600 font-medium">Completed Jobs:</span>
                    <span className="text-slate-900 font-extrabold">{w.completedJobs} Jobs</span>
                  </div>

                </div>

                <div className="text-[11px] text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                  "Covered under {activeCoop?.name || 'Nagpur Labour Cooperative'} State Welfare Scheme"
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
