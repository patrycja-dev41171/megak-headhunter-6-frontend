import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavbarForHRHome.css';

export const NavbarForHRHome = () => {
  return (
    <div className="hr-home__navbar">
      <NavLink
        className="hr-home__navbar-link"
        to="/available-students"
        style={({ isActive }) =>
          isActive
            ? {
                borderBottom: '#C92929 solid 3px',
              }
            : { borderBottom: '#292A2B solid 3px' }
        }>
        Dostępni kursanci
      </NavLink>
      <NavLink
        className="hr-home__navbar-link"
        to="/chosen-students"
        style={({ isActive }) =>
          isActive
            ? {
                borderBottom: '#C92929 solid 3px',
                color: '#F7F7F7',
              }
            : { borderBottom: '#292A2B solid 3px', color: '#CFCFCF' }
        }>
        Do rozmowy
      </NavLink>
    </div>
  );
};
