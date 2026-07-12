import { DashboardData } from '../types/dashboard';

export const dashboardData: DashboardData = {
  kpis: [
    {
      label: 'Active Vehicles',
      value: 128,
      trend: 4.2,
      trendLabel: 'MoM',
      trendDirection: 'up',
      icon: 'Truck',
    },
    {
      label: 'Available Vehicles',
      value: 42,
      trend: 1.5,
      trendLabel: 'MoM',
      trendDirection: 'up',
      icon: 'CheckCircle',
    },
    {
      label: 'Vehicles in Maintenance',
      value: 15,
      trend: 0.8,
      trendLabel: 'MoM',
      trendDirection: 'down',
      icon: 'Wrench',
    },
    {
      label: 'Active Trips',
      value: 72,
      trend: 2.9,
      trendLabel: 'MoM',
      trendDirection: 'up',
      icon: 'MapPin',
    },
    {
      label: 'Drivers Available',
      value: 54,
      trend: 3.4,
      trendLabel: 'MoM',
      trendDirection: 'up',
      icon: 'Users',
    },
    {
      label: 'Fleet Utilization',
      value: 89,
      trend: 1.7,
      trendLabel: 'MoM',
      trendDirection: 'up',
      icon: 'Gauge',
    },
  ],
  fleetUtilization: [
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 84 },
    { month: 'May', value: 86 },
    { month: 'Jun', value: 88 },
    { month: 'Jul', value: 89 },
    { month: 'Aug', value: 91 },
  ],
  fuelCostTrend: [
    { month: 'Mar', value: 44 },
    { month: 'Apr', value: 42 },
    { month: 'May', value: 46 },
    { month: 'Jun', value: 43 },
    { month: 'Jul', value: 41 },
    { month: 'Aug', value: 39 },
  ],
  maintenanceCost: [
    { month: 'Mar', value: 38 },
    { month: 'Apr', value: 41 },
    { month: 'May', value: 35 },
    { month: 'Jun', value: 37 },
    { month: 'Jul', value: 34 },
    { month: 'Aug', value: 32 },
  ],
  tripsPerMonth: [
    { month: 'Mar', value: 120 },
    { month: 'Apr', value: 132 },
    { month: 'May', value: 144 },
    { month: 'Jun', value: 138 },
    { month: 'Jul', value: 150 },
    { month: 'Aug', value: 160 },
  ],
  vehicleROI: [
    { month: 'Mar', value: 11.8 },
    { month: 'Apr', value: 12.0 },
    { month: 'May', value: 12.4 },
    { month: 'Jun', value: 12.7 },
    { month: 'Jul', value: 13.1 },
    { month: 'Aug', value: 13.4 },
  ],
  alerts: [
    {
      severity: 'danger',
      title: 'Critical maintenance overdue',
      oneLineAction: 'Vehicle MH-04 AB 1234 due for service in 200km — schedule now',
    },
    {
      severity: 'warning',
      title: 'Fuel usage spike',
      oneLineAction: 'Route #117 fuel cost is 18% above target — review driver behavior',
    },
    {
      severity: 'info',
      title: 'Driver certification expiring',
      oneLineAction: 'Rahul Sharma certificate expires in 12 days — notify HR',
    },
    {
      severity: 'warning',
      title: 'Low vehicle availability',
      oneLineAction: 'Only 42 vehicles available today — prioritize urgent dispatches',
    },
    {
      severity: 'info',
      title: 'Route optimization available',
      oneLineAction: 'AI suggests two route merges to save 6% fuel — review now',
    },
  ],
  aiRecommendations: [
    {
      title: 'Reassign Driver Rahul to Trip #482 to avoid overtime breach',
      description: 'This keeps the route on schedule while reducing projected overtime cost by 8%.',
    },
    {
      title: 'Schedule preventive check for Vehicle MH-02 XY 4321 this afternoon',
      description: 'Early maintenance prevents a high-cost breakdown on a critical route.',
    },
    {
      title: 'Shift Route #390 to electric vehicles for tomorrow to lower fuel burn',
      description: 'Expected savings of ₹14,000 in fuel cost with no service delay.',
    },
  ],
  recentActivity: [
    {
      timestamp: '2m ago',
      description: 'Vehicle MH-14 KL 6578 completed delivery ahead of schedule.',
    },
    {
      timestamp: '12m ago',
      description: 'Trip #503 was rerouted due to road closure on NH48.',
    },
    {
      timestamp: '35m ago',
      description: 'Driver Priya K. checked in for the 08:00 fleet dispatch.',
    },
    {
      timestamp: '1h ago',
      description: 'Fuel order request submitted for Depot 7 refill.',
    },
    {
      timestamp: '2h ago',
      description: 'Fleet utilization increased to 91% on peak morning demand.',
    },
  ],
};
