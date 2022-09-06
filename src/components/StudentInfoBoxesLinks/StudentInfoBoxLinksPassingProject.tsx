import React, { useEffect, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {checkUrl} from "../../utils/checkUrl";

import './StudentInfoBoxLinks.css';

interface StudentInfoBoxLinksPassingProjectProps {
  projectUrls: string | null;
}

export const StudentInfoBoxLinksPassingProject = (props: StudentInfoBoxLinksPassingProjectProps) => {
  const [projectUrls, setProjectUrls] = useState<string[]>([]);

  useEffect(() => {
    if (props.projectUrls !== null) {
      const array: string[] = JSON.parse(props.projectUrls);
      setProjectUrls(array);
    }
  }, []);

  return (
    <div className="student-info-box-links__wrapper">
      {projectUrls ? (
        projectUrls.map((projectUrl, i) => (
          <div
            className="student-info-box-links__item"
            key={i}>
            <AttachFileIcon sx={{ color: '#0b8bd4', height: '30px', width: '30px' }} />
            <a
              key={i}
              href={checkUrl(projectUrl)}
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
