import React, {useState} from 'react';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {styled} from '@mui/material/styles';
import {MainButton} from '../../common/MainButton/MainButton';

import './OneSelectedStudentOnList.css';
import {Avatar} from '@mui/material';
import {StudentGradesAndExpectationsForHR} from '../StudentGradesAndExpectationsForHR/StudentGradesAndExpectationsForHR';
import {StudentEntityFront} from 'types';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux-toolkit/store';
import {useNavigate} from 'react-router-dom';

interface OneSelectedStudentOnListProps {
    student: StudentEntityFront;
    renderComponent: (render: boolean) => void;
}

export const OneSelectedStudentOnList = (props: OneSelectedStudentOnListProps) => {
    const {student} = props;
    const {id} = useSelector((store: StoreState) => store.user);
    let navigate = useNavigate();

    const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion
            disableGutters
            elevation={0}
            square
            {...props}
        />
    ))(({theme}) => ({
        marginBottom: '10px',
    }));

    const AccordionSummary = styled((props: AccordionSummaryProps) =>
        <MuiAccordionSummary {...props} />)(({theme}) => ({
        color: '#f7f7f7',
        minHeight: '70px',
        backgroundColor: '#292a2b',
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
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
        const isConfirm = window.confirm('Czy jesteś pewien, że chcesz odrzucić tego kursanta?');
        if (isConfirm) {
            try {
                const data = await fetch('http://localhost:8080/student/cancel/reservation', {
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
                setFeedbackError(result.message);
                setOpenModal(true);
                props.renderComponent(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleHired = async (student_id: string | null | undefined) => {
        const isConfirm = window.confirm(
            'Czy jesteś pewien, że chcesz zmienić status na' +
            ' "zatrudniony"? Kursant utraci możliwość logowania, a jego profil przestanie być' +
            ' widoczny.'
        );
        if (isConfirm) {
            try {
                const data = await fetch('http://localhost:8080/student/hired', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
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
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: '#666666', height: '30px', width: '30px'}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className="oneSelectedStudent__leftSide">
                    <div className="reserved_box">
                        <div className="reserved_text">Rezerwacja do</div>
                        <div>{String(student.reservedTo).split('T')[0]}</div>
                    </div>
                    <Avatar
                        alt={`${student.firstName} ${student.lastName}`}
                        src={student.githubUserName === null ? undefined : `https://github.com/${student.githubUserName}.png`}
                        sx={{width: 45, height: 45, marginRight: '20px'}}
                    />
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
                <StudentGradesAndExpectationsForHR student={student}/>
            </AccordionDetails>
        </Accordion>
    );
};