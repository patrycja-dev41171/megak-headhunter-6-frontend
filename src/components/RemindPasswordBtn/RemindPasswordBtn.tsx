import React from 'react';
import { Link } from 'react-router-dom';

import './RemindPasswordBtn.css';

export const RemindPasswordBtn = () => {
  return (
    <Link
      className="remind-btn"
      to="/remind-password">
      Zapomniałeś hasła?
    </Link>
  );
};
