import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { Typography } from '@mui/material';

import './StudentGrades.css';

interface GradesValues {
  overallEvaluation: number;
  engagementEvaluation: number;
  codeEvaluation: number;
  teamWorkEvaluation: number;
}

export const StudentGrades = () => {
  const labels: { [index: string]: string } = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  };

  const [value, setValue] = useState<GradesValues>({
    overallEvaluation: 2,
    engagementEvaluation: 3,
    codeEvaluation: 5,
    teamWorkEvaluation: 4,
  });

  //here we have to fetch data from BE to change state

  return (
    <Box
      className="student-grades"
      sx={{
        fontSize: '14px',
        fontFamily: 'Catamaran Regular',
      }}>
      <div className="student-grades__item">
        <Typography
          style={{ fontSize: '14px', fontFamily: 'Catamaran Regular', color: '#CFCFCF' }}
          component="legend"
          className="student-grades__typography">
          Ocena przejścia kursu
        </Typography>
        <div className="student-grades__rating">
          {value.overallEvaluation !== null && (
            <Box sx={{ mr: 2, color: '#9E9E9E' }}>
              <span style={{ color: '#F7F7F7' }}>{labels[value.overallEvaluation]}</span>
              /5
            </Box>
          )}
          <Rating
            name="overall-evaluation"
            value={value.overallEvaluation}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ color: '#4D4D4D' }}
                fontSize="inherit"
              />
            }
            icon={
              <StarIcon
                style={{ color: '#E02735' }}
                fontSize="inherit"
              />
            }
          />
        </div>
      </div>

      <div className="student-grades__item">
        <Typography
          style={{ fontSize: '14px', fontFamily: 'Catamaran Regular' }}
          component="legend"
          className="student-grades__typography">
          Ocena aktywności i zaangażowania na kursie
        </Typography>
        <div className="student-grades__rating">
          {value.engagementEvaluation !== null && (
            <Box sx={{ mr: 2, color: '#9E9E9E' }}>
              <span style={{ color: '#F7F7F7' }}>{labels[value.engagementEvaluation]}</span>
              /5
            </Box>
          )}

          <Rating
            name="engagement-evaluation"
            value={value.engagementEvaluation}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ color: '#4D4D4D' }}
                fontSize="inherit"
              />
            }
            icon={
              <StarIcon
                style={{ color: '#E02735' }}
                fontSize="inherit"
              />
            }
          />
        </div>
      </div>

      <div className="student-grades__item">
        <Typography
          style={{ fontSize: '14px', fontFamily: 'Catamaran Regular' }}
          component="legend"
          className="student-grades__typography">
          Ocena kodu w projekcie własnym
        </Typography>
        <div className="student-grades__rating">
          {value.codeEvaluation !== null && (
            <Box sx={{ mr: 2, color: '#9E9E9E' }}>
              <span style={{ color: '#F7F7F7' }}>{labels[value.codeEvaluation]}</span>
              /5
            </Box>
          )}
          <Rating
            name="code-evaluation"
            value={value.codeEvaluation}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ color: '#4D4D4D' }}
                fontSize="inherit"
              />
            }
            icon={
              <StarIcon
                style={{ color: '#E02735' }}
                fontSize="inherit"
              />
            }
          />
        </div>
      </div>

      <div className="student-grades__item">
        <Typography
          style={{ fontSize: '14px', fontFamily: 'Catamaran Regular' }}
          component="legend"
          className="student-grades__typography">
          Ocena pracy w zespole w Scrum
        </Typography>
        <div className="student-grades__rating">
          {value.teamWorkEvaluation !== null && (
            <Box sx={{ mr: 2, color: '#9E9E9E' }}>
              <span style={{ color: '#F7F7F7' }}>{labels[value.teamWorkEvaluation]}</span>
              /5
            </Box>
          )}
          <Rating
            name="team-work-evaluation"
            value={value.teamWorkEvaluation}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ color: '#4D4D4D' }}
                fontSize="inherit"
              />
            }
            icon={
              <StarIcon
                style={{ color: '#E02735' }}
                fontSize="inherit"
              />
            }
          />
        </div>
      </div>
    </Box>
  );
};
