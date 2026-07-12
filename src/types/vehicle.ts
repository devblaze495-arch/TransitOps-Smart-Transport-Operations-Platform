export interface Vehicle {
  id: string;
  registrationNumber: string;
  type: 'Truck' | 'Van' | 'Car' | 'Bike';
  model: string;
  manufacturer: string;
  year: number;
  status: 'Active' | 'In Maintenance' | 'Available' | 'Inactive';
  assignedDriver: string | null;
  fuelType: 'Diesel' | 'Petrol' | 'CNG' | 'EV';
  odometerKm: number;
  lastServiceDate: string;
  nextServiceDue: string;
  insuranceExpiry: string;
  purchaseDate: string;
}
