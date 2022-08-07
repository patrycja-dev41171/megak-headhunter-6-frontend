import React, { MouseEventHandler } from 'react';

import './ReturnBtn.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Props {
  onClick: MouseEventHandler;
}

export const ReturnBtn = (props: Props) => {
  return (
    <div className="hrStudentProfileView_button">
      <div>
        <button className="return_btn">
          <div className="return_btn_icon">
            <ArrowBackIosIcon />
          </div>
          <div className="return_btn_text">Wróć</div>
        </button>
      </div>
    </div>
  );
};