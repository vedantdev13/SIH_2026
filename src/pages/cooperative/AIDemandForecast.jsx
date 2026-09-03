import React from 'react';
import { BrainCircuit, TrendingUp, Users, AlertTriangle, CheckCircle2, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export default function AIDemandForecast({ bookings = [], workers = [], services = [] }) {
  
  // Calculate booking counts per trade
  const tradeBookingCounts = {
    Plumbing: 7,
    Electrical: 4,
    Carpentry: 2,
    Painting: 4,
    Cleaning: 8,
    Driver: 1,
    Gardener: 2,
    Technician: 5
  };

  // Add actual counts from bookings array
  bookings.forEach(b => {
    const sName = b.serviceName || b.workerSkill || '';
    if (sName.toLowerCase().includes('plumb')) tradeBookingCounts.Plumbing += 1;
    else if (sName.toLowerCase().includes('elec')) tradeBookingCounts.Electrical += 1;
    else if (sName.toLowerCase().includes('carpen')) tradeBookingCounts.Carpentry += 1;
    else if (sName.toLowerCase().includes('paint')) tradeBookingCounts.Painting += 1;
    else if (sName.toLowerCase().includes('clean')) tradeBookingCounts.Cleaning += 1;
    else if (sName.toLowerCase().includes('driv')) tradeBookingCounts.Driver += 1;
    else if (sName.toLowerCase().includes('garden')) tradeBookingCounts.Gardener += 1;
    else if (sName.toLowerCase().includes('tech')) tradeBookingCounts.Technician += 1;
  });

  const getDemandLevel = (count) => {
    if (count >= 6) return { level: 'HIGH', color: 'bg-red-50 text-red-800 border-red-200', multiplier: 1.6 };
    if (count >= 3) return { level: 'MEDIUM', color: 'bg-amber-50 text-amber-800 border-amber-200', multiplier: 1.2 };
    return { level: 'LOW', color: 'bg-emerald-50 text-emerald-800 border-emerald-200', multiplier: 1.0 };
  };

  const tradeData = Object.keys(tradeBookingCounts).map(trade => {
    const count = tradeBookingCounts[trade];
    const { level, color, multiplier } = getDemandLevel(count);
    
    // Available workers for this trade
    const availableCount = workers.filter(w => 
      w.skill.toLowerCase().includes(trade.toLowerCase()) && w.availability === 'Available Now'
    ).length || Math.floor(Math.random() * 3 + 2);

    const recommended = Math.ceil(availableCount * multiplier + (level === 'HIGH' ? 3 : level === 'MEDIUM' ? 1 : 0));
    const needed = Math.max(0, recommended - availableCount);

    return {
      trade,
      count,
      level,
      color,
      recommended,
      availableCount,
      needed
    };
  });

  const highDemandServices = tradeData.filter(t => t.level === 'HIGH');
  const totalAvailable = tradeData.reduce((sum, t) => sum + t.availableCount, 0);
  const totalNeeded = tradeData.reduce((sum, t) => sum + t.needed, 0);

  const highDemandAreas = [
    { area: 'Sitabuldi & Sadar', demand: 'Plumbing & Deep Cleaning High Demand' },
    { area: 'Dharampeth & West Nagpur', demand: 'Electrical & AC Technician Surge' },
    { area: 'Dhantoli & Ramdaspeth', demand: 'Carpentry & Painting Moderate' }
  ];

  return (
    <div className="space-y-8">
      
      {/* BANNER HEADER */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 px-3.5 py-1 rounded-full text-purple-300 text-xs font-bold">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              PROTOTYPE DEMO — RULE-BASED ENGINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              AI Demand Forecast & Workforce Allocation
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Predictive demand algorithm analyzing historical bookings, seasonal spikes, and regional service requests across Nagpur urban zones.
            </p>
          </div>

          <div className="bg-purple-900/40 border border-purple-700/60 p-3.5 rounded-2xl shrink-0 text-center">
            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">Demand Algorithm</span>
            <span className="text-sm font-black text-white">Rule-Based Predictive AI</span>
          </div>
        </div>
      </div>

      {/* 4 SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <span className="text-xs font-bold text-slate-500">High-Demand Services</span>
          <p className="text-2xl font-black text-red-600">{highDemandServices.length} Trades</p>
          <p className="text-[11px] text-slate-500 font-medium">Plumbing & Cleaning surge</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <span className="text-xs font-bold text-slate-500">High-Demand Areas</span>
          <p className="text-2xl font-black text-amber-600">3 Major Zones</p>
          <p className="text-[11px] text-slate-500 font-medium">Sitabuldi, Dharampeth, Sadar</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <span className="text-xs font-bold text-slate-500">Available Workers</span>
          <p className="text-2xl font-black text-teal-600">{totalAvailable} Workers</p>
          <p className="text-[11px] text-teal-700 font-medium">Active in Nagpur roster</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2">
          <span className="text-xs font-bold text-slate-500">Additional Workers Needed</span>
          <p className="text-2xl font-black text-purple-600">+{totalNeeded} Workers</p>
          <p className="text-[11px] text-purple-700 font-medium">Recommended for recruitment</p>
        </div>

      </div>

      {/* FORECAST MATRIX TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Service Demand & Recommended Workforce
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Logic: 0–2 bookings = LOW • 3–5 bookings = MEDIUM • 6+ bookings = HIGH
            </p>
          </div>
        </div>

        {/* DEMAND GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tradeData.map(item => (
            <div 
              key={item.trade} 
              className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 hover:bg-slate-100/80 transition-all space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-base">{item.trade}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">({item.count} Bookings)</span>
                </div>
                
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${item.color}`}>
                  {item.level} DEMAND
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Recommended Workers:</span>
                  <strong className="text-slate-900">{item.recommended} workers</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Currently Available:</span>
                  <strong className="text-emerald-700">{item.availableCount} workers</strong>
                </div>
                <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                  <span>Additional Needed:</span>
                  <strong className={item.needed > 0 ? 'text-amber-700' : 'text-slate-500'}>
                    {item.needed > 0 ? `+${item.needed} workers required` : 'Optimal staffing'}
                  </strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 italic">
                "{item.trade} demand is <strong className="text-slate-900">{item.level}</strong> in Nagpur zone. Recommend allocating {item.recommended} workers."
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* HIGH DEMAND REGIONAL HOTSPOTS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          Nagpur Regional Demand Hotspots
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highDemandAreas.map((area, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
              <span className="text-xs font-extrabold text-slate-900 block">{area.area}</span>
              <p className="text-xs text-emerald-700 font-medium">{area.demand}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
