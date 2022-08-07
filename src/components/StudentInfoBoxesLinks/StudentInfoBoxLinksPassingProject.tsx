import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import './StudentInfoBoxLinks.css';

interface StudentInfoBoxLinksPassingProjectProps {
  projectUrls?: [];
}

export const StudentInfoBoxLinksPassingProject = (props: StudentInfoBoxLinksPassingProjectProps) => {
  const { projectUrls } = props;

  return (
    <div className="student-info-box-links__wrapper">
      {projectUrls ? (
        projectUrls.map((projectUrl, i) => (
          <div className="student-info-box-links__item">
            <AttachFileIcon sx={{ color: '#0b8bd4', height: '30px', width: '30px' }} />
            <a
              key={i}
              href={projectUrl}
              target="_blank"
              rel="noreferrer"
              className="student-info-box-links__item-link">
              {projectUrl}
            </a>
          </div>
        ))
      ) : (
        <p className="student-info-box-links__item--no-data">Brak danych</p>
      )}
    </div>
  );
};
