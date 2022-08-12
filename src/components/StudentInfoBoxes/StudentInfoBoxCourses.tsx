import React from 'react';

import './StudentInfoBox.css';

interface StudentInfoBoxCoursesProps {
  courses: string | null;
}

export const StudentInfoBoxCourses = (props: StudentInfoBoxCoursesProps) => {
  const { courses } = props;

  return (
    <div className="student-info-box__wrapper">
      {courses ? <p className="student-info-box__item">{courses}</p> : <p className="student-info-box__item">Brak danych</p>}
    </div>
  );
};
