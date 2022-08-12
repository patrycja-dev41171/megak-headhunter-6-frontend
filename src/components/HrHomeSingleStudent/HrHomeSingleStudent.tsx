import React from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MainButton } from '../../common/MainButton/MainButton';

import './HrHomeSingleStudent.css';

interface HrHomeSingleStudentProps {
  firstName: string;
  lastName: string;
}

export const HrHomeSingleStudent = (props: HrHomeSingleStudentProps) => {
  const { firstName, lastName } = props;

  const handleBookCallWithStudent = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    // logika przycisku "Zarezerwuj rozmowę"
  };

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

  return (
    <div className="hr-home-single-student__wrapper">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#666666', height: '30px', width: '30px' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>
            {firstName} {lastName.slice(0, 1)}.
          </Typography>
          <MainButton onClick={handleBookCallWithStudent}>Zarezerwuj rozmowę</MainButton>
        </AccordionSummary>
        <AccordionDetails>Miejsce na komponent</AccordionDetails>
      </Accordion>
    </div>
  );
};
