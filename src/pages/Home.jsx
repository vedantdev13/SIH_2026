import React from "react";
import { Link } from "react-router-dom";
import { SERVICES, WORKERS, LABOUR_COOPERATIVES } from "../data/mockData";
import {
  getDisplayWorkerName,
  getDisplayWorkerPhoto,
} from "../utils/privacyUtils";
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
  Building2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const ICON_MAP = {
  Wrench: Wrench,
  Zap: Zap,
  Hammer: Hammer,
  Paintbrush: Paintbrush,
  Sparkles: CleaningIcon,
  Car: Car,
  Flower2: Flower2,
  Tv: Tv,
};

export default function Home() {
  const handleGridMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="pb-20 bg-slate-50">
      {/* WHITE HERO SECTION WITH LARGE ROUNDED BOTTOM CORNERS */}
      <section className="relative bg-white text-[#111827] pt-10 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] sm:rounded-b-[4.5rem] lg:rounded-b-[6rem] border-b-2 border-slate-200/80 shadow-xs overflow-hidden z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-[#3378BC] border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#3378BC]" />
              <span>Verifiable Labour Network</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black text-[#111827] tracking-tight leading-[0.98]">
              Local Skilled Artisans. <br />
              <span className="text-[#3378BC]">Direct Fair Wages.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-normal">
              Book background verified trade professionals directly from
              registered{" "}
              <strong className="text-[#111827] font-bold">
                Labour Cooperatives
              </strong>
              . 100% direct earnings & member benefits.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/services"
                className="bg-[#3378BC] hover:bg-[#28639d] text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
              >
                <Search className="w-5 h-5" />
                Find Nearby Workers
              </Link>
              <Link
                to="/cooperative"
                className="bg-slate-100 hover:bg-slate-200 text-[#111827] font-bold px-6 py-4 rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 text-base"
              >
                <Building2 className="w-5 h-5 text-[#3378BC]" />
                Cooperative Portal
              </Link>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200/80 max-w-md">
              <div>
                <span className="text-2xl font-black text-[#111827] block">
                  500+
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Verified Artisans
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#111827] block">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Co-op Owned
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#3378BC] block">
                  4.9★
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - DOMINANT PLUMBER HERO IMAGE */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#111827]/10 shadow-2xl aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-slate-100 group">
              <img
                src="/images/hero/plumber.png"
                alt="Skilled Plumber Artisan"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-4 left-4 right-4 bg-[#111827]/90 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-base">
                    Ramesh Kumar
                  </h4>
                  <p className="text-xs text-[#3378BC] font-semibold">
                    Master Plumber • 6 yrs exp
                  </p>
                </div>
                <span className="bg-[#3378BC] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20">
                  ★ 4.9 Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS BLUE VISUAL FLOW SECTION (#3378BC) IMMEDIATELY UNDERNEATH HERO */}
      <div className="bg-[#3378BC] text-white border-b-2 border-[#111827] relative">
        {/* "THE SAHAKAAR ADVANTAGE" */}
        <section
          onMouseMove={handleGridMouseMove}
          className="dark-grid-bg relative text-white py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="dark-grid-lines"></div>
          <div className="dark-grid-glow"></div>

          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="bg-[#111827] text-white border border-white/20 text-xs font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Core Idea
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                The Sahakaar Advantage
              </h2>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                Democratically governed labour cooperatives connecting
                households directly with skilled artisans. No middleman
                exploitation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#111827] text-white border-2 border-white/20 p-8 rounded-2xl shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#3378BC] text-white flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Democratic Worker Ownership
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Workers are equal member-owners in registered Labour
                  Cooperative Societies. They participate in board elections and
                  receive annual surplus dividends.
                </p>
              </div>

              <div className="bg-[#111827] text-white border-2 border-white/20 p-8 rounded-2xl shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#3378BC] text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Cooperative Verification
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Skill testing, identity check, and work quality standards are
                  supervised directly by the Labour Cooperative Federation to
                  guarantee reliable service.
                </p>
              </div>

              <div className="bg-[#111827] text-white border-2 border-white/20 p-8 rounded-2xl shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#3378BC] text-white flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Social Security & Welfare
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Bookings support healthcare, pension funds, and emergency
                  relief pools for trade workers, ensuring dignity and
                  sustainable livelihoods.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#3378BC] uppercase tracking-wider bg-[#3378BC]/10 px-3 py-1 rounded-md mb-2 border border-[#3378BC]/20">
              <Sparkles className="w-3.5 h-3.5" /> Trade Roles Directory
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#111827] tracking-tight">
              Explore Skill Services & Roles
            </h2>
            <p className="text-slate-600 text-base mt-1">
              Select a trade role to view verified cooperative artisans in your
              locality
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-base font-extrabold text-[#3378BC] hover:text-[#28639d] group"
          >
            View All Services{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComp = ICON_MAP[service.iconName] || Wrench;
            return (
              <Link
                key={service.id}
                to={`/services?category=${service.name}`}
                className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-[#3378BC] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={`${service.name} working on site`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 text-[#3378BC] flex items-center justify-center shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-3 left-3 bg-[#111827]/90 border border-white/20 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {service.workerCount} Active Artisans
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#3378BC] transition-colors flex items-center justify-between">
                      <span>{service.name}</span>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#3378BC] group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Starts from
                    </span>
                    <span className="font-black text-[#111827] text-base">
                      ₹{service.startingPrice}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SPOTLIGHT WORKERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827]">
              Featured Cooperative Artisans
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Top-rated artisans with verified cooperative credentials
            </p>
          </div>
          <Link
            to="/services"
            className="text-sm font-bold text-[#3378BC] hover:text-[#28639d] hidden sm:flex items-center gap-1"
          >
            View All Workers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getDisplayWorkerPhoto(worker, false)}
                  alt={getDisplayWorkerName(worker, false)}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#3378BC]/20 p-0.5 bg-slate-50"
                />
                <div>
                  <h4 className="font-extrabold text-[#111827] text-lg">
                    {worker.skill}
                  </h4>
                  <p className="text-xs text-[#3378BC] font-semibold">
                    {worker.experience} experience
                  </p>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{worker.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({worker.reviewsCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1 border border-slate-100">
                <p className="font-semibold text-[#111827] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3378BC] shrink-0" />
                  <span className="truncate">{worker.cooperativeName}</span>
                </p>
                <p className="text-slate-500 text-[11px] pl-5">
                  {worker.welfareStatus}
                </p>
              </div>

              <Link
                to={`/book/${worker.id}`}
                className="block text-center py-3 bg-[#3378BC] hover:bg-[#28639d] text-white font-bold text-sm rounded-xl transition-all shadow-xs"
              >
                Book {worker.skill} (₹{worker.hourlyRate})
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-12 border-2 border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[#3378BC] text-xs font-mono font-bold uppercase tracking-wider">
              For Cooperative Officers
            </span>
            <h3 className="text-3xl font-black text-white">
              Are you a Labour Cooperative Officer?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Register your Labour Cooperative Society or Federation on
              Sahakaar. Manage workforce allocation, receive direct customer
              bookings, and automate member welfare contributions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/cooperative"
              className="bg-[#3378BC] hover:bg-[#28639d] text-white font-bold px-6 py-3.5 rounded-xl shadow transition-all text-center text-sm"
            >
              Open Cooperative Portal
            </Link>
            <Link
              to="/register"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all text-center text-sm"
            >
              Register Cooperative
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
