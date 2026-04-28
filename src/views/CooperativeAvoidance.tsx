import React from 'react';
import { Zap, Share2, ShieldCheck, ArrowRight, Cpu, LayoutGrid } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const TeamCard = ({ title, nodes, status, safety }: any) => (
  <div className="card-simple p-6 hover:shadow-md transition-all border-l-4 border-l-blue-500">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 inline-block",
          status === 'Ready' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
        )}>
          {status}
        </span>
      </div>
      <div className="text-right">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety Score</div>
        <div className="text-xl font-black text-emerald-600">{safety}%</div>
      </div>
    </div>
    
    <div className="flex items-center justify-center gap-4 py-6 bg-slate-50 rounded-xl my-6">
      {nodes.map((node: string, i: number) => (
        <React.Fragment key={node}>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-1 shadow-sm">
              <Cpu className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-[9px] font-bold text-slate-400">{node}</span>
          </div>
          {i < nodes.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300" />}
        </React.Fragment>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-3">
      <button className="py-2.5 rounded-lg border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors">
        Double Check
      </button>
      <button className="py-2.5 rounded-lg bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
        Start Team Move
      </button>
    </div>
  </div>
);

export const CooperativeAvoidanceView = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Team Avoidance AI</h2>
          <p className="text-slate-500 max-w-xl">
            We make sure that when one satellite moves, it doesn't accidentally get in the way of others. Like a coordinated dance in space!
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
           <LayoutGrid className="w-8 h-8 text-blue-600" />
           <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team Sync</div>
              <div className="text-lg font-black text-emerald-600">ALL GREEN</div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card-simple p-10 bg-white relative">
             <div className="flex items-center justify-between mb-10">
                <h3 className="font-bold text-xl text-slate-900 flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-blue-600" />
                  Live Team Network
                </h3>
                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase">
                  Connected: 14 Satellites
                </div>
             </div>

             <div className="relative h-64 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center overflow-hidden">
                {/* Visual Representation */}
                <div className="relative flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="w-56 h-56 border-2 border-dashed border-blue-200 rounded-full flex items-center justify-center"
                  >
                    <div className="w-36 h-36 border-2 border-dashed border-blue-100 rounded-full" />
                  </motion.div>
                  
                  <div className="absolute flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-200 ring-8 ring-blue-50">
                      <Zap className="text-white w-8 h-8" />
                    </div>
                  </div>

                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-md"
                      style={{ 
                        left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 110}px)`,
                        top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 110}px)` 
                      }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                </div>
             </div>

             <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="text-[10px] font-bold text-blue-400 uppercase mb-1">Group Strength</div>
                  <div className="text-2xl font-black text-blue-700">14 Satellites</div>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Safety Boost</div>
                  <div className="text-2xl font-black text-emerald-700">+92% Safer</div>
                </div>
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="text-[10px] font-bold text-amber-400 uppercase mb-1">Team Delay</div>
                  <div className="text-2xl font-black text-amber-700">&lt; 1ms</div>
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest px-2">Planned Group Moves</h3>
            <TeamCard 
              title="Blue Cluster Shuffle" 
              nodes={['SAT-1', 'SAT-2', 'SAT-3']} 
              status="Ready" 
              safety={99} 
            />
            <TeamCard 
              title="Wide Space Sweep" 
              nodes={['ALPHA', 'BETA', 'GAMMA']} 
              status="Checking" 
              safety={94} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-simple p-8 bg-emerald-50 border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Safety Checkboard
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Clear of others', checked: true },
                { label: 'Fuel matches', checked: true },
                { label: 'Wait time: None', checked: true },
                { label: 'AI Confirmed', checked: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-emerald-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-simple p-8">
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-[10px] tracking-widest">Team Activity Feed</h4>
            <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="py-3 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />
                    <span className="text-[10px] font-bold text-blue-600">CONNECTED</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-700 leading-tight">
                    Satellite #{i * 10} joined the safe team network.
                  </p>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1">TIME: 14:0{i} PM</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
