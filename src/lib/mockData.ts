export const mockSatellites = [
  {
    id: 'S-701',
    name: 'Weather Sat Alpha',
    type: 'Satellite',
    orbit: { altitude: 1336, inclination: 66, velocity: 7.2 },
    riskScore: 5,
    status: 'Safe',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'S-202',
    name: 'Internet Sat Spark',
    type: 'Satellite',
    orbit: { altitude: 550, inclination: 53.2, velocity: 7.6 },
    riskScore: 42,
    status: 'Alert',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'T-992',
    name: 'Old Rocket Piece',
    type: 'Trash',
    orbit: { altitude: 780, inclination: 86.4, velocity: 7.5 },
    riskScore: 85,
    status: 'Danger',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'T-881',
    name: 'Broken Sat Fragment',
    type: 'Trash',
    orbit: { altitude: 620, inclination: 52, velocity: 7.4 },
    riskScore: 20,
    status: 'Inactive',
    lastUpdated: new Date().toISOString()
  }
];

export const mockConjunctions = [
  {
    id: 'ALERT-1',
    primaryName: 'Internet Sat Spark',
    secondaryName: 'Old Rocket Piece',
    probability: 0.082,
    missDistance: 142,
    timeLeft: '4 hours',
    severity: 'High'
  },
  {
    id: 'ALERT-2',
    primaryName: 'Weather Sat Alpha',
    secondaryName: 'Broken Sat Fragment',
    probability: 0.001,
    missDistance: 890,
    timeLeft: '12 hours',
    severity: 'Low'
  }
];
