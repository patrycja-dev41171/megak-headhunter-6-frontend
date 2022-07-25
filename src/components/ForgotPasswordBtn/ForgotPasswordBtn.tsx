import React from 'react';
import { Link } from 'react-router-dom';

import './ForgotPasswordBtn.css';

export const ForgotPasswordBtn = () => {
  return (
    <Link
      className="forgot-btn"
      to="/forgot-password">
      Zapomniałeś hasła?
    </Link>
  );
};
