import React from 'react';
import { StudentImport } from '../StudentImport/StudentImport';
import { AddHR } from '../AddHR/AddHR';
import { Header } from '../Header/Header';
import "./HomeAdmin.css"

export const HomeAdmin = () => {
  return (
    <div className="main-container homeAdmin-container">
      <Header />
      <StudentImport />
      <AddHR />
    </div>
  );
};
