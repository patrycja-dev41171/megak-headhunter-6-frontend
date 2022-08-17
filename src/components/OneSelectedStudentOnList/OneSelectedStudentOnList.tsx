import React, { useEffect, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MainButton } from '../../common/MainButton/MainButton';

import './OneSelectedStudentOnList.css';
import { Avatar, Dialog } from '@mui/material';
import { StudentGradesAndExpectationsForHR } from '../StudentGradesAndExpectationsForHR/StudentGradesAndExpectationsForHR';
import { StudentEntityFront } from 'types';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import { DisplayConfirmDialog } from '../../common/DisplayConfirmModal/DisplayConfirmModal';

interface OneSelectedStudentOnListProps {
  student: StudentEntityFront;
  renderComponent: (render: boolean) => void;
}

export const OneSelectedStudentOnList = (props: OneSelectedStudentOnListProps) => {
  const { student } = props;
  const [agree, setAgree] = useState<boolean | null>();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [student_id, setStudentId] = React.useState<string | null | undefined>('');
  const [content, setContent] = React.useState('');
  const { id, accessToken } = useSelector((store: StoreState) => store.user);
  let navigate = useNavigate();

  const handleConfirmClose = () => {
    setOpen(false);
  };

  const handleAgree = (agree: boolean): boolean => {
    setAgree(agree);
    setOpen(false);
    return agree;
  };

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion
      disableGutters
      elevation={0}
      square
      {...props}
    />
  ))(({ theme }) => ({
    marginBottom: '10px',
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)(({ theme }) => ({
    color: '#f7f7f7',
    minHeight: '70px',
    backgroundColor: '#292a2b',
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '0',
    color: '#f7f7f7',
    backgroundColor: '#292a2b',
  }));

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const handleShowCV = async (student_id: string | null | undefined) => {
    navigate(`/hr/student-profile/${student_id}`);
  };

  const handleDisinterest = async (student_id: string | null | undefined) => {
    try {
      const data = await fetch(`${apiUrl}/student/cancel/reservation`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          hr_id: id,
          student_id: student_id,
        }),
      });
      const result = await data.json();
      setFeedbackError(result.message);
      setOpenModal(true);
      props.renderComponent(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHired = async (student_id: string | null | undefined) => {
    setStudentId(student_id);
    setTitle('Zmiana statusu kursanta');
    setContent(`Czy chcesz zmienić status kursanta na zatrudniony? Kursant straci dostęp do aplikacji, a jego profil nie będzie widoczny.`);
    setOpen(true);
  };

  useEffect(() => {
    const hired = async (student_id: string | null | undefined) => {
      if (agree === true) {
        try {
          const data = await fetch(`${apiUrl}/student/hired`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              user_id: student_id,
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
      }
    };
    hired(student_id);
  }, [agree]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#666666', height: '30px', width: '30px' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <div className="oneSelectedStudent__leftSide">
          <div className="reserved_box">
            <div className="reserved_text">Rezerwacja do</div>
            <div>{String(student.reservedTo).split('T')[0]}</div>
          </div>
          {student.githubUserName !== undefined ? (
            <Avatar
              alt={`${student.firstName} ${student.lastName}`}
              src={`https://github.com/${student.githubUserName}.png`}
              sx={{ width: 45, height: 45, marginRight: '20px' }}
            />
          ) : null}
          <div>
            {student.firstName} {student.lastName}
          </div>
        </div>
        <div className="buttons_box">
          <MainButton onClick={() => handleShowCV(student.user_id)}>Pokaż CV</MainButton>
          <MainButton onClick={() => handleDisinterest(student.user_id)}>Brak zainteresowania</MainButton>
          <MainButton onClick={() => handleHired(student.user_id)}>Zatrudniony</MainButton>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <StudentGradesAndExpectationsForHR student={student} />
      </AccordionDetails>
      <Dialog
        open={open}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DisplayConfirmDialog
          title={title}
          content={content}
          agree={agree => handleAgree(agree)}
        />
      </Dialog>
    </Accordion>
  );
};
