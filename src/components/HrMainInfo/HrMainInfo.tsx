import React from 'react';

import './HrMainInfo.css';

function AnimatedSecondaryButton() {
  return null;
}

export const HrMainInfo = () => {
  return (
    <div className="main">
      <div className="info-header">Dane profilowe:</div>
      <div className="info-body">Jan Kowalski</div>
      <div className="info-header">Email</div>
      <div className="info-body">jan.kowalski@gmail.com</div>
      <div className="info-header">Firma</div>
      <div className="info-body">MegaK Software House</div>
      <div className="info-header">Studenci</div>
      <div className="info-body">
        <p className="student-reserved">Zarezerwowani: 3</p>
        <p className="students-available">Dostępne miejsca: 2</p>
      </div>
      <AnimatedSecondaryButton />
    </div>
  );
};
