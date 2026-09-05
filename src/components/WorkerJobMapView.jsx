import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';

export default function WorkerJobMapView({
  jobs = [],
  selectedJob = null,
  onSelectJob,
  workerLocation = { lat: 21.1458, lng: 79.0882, name: 'Nagpur Central' }
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Reset Leaflet DOM container if previous map instance was destroyed
    if (mapContainerRef.current._leaflet_id && !mapInstanceRef.current) {
      mapContainerRef.current._leaflet_id = null;
      mapContainerRef.current.innerHTML = '';
    }

    // Initialize Leaflet map if not already created
    if (!mapInstanceRef.current) {
      try {
        const map = L.map(mapContainerRef.current, {
          center: [workerLocation.lat, workerLocation.lng],
          zoom: 13,
          zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Sahakaar Work Map'
        }).addTo(map);

        mapInstanceRef.current = map;
      } catch (err) {
        console.warn('Leaflet map initialization bypassed:', err);
      }
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => {
      try { map.removeLayer(m); } catch (e) {}
    });
    markersRef.current = {};

    // 1. Add Worker Current Base Location Marker (Blue Pulse)
    const workerHtml = `
      <div className="relative flex items-center justify-center">
        <span className="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-ping"></span>
        <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center border-2 border-white shadow-lg font-bold text-[10px]">
          YOU
        </div>
      </div>
    `;
    const workerIcon = L.divIcon({
      html: workerHtml,
      className: 'custom-worker-base-pin',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const workerMarker = L.marker([workerLocation.lat, workerLocation.lng], { icon: workerIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-xs font-semibold text-slate-800 p-1">
          <p class="font-bold text-emerald-800">📍 Your Base Location</p>
          <p class="text-slate-600 mt-0.5">${workerLocation.name}</p>
        </div>
      `);
    markersRef.current['worker_base'] = workerMarker;

    // 2. Add Customer Work Site Markers
    jobs.forEach((job, index) => {
      // Default coordinates centered around Nagpur localities if job.lat/lng missing
      const fallbackLats = [21.1468, 21.1520, 21.1390, 21.1550, 21.1410];
      const fallbackLngs = [79.0882, 79.0820, 79.0950, 79.0750, 79.0830];

      const lat = job.lat || fallbackLats[index % fallbackLats.length];
      const lng = job.lng || fallbackLngs[index % fallbackLngs.length];

      const isSelected = selectedJob?.id === job.id;
      const status = job.status || 'Assigned';

      let statusColorClass = 'bg-amber-500 border-amber-600';
      if (status === 'In Progress') statusColorClass = 'bg-purple-600 border-purple-700';
      if (status === 'Completed') statusColorClass = 'bg-emerald-600 border-emerald-700';

      const jobPinHtml = `
        <div class="relative group cursor-pointer ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'} transition-transform">
          <div class="w-9 h-9 rounded-full ${statusColorClass} text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
            📍
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono font-bold px-1 py-0.2 rounded shadow-sm whitespace-nowrap">
            ${job.id}
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: jobPinHtml,
        className: 'custom-job-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

      const marker = L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div class="p-1 min-w-[220px]">
            <div class="flex items-center justify-between gap-1 text-[11px] font-bold border-b border-slate-100 pb-1.5 mb-1.5">
              <span class="text-slate-900 font-mono">${job.id}</span>
              <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">${status}</span>
            </div>
            <h4 class="font-extrabold text-slate-900 text-sm leading-tight">${job.customerName || 'Customer'}</h4>
            <p class="text-xs text-slate-600 mt-1 flex items-center gap-1">
              📞 <strong>${job.customerPhone || 'N/A'}</strong>
            </p>
            <p class="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
              📍 ${job.address || 'Service Location'}
            </p>
            ${job.problem ? `<p class="text-[11px] text-slate-500 italic mt-1 bg-slate-50 p-1.5 rounded">"${job.problem}"</p>` : ''}
            
            <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <span class="text-xs font-extrabold text-emerald-700">${job.amount || '₹349'}</span>
              <a 
                href="${googleMapsUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                style="color: #ffffff !important; text-decoration: none !important;"
                class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5"
              >
                🗺️ Navigate GPS →
              </a>
            </div>
          </div>
        `);

      marker.on('click', () => {
        if (onSelectJob) onSelectJob(job);
      });

      markersRef.current[job.id] = marker;
    });

    // Auto-pan if selectedJob changes
    if (selectedJob && markersRef.current[selectedJob.id]) {
      map.panTo(markersRef.current[selectedJob.id].getLatLng(), { animate: true });
      markersRef.current[selectedJob.id].openPopup();
    }
  }, [jobs, selectedJob, workerLocation]);

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner z-0 isolate">
      <div ref={mapContainerRef} className="w-full h-full min-h-[300px] sm:min-h-[380px] z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-xl shadow-md border border-slate-200 text-xs space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-700 border border-white"></span>
          <span className="font-bold text-slate-800">Your Base Location</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
          <span className="font-semibold text-slate-700">Assigned Job Site</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-600 border border-white"></span>
          <span className="font-semibold text-slate-700">In Progress Job</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white"></span>
          <span className="font-semibold text-slate-700">Completed Job</span>
        </div>
      </div>
    </div>
  );
}
