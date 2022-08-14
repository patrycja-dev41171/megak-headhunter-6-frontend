import React, { useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MainButton } from '../../common/MainButton/MainButton';
import { StudentGradesAndExpectationsForHR } from '../StudentGradesAndExpectationsForHR/StudentGradesAndExpectationsForHR';
import './HrHomeSingleStudent.css';
import { StudentGetAll } from 'types';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';

interface HrHomeSingleStudentProps {
  student: StudentGetAll;
  renderComponent: (render: boolean) => void;
}

export const HrHomeSingleStudent = (props: HrHomeSingleStudentProps) => {
  const { id } = useSelector((store: StoreState) => store.user);
  const { student } = props;
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleReservation = async (student_id: string) => {
    try {
      const data = await fetch('http://localhost:8080/student/reserved', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hr_id: id,
          student_id: student_id,
        }),
      });
      const result = await data.json();
      setFeedbackSuccess(result);
      setFeedbackError(result.message);
      setOpenModal(true);
      props.renderComponent(true);
    } catch (err) {
      console.log(err);
    }
  };

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion
      disableGutters
      elevation={0}
      square
      {...props}
    />
  ))(({ theme }) => ({
    marginTop: '3px',
    '&:not(:last-child)': {
      border: 0,
    },
    '&:before': {
      display: 'none',
    },
    backgroundColor: '#292a2b',
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
    color: '#f7f7f7',
    minHeight: '70px',
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '0',
    color: '#f7f7f7',
    backgroundColor: '#222324',
    borderBottom: '10px solid #1E1E1F',
  }));

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#666666', height: '30px', width: '30px' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>
          {student.firstName} {student.lastName.slice(0, 1)}.
        </Typography>
        <MainButton onClick={() => handleReservation(student.user_id)}>Zarezerwuj rozmowę</MainButton>
      </AccordionSummary>
      <AccordionDetails>
        <StudentGradesAndExpectationsForHR student={student} />
      </AccordionDetails>
      {openModal && (
        <SimpleDialog
          open={openModal}
          onClose={handleClose}>
          {openModal && (
            <DisplayAlertModals
              error={feedbackError}
              success={feedbackSuccess}
            />
          )}
        </SimpleDialog>
      )}
    </Accordion>
  );
};
