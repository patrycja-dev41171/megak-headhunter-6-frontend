import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { StoreState } from './redux-toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setExpirationTime, setId, setIsLoggedIn, setRole } from './redux-toolkit/features/user/user-slice';
import { AdminRoutes, HrRoutes, StudentRoutes } from './utils/protected-routes';
import jwtDecode from 'jwt-decode';
import { LoginView } from './pages/LoginView/LoginView';
import { RegisterView } from './pages/RegisterView/RegisterView';
import { ForgotPasswordView } from './pages/ForgotPasswordView/ForgotPasswordView';
import { ChangePasswordView } from './pages/ChangePasswordView/ChangePasswordView';
import { HrHomeView } from './pages/HrHomeView/HrHomeView';
import { HrSelectedStudentsView } from './pages/HrSelectedStudentsView/HrSelectedStudentsView';
import { HrStudentProfileView } from './pages/HrStudentProfileView/HrStudentProfileView';
import { StudentView } from './pages/StudentView/StudentView';
import { HrProfileView } from './pages/HrProfileView/HrProfileView';
import { apiUrl } from './config/api';
import { HomeAdminView } from './pages/HomeAdminView/HomeAdminView';

export const App = () => {
  const { role } = useSelector((store: StoreState) => store.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const res = await fetch(`${apiUrl}/refresh-token`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      const decoded: any = jwtDecode(data.accessToken);
      dispatch(setId(data.id));
      dispatch(setAccessToken(data.accessToken));
      dispatch(setExpirationTime(decoded.exp));
      dispatch(setRole(data.role));
      if (data) {
        dispatch(setIsLoggedIn(true));
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    refreshToken();
    if (role !== '') {
      switch (role) {
        case 'admin':
          navigate('/home-admin');
          break;
        case 'hr':
          navigate('/hr/home');
          break;
        case 'student':
          navigate('/student');
          break;
      }
    }
  }, []);

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
