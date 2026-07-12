import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable, DataTableColumn } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { vehiclesData } from '../../data/vehiclesData';
import { Button } from '../../components/ui/button';

interface VehicleRow {
  id: string;
  registrationNumber: string;
  type: string;
  model: string;
  status: string;
  assignedDriver: string | null;
  odometerKm: number;
  nextServiceDue: string;
  fuelType: string;
}

const statusOptions = ['All', 'Active', 'Available', 'In Maintenance', 'Inactive'];
const typeOptions = ['All', 'Truck', 'Van', 'Car', 'Bike'];
const fuelOptions = ['All', 'Diesel', 'Petrol', 'CNG', 'EV'];

export function VehicleListPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');

  const filteredVehicles = useMemo(() => {
    return vehiclesData.filter(vehicle => {
      const statusMatch = statusFilter === 'All' || vehicle.status === statusFilter;
      const typeMatch = typeFilter === 'All' || vehicle.type === typeFilter;
      const fuelMatch = fuelFilter === 'All' || vehicle.fuelType === fuelFilter;
      return statusMatch && typeMatch && fuelMatch;
    });
  }, [statusFilter, typeFilter, fuelFilter]);

  const tableData = useMemo<VehicleRow[]>(() => {
    return filteredVehicles.map(vehicle => ({
      id: vehicle.id,
      registrationNumber: vehicle.registrationNumber,
      type: vehicle.type,
      model: `${vehicle.manufacturer} ${vehicle.model}`,
      status: vehicle.status,
      assignedDriver: vehicle.assignedDriver,
      odometerKm: vehicle.odometerKm,
      nextServiceDue: vehicle.nextServiceDue,
      fuelType: vehicle.fuelType,
    }));
  }, [filteredVehicles]);

  const columns: DataTableColumn<VehicleRow>[] = [
    {
      key: 'registrationNumber',
      header: 'Registration',
      accessor: item => item.registrationNumber,
      sortable: true,
      sortValue: item => item.registrationNumber,
      width: 'w-[180px]',
    },
    {
      key: 'type',
      header: 'Type',
      accessor: item => item.type,
      sortable: true,
      sortValue: item => item.type,
      width: 'w-[100px]',
    },
    {
      key: 'model',
      header: 'Model',
      accessor: item => item.model,
      sortable: true,
      sortValue: item => item.model,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: item => <StatusBadge status={item.status} />,
      sortable: true,
      sortValue: item => item.status,
      width: 'w-[140px]',
    },
    {
      key: 'assignedDriver',
      header: 'Assigned Driver',
      accessor: item => item.assignedDriver ?? 'Unassigned',
      sortable: true,
      sortValue: item => item.assignedDriver ?? 'Unassigned',
    },
    {
      key: 'odometerKm',
      header: 'Odometer',
      accessor: item => `${item.odometerKm.toLocaleString()} km`,
      sortable: true,
      sortValue: item => item.odometerKm,
      width: 'w-[120px]',
    },
    {
      key: 'nextServiceDue',
      header: 'Next Service Due',
      accessor: item => item.nextServiceDue,
      sortable: true,
      sortValue: item => item.nextServiceDue,
      width: 'w-[140px]',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-text-secondary">Fleet Management</p>
          <h1 className="text-3xl font-semibold text-text-primary">Vehicles</h1>
        </div>
        <Button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
          onClick={() => navigate('/vehicles/new')}
        >
          Add Vehicle
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm text-text-secondary">
          Status
          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-border bg-bg px-4 py-3 text-text-primary"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-text-secondary">
          Type
          <select
            value={typeFilter}
            onChange={event => setTypeFilter(event.target.value)}
            className="rounded-2xl border border-border bg-bg px-4 py-3 text-text-primary"
          >
            {typeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-text-secondary">
          Fuel Type
          <select
            value={fuelFilter}
            onChange={event => setFuelFilter(event.target.value)}
            className="rounded-2xl border border-border bg-bg px-4 py-3 text-text-primary"
          >
            {fuelOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <DataTable<VehicleRow>
        data={tableData}
        columns={columns}
        onRowClick={item => navigate(`/vehicles/${item.id}`)}
      />
    </div>
  );
}
