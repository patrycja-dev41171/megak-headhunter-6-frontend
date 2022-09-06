import React, { useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MainBtn } from '../../common/Buttons/MainBtn/MainBtn';
import { StudentGradesAndExpectationsForHR } from '../StudentGradesAndExpectationsForHR/StudentGradesAndExpectationsForHR';
import './HrHomeSingleStudent.css';
import { StudentGetAll } from 'types';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import { apiUrl } from '../../config/api';

interface HrHomeSingleStudentProps {
  student: StudentGetAll;
  renderComponent: (render: boolean) => void;
}

export const HrHomeSingleStudent = (props: HrHomeSingleStudentProps) => {
  const { id, accessToken } = useSelector((store: StoreState) => store.user);
  const { student } = props;
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleReservation = async (student_id: string) => {
    try {
      const data = await fetch(`${apiUrl}/student/reserved`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hr_id: id,
          student_id: student_id,
        }),
      });
      const result = await data.json();
      if (result.message) {
        setFeedbackError(result.message);
        setOpenModal(true);
      }
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
  ))(() => ({
    marginBottom: '10px',
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)(() => ({
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      alignItems: 'center',
    },
    color: '#f7f7f7',
    minHeight: '73px',
    backgroundColor: '#292a2b',
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: '0',
    color: '#f7f7f7',
    backgroundColor: '#292a2b',
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
        <MainBtn onClick={() => handleReservation(student.user_id)}>Zarezerwuj rozmowę</MainBtn>
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
