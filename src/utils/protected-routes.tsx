import { Outlet } from 'react-router';
import { useAuth } from './useAuth';
import { LoginView } from '../pages/LoginView/LoginView';

export const AdminRoutes = () => {
  const role = useAuth();
  return role === 'admin' ? <Outlet /> : <LoginView />;
};

export const HrRoutes = () => {
  const role = useAuth();
  return role === 'hr' ? <Outlet /> : <LoginView />;
};

export const StudentRoutes = () => {
  const role = useAuth();
  return role === 'student' ? <Outlet /> : <LoginView />;
};
