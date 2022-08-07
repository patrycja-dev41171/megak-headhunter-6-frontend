import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import './StudentInfoBoxLinks.css';

interface StudentInfoBoxLinksGroupProjectProps {
  bonusProjectUrls?: [];
}

export const StudentInfoBoxLinksGroupProject = (props: StudentInfoBoxLinksGroupProjectProps) => {
  const { bonusProjectUrls } = props;

  return (
    <div className="student-info-box-links__wrapper">
      {bonusProjectUrls ? (
        bonusProjectUrls.map((bonusProjectUrl, i) => (
          <div className="student-info-box-links__item">
            <AttachFileIcon sx={{ color: '#0b8bd4', height: '30px', width: '30px' }} />
            <a
              key={i}
              href={bonusProjectUrl}
              target="_blank"
              rel="noreferrer"
              className="student-info-box-links__item-link">
              {bonusProjectUrl}
            </a>
          </div>
        ))
      ) : (
        <p className="student-info-box-links__item--no-data">Brak danych</p>
      )}
    </div>
  );
};
