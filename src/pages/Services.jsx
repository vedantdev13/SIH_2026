import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, WORKERS } from '../data/mockData';
import WorkerCard from '../components/WorkerCard';
import MapView from '../components/MapView';
import { 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  CheckCircle2, 
  Map as MapIcon, 
  List, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [minRating, setMinRating] = useState(0);
  const [onlyAvailableNow, setOnlyAvailableNow] = useState(false);
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'rating', 'price'

  // Selection & View Mode
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'map', 'list'

  // Customer Location (Nagpur Central default)
  const [customerLoc, setCustomerLoc] = useState({
    lat: 21.1458,
    lng: 79.0882,
    name: 'Sitabuldi, Nagpur (Customer Location)'
  });

  // Filtered & Sorted Workers
  const filteredWorkers = useMemo(() => {
    return WORKERS.filter(worker => {
      // Category match
      if (selectedCategory !== 'All' && (worker.skill || '').toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (worker.name || '').toLowerCase().includes(q);
        const matchesSkill = (worker.skill || '').toLowerCase().includes(q);
        const matchesCoop = (worker.cooperativeName || '').toLowerCase().includes(q);
        const matchesLocality = (worker.locality || '').toLowerCase().includes(q);
        if (!matchesName && !matchesSkill && !matchesCoop && !matchesLocality) return false;
      }
      // Distance filter
      if (worker.distance > maxDistance) return false;
      // Rating filter
      if (worker.rating < minRating) return false;
      // Availability
      if (onlyAvailableNow && worker.availability !== 'Available Now') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.hourlyRate - b.hourlyRate;
      return 0;
    });
  }, [selectedCategory, searchQuery, maxDistance, minRating, onlyAvailableNow, sortBy]);

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    if (catName === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxDistance(10);
    setMinRating(0);
    setOnlyAvailableNow(false);
    setSortBy('distance');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* PAGE HEADER */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3378BC] bg-[#3378BC]/10 px-2.5 py-1 rounded-md border border-[#3378BC]/20 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#3378BC]" />
            Verified Labour Cooperative Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Find Nearby Skilled Workers</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Showing verified cooperative trade workers around <strong className="text-slate-800">{customerLoc.name}</strong>
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto max-w-full overflow-x-auto">
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
              viewMode === 'split' ? 'bg-[#3378BC] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Map + List
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
              viewMode === 'map' ? 'bg-[#3378BC] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" /> Map Only
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap ${
              viewMode === 'list' ? 'bg-[#3378BC] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" /> List Only
          </button>
        </div>
      </div>

      {/* SERVICE CATEGORIES FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategoryChange('All')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-[#111827] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Trades ({WORKERS.length})
        </button>

        {SERVICES.map(s => (
          <button
            key={s.id}
            onClick={() => handleCategoryChange(s.name)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory.toLowerCase() === s.name.toLowerCase()
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* SEARCH BAR & MAIN FILTERS CONTROL */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Field */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skill, or cooperative..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20 focus:border-[#3378BC]"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3378BC]/20"
            >
              <option value="distance">Sort by: Nearest Distance</option>
              <option value="rating">Sort by: Highest Rating</option>
              <option value="price">Sort by: Lowest Price</option>
            </select>
          </div>

          {/* Distance Filter */}
          <div className="md:col-span-4 flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-600 shrink-0">Max Distance:</span>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
              className="w-full accent-[#3378BC] cursor-pointer"
            />
            <span className="text-xs font-extrabold text-[#3378BC] shrink-0 min-w-[45px]">
              {maxDistance} km
            </span>
          </div>

        </div>

        {/* Secondary Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-semibold">
              <input
                type="checkbox"
                checked={onlyAvailableNow}
                onChange={(e) => setOnlyAvailableNow(e.target.checked)}
                className="accent-[#3378BC] rounded"
              />
              ⚡ Available Now Only
            </label>

            <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-600">Rating:</span>
              {[0, 4.5, 4.8].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-2 py-0.5 rounded font-bold transition-colors ${
                    minRating === r ? 'bg-amber-400 text-slate-900' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      </div>

      {/* RESULTS COUNT & COOP BADGE */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Found <strong className="text-slate-900 font-bold">{filteredWorkers.length}</strong> verified cooperative workers
          {selectedCategory !== 'All' && <span> for <strong className="text-[#3378BC] font-bold">{selectedCategory}</strong></span>}
        </p>

        <div className="hidden sm:flex items-center gap-1 text-xs text-[#3378BC] font-semibold bg-[#3378BC]/10 px-2.5 py-1 rounded-md border border-[#3378BC]/20">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#3378BC]" />
          Sorted by nearest distance from Nagpur Central
        </div>
      </div>

      {/* MAIN MARKETPLACE CONTENT GRID */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAP COLUMN (Phase 3 Location Matching) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 z-0">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-[#3378BC]">
                  <MapPin className="w-4 h-4 text-[#3378BC]" /> Live Cooperative Worker Map
                </span>
                <span className="text-slate-400 font-normal">Click marker to inspect worker</span>
              </div>

              <div className="h-[350px] sm:h-[450px] lg:h-[520px]">
                <MapView
                  workers={filteredWorkers}
                  selectedWorker={selectedWorker}
                  onSelectWorker={setSelectedWorker}
                  customerLoc={customerLoc}
                />
              </div>
            </div>
          </div>

          {/* WORKER CARDS COLUMN (Phase 2 Service Marketplace) */}
          <div className="lg:col-span-6 space-y-4">
            {filteredWorkers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No Workers Match Filters</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Try adjusting your distance slider or resetting category filters to see more cooperative tradespeople.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#3378BC] hover:bg-[#28639d] text-white font-bold text-sm rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredWorkers.map(worker => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  isSelected={selectedWorker?.id === worker.id}
                  onSelect={() => setSelectedWorker(worker)}
                />
              ))
            )}
          </div>

        </div>
      )}

      {viewMode === 'map' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="h-[650px]">
            <MapView
              workers={filteredWorkers}
              selectedWorker={selectedWorker}
              onSelectWorker={setSelectedWorker}
              customerLoc={customerLoc}
            />
          </div>
        </div>
      )}

      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map(worker => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              isSelected={selectedWorker?.id === worker.id}
              onSelect={() => setSelectedWorker(worker)}
            />
          ))}
        </div>
      )}

    </div>
  );
}
