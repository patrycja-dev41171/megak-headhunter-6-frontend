import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MainButton} from "../../common/MainButton/MainButton";
import './HrMainInfo.css';


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
          <MainButton onClick={toHome}>Strona główna</MainButton>
        </div>
      </div>
    </div>
  );
};