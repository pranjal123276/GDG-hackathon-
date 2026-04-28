import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/Dashboard';
import { RiskAnalysisView } from './views/RiskAnalysis';
import { ManeuverPlannerView } from './views/ManeuverPlanner';
import { DebrisCatalogView } from './views/DebrisCatalog';
import { CooperativeAvoidanceView } from './views/CooperativeAvoidance';
import { SimulatorView } from './views/Simulator';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'risk':
        return <RiskAnalysisView />;
      case 'simulator':
        return <SimulatorView />;
      case 'maneuver':
        return <ManeuverPlannerView />;
      case 'cooperative':
        return <CooperativeAvoidanceView />;
      case 'debris':
        return <DebrisCatalogView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 min-w-0 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}
