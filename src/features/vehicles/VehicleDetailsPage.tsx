import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { vehiclesData } from '../../data/vehiclesData';
import { Button } from '../../components/ui/button';

export function VehicleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const vehicle = useMemo(
    () => vehiclesData.find(item => item.id === id),
    [id]
  );

  if (!vehicle) {
    return (
      <div className="p-6">
        <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-sm shadow-black/10">
          <p className="text-sm font-semibold text-text-primary">Vehicle not found</p>
          <p className="mt-2 text-sm text-text-secondary">The vehicle ID does not match any record.</p>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => navigate('/vehicles')} className="rounded-2xl bg-primary px-5 py-3 text-white hover:bg-primary-hover">
              Back to Vehicles
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold text-text-primary">{vehicle.registrationNumber}</h1>
            <StatusBadge status={vehicle.status} />
          </div>
          <Link to="/vehicles" className="text-sm font-medium text-primary hover:text-primary-hover">
            Back to Vehicles
          </Link>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button
            type="button"
            onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
            className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <h2 className="text-lg font-semibold text-text-primary">Basic Info</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Type</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.type}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Model</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.model}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Manufacturer</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.manufacturer}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Year</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.year}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Fuel Type</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.fuelType}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <h2 className="text-lg font-semibold text-text-primary">Status Info</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Status</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.status}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Assigned Driver</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.assignedDriver ?? 'Unassigned'}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Odometer</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.odometerKm.toLocaleString()} km</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <h2 className="text-lg font-semibold text-text-primary">Service Info</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Last Service Date</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.lastServiceDate}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Next Service Due</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.nextServiceDue}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Insurance Expiry</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.insuranceExpiry}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-text-secondary">Purchase Date</dt>
              <dd className="mt-2 text-sm text-text-primary">{vehicle.purchaseDate}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
