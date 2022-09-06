import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavbarForHRHome.css';

export const NavbarForHRHome = () => {
  return (
    <div className="hr-home__links">
      <NavLink
        className="hr-home__navbar-link noUnderline"
        to="/hr/home"
        style={({ isActive }) => (isActive ? { borderBottom: '#E02735 solid 3px' } : { borderBottom: '' })}>
        Dostępni kursanci
      </NavLink>
      <NavLink
        className="hr-home__navbar-link noUnderline"
        to="/hr/selected-students"
        style={({ isActive }) => (isActive ? { borderBottom: '#E02735 solid 3px' } : { borderBottom: '' })}>
        Do rozmowy
      </NavLink>
    </div>
  );
};
