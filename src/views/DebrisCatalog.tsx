import React from 'react';
import { Database, Search, Filter, ExternalLink, Satellite, Info } from 'lucide-react';
import { mockSatellites } from '../mockData';
import { cn } from '../lib/utils';

export const DebrisCatalogView = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Space Trash List</h2>
          <p className="text-slate-500">A full database of broken satellites and rocket parts currently in space.</p>
        </div>
        <div className="p-1 bg-white rounded-xl shadow-sm border border-slate-100 flex">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">ALL TRASH</button>
          <button className="px-4 py-2 text-slate-400 text-xs font-bold hover:text-slate-600">ROCKET PARTS</button>
          <button className="px-4 py-2 text-slate-400 text-xs font-bold hover:text-slate-600">SMALL PIECES</button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search for an object by name or number..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all shadow-sm"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <Filter className="w-4 h-4 text-blue-500" />
          Sort & Filter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockSatellites.map((obj) => (
          <div key={obj.id} className="card-simple p-8 group hover:border-blue-200 transition-all hover:shadow-lg hover:shadow-blue-50">
            <div className="flex justify-between items-start mb-8">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
                obj.type === 'Satellite' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
              )}>
                {obj.type === 'Satellite' ? <Satellite className="w-6 h-6" /> : <Database className="w-6 h-6" />}
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{obj.id}</span>
            </div>
            
            <h3 className="font-black text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{obj.name}</h3>
            <div className="flex items-center gap-2 mb-8">
              <span className={cn(
                "status-tag",
                obj.type === 'Satellite' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
              )}>
                {obj.type}
              </span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[10px] text-slate-400 font-bold">STAYING STEADY</span>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-50">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Orbit Height</p>
                <p className="text-sm font-black text-slate-700">{obj.orbit.altitude} km</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Breakdown</p>
                <p className="text-sm font-black text-slate-700">0.02m / day</p>
              </div>
            </div>

            <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-[10px] font-black text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              VIEW DETAILS <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        ))}

        <div className="card-simple p-8 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center opacity-70">
           <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
              <Info className="w-8 h-8 text-blue-200" />
           </div>
           <p className="text-sm font-bold text-slate-400">Searching for more trash...</p>
           <p className="text-[10px] text-slate-300 font-bold uppercase mt-1">Scanning 34,000+ items</p>
        </div>
      </div>
    </div>
  );
};
