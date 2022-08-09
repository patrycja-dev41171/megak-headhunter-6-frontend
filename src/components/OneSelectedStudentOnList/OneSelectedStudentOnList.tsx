import React from 'react';

import './OneSelectedStudentOnList.css';
import { MainButton } from '../../common/MainButton/MainButton';
import { Avatar } from '@mui/material';

export const OneSelectedStudentOnList = () => {
  return (
    <div className="student_container">
      <div className="reserved_box">Rezerwacja do</div>
      <div className="student_info">
        <div>
          <Avatar
            // alt={fullName}
            // src={img_src ? img_src : imagePreview}
            sx={{ width: 45, height: 45 }}
          />
        </div>
        <div>Imię i nazwisko</div>
      </div>
      <div className="buttons_box">
        <MainButton>Pokaż CV</MainButton>
        <MainButton>Brak zainteresowania</MainButton>
        <MainButton>Zatrudniony</MainButton>
      </div>
      <div className="show_details_btn">Rozwiń</div>
    </div>
  );
};
