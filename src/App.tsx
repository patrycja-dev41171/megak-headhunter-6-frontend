import React from 'react';
import { LoginView } from './pages/LoginView/LoginView';
import { Route, Routes } from 'react-router-dom';
import { HomeAdmin } from './pages/HomeAdmin/HomeAdmin';
import { RegisterView } from './pages/RegisterView/RegisterView';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<LoginView />}
        />
        <Route
          path="/home-admin"
          element={<HomeAdmin />}
        />
        <Route
          path="/register"
          element={<RegisterView />}
        />
      </Routes>
    </>
  );
}

export default App;
