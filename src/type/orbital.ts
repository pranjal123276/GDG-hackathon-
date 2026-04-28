export interface OrbitalObject {
  id: string;
  name: string;
  type: 'satellite' | 'debris' | 'rocket_fragment';
  orbit: {
    altitude: number; // km
    inclination: number; // degrees
    velocity: number; // km/s
  };
  riskScore: number; // 0-100
  status: 'active' | 'inactive' | 'decaying';
  lastUpdated: string;
}

export interface ConjunctionEvent {
  id: string;
  primaryObjectId: string;
  secondaryObjectId: string;
  probability: number; // 0-1
  missDistance: number; // meters
  timeToClosestApproach: number; // seconds
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ManeuverRecommendation {
  id: string;
  satelliteId: string;
  deltaV: number; // m/s
  burnDuration: number; // seconds
  fuelConsumption: number; // kg
  newOrbit: {
    altitude: number;
  };
  efficiency: number; // percentage
}
