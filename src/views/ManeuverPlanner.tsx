import React, { useState } from 'react';
import { Map as PathIcon, Fuel, Zap, Clock, ShieldCheck, ChevronRight, Play } from 'lucide-react';
import { mockSatellites } from '../mockData';
import { cn } from '../lib/utils';

export const ManeuverPlannerView = () => {
  const [selectedSat, setSelectedSat] = useState(mockSatellites[1]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Safe Path Finder</h2>
          <p className="text-slate-500">We help your satellite dodge trash with the least amount of fuel.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-bold text-emerald-600">SMART DODGE ACTIVE</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="card-simple p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Choose Your Satellite</h3>
            <div className="space-y-2">
              {mockSatellites.filter(s => s.type === 'Satellite').map(sat => (
                <button
                  key={sat.id}
                  onClick={() => setSelectedSat(sat)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all text-left",
                    selectedSat.id === sat.id 
                      ? "bg-blue-50 border-blue-200" 
                      : "bg-white border-transparent hover:bg-slate-50"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-400">{sat.id}</span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      sat.riskScore > 30 ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
                    )} />
                  </div>
                  <div className={cn(
                    "font-bold text-sm",
                    selectedSat.id === sat.id ? "text-blue-700" : "text-slate-700"
                  )}>
                    {sat.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card-simple p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Fuel Gas Tank</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-700">Propellant left</span>
                <span className="text-lg font-black text-blue-600">74%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '74%' }} />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed text-center">
                Enough for about 4 more years of dodging.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="card-simple p-10 bg-slate-900 text-white relative">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Recommended Move</span>
                  <h3 className="text-3xl font-bold mt-2">Dodge Path Alpha-4</h3>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-4 h-4" />
                      Move in: 12h 44m
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Fuel className="w-4 h-4" />
                      Fuel cost: Very Low
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center min-w-[160px]">
                  <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-1">Safety Success</div>
                  <div className="text-4xl font-black">99.8%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {[
                  { label: 'Push Needed', value: 'Light nudge', detail: 'Saves fuel' },
                  { label: 'Burn Time', value: '42 seconds', detail: 'Quick move' },
                  { label: 'New Height', value: '+4 km extra', detail: 'Higher orbit' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">{item.label}</div>
                    <div className="text-xl font-bold">{item.value}</div>
                    <div className="text-[10px] text-blue-400 mt-1 italic">{item.detail}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group">
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                  START AUTO DODGE
                </button>
                <button className="flex-1 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all">
                  Show Me The Path
                </button>
              </div>
            </div>
          </div>

          <div className="card-simple p-8">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Past Successful Moves
            </h3>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-700">Dodge Successful</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Applied on April {i + 10} // No problems found</div>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-slate-900 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
