import React from 'react';
import { 
  AlertTriangle, 
  Activity, 
  Satellite as SatelliteIcon, 
  Zap,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Globe } from '../components/Globe';
import { mockConjunctions } from '../mockData';
import { cn } from '../lib/utils';

const chartData = [
  { day: 'Mon', risks: 4 },
  { day: 'Tue', risks: 6 },
  { day: 'Wed', risks: 3 },
  { day: 'Thu', risks: 12 },
  { day: 'Fri', risks: 8 },
  { day: 'Sat', risks: 5 },
  { day: 'Sun', risks: 7 },
];

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <div className="card-simple p-6">
    <div className="flex justify-between items-center mb-4">
      <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}15`, color }}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full",
          trend > 0 ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
        )}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <h3 className="text-sm font-medium text-slate-500 mb-1">{label}</h3>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
  </div>
);

export const DashboardView = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Space Safety Monitor</h2>
          <p className="text-slate-500 mt-1">Watching your satellites and predicting potential crashes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all">
            Take Action Now
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Items Tracked" value="34,241" trend={1.2} icon={SatelliteIcon} color="#3b82f6" />
        <StatCard label="Critical Risks" value="4" trend={-15} icon={AlertTriangle} color="#f59e0b" />
        <StatCard label="Average Safety Space" value="842m" trend={2.4} icon={ShieldCheck} color="#10b981" />
        <StatCard label="Saved Collisions" value="122" trend={12} icon={Zap} color="#8b5cf6" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="card-simple h-[450px]">
            <Globe />
          </div>
          
          <div className="card-simple p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-900">Danger Trends</h3>
              <span className="text-xs font-semibold text-slate-400">PAST 7 DAYS</span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRisks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="risks" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRisks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-simple p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              Live Alerts
              <span className="flex items-center gap-1.5 text-[10px] text-rose-600 bg-rose-50 px-2 py-1 rounded-full animate-pulse font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                LIVE
              </span>
            </h3>
            <div className="space-y-4">
              {mockConjunctions.map((conj) => (
                <div key={conj.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{conj.id}</span>
                    <span className={cn(
                      "status-tag",
                      conj.severity === 'High' ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {conj.severity} Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-slate-700">{conj.primaryName}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{conj.secondaryName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                    <div>MISS IN: <span className="text-slate-900 font-bold">{conj.missDistance}m</span></div>
                    <div>TIME: <span className="text-slate-900 font-bold">{conj.timeLeft}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              VIEW ALL ALERTS
            </button>
          </div>

          <div className="card-simple p-6 bg-blue-600 text-white relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=400" 
              alt="Orbital Path"
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 fill-current" />
                Smart Suggestion
              </h3>
              <p className="text-xs text-blue-100 mb-5 leading-relaxed">
                We found a safer spot for "Internet Sat Spark". Moving it slightly right will avoid a crash next week.
              </p>
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                Move Satellite Safely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
