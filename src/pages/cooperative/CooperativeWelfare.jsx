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
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-800/80 shadow-xl space-y-4">
        <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 rounded-full text-emerald-300 text-xs font-bold w-fit">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-emerald-900/60">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-800/50">
            <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">Health & Medical Cover</span>
            <p className="text-2xl font-black text-emerald-400">₹3,00,000</p>
            <p className="text-xs text-slate-300">Policy per worker & family member</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-800/50">
            <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">Annual Co-op Dividend Surplus</span>
            <p className="text-2xl font-black text-amber-400">₹1,50,000</p>
            <p className="text-xs text-slate-300">Annual profit share distributed at AGM</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-800/50">
            <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">Skill Guild Subsidies</span>
            <p className="text-2xl font-black text-teal-400">₹85,000</p>
            <p className="text-xs text-slate-300">Tool upgrades & safety gear kits</p>
          </div>
        </div>
      </div>

      {/* WORKERS WELFARE ROSTER TABLE / GRID */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-white">Cooperative Member Social Security Status</h3>
          <p className="text-xs text-slate-400 mt-0.5">
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
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all space-y-4 shadow-lg"
              >
                {/* Header worker info */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={w.photo} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/60" />
                    <div>
                      <h4 className="font-extrabold text-white text-base">{w.name}</h4>
                      <p className="text-xs text-emerald-400 font-bold">{w.skill} • {w.experience}</p>
                      <span className="text-[10px] text-slate-500 font-mono">ID: {w.id}</span>
                    </div>
                  </div>

                  {/* Availability badge */}
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                    isAvailable ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {isAvailable ? 'Active' : 'Not Available'}
                  </span>
                </div>

                {/* 5 KEY WELFARE INDICATORS */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Skill Verified:</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Cooperative Member:</span>
                    <span className="text-emerald-300 font-bold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Active Member
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Insurance Status:</span>
                    <span className="text-teal-300 font-bold bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-800 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-teal-400" /> Full Cover (₹3L)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Welfare Support:</span>
                    <span className="text-amber-300 font-bold bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800 flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-400" /> Co-op Pension
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-400 font-medium">Completed Jobs:</span>
                    <span className="text-white font-extrabold">{w.completedJobs} Jobs</span>
                  </div>

                </div>

                <div className="text-[11px] text-slate-400 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800">
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
