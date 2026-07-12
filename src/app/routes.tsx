import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/auth/LoginPage';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-semibold text-text-primary">Dashboard</h1>
      <p className="text-text-secondary">Welcome to FleetPro Dashboard</p>
    </div>
  );
}

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
    </Routes>
  );
}
