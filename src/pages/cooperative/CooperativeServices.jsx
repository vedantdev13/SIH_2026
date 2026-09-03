import React, { useState } from 'react';
import { Wrench, Users, CheckCircle2, XCircle, Power, Eye, Search, Plus } from 'lucide-react';
import { toggleServiceApi } from '../../api/apiClient';

export default function CooperativeServices({ services = [], setServices, workers = [] }) {
  const [selectedServiceForWorkers, setSelectedServiceForWorkers] = useState(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('399');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  const handleToggleActive = async (serviceId, currentActive) => {
    const nextState = !currentActive;
    const updated = await toggleServiceApi(serviceId, nextState);
    if (updated) {
      setServices(updated);
    } else {
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, active: nextState } : s));
    }
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const newServiceObj = {
      id: `service-${Date.now()}`,
      name: newServiceName,
      iconName: 'Wrench',
      description: newServiceDesc || `${newServiceName} inspection, diagnostics, and repairs.`,
      startingPrice: parseInt(newServicePrice) || 399,
      basePrice: parseInt(newServicePrice) || 399,
      workerCount: 15,
      active: true,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
    };

    if (setServices) {
      setServices(prev => [...prev, newServiceObj]);
    }
    setShowAddServiceModal(false);
    setNewServiceName('');
    setNewServiceDesc('');
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Cooperative Service Offerings</h2>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {services.length} Services Cataloged
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage base pricing, active availability, and allocated cooperative member workforce per service trade.
          </p>
        </div>

        <button
          onClick={() => setShowAddServiceModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Service Category
        </button>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(srv => {
          const serviceWorkers = workers.filter(w => (w.skill || '').toLowerCase() === srv.name.toLowerCase() || srv.id.includes((w.skill || '').toLowerCase()));
          const isActive = srv.active !== false;

          return (
            <div 
              key={srv.id} 
              className={`bg-white border rounded-3xl p-6 transition-all space-y-4 flex flex-col justify-between shadow-sm ${
                isActive ? 'border-slate-200 hover:shadow-md' : 'border-red-200 bg-red-50/20 opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {srv.image && (
                      <img src={srv.image} alt={srv.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                    )}
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{srv.name}</h3>
                      <span className="text-xs font-bold text-emerald-700">
                        Base Price: ₹{srv.startingPrice || srv.basePrice || 299}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleActive(srv.id, isActive)}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' 
                        : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                    }`}
                    title="Click to toggle active status"
                  >
                    <Power className="w-4 h-4" />
                    {isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {srv.description}
                </p>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Available Co-op Workers:</span>
                  <span className="font-extrabold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm">
                    {serviceWorkers.length || srv.workerCount || 25} Workers
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedServiceForWorkers(srv)}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Eye className="w-4 h-4 text-emerald-600" /> View Workers for {srv.name}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* WORKERS FOR SERVICE MODAL */}
      {selectedServiceForWorkers && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Workers for {selectedServiceForWorkers.name}</h3>
                <p className="text-xs text-slate-500">Registered member workers in this trade category</p>
              </div>
              <button onClick={() => setSelectedServiceForWorkers(null)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {workers
                .filter(w => (w.skill || '').toLowerCase() === selectedServiceForWorkers.name.toLowerCase() || selectedServiceForWorkers.id.includes((w.skill || '').toLowerCase()))
                .map(w => (
                  <div key={w.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={w.photo} className="w-10 h-10 rounded-xl object-cover border" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{w.name}</h4>
                        <p className="text-[11px] text-emerald-700">{w.experience} • ★ {w.rating}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {w.availability}
                    </span>
                  </div>
                ))
              }
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button onClick={() => setSelectedServiceForWorkers(null)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW SERVICE MODAL */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Add New Service Offering</h3>
              <button onClick={() => setShowAddServiceModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleAddService} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Service Category Name</label>
                <input
                  type="text"
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. Solar Panel Maintenance"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Starting Base Visit Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  placeholder="e.g. 399"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
                <textarea
                  rows={3}
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="Describe service scope and inclusions..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
                >
                  Add Service Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
