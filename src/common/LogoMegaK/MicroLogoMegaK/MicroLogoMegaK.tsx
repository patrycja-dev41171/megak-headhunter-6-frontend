import React from 'react';
import './MicroLogoMegaK.css';
import { useNavigate } from 'react-router-dom';

interface MicroLogoMegaKProps {
  role: string;
}

export const MicroLogoMegaK = (props: MicroLogoMegaKProps) => {
  const { role } = props;
  let navigate = useNavigate();

  const handleNavigate = () => {
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
  };

  return (
    <div
      className="microLogoMegaK_container"
      onClick={handleNavigate}>
      <img
        src="../../logo-megak.webp"
        alt="Logo MegaK"
        className="micro-logo"
      />
    </div>
  );
};
