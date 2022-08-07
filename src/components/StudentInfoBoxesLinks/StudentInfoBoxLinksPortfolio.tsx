import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import './StudentInfoBoxLinks.css';

interface StudentInfoBoxLinksPortfolioProps {
  portfolioUrls?: [];
}

export const StudentInfoBoxLinksPortfolio = (props: StudentInfoBoxLinksPortfolioProps) => {
  const { portfolioUrls } = props;

  return (
    <div className="student-info-box-links__wrapper">
      {portfolioUrls ? (
        portfolioUrls.map((portfolioUrl, i) => (
          <div className="student-info-box-links__item">
            <AttachFileIcon sx={{ color: '#0b8bd4', height: '30px', width: '30px' }} />
            <a
              key={i}
              href={portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="student-info-box-links__item-link">
              {portfolioUrl}
            </a>
          </div>
        ))
      ) : (
        <p className="student-info-box-links__item--no-data">Brak danych</p>
      )}
    </div>
  );
};
