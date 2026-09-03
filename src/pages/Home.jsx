import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SERVICES, 
  WORKERS, 
  LABOUR_COOPERATIVES 
} from '../data/mockData';
import { 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  MapPin, 
  Search, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles as CleaningIcon,
  Car,
  Flower2,
  Tv,
  Award,
  Building2
} from 'lucide-react';

const ICON_MAP = {
  Wrench: Wrench,
  Zap: Zap,
  Hammer: Hammer,
  Paintbrush: Paintbrush,
  Sparkles: CleaningIcon,
  Car: Car,
  Flower2: Flower2,
  Tv: Tv
};

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-3xl">
        {/* Background glow graphics */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-teal-500/10 blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Cooperative Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>COOPERATIVE-OWNED DIGITAL SERVICE MARKETPLACE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Local Workers. <br />
              <span className="text-emerald-400">Trusted Services.</span> <br />
              Stronger Cooperatives.
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              Book background-verified plumbers, electricians, carpenters, and technicians directly from registered <strong className="text-white">Labour Cooperatives</strong>. No exploitation — 100% fair wages & worker welfare.
            </p>

            {/* Quick Service Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/services"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-center font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-base"
              >
                <Search className="w-5 h-5" />
                Find & Book Nearby Workers
              </Link>
              <Link
                to="/cooperative"
                className="bg-white/10 hover:bg-white/20 text-white text-center font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 text-base"
              >
                <Building2 className="w-5 h-5 text-emerald-400" />
                Cooperative Dashboard
              </Link>
            </div>

            {/* Hero Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-700/60 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">500+</span>
                <span className="text-xs text-slate-400">Verified Workers</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">100%</span>
                <span className="text-xs text-slate-400">Cooperative Owned</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">4.9★</span>
                <span className="text-xs text-slate-400">Customer Satisfaction</span>
              </div>
            </div>

          </div>

          {/* Hero Feature Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Live Cooperative Dispatch</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active in Nagpur
                </span>
              </div>

              {/* Sample Quick Worker Box */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700 space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={WORKERS[0].photo} 
                    alt={WORKERS[0].name} 
                    className="w-12 h-12 rounded-xl object-cover border border-emerald-400" 
                  />
                  <div>
                    <h4 className="font-bold text-white text-base">{WORKERS[0].name}</h4>
                    <p className="text-xs text-emerald-400 font-medium">{WORKERS[0].skill} • 6 yrs exp</p>
                  </div>
                </div>
                <div className="bg-emerald-950/60 border border-emerald-800/80 p-2 rounded-lg text-xs text-emerald-200 flex items-center justify-between">
                  <span className="truncate">{WORKERS[0].cooperativeName}</span>
                  <span className="font-bold text-amber-400 shrink-0">★ 4.9</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Workers retain full earnings + dividend benefits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Managed & allocated by Labour Cooperative Federation</span>
                </div>
              </div>

              <Link
                to={`/book/${WORKERS[0].id}`}
                className="block text-center w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition-all"
              >
                Instant Book Verified Plumber →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Service Marketplace
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Explore Skilled Services</h2>
            <p className="text-slate-600 text-sm mt-1">Select a service to find verified cooperative workers near you</p>
          </div>

          <Link 
            to="/services" 
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComp = ICON_MAP[service.iconName] || Wrench;
            return (
              <Link
                key={service.id}
                to={`/services?category=${service.name}`}
                className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">Starts ₹{service.startingPrice}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    {service.workerCount} Co-op Workers
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* COOPERATIVE DIFFERENTIATOR SECTION - KEY REQUIREMENT */}
      <section className="bg-emerald-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-emerald-800 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Why Sahakaar is Different
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Not Just Another Gig App — A Worker-Owned Platform
            </h2>
            <p className="text-slate-300 text-base">
              Private aggregator apps take up to 30% commission while treating skilled tradespeople as disposable workers. Sahakaar connects you directly to democratically managed <strong className="text-white">Labour Cooperatives</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-emerald-800/50 border border-emerald-700/60 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">1. Democratic Worker Ownership</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Workers are equal member-owners in registered Labour Cooperative Societies. They elect their board and receive annual surplus dividends.
              </p>
            </div>

            <div className="bg-emerald-800/50 border border-emerald-700/60 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">2. Cooperative Verification & Quality</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Skill testing, background verification, and quality monitoring are conducted by the Cooperative Federation, ensuring reliable & safe household service.
              </p>
            </div>

            <div className="bg-emerald-800/50 border border-emerald-700/60 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">3. Social Security & Fair Wages</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Every booking contributes to worker health insurance, pension funds, and emergency relief pool managed by the cooperative.
              </p>
            </div>

          </div>


        </div>
      </section>

      {/* SPOTLIGHT WORKERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Cooperative Workers</h2>
            <p className="text-slate-600 text-sm mt-1">Top-rated artisans with verified cooperative credentials</p>
          </div>
          <Link to="/services" className="text-sm font-bold text-emerald-700 hover:text-emerald-800 hidden sm:block">
            View All Workers →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map(worker => (
            <div key={worker.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <img src={worker.photo} alt={worker.name} className="w-14 h-14 rounded-xl object-cover border" />
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{worker.name}</h4>
                  <p className="text-xs text-emerald-700 font-semibold">{worker.skill} • {worker.experience}</p>
                  <span className="text-[11px] text-amber-500 font-bold">★ {worker.rating} ({worker.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {worker.cooperativeName}
                </p>
                <p className="text-slate-500 text-[11px]">{worker.welfareStatus}</p>
              </div>

              <Link
                to={`/book/${worker.id}`}
                className="block text-center py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all"
              >
                Book {worker.skill} (₹{worker.hourlyRate})
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-3xl font-extrabold">Are you a Labour Cooperative Officer?</h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Register your Labour Cooperative Society or Federation on Sahakaar. Access our free digital workforce allocation dashboard, get instant customer bookings for your workers, and automate welfare contributions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/cooperative"
              className="bg-white text-emerald-800 font-bold px-6 py-3.5 rounded-xl shadow hover:bg-emerald-50 transition-all text-center text-sm"
            >
              Open Cooperative Portal
            </Link>
            <Link
              to="/register"
              className="bg-emerald-900 text-white font-semibold px-6 py-3.5 rounded-xl border border-emerald-400/40 hover:bg-emerald-950 transition-all text-center text-sm"
            >
              Register Cooperative
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
