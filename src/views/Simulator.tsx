import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, ShieldCheck, ArrowRight, RotateCcw, Clock, Target, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Step = 'WATCH' | 'ALERT' | 'FIXED' | 'IMPACTED';

export const SimulatorView = () => {
  const [step, setStep] = useState<Step>('WATCH');
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState({ speed: 27402, alt: 402.4 });
  const [showFlash, setShowFlash] = useState(false);
  const [heatmapActive, setHeatmapActive] = useState(false);

  const passiveDebris = [
    { t: '15%', l: '20%', s: 4, risk: 'low', type: 'Paint Chip' },
    { t: '40%', l: '85%', s: 8, risk: 'high', type: 'Dead Satellite' },
    { t: '65%', l: '10%', s: 5, risk: 'medium', type: 'Rocket Stage' },
    { t: '80%', l: '70%', s: 6, risk: 'low', type: 'Bolt' },
    { t: '25%', l: '75%', s: 10, risk: 'high', type: 'Spent Fuel Tank' },
    { t: '30%', l: '30%', s: 3, risk: 'medium', type: 'Fragment' },
    { t: '70%', l: '40%', s: 4, risk: 'low', type: 'Antenna' },
  ];

  const thermalHotspots = [
    { t: '25%', l: '75%', r: 120 },
    { t: '45%', l: '80%', r: 80 },
    { t: '60%', l: '15%', r: 100 },
  ];

  useEffect(() => {
    let interval: any;
    if (step === 'WATCH') {
      interval = setInterval(() => {
        setProgress(prev => (prev + 1) % 43);
        setTelemetry(prev => ({
          speed: 27400 + Math.random() * 5,
          alt: 402 + Math.random() * 0.8
        }));
      }, 50);
    } else if (step === 'ALERT' || step === 'IMPACTED') {
      setProgress(50);
      if (step === 'IMPACTED' && !showFlash) {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 500);
      }
    } else if (step === 'FIXED') {
      setProgress(prev => (prev < 100 ? prev + 1 : prev));
      if (progress < 50) setProgress(50);
    }
    return () => clearInterval(interval);
  }, [step, progress, showFlash]);

  const reset = () => {
    setStep('WATCH');
    setProgress(0);
    setShowFlash(false);
    setHeatmapActive(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-rose-500 shadow-rose-500/50';
      case 'medium': return 'bg-amber-500 shadow-amber-500/50';
      case 'low': return 'bg-blue-400 shadow-blue-400/50';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Scan // Region_LEO_09</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Space Guard AI Monitor</h2>
          <p className="text-slate-500 font-medium">Tracking satellites and debris continuously and identifying dangerous close approaches.</p>
        </div>
        <button 
          onClick={reset}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Simulation
        </button>
      </header>

      {/* Step Indicator */}
      <div className="flex justify-between max-w-4xl mx-auto relative px-8 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-100 -translate-y-[18px] -z-10" />
        <div 
          className={cn(
            "absolute top-1/2 left-8 h-0.5 -translate-y-[18px] -z-10 transition-all duration-700 ease-out bg-gradient-to-r",
            step === 'IMPACTED' ? "from-rose-500 to-rose-700" : "from-blue-500 to-blue-600"
          )}
          style={{ width: step === 'WATCH' ? '0%' : step === 'ALERT' || step === 'IMPACTED' ? '45%' : '90%' }}
        />
        
        {[
          { id: 'WATCH', label: '1. Tracking', icon: Clock, desc: 'SCANNING ORBIT' },
          { id: 'ALERT', label: '2. Predicted Crash', icon: AlertTriangle, desc: step === 'IMPACTED' ? 'CRITICAL FAILURE' : 'CLOSE_APPROACH' },
          { id: 'FIXED', label: '3. Resolution', icon: ShieldCheck, desc: step === 'IMPACTED' ? 'LOST SIGNAL' : 'SAFE_PASSAGE' },
        ].map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500",
              (step === s.id || (step === 'IMPACTED' && s.id === 'ALERT')) ? (step === 'IMPACTED' ? "bg-rose-600 border-rose-50 scale-110 shadow-xl shadow-rose-100" : "bg-blue-600 border-blue-50 scale-110 shadow-xl shadow-blue-100") : 
              (step === 'FIXED' || (step === 'ALERT' && s.id === 'WATCH')) ? "bg-emerald-500 border-emerald-50" : "bg-slate-50 border-white"
            )}>
              <s.icon className={cn("w-6 h-6", (step === s.id || step === 'FIXED' || (step === 'ALERT' && s.id === 'WATCH') || (step === 'IMPACTED' && s.id === 'ALERT')) ? "text-white" : "text-slate-300")} />
            </div>
            <div className="text-center">
              <span className={cn(
                "text-xs font-bold uppercase tracking-widest block", 
                step === s.id ? (step === 'IMPACTED' ? "text-rose-600" : "text-blue-600") : "text-slate-400"
              )}>
                {s.label}
              </span>
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">{s.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Simulation Canvas */}
        <motion.div 
          animate={showFlash ? { x: [-5, 5, -5, 5, 0], y: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.1, repeat: 2 }}
          className={cn(
            "lg:col-span-2 card-simple h-[520px] relative flex items-center justify-center overflow-hidden border-2 transition-colors duration-1000",
            step === 'IMPACTED' ? "bg-[#1a0a0d] border-rose-900/50" : "bg-[#0c121e] border-slate-200"
          )}
        >
          {/* Scanning Grid Layer */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }} />
          
          <div className={cn(
            "absolute inset-0 opacity-20 transition-opacity duration-1000",
            step === 'IMPACTED' ? "bg-[radial-gradient(circle_at_center,_#ef4444_0%,_transparent_70%)]" : "bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)]"
          )} />

          {/* Active Debris Heatmap Layer */}
          <AnimatePresence>
            {heatmapActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none z-10"
              >
                {thermalHotspots.map((h, i) => (
                  <div 
                    key={`hotspot-${i}`}
                    className="absolute rounded-full bg-rose-500/40 blur-[40px] animate-pulse"
                    style={{ 
                      top: h.t, 
                      left: h.l, 
                      width: h.r, 
                      height: h.r, 
                      transform: 'translate(-50%, -50%)' 
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* 3D Visualization Layer (Targeted Element) */}
          <div className="absolute inset-0 perspective-[1000px] overflow-hidden">
            <motion.div 
              animate={{ rotateX: 60, rotateZ: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ 
                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
                backgroundSize: '60px 60px',
                transformStyle: 'preserve-3d'
              }}
            >
              {[...Array(2)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute inset-0 border border-blue-500/10"
                  style={{ 
                    transform: `translateZ(${i * -200}px) scale(${1 + i * 0.4})`,
                  }} 
                />
              ))}
            </motion.div>
          </div>

          {/* 3D Atmosphere Glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.1)_0%,_transparent_60%)]" />

          {/* Impact Flash Overlay */}
          <AnimatePresence>
            {showFlash && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white z-50 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Passive Debris Traffic (Priority Ranked) */}
          {passiveDebris.map((d, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              animate={{ opacity: step === 'IMPACTED' ? 0.1 : 0.6 }}
              className={cn("absolute rounded-full transition-shadow duration-500 group/debris-node", getRiskColor(d.risk))} 
              style={{ top: d.t, left: d.l, width: d.s, height: d.s }}
            >
              {/* Detailed Risk Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover/debris-node:opacity-100 transition-opacity z-40">
                <div className="bg-slate-900/90 backdrop-blur px-2 py-1 rounded border border-slate-700 whitespace-nowrap">
                  <div className="text-[7px] font-black text-slate-400 tracking-widest leading-none mb-1">{d.type}</div>
                  <div className={cn(
                    "text-[8px] font-black uppercase tracking-tighter",
                    d.risk === 'high' ? "text-rose-400" : d.risk === 'medium' ? "text-amber-400" : "text-blue-300"
                  )}>
                    {d.risk}_priority_target
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Global Alert Comms (Visual Link) */}
          {step === 'ALERT' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 pointer-events-none z-30"
            >
              <svg className="w-full h-full">
                <line 
                  x1="42%" y1="260" 
                  x2="85%" y2="40%" 
                  stroke="#3b82f6" 
                  strokeWidth="1" 
                  strokeDasharray="2 4"
                />
                <text x="60%" y="150" fill="#3b82f6" fontSize="8" fontWeight="black" className="tracking-widest uppercase">
                  Alert_Propagating...
                </text>
              </svg>
            </motion.div>
          )}

          {/* Earth Center (3D Enhanced) */}
          <div className="relative z-10 w-64 h-64 rounded-full border-2 border-blue-500/10 flex items-center justify-center perspective-[1000px]">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-blue-500/10 rounded-full"
              style={{ rotateX: '45deg' }}
            />
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-600/20 via-blue-900/40 to-slate-950 border border-blue-400/30 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.1)]">
               <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
               <div className="absolute text-[10px] font-black text-blue-400/30 uppercase tracking-[0.5em]">Terra_Node</div>
            </div>
            {/* Equatorial Ring */}
            <div className="absolute inset-x-[-20px] h-32 border border-blue-500/10 rounded-[100%] scale-y-[0.3] rotate-[15deg] pointer-events-none" />
          </div>

          {/* Paths and Overlays */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Satellite Vector */}
            <path 
              d="M 50,260 Q 400,260 750,260" 
              fill="none" 
              stroke={step === 'FIXED' ? "#10b981" : step === 'IMPACTED' ? "#ef4444" : "#3b82f6"} 
              strokeWidth="2" 
              strokeDasharray="4 4" 
              className={cn("transition-colors duration-1000", step === 'IMPACTED' ? "opacity-30" : "opacity-10")}
            />

            {/* Collision Prediction Box */}
            {(step === 'ALERT' || step === 'IMPACTED') && (
              <g>
                <motion.rect 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step === 'IMPACTED' ? [0.6, 0.4, 0.6] : [0.1, 0.4, 0.1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  x="380" y="240" width="40" height="40" 
                  fill={step === 'IMPACTED' ? "#ef4444" : "#ef4444"} 
                />
                <rect x="380" y="240" width="40" height="40" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                <motion.line 
                  initial={{ x1: 400, y1: 260, x2: 400, y2: 260 }}
                  animate={{ x2: 380, y2: 230 }}
                  stroke="#ef4444"
                  strokeWidth="1"
                />
                <text x="360" y="220" fill="#ef4444" fontSize="10" fontWeight="black" fontFamily="monospace" className="tracking-tighter uppercase">
                  {step === 'IMPACTED' ? "collision_critical" : "approach_vectors_map"}
                </text>
              </g>
            )}
          </svg>

          {/* Satellite */}
          {step !== 'IMPACTED' ? (
            <motion.div 
              className="absolute z-20"
              animate={{ 
                left: `${progress * 2}%`,
                top: step === 'FIXED' && progress > 22 ? '210px' : '260px'
              }}
              transition={{ duration: 0.1, ease: "linear" }}
              style={{ x: '-50%', y: '-50%' }}
            >
              <div className="relative group">
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500",
                  step === 'FIXED' ? "bg-emerald-500 shadow-emerald-500/20 scale-90" : "bg-blue-600 shadow-blue-500/40"
                )}>
                  <Target className="w-5 h-5 text-white" />
                </div>
                
                {/* Telemetry Tag */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setStep(step === 'WATCH' ? 'ALERT' : step)}
                  className={cn(
                    "absolute -top-20 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl border border-slate-100 min-w-[160px] transition-all cursor-pointer group/tag",
                    step === 'ALERT' && "animate-pulse border-rose-200"
                  )}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-tighter group-hover/tag:text-blue-500 transition-colors">Sentinel-6_Ref</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <div className="text-[10px] grid grid-cols-2 gap-x-2 border-t border-slate-50 pt-1.5 mt-1.5">
                    <span className="text-slate-400 font-bold uppercase text-[7px] tracking-tight">ALT:</span>
                    <span className="text-slate-900 font-black tracking-tighter group-hover/tag:text-blue-600 transition-colors">1,336 KM</span>
                    <span className="text-slate-400 font-bold uppercase text-[7px] tracking-tight">VEL:</span>
                    <motion.span 
                      key={telemetry.speed}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="text-slate-900 font-black tracking-tighter"
                    >
                      {telemetry.speed.toFixed(0)} KM/H
                    </motion.span>
                  </div>
                  <div className="mt-2 pt-1 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover/tag:opacity-100 transition-opacity">
                    <span className="text-[6px] font-black text-blue-500 uppercase tracking-widest leading-none">Click to Deep Scan</span>
                    <Activity className="w-2 h-2 text-blue-400" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* Debris Cloud (Impacted) with Shockwave */
            <div className="absolute left-[400px] top-[260px] z-30">
               {/* Shockwave Rings */}
               {[...Array(3)].map((_, i) => (
                 <motion.div
                   key={`shock-${i}`}
                   initial={{ scale: 0, opacity: 0.8 }}
                   animate={{ scale: 4, opacity: 0 }}
                   transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                   className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/50 rounded-full"
                 />
               ))}

               {/* Rapid Expanding Particles */}
               {[...Array(25)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                   animate={{ 
                     x: (Math.random() - 0.5) * 400, 
                     y: (Math.random() - 0.5) * 400, 
                     opacity: 0,
                     scale: 0,
                     rotate: Math.random() * 720
                   }}
                   transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 0.2 }}
                   className={cn(
                     "absolute w-2 h-2 rounded-sm shadow-sm",
                     i % 3 === 0 ? "bg-rose-500" : i % 3 === 1 ? "bg-amber-400" : "bg-slate-300"
                   )}
                 />
               ))}
               <motion.div 
                 animate={{ scale: [1, 3, 1], opacity: [0.6, 0.1, 0.6] }}
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="w-32 h-32 bg-rose-600/40 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-3xl"
               />
            </div>
          )}

          {/* Space Trash (Focused Element Enhancement) */}
          {step !== 'IMPACTED' && (
            <motion.div 
              className="absolute z-20 cursor-crosshair group/debris"
              animate={{ 
                top: step === 'WATCH' ? `${progress * 2.5}%` : '260px',
                left: '42%'
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1, ease: "linear" }}
              style={{ x: '-50%', y: '-50%' }}
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 flex items-center justify-center p-1 group-hover/debris:bg-rose-500/10 rounded-full transition-colors"
                >
                  {/* Proximity Ring Sensors */}
                  {((step === 'WATCH' && progress > 36) || step === 'ALERT') && (
                     <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 2.2, opacity: [0.3, 0.05, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute w-12 h-12 border-2 border-rose-500/40 rounded-full bg-rose-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                     />
                  )}

                  {/* Rocket piece shape */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(239,68,68,0.6)] group-hover/debris:drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
                    <path d="M12 2L9 8h6l-3-6z" fill="#ef4444" />
                    <path d="M9 8v10h6V8" />
                    <path d="M8 12h8" />
                    <path d="M10 18l-2 4h8l-2-4" />
                  </svg>
                </motion.div>
                
                {/* Detailed Metadata Tag */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-rose-950/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl border border-rose-500/30 min-w-[150px] text-center opacity-80 group-hover/debris:opacity-100 group-hover/debris:-translate-y-1 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-[8px] font-black text-rose-300/60 uppercase tracking-tighter">KOSMOS_2251_FRAG</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  </div>
                  <div className="text-[9px] font-black text-white whitespace-nowrap mb-1">Iridium-Kosmos Debris</div>
                  <div className="flex flex-col gap-1 px-2 py-1 bg-rose-900/50 rounded-lg">
                     <span className="text-[7px] font-black text-rose-100 uppercase tracking-widest">Tumbling: 14.2 RPM</span>
                     <div className="w-full h-0.5 bg-rose-500/20 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ x: [-20, 150] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="h-full w-4 bg-rose-400"
                        />
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Info Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 'WATCH' && (
              <motion.div 
                key="watch"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card-simple p-8 border-l-8 border-slate-300 h-full flex flex-col"
              >
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">01 // AI Collision Engine</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 font-medium">
                  Our AI predicts collisions before they happen using orbital trajectory data. Even in simulation, we map over 34,000 objects in real-time.
                </p>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Global Alert Network</h4>
                  <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                    If one satellite detects debris, it instantly alerts the entire network <b>(Inter-Sat Comms)</b> to trigger fleet-wide avoidance protocols.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-auto overflow-hidden relative">
                  <div className="flex flex-col gap-4 mb-4">
                    <button 
                      onClick={() => setHeatmapActive(!heatmapActive)}
                      className={cn(
                        "w-full py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                        heatmapActive 
                          ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-100" 
                          : "bg-white text-slate-600 border-slate-200"
                      )}
                    >
                      {heatmapActive ? 'Disable Danger Map' : 'Show Debris Heatmap'}
                    </button>
                    <div className="grid grid-cols-3 gap-2">
                      {['high', 'medium', 'low'].map(r => (
                        <div key={r} className="flex flex-col items-center gap-1">
                          <div className={cn("w-2 h-2 rounded-full", getRiskColor(r))} />
                          <span className="text-[7px] font-black text-slate-400 uppercase">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400" 
                    alt="Satellite Tracking"
                    className="absolute inset-0 w-full h-full object-cover opacity-10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      <span>AI Analysis Engine</span>
                      <span className="flex items-center gap-1 text-blue-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        Status: Nominal
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                         <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: '65%' }} 
                          className="h-full bg-blue-500" 
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600">
                        <span>Objects in View</span>
                        <span>1,242</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep('ALERT')}
                  className="w-full mt-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  Confirm Next Position <ArrowRight className="ml-2 w-4 h-4 inline" />
                </button>
              </motion.div>
            )}

            {(step === 'ALERT' || step === 'IMPACTED') && (
              <motion.div 
                key="alert"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "card-simple p-8 border-l-8 h-full flex flex-col shadow-xl shadow-rose-200/20",
                  step === 'IMPACTED' ? "border-rose-700 bg-rose-900 text-white" : "border-rose-500 bg-rose-50/50"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-lg relative overflow-hidden",
                  step === 'IMPACTED' ? "bg-rose-500 shadow-rose-500/20" : "bg-rose-600 shadow-rose-500/40"
                )}>
                  <img 
                    src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=100" 
                    alt="Alert"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    referrerPolicy="no-referrer"
                  />
                  <AlertTriangle className="text-white w-8 h-8 font-black relative z-10" />
                </div>
                <h3 className={cn("text-xl font-black mb-4 tracking-tight uppercase", step === 'IMPACTED' ? "text-white" : "text-rose-900")}>
                  {step === 'IMPACTED' ? "LOST_COMMUNICATIONS" : "02 // terminal conflict"}
                </h3>
                <p className={cn("text-sm leading-relaxed mb-8 font-medium", step === 'IMPACTED' ? "text-rose-100 italic" : "text-rose-800")}>
                  {step === 'IMPACTED' 
                    ? "CRITICAL: Sentinel-6 mission terminated. Hypervelocity impact with KOSMOS fragment has triggered a cascade event. Orbital sector 9 is now impassable."
                    : "The tracking system has identified a terminal intercept. Proximity sensors report a dangerous approach with the KOSMOS-2251 debris fragment."
                  }
                </p>
                
                {step !== 'IMPACTED' ? (
                  <div className="space-y-4 mb-auto">
                    <button 
                      onClick={() => setStep('FIXED')}
                      className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-500 transition-all mb-4"
                    >
                      APPLY AI RESOLUTION
                    </button>
                    <button 
                      onClick={() => setStep('IMPACTED')}
                      className="w-full py-3 text-rose-600 font-bold text-[10px] uppercase tracking-widest hover:text-rose-800 transition-colors"
                    >
                      Wait for Impact (Simulation)
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={reset}
                    className="w-full mt-auto py-5 bg-white text-rose-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-rose-50 transition-all"
                  >
                    RESET & PROTECT
                  </button>
                )}
              </motion.div>
            )}

            {step === 'FIXED' && (
              <motion.div 
                key="fixed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card-simple p-8 border-l-8 border-emerald-500 bg-emerald-50/50 h-full flex flex-col"
              >
                <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/40 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=100" 
                    alt="Success"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    referrerPolicy="no-referrer"
                  />
                  <ShieldCheck className="text-white w-8 h-8 relative z-10" />
                </div>
                <h3 className="text-xl font-black text-emerald-900 mb-4 tracking-tight uppercase">03 // Autonomous Avoidance</h3>
                <p className="text-emerald-800 text-sm leading-relaxed mb-8 font-medium">
                  When danger is detected, the system autonomously calculates the <b>lowest fuel path</b> and re-routes the satellite instantly.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: 'Fuel Usage', val: '-0.02%', trend: 'Optimum' },
                    { label: 'Route Miss', val: '4.2 KM', trend: 'Verified' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-emerald-100/50 p-4 rounded-2xl border border-emerald-200">
                      <div className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-lg font-black text-emerald-900">{stat.val}</div>
                      <div className="text-[7px] font-bold text-emerald-500 uppercase">{stat.trend}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm mt-auto mb-8 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=400" 
                    alt="Safe Orbit"
                    className="absolute inset-0 w-full h-full object-cover opacity-5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
                      <Zap className="w-6 h-6 text-emerald-600 fill-current" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-black uppercase tracking-widest">System Outcome</div>
                      <div className="text-lg font-black text-black">SAFE ORBIT VERIFIED</div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={reset}
                  className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-500 transition-all"
                >
                  RESUME MONITORING
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
