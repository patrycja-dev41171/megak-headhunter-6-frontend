import React from 'react';

import './OneSelectedStudentOnList.css';
import { MainButton } from '../../common/MainButton/MainButton';
import { Avatar } from '@mui/material';
import { ShowDetailsBtn } from '../../common/ShowDetailsBtn/ShowDetailsBtn';

export const OneSelectedStudentOnList = () => {
  return (
    <div className="student_container">
      <div className="main_section">
        <div className="reserved_box">
          <div className="reserved_text">Rezerwacja do</div>
          <div>2022.05.12 r.</div>
        </div>
        <div className="student_info">
          <div className="student_avatar">
            <Avatar
              // alt={fullName}
              // src={img_src ? img_src : imagePreview}
              sx={{ width: 45, height: 45 }}
            />
          </div>
          <div>Jan Kowalski</div>
        </div>
      </div>
      <div className="main_section">
        <div className="buttons_box">
          <MainButton>Pokaż CV</MainButton>
          <MainButton>Brak zainteresowania</MainButton>
          <MainButton>Zatrudniony</MainButton>
        </div>
        <div className="show_details_section">
          <ShowDetailsBtn />
        </div>
      </div>
    </div>
  );
};
