import React from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MainButton } from '../../common/MainButton/MainButton';

import './OneSelectedStudentOnList.css';
import { Avatar } from '@mui/material';

export const OneSelectedStudentOnList = () => {
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion
      disableGutters
      elevation={0}
      square
      {...props}
    />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    backgroundColor: '#292a2b',
    width: '1390px',
    marginBottom: '20px',
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
    color: '#f7f7f7',
    minHeight: '70px',
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(3),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    color: '#f7f7f7',
    backgroundColor: '#222324',
  }));

  const handleShowCv = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    // logika przycisku "Pokaż CV"
  };

  const handleDisinterest = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    // logika przycisku "Brak zainteresowania"
  };

  const handleHired = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    // logika przycisku "Zatrudniony"
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#666666', height: '30px', width: '30px' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>
          <div className="student_container">
            <div className="main_section">
              <div className="reserved_box">
                <div className="reserved_text">Rezerwacja do</div>
                <div>2022.05.12 r.</div>
              </div>
              <div className="student_info">
                <div className="student_avatar">
                  <Avatar
                    // alt={fullName}
                    // src={img_src ? img_src : imagePreview}
                    sx={{ width: 45, height: 45 }}
                  />
                </div>
                <div>Jan Kowalski</div>
              </div>
            </div>
            <div className="main_section">
              <div className="buttons_box">
                <MainButton onClick={handleShowCv}>Pokaż CV</MainButton>
                <MainButton onClick={handleDisinterest}>Brak zainteresowania</MainButton>
                <MainButton onClick={handleHired}>Zatrudniony</MainButton>
              </div>
            </div>
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>Miejsce na komponent</AccordionDetails>
    </Accordion>
  );
};
