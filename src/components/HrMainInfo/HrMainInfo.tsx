import React from 'react';
import { useNavigate } from 'react-router-dom';

import './HrMainInfo.css';
import { AnimatedSecondaryButton } from '../../common/AnimatedSecondaryButton/AnimatedSecondaryButton';

export const HrMainInfo = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/login');
  };

  return (
    <div className="main">
      <div className="info-header">Dane profilowe:</div>
      <div className="info-body">Jan Kowalski</div>
      <div className="info-header">Email</div>
      <div className="info-body">jan.kowalski@gmail.com</div>
      <div className="info-header">Firma</div>
      <div className="info-body">MegaK Software House</div>
      <div className="info-header">Studenci</div>
      <div className="student-reserved">Zarezerwowani: 3</div>
      <div className="students-available">
        <div>Dostępne miejsca: 2</div>
        <div>
          <AnimatedSecondaryButton onClick={toHome}>Strona główna</AnimatedSecondaryButton>
        </div>
      </div>
    </div>
  );
};