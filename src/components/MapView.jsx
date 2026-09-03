import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function MapView({ 
  workers = [], 
  selectedWorker = null, 
  onSelectWorker,
  customerLoc = { lat: 21.1458, lng: 79.0882, name: 'Nagpur Central' }
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [customerLoc.lat, customerLoc.lng],
        zoom: 13,
        zoomControl: true
      });

      // OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Sahakaar'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    // 1. Add Customer Location Marker (Blue Pulsing Pin)
    const customerHtml = `
      <div className="relative flex items-center justify-center">
        <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></span>
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white shadow-lg font-bold text-xs">
          YOU
        </div>
      </div>
    `;
    const customerIcon = L.divIcon({
      html: customerHtml,
      className: 'custom-customer-pin',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const customerMarker = L.marker([customerLoc.lat, customerLoc.lng], { icon: customerIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-xs font-semibold text-slate-800">
          <p class="font-bold text-blue-700">📍 Your Location</p>
          <p class="text-slate-600 mt-0.5">${customerLoc.name}</p>
        </div>
      `);
    markersRef.current['customer'] = customerMarker;

    // 2. Add Worker Markers (Green Cooperative Pins)
    workers.forEach(worker => {
      const isSelected = selectedWorker?.id === worker.id;

      const workerHtml = `
        <div class="relative group cursor-pointer ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'} transition-transform">
          <div class="w-10 h-10 rounded-full border-2 ${isSelected ? 'border-amber-400 ring-4 ring-emerald-500/30' : 'border-emerald-600'} overflow-hidden bg-white shadow-md">
            <img src="${worker.photo}" alt="${worker.name}" class="w-full h-full object-cover" />
          </div>
          <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[9px] font-bold px-1 rounded shadow-sm whitespace-nowrap">
            ★ ${worker.rating}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: workerHtml,
        className: 'custom-worker-pin',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([worker.lat, worker.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div class="p-1 min-w-[200px]">
            <div class="flex items-center gap-2">
              <img src="${worker.photo}" class="w-10 h-10 rounded-lg object-cover border" />
              <div>
                <h4 class="font-bold text-sm text-slate-900 leading-tight">${worker.name}</h4>
                <p class="text-xs text-emerald-700 font-semibold">${worker.skill} • ${worker.distance} km</p>
              </div>
            </div>
            <p class="text-[11px] text-slate-500 mt-2 bg-emerald-50 border border-emerald-200 p-1.5 rounded font-medium">
              ✓ ${worker.cooperativeName}
            </p>
            <div class="mt-2 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">${worker.approxPrice}</span>
              <button 
                id="popup-btn-${worker.id}" 
                class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm"
              >
                Select & Book
              </button>
            </div>
          </div>
        `);

      marker.on('click', () => {
        if (onSelectWorker) onSelectWorker(worker);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${worker.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectWorker) onSelectWorker(worker);
            window.location.href = `#/book/${worker.id}`;
          };
        }
      });

      markersRef.current[worker.id] = marker;
    });

    // If selected worker is set, pan map
    if (selectedWorker && markersRef.current[selectedWorker.id]) {
      map.panTo([selectedWorker.lat, selectedWorker.lng], { animate: true });
      markersRef.current[selectedWorker.id].openPopup();
    }
  }, [workers, selectedWorker, customerLoc]);

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px] z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600 border border-white"></span>
          <span className="font-semibold text-slate-700">Your Location (Customer)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white"></span>
          <span className="font-semibold text-slate-700">Cooperative Worker Pin</span>
        </div>
      </div>
    </div>
  );
}
