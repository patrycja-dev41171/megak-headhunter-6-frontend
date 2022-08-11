import React, { useState } from 'react';
import { MainButton } from '../../common/MainButton/MainButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './HrHomeSingleStudent.css';

interface HrHomeSingleStudentProps {
  firstName: string;
  lastName: string;
}

export const HrHomeSingleStudent = (props: HrHomeSingleStudentProps) => {
  const { firstName, lastName } = props;
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div className="hr-home-single-student">
        <p>
          {firstName} {lastName.slice(0, 1)}.
        </p>
        <div className="hr-home-single-student-right">
          <MainButton>Zarezerwuj rozmowę</MainButton>
          <ExpandMoreIcon
            onClick={toggleClass}
            className={isActive ? 'hr-home-single-student__icon--down' : 'hr-home-single-student__icon--up'}
            sx={{ color: '#666666', height: '30px', width: '30px' }}
          />
        </div>
      </div>
      <div className={isActive ? 'hr-home-single-student__description--hidden' : 'hr-home-single-student__description--show'}>
        Test testu
      </div>
    </>
  );
};
