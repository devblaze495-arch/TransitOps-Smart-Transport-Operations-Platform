import { format } from 'date-fns';
import { dashboardData } from '../../data/dashboardData';
import { KpiCard } from '../../components/shared/KpiCard';
import { FleetUtilizationChart } from '../../components/charts/FleetUtilizationChart';
import { FuelCostTrendChart } from '../../components/charts/FuelCostTrendChart';
import { MaintenanceCostChart } from '../../components/charts/MaintenanceCostChart';
import { TripsPerMonthChart } from '../../components/charts/TripsPerMonthChart';
import { VehicleROIChart } from '../../components/charts/VehicleROIChart';
import {
  Truck,
  CheckCircle,
  Wrench,
  MapPin,
  Users,
  Gauge,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  Truck,
  CheckCircle,
  Wrench,
  MapPin,
  Users,
  Gauge,
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function DashboardPage() {
  const today = new Date();
  const greeting = getGreeting();
  const dateLabel = format(today, 'EEEE, MMMM d');

  return (
    <div className="space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-text-secondary">{dateLabel}</p>
            <h1 className="text-3xl font-semibold text-text-primary">{greeting}, Bhavesh 👋</h1>
          </div>
        </div>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardData.kpis.map(metric => {
          const Icon = iconMap[metric.icon as keyof typeof iconMap] ?? Truck;
          return (
            <KpiCard
              key={metric.label}
              icon={Icon}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
              trendLabel={metric.trendLabel}
              trendDirection={metric.trendDirection}
            />
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Fleet Utilization</p>
              <h2 className="text-lg font-semibold text-text-primary">Average utilization</h2>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Last 6 months</span>
          </div>
          <FleetUtilizationChart data={dashboardData.fleetUtilization} />
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Fuel Cost Trend</p>
              <h2 className="text-lg font-semibold text-text-primary">Monthly fuel spend</h2>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Last 6 months</span>
          </div>
          <FuelCostTrendChart data={dashboardData.fuelCostTrend} />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Today&apos;s Alerts</p>
              <h2 className="text-lg font-semibold text-text-primary">Immediate actions</h2>
            </div>
          </div>
          <div className="space-y-3">
            {dashboardData.alerts.map(alert => (
              <div
                key={alert.oneLineAction}
                className={`rounded-3xl border-l-4 bg-bg p-4 ${
                  alert.severity === 'danger'
                    ? 'border-danger/80'
                    : alert.severity === 'warning'
                    ? 'border-warning/80'
                    : 'border-primary/80'
                }`}
              >
                <p className="text-sm font-semibold text-text-primary">{alert.title}</p>
                <p className="mt-2 text-sm text-text-secondary">{alert.oneLineAction}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-surface p-6 shadow-sm shadow-primary/10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-text-secondary">AI Fleet Copilot</p>
              <h2 className="text-lg font-semibold text-text-primary">Recommendations</h2>
            </div>
            <div className="rounded-2xl bg-primary/10 px-3 py-1 text-sm text-primary">Automated insights</div>
          </div>
          <div className="space-y-4">
            {dashboardData.aiRecommendations.map(rec => (
              <div key={rec.title} className="rounded-3xl border border-border bg-bg p-6">
                <p className="text-sm font-semibold text-text-primary">{rec.title}</p>
                <p className="mt-2 text-sm text-text-secondary">{rec.description}</p>
              </div>
            ))}
          </div>
          <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover">
            <ArrowRight className="h-4 w-4" />
            View Details
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Maintenance Cost</p>
                <h2 className="text-lg font-semibold text-text-primary">Service spend</h2>
              </div>
            </div>
            <MaintenanceCostChart data={dashboardData.maintenanceCost} />
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Trips per Month</p>
                <h2 className="text-lg font-semibold text-text-primary">Dispatch volume</h2>
              </div>
            </div>
            <TripsPerMonthChart data={dashboardData.tripsPerMonth} />
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Vehicle ROI</p>
                <h2 className="text-lg font-semibold text-text-primary">Return on assets</h2>
              </div>
            </div>
            <VehicleROIChart data={dashboardData.vehicleROI} />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Recent Activity</p>
              <h2 className="text-lg font-semibold text-text-primary">Latest fleet updates</h2>
            </div>
          </div>
          <div className="flex max-h-[32rem] flex-col gap-3 overflow-y-auto pr-1">
            {dashboardData.recentActivity.map(activity => (
              <div key={activity.description} className="rounded-3xl border border-border bg-bg p-4">
                <p className="text-sm font-semibold text-text-primary">{activity.description}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-secondary">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
