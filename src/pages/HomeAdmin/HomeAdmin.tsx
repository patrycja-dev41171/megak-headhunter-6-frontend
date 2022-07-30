import React from 'react';

import './HomeAdmin.css';
import { StudentImport } from '../../components/StudentImport/StudentImport';
import {AddHR} from '../../components/AddHR/AddHR';
import {Header} from '../../components/Header/Header';

export const HomeAdmin = () => {
  return (
      <>
          <div className="home-admin-container">
              <Header/>
              <main className="home-admin_main">
                  <StudentImport/>
                  <AddHR/>
              </main>
          </div>
      </>
  );
};