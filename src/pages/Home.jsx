import React from "react";
import { Link } from "react-router-dom";
import { SERVICES, WORKERS } from "../data/mockData";
import {
  getDisplayWorkerName,
  getDisplayWorkerPhoto,
} from "../utils/privacyUtils";
import {
  ShieldCheck,
  Users,
  HeartHandshake,
  Search,
  Star,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles as CleaningIcon,
  Car,
  Flower2,
  Tv,
  Building2,
  ChevronRight,
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
    <div className="bg-slate-50">

      {/* ══════════════════════════════════════════════════════
          BLUE BACKGROUND LAYER — sits behind the white hero
          The white hero has rounded-b corners; this blue
          background fills the gaps outside those curves.
      ══════════════════════════════════════════════════════ */}
      <div className="bg-[#3378BC]">

        {/* WHITE HERO — sits ON TOP of the blue background */}
        <section className="relative bg-white text-[#111827] pt-12 pb-24 px-4 sm:px-6 lg:px-8 rounded-b-[4rem] sm:rounded-b-[5rem] lg:rounded-b-[7rem] overflow-hidden z-10 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)]">
          <div className="max-w-7xl mx-auto">

            {/* ── HERO GRID: Left text (7 cols) / Right image (5 cols) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch min-h-[520px] lg:min-h-[580px]">

              {/* LEFT: Editorial Text Column */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:pr-12 xl:pr-20 py-4">

                {/* Eyebrow label */}
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#3378BC]" />
                  <span className="text-xs font-mono font-bold text-[#3378BC] uppercase tracking-[0.18em]">
                    Verifiable Labour Network
                  </span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-[6rem] font-black text-[#111827] tracking-tight leading-[0.92]">
                  Local Skilled<br />
                  Artisans.{" "}
                  <span className="text-[#3378BC]">Direct<br className="hidden sm:inline" /> Fair Wages.</span>
                </h1>

                {/* Supporting copy */}
                <p className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed">
                  Book background-verified trade professionals directly from
                  registered{" "}
                  <strong className="text-[#111827] font-semibold">Labour Cooperatives</strong>.
                  100% direct earnings &amp; member benefits.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 bg-[#3378BC] hover:bg-[#28639d] text-white font-bold px-7 py-4 rounded-xl shadow-md shadow-[#3378BC]/25 transition-colors text-base"
                  >
                    <Search className="w-5 h-5 shrink-0" />
                    Find Nearby Workers
                  </Link>
                  <Link
                    to="/cooperative"
                    className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-slate-100 text-[#111827] font-bold px-6 py-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-colors text-base"
                  >
                    <Building2 className="w-5 h-5 text-[#3378BC] shrink-0" />
                    Cooperative Portal
                  </Link>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-8 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-3xl font-black text-[#111827] leading-none block">500+</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">Verified Artisans</span>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div>
                    <span className="text-3xl font-black text-[#111827] leading-none block">100%</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">Co-op Owned</span>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div>
                    <span className="text-3xl font-black text-[#3378BC] leading-none block">4.9★</span>
                    <span className="text-xs text-slate-400 font-medium mt-0.5 block">Average Rating</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Plumber Image with Editorial Profile Overlay */}
              <div className="lg:col-span-5 relative flex items-stretch">
                {/* Image Container */}
                <div className="relative w-full rounded-3xl overflow-hidden bg-slate-100 group
                               min-h-[360px] sm:min-h-[440px] lg:min-h-0">

                  {/* Plumber image */}
                  <img
                    src="/images/hero/plumber.png"
                    alt="Skilled Plumber Artisan"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80";
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                  />

                  {/* Dark gradient overlay from bottom-left — preserves face/body */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/75 via-[#111827]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />

                  {/* EDITORIAL PROFILE — lives in the left negative space */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                    {/* Name */}
                    <div className="space-y-1">
                      <p className="text-white/60 text-xs font-mono font-bold uppercase tracking-[0.2em]">
                        Featured Artisan
                      </p>
                      <h2 className="text-white font-black text-3xl sm:text-4xl leading-none tracking-tight">
                        Ramesh<br />Kumar
                      </h2>
                    </div>

                    {/* Divider */}
                    <div className="my-4 w-12 h-0.5 bg-[#3378BC]" />

                    {/* Role & Experience */}
                    <div className="space-y-2">
                      <p className="text-white font-bold text-base tracking-wide">
                        Master Plumber
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-white font-black text-2xl leading-none">6</span>
                        <span className="text-white/60 text-sm font-medium">yrs experience</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#F2B84B] fill-[#F2B84B] shrink-0" />
                      <span className="text-white font-black text-xl leading-none">4.9</span>
                      <span className="text-white/50 text-xs font-medium">/ 5.0 · Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BLUE CONTENT AREA — immediately below white hero
            Both "Sahakaar Advantage" AND "Explore Skill Services"
            live inside this continuous blue visual chapter.
        ══════════════════════════════════════════════════════ */}

        {/* THE SAHAKAAR ADVANTAGE */}
        <section
          onMouseMove={handleGridMouseMove}
          className="dark-grid-bg relative text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
        >
          <div className="dark-grid-lines" />
          <div className="dark-grid-glow" />

          <div className="max-w-7xl mx-auto space-y-14 relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl space-y-4">
              <span className="text-[#F2B84B] text-xs font-mono font-bold uppercase tracking-[0.2em]">
                Core Idea
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                The Sahakaar<br className="hidden sm:inline" /> Advantage
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                Democratically governed labour cooperatives connecting
                households directly with skilled artisans. No middleman
                exploitation.
              </p>
            </div>

            {/* Feature Cards — distinct cards with gap */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-8 space-y-5">
                <div className="w-10 h-10 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-white leading-snug">
                  Democratic Worker Ownership
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  Workers are equal member-owners in registered Labour
                  Cooperative Societies. They participate in board elections and
                  receive annual surplus dividends.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-8 space-y-5">
                <div className="w-10 h-10 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-white leading-snug">
                  Cooperative Verification
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  Skill testing, identity check, and work quality standards are
                  supervised directly by the Labour Cooperative Federation to
                  guarantee reliable service.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-8 space-y-5">
                <div className="w-10 h-10 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-white leading-snug">
                  Social Security &amp; Welfare
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  Bookings support healthcare, pension funds, and emergency
                  relief pools for trade workers, ensuring dignity and
                  sustainable livelihoods.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
      {/* ── END OF BLUE VISUAL CHAPTER — only Advantage is blue ── */}

      {/* EXPLORE SKILL SERVICES & ROLES — WHITE SECTION */}
      {/* Intentional breathing room: py-20 top padding creates the white gap after blue */}
      <section className="bg-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-[#3378BC] text-xs font-mono font-bold uppercase tracking-[0.2em]">
                Trade Roles Directory
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#111827] tracking-tight">
                Explore Skill Services &amp; Roles
              </h2>
              <p className="text-slate-500 text-base max-w-lg">
                Select a trade role to view verified cooperative artisans in your locality.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#3378BC] hover:text-[#28639d] font-bold text-sm transition-colors group shrink-0"
            >
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Services Grid — white background, ink text, blue accents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service) => {
              const IconComp = ICON_MAP[service.iconName] || Wrench;
              return (
                <Link
                  key={service.id}
                  to={`/services?category=${service.name}`}
                  className="group bg-white rounded-xl border-2 border-slate-200 hover:border-[#3378BC] hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={`${service.name} working on site`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 text-[#3378BC] flex items-center justify-center shadow-sm">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-3 left-3 text-white text-[11px] font-bold px-2 py-0.5 bg-[#111827]/80 rounded">
                      {service.workerCount} Artisans
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[#111827] group-hover:text-[#3378BC] transition-colors leading-snug">
                        {service.name}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#3378BC] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-slate-400 text-xs">From</span>
                      <span className="font-black text-[#111827] text-lg">₹{service.startingPrice}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT WORKERS — white section after blue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-[#3378BC] text-xs font-mono font-bold uppercase tracking-[0.2em]">
              Cooperative Members
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#111827] tracking-tight">
              Featured Artisans
            </h2>
            <p className="text-slate-500 text-base">
              Top-rated artisans with verified cooperative credentials
            </p>
          </div>
          <Link
            to="/services"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#3378BC] hover:text-[#28639d] transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WORKERS.slice(0, 3).map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-xl border-2 border-slate-200 p-7 space-y-5 hover:border-slate-300 hover:shadow-md transition-all duration-200"
            >
              {/* Worker Header */}
              <div className="flex items-center gap-4">
                <img
                  src={getDisplayWorkerPhoto(worker, false)}
                  alt={getDisplayWorkerName(worker, false)}
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-200"
                />
                <div>
                  <h4 className="font-black text-[#111827] text-lg leading-tight">{worker.skill}</h4>
                  <p className="text-[#3378BC] text-xs font-bold mt-0.5">{worker.experience} experience</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-[#F2B84B] fill-[#F2B84B]" />
                    <span className="text-xs font-bold text-[#111827]">{worker.rating}</span>
                    <span className="text-xs text-slate-400">({worker.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Cooperative Tag */}
              <div className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#3378BC] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#111827] truncate">{worker.cooperativeName}</p>
                  <p className="text-slate-400 mt-0.5">{worker.welfareStatus}</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/book/${worker.id}`}
                className="block text-center py-3 rounded-xl border-2 border-[#3378BC] text-[#3378BC] hover:bg-[#3378BC] hover:text-white font-bold text-sm transition-colors"
              >
                Book · ₹{worker.hourlyRate}/hr
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION — Cooperative Officer */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111827] text-white p-10 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <span className="text-[#3378BC] text-xs font-mono font-bold uppercase tracking-[0.2em]">
                For Cooperative Officers
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Are you a Labour<br /> Cooperative Officer?
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Register your Labour Cooperative Society or Federation on
                Sahakaar. Manage workforce allocation, receive direct customer
                bookings, and automate member welfare contributions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/cooperative"
                className="inline-flex items-center justify-center gap-2 bg-[#3378BC] hover:bg-[#28639d] text-white font-bold px-7 py-4 transition-colors text-sm"
              >
                Open Cooperative Portal
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-7 py-4 transition-colors text-sm"
              >
                Register Cooperative
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
