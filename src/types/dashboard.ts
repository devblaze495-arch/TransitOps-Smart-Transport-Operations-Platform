export interface KpiMetric {
  label: string;
  value: number;
  trend: number;
  trendLabel: string;
  trendDirection: 'up' | 'down';
  icon: string;
}

export interface MonthlySeriesPoint {
  month: string;
  value: number;
}

export interface AlertItem {
  severity: 'danger' | 'warning' | 'info';
  title: string;
  oneLineAction: string;
}

export interface AiRecommendation {
  title: string;
  description: string;
}

export interface ActivityFeedItem {
  timestamp: string;
  description: string;
}

export interface DashboardData {
  kpis: KpiMetric[];
  fleetUtilization: MonthlySeriesPoint[];
  fuelCostTrend: MonthlySeriesPoint[];
  maintenanceCost: MonthlySeriesPoint[];
  tripsPerMonth: MonthlySeriesPoint[];
  vehicleROI: MonthlySeriesPoint[];
  alerts: AlertItem[];
  aiRecommendations: AiRecommendation[];
  recentActivity: ActivityFeedItem[];
}
