import React, { useEffect, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {checkUrl} from "../../utils/checkUrl";
import './StudentInfoBoxLinks.css';

interface StudentInfoBoxLinksGroupProjectProps {
  bonusProjectUrls: string;
}

export const StudentInfoBoxLinksGroupProject = (props: StudentInfoBoxLinksGroupProjectProps) => {
  const [bonusProjectUrls, setBonusProjectUrls] = useState<string[]>([]);

  useEffect(() => {
    const array: string[] = JSON.parse(props.bonusProjectUrls);
    setBonusProjectUrls(array);
  }, []);

  return (
    <div className="student-info-box-links__wrapper">
      {bonusProjectUrls ? (
        bonusProjectUrls.map((bonusProjectUrl, i) => (
          <div
            className="student-info-box-links__item"
            key={i}>
            <AttachFileIcon sx={{ color: '#0b8bd4', height: '30px', width: '30px' }} />
            <a
              key={i}
              href={checkUrl(bonusProjectUrl)}
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
