import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { VehicleListPage } from '../features/vehicles/VehicleListPage';
import { VehicleDetailsPage } from '../features/vehicles/VehicleDetailsPage';
import { VehicleFormPage } from '../features/vehicles/VehicleFormPage';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>

      <Route path="/vehicles" element={<DashboardLayout />}>
        <Route index element={<VehicleListPage />} />
        <Route path="new" element={<VehicleFormPage />} />
        <Route path=":id" element={<VehicleDetailsPage />} />
        <Route path=":id/edit" element={<VehicleFormPage />} />
      </Route>
    </Routes>
  );
}
