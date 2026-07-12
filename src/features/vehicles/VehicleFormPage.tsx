import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { vehiclesData } from '../../data/vehiclesData';
import { Vehicle } from '../../types/vehicle';

const types = ['Truck', 'Van', 'Car', 'Bike'];
const statuses = ['Active', 'In Maintenance', 'Available', 'Inactive'];
const fuelTypes = ['Diesel', 'Petrol', 'CNG', 'EV'];

function buildInitialState(vehicle?: Vehicle) {
  return {
    registrationNumber: vehicle?.registrationNumber ?? '',
    type: vehicle?.type ?? 'Truck',
    model: vehicle?.model ?? '',
    manufacturer: vehicle?.manufacturer ?? '',
    year: vehicle?.year.toString() ?? '',
    status: vehicle?.status ?? 'Active',
    assignedDriver: vehicle?.assignedDriver ?? '',
    fuelType: vehicle?.fuelType ?? 'Diesel',
    odometerKm: vehicle?.odometerKm.toString() ?? '',
    lastServiceDate: vehicle?.lastServiceDate ?? '',
    nextServiceDue: vehicle?.nextServiceDue ?? '',
    insuranceExpiry: vehicle?.insuranceExpiry ?? '',
    purchaseDate: vehicle?.purchaseDate ?? '',
  };
}

export function VehicleFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = useMemo(() => vehiclesData.find(item => item.id === id), [id]);
  const isEditMode = Boolean(id && vehicle);
  const [values, setValues] = useState(() => buildInitialState(vehicle));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    const requiredFields = [
      'registrationNumber',
      'type',
      'model',
      'manufacturer',
      'year',
      'status',
      'fuelType',
      'odometerKm',
      'lastServiceDate',
      'nextServiceDue',
      'insuranceExpiry',
      'purchaseDate',
    ];

    requiredFields.forEach(field => {
      if (!values[field as keyof typeof values]?.toString().trim()) {
        nextErrors[field] = 'Required field';
      }
    });

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    navigate('/vehicles');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-text-secondary">Fleet Management</p>
          <h1 className="text-3xl font-semibold text-text-primary">
            {isEditMode ? 'Edit Vehicle' : 'Add Vehicle'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={values.registrationNumber}
                onChange={event => handleChange('registrationNumber', event.target.value)}
                className="w-full"
              />
              {errors.registrationNumber && <p className="text-xs text-danger">{errors.registrationNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                id="type"
                value={values.type}
                onChange={event => handleChange('type', event.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
              {errors.type && <p className="text-xs text-danger">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={values.model}
                onChange={event => handleChange('model', event.target.value)}
              />
              {errors.model && <p className="text-xs text-danger">{errors.model}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                value={values.manufacturer}
                onChange={event => handleChange('manufacturer', event.target.value)}
              />
              {errors.manufacturer && <p className="text-xs text-danger">{errors.manufacturer}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                min="1990"
                max="2026"
                value={values.year}
                onChange={event => handleChange('year', event.target.value)}
              />
              {errors.year && <p className="text-xs text-danger">{errors.year}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={values.status}
                onChange={event => handleChange('status', event.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
              {errors.status && <p className="text-xs text-danger">{errors.status}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedDriver">Assigned Driver</Label>
            <Input
              id="assignedDriver"
              value={values.assignedDriver}
              onChange={event => handleChange('assignedDriver', event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select
              id="fuelType"
              value={values.fuelType}
              onChange={event => handleChange('fuelType', event.target.value)}
            >
              {fuelTypes.map(fuelType => (
                <option key={fuelType} value={fuelType}>{fuelType}</option>
              ))}
            </Select>
            {errors.fuelType && <p className="text-xs text-danger">{errors.fuelType}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="odometerKm">Odometer</Label>
            <Input
              id="odometerKm"
              type="number"
              min="0"
              value={values.odometerKm}
              onChange={event => handleChange('odometerKm', event.target.value)}
            />
            {errors.odometerKm && <p className="text-xs text-danger">{errors.odometerKm}</p>}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lastServiceDate">Last Service Date</Label>
              <Input
                id="lastServiceDate"
                type="date"
                value={values.lastServiceDate}
                onChange={event => handleChange('lastServiceDate', event.target.value)}
              />
              {errors.lastServiceDate && <p className="text-xs text-danger">{errors.lastServiceDate}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextServiceDue">Next Service Due</Label>
              <Input
                id="nextServiceDue"
                type="date"
                value={values.nextServiceDue}
                onChange={event => handleChange('nextServiceDue', event.target.value)}
              />
              {errors.nextServiceDue && <p className="text-xs text-danger">{errors.nextServiceDue}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
              <Input
                id="insuranceExpiry"
                type="date"
                value={values.insuranceExpiry}
                onChange={event => handleChange('insuranceExpiry', event.target.value)}
              />
              {errors.insuranceExpiry && <p className="text-xs text-danger">{errors.insuranceExpiry}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={values.purchaseDate}
                onChange={event => handleChange('purchaseDate', event.target.value)}
              />
              {errors.purchaseDate && <p className="text-xs text-danger">{errors.purchaseDate}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={() => navigate('/vehicles')}
              className="rounded-2xl border border-border bg-bg text-text-primary hover:bg-surface-hover"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-2xl bg-primary text-white hover:bg-primary-hover"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
