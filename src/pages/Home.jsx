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
  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            {/* Cooperative Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cooperative-Owned Digital Service Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Local Skilled Workers. <br />
              <span className="text-emerald-400">
                Fair Cooperative Wages.
              </span>{" "}
              <br />
              Trusted Household Services.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Book background-verified plumbers, electricians, carpenters, and
              technicians directly from registered{" "}
              <strong className="text-white font-semibold">
                Labour Cooperatives
              </strong>
              . 100% fair earnings, member benefits, and verified quality.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/services"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-base"
              >
                <Search className="w-5 h-5" />
                Find Nearby Workers
              </Link>
              <Link
                to="/cooperative"
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 text-base"
              >
                <Building2 className="w-5 h-5 text-emerald-400" />
                Cooperative Portal
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                  500+
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Verified Artisans
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                  100%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Cooperative Owned
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                  4.9★
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Customer Satisfaction
                </span>
              </div>
            </div>
          </div>

          {/* Hero Feature Box - Live Worker Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Featured Cooperative Member
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
                  Nagpur Central
                </span>
              </div>

              {/* Sample Quick Worker Box */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={getDisplayWorkerPhoto(WORKERS[0], false)}
                    alt={getDisplayWorkerName(WORKERS[0], false)}
                    className="w-14 h-14 rounded-xl object-cover border border-emerald-500/30 p-0.5 bg-slate-900"
                  />
                  <div>
                    <h4 className="font-bold text-white text-base">
                      {WORKERS[0].skill}
                    </h4>
                    <p className="text-xs text-emerald-400 font-medium">
                      {WORKERS[0].experience} experience
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs text-slate-300 flex items-center justify-between">
                  <span className="truncate text-slate-300 font-medium">
                    {WORKERS[0].cooperativeName}
                  </span>
                  <span className="font-bold text-amber-400 shrink-0 ml-2">
                    ★ 4.9
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Workers retain 100% earnings + cooperative dividends
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Managed & certified by Labour Cooperative Federation
                  </span>
                </div>
              </div>

              <Link
                to={`/book/${WORKERS[0].id}`}
                className="block text-center w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-md"
              >
                Book Verified Plumber →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES GRID WITH WORKER ROLE IMAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md mb-2 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> Skilled Trades
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Explore Skilled Service Roles
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select a trade role to view verified cooperative workers in your
              locality
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
          >
            View All Services{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComp = ICON_MAP[service.iconName] || Wrench;
            return (
              <Link
                key={service.id}
                to={`/services?category=${service.name}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Visual Role Image with Overlay Badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={`${service.name} working on site`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                  {/* Category Icon Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-emerald-700 flex items-center justify-center shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Worker Count Tag */}
                  <div className="absolute bottom-3 left-3 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {service.workerCount} Active Workers
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                      <span>{service.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Starts from
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₹{service.startingPrice}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* COOPERATIVE DIFFERENTIATOR SECTION - REWORKED */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              The Sahakaar Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Built for Workers, Trusted by Households
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Traditional aggregator apps charge up to 30% commission while
              exploiting tradespeople. Sahakaar connects you directly with
              democratically managed{" "}
              <strong className="text-white">
                Labour Cooperative Societies
              </strong>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/80 border border-slate-800 p-7 rounded-2xl space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Democratic Worker Ownership
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Workers are equal member-owners in registered Labour Cooperative
                Societies. They participate in board decisions and receive
                annual surplus dividends.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-7 rounded-2xl space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Cooperative Verification & Quality
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Skill testing, identity check, and work quality standards are
                supervised directly by the Labour Cooperative Federation to
                guarantee reliable service.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-7 rounded-2xl space-y-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Social Security & Fair Income
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Bookings support healthcare, pension funds, and emergency relief
                pools for trade workers, ensuring dignity and sustainable
                livelihoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPOTLIGHT WORKERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured Cooperative Workers
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Top-rated artisans with verified cooperative credentials
            </p>
          </div>
          <Link
            to="/services"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 hidden sm:flex items-center gap-1"
          >
            View All Workers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getDisplayWorkerPhoto(worker, false)}
                  alt={getDisplayWorkerName(worker, false)}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100 p-0.5 bg-emerald-50"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    {worker.skill}
                  </h4>
                  <p className="text-xs text-emerald-700 font-semibold">
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
                <p className="font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{worker.cooperativeName}</span>
                </p>
                <p className="text-slate-500 text-[11px] pl-5">
                  {worker.welfareStatus}
                </p>
              </div>

              <Link
                to={`/book/${worker.id}`}
                className="block text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                Book {worker.skill} (₹{worker.hourlyRate})
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              For Cooperative Officials
            </span>
            <h3 className="text-3xl font-extrabold text-white">
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow hover:shadow-lg transition-all text-center text-sm"
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
