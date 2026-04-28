import React from 'react';
import { 
  Home, 
  AlertCircle, 
  Map as PathIcon, 
  Trash2, 
  Settings, 
  Satellite as SatelliteIcon,
  Users2,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Monitor', icon: Home },
  { id: 'risk', label: 'Collision Risk', icon: AlertCircle },
  { id: 'simulator', label: 'Crash Simulator', icon: Zap },
  { id: 'maneuver', label: 'Safe Path Finder', icon: PathIcon },
  { id: 'cooperative', label: 'Team Avoidance', icon: Users2 },
  { id: 'debris', label: 'Space Trash List', icon: Trash2 },
];

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <SatelliteIcon className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-900 tracking-tight leading-none">Orbit Guard</h1>
          <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">Simple Space Safety</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
              activeTab === item.id 
                ? "bg-blue-50 text-blue-600" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeTab === item.id ? "text-blue-600" : "text-slate-400 group-hover:text-slate-500"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider">System Status</span>
          </div>
          <p className="text-[11px] text-slate-500">All systems are working correctly.</p>
        </div>
        
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-slate-600 text-xs transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  );
};
