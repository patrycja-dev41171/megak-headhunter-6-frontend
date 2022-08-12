import React from 'react';

import './StudentInfoBox.css';

interface StudentInfoBoxEducationProps {
  education: string | null;
}

export const StudentInfoBoxEducation = (props: StudentInfoBoxEducationProps) => {
  const { education } = props;

  return (
    <div className="student-info-box__wrapper">
      {education ? <p className="student-info-box__item">{education}</p> : <p className="student-info-box__item">Brak danych</p>}
    </div>
  );
};
