import React, { useState } from 'react';
import { Wrench, Users, CheckCircle2, XCircle, Power, Eye, Search } from 'lucide-react';
import { toggleServiceApi } from '../../api/apiClient';

export default function CooperativeServices({ services = [], setServices, workers = [] }) {
  const [selectedServiceForWorkers, setSelectedServiceForWorkers] = useState(null);

  const handleToggleActive = async (serviceId, currentActive) => {
    const nextState = !currentActive;
    const updated = await toggleServiceApi(serviceId, nextState);
    if (updated) {
      setServices(updated);
    } else {
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, active: nextState } : s));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">Cooperative Service Offerings</h2>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {services.length} Services Cataloged
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage base pricing, active availability, and allocated cooperative member workforce per service trade.
          </p>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(srv => {
          const serviceWorkers = workers.filter(w => w.skill.toLowerCase() === srv.name.toLowerCase() || srv.id.includes(w.skill.toLowerCase()));
          const isActive = srv.active !== false;

          return (
            <div 
              key={srv.id} 
              className={`bg-slate-950 border rounded-3xl p-6 transition-all space-y-4 flex flex-col justify-between ${
                isActive ? 'border-slate-800 hover:border-slate-700' : 'border-red-900/40 opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {srv.image && (
                      <img src={srv.image} alt={srv.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700" />
                    )}
                    <div>
                      <h3 className="font-extrabold text-white text-lg">{srv.name}</h3>
                      <span className="text-xs font-bold text-emerald-400">
                        Base Price: ₹{srv.startingPrice || srv.basePrice || 299}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleActive(srv.id, isActive)}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                      isActive 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30' 
                        : 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30'
                    }`}
                    title="Click to toggle active status"
                  >
                    <Power className="w-4 h-4" />
                    {isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {srv.description}
                </p>

                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Available Co-op Workers:</span>
                  <span className="font-extrabold text-white bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                    {serviceWorkers.length || srv.workerCount || 25} Workers
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => setSelectedServiceForWorkers(srv)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4 text-emerald-400" /> View Workers for {srv.name}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* WORKERS FOR SERVICE MODAL */}
      {selectedServiceForWorkers && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-white text-lg">Workers for {selectedServiceForWorkers.name}</h3>
                <p className="text-xs text-slate-400">Registered member workers in this trade category</p>
              </div>
              <button onClick={() => setSelectedServiceForWorkers(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {workers
                .filter(w => w.skill.toLowerCase() === selectedServiceForWorkers.name.toLowerCase() || selectedServiceForWorkers.id.includes(w.skill.toLowerCase()))
                .map(w => (
                  <div key={w.id} className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={w.photo} className="w-10 h-10 rounded-xl object-cover border" />
                      <div>
                        <h4 className="font-bold text-xs text-white">{w.name}</h4>
                        <p className="text-[11px] text-emerald-400">{w.experience} • ★ {w.rating}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                      {w.availability}
                    </span>
                  </div>
                ))
              }
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-800">
              <button onClick={() => setSelectedServiceForWorkers(null)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
