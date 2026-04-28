import React from 'react';
import { AlertCircle, Target, Info, Trash2, ShieldCheck } from 'lucide-react';
import { mockSatellites } from '../mockData';
import { cn } from '../lib/utils';

export const RiskAnalysisView = () => {
  const sortedDebris = [...mockSatellites]
    .filter(obj => obj.type !== 'Satellite')
    .sort((a: any, b: any) => b.riskScore - a.riskScore);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Collision Risk Analysis</h2>
        <p className="text-slate-500">How dangerous is the space trash currently floating around Earth?</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="card-simple">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-blue-600" />
                Dangeours Space Trash
              </h3>
              <span className="text-xs font-semibold text-slate-400 uppercase">Top priority items</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-6">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Height</th>
                    <th className="px-6 py-4">Danger Level</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedDebris.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium text-slate-400">{item.id}</td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{item.type}</div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">{item.orbit.altitude} km</td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                                <div 
                                  className={cn("h-full", item.riskScore > 70 ? "bg-rose-500" : "bg-amber-500")}
                                  style={{ width: `${item.riskScore}%` }}
                                />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{item.riskScore}%</span>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "status-tag",
                          item.status === 'Danger' ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"
                        )}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-simple p-8 bg-rose-50 border-rose-100 text-rose-900">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Collision Spread Risk
              </h4>
              <p className="text-sm leading-relaxed mb-6">
                If "Old Rocket Piece" hits something, it could break into 1000s of smaller pieces, making space travel much harder for everyone.
              </p>
              <div className="bg-white p-4 rounded-xl border border-rose-100">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-rose-900 uppercase">Current Danger</span>
                   <span className="text-lg font-black">HIGH</span>
                </div>
                <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                   <div className="h-full bg-rose-500" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
            
            <div className="card-simple p-8 bg-blue-50 border-blue-100 text-blue-900">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Safety Planning
              </h4>
              <p className="text-sm leading-relaxed mb-6">
                Our AI has already planned 4 moves to keep our satellites safe this month. We are 98% safer than using old manual methods.
              </p>
              <div className="flex items-end justify-between">
                <div>
                   <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Safety Wins</div>
                   <div className="text-3xl font-black">122</div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Method</div>
                   <div className="text-sm font-bold">OrbitGuard AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-simple p-8">
            <h4 className="font-bold text-slate-900 mb-6">Main Danger Factors</h4>
            <div className="space-y-6">
              {[
                { label: 'Crowded Space', value: 92 },
                { label: 'Space Weather', value: 45 },
                { label: 'Trash Speed', value: 78 },
                { label: 'Tracking Accuracy', value: 12 },
              ].map((factor) => (
                <div key={factor.label}>
                  <div className="flex justify-between text-[11px] font-bold uppercase mb-2 text-slate-500">
                    <span>{factor.label}</span>
                    <span>{factor.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${factor.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-simple p-8 bg-amber-50 border-amber-100">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-amber-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 mb-2">Expert Tip</h4>
                <p className="text-sm text-amber-800 leading-relaxed italic">
                  "Most of the danger comes from old satellite parts that haven't been picked up. We need to start cleaning the space soon."
                </p>
                <p className="mt-4 text-[10px] font-bold text-amber-600 uppercase tracking-widest text-right">— Dr. Sarah, Space Expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
