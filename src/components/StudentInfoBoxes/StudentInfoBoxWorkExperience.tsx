import React from 'react';

import './StudentInfoBox.css';

interface StudentInfoBoxWorkExperienceProps {
  workExperience: string | null;
}

export const StudentInfoBoxWorkExperience = (props: StudentInfoBoxWorkExperienceProps) => {
  const { workExperience } = props;

  return (
    <div className="student-info-box__wrapper">
      {workExperience ? <p className="student-info-box__item">{workExperience}</p> : <p className="student-info-box__item">Brak danych</p>}
    </div>
  );
};
