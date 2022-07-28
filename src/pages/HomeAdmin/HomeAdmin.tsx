import React from 'react';

import './HomeAdmin.css';
import { StudentImport } from '../../components/StudentImport/StudentImport';
import { AddHR } from '../../components/AddHR/AddHR';
import { LogoutBtn } from '../../components/LogoutBtn/LogoutBtn';

export const HomeAdmin = () => {
  return (
    <div className="home-admin-container">
      <header className="home-admin_header">
        <img
          className="home-admin_img"
          src="/logo-megak.webp"
          alt="Logo Mega K"
        />
        <p className="home-admin_logout">
          <LogoutBtn />
        </p>
      </header>

      <main className="home-admin_main">
        <StudentImport />
        <AddHR />
      </main>
    </div>
  );
};
