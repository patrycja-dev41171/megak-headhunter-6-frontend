import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { AdminRoutes, HrRoutes, StudentRoutes } from './utils/protected-routes';
import { LoginView } from './pages/LoginView/LoginView';
import { RegisterView } from './pages/RegisterView/RegisterView';
import { ForgotPasswordView } from './pages/ForgotPasswordView/ForgotPasswordView';
import { ChangePasswordView } from './pages/ChangePasswordView/ChangePasswordView';
import { HrHomeView } from './pages/HrHomeView/HrHomeView';
import { HrSelectedStudentsView } from './pages/HrSelectedStudentsView/HrSelectedStudentsView';
import { HrStudentProfileView } from './pages/HrStudentProfileView/HrStudentProfileView';
import { StudentView } from './pages/StudentView/StudentView';
import { HrProfileView } from './pages/HrProfileView/HrProfileView';
import { HomeAdminView } from './pages/HomeAdminView/HomeAdminView';
import { useRefreshToken } from './utils/useRefreshToken';

export const App = () => {
  useRefreshToken();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LoginView />}
        />
        <Route
          path="/register/:userId/:registerToken"
          element={<RegisterView />}
        />
        <Route
          path={'/login'}
          element={<LoginView />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordView />}
        />
        <Route
          path="/change-password/:userId"
          element={<ChangePasswordView />}
        />
        <Route element={<AdminRoutes />}>
          <Route
            path="/home-admin"
            element={<HomeAdminView />}
          />
        </Route>
        <Route element={<HrRoutes />}>
          <Route
            path="/hr/home"
            element={<HrHomeView />}
          />
          <Route
            path="/hr/selected-students"
            element={<HrSelectedStudentsView />}
          />
          <Route
            path="/hr/student-profile/:studentId"
            element={<HrStudentProfileView />}
          />
          <Route
            path="/hr/profile"
            element={<HrProfileView />}
          />
        </Route>
        <Route element={<StudentRoutes />}>
          <Route
            path="/student"
            element={<StudentView />}
          />
        </Route>
      </Routes>
    </>
  );
};
