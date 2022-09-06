import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../redux-toolkit/store';
import {Avatar, Dialog} from '@mui/material';
import {MainBtn} from '../../common/Buttons/MainBtn/MainBtn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SimpleDialog from '@mui/material/Dialog';
import {DisplayAlertModals} from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import {useNavigate, useParams} from 'react-router-dom';
import {setAccessToken, setExpirationTime, setId, setRole} from '../../redux-toolkit/features/user/user-slice';
import {apiUrl} from '../../config/api';
import {DisplayConfirmDialog} from "../../common/FeedbackModals/DisplayConfirmModal/DisplayConfirmModal";

import './Sidebar.css';

interface SidebarStudentProps {
    img_alt?: string | undefined;
    img_src?: string | undefined;
    firstName?: string | null;
    lastName?: string | null;
    githubUsername?: string | null;
    tel?: number | null;
    email: string;
    bio?: string | null;
    secondBtn: boolean;
}

export const SidebarStudent = (props: SidebarStudentProps) => {
    const {img_alt, img_src, firstName, lastName, githubUsername, tel, email, bio, secondBtn} = props;
    const {id, role, accessToken} = useSelector((store: StoreState) => store.user);
    const [agree, setAgree] = useState<boolean | null>();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleConfirmClose = () => {
        setOpen(false);
    };

    const handleAgree = (agree: boolean): boolean => {
        setAgree(agree);
        setOpen(false);
        return agree;
    };

    const {studentId} = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };

    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const handleHired = async () => {
        setTitle('Zmiana statusu kursanta');
        setContent(`Czy chcesz zmienić status kursanta na zatrudniony? Kursant straci dostęp do aplikacji, a jego profil nie będzie widoczny.`);
        setOpen(true);
    };

    useEffect(() => {
        const hired = async () => {
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
                            user_id: studentId ?? id,
                        }),
                    });
                    const result = await data.json();
                    setFeedbackSuccess(result);
                    setFeedbackError(result.message);
                    setOpenModal(true);
                    if (result && role === 'student') {
                        try {
                            const res = await fetch(`${apiUrl}/login`, {
                                method: 'DELETE',
                                credentials: 'include',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                            });
                            const data = await res.json();
                            dispatch(setId(''));
                            dispatch(setAccessToken(''));
                            dispatch(setExpirationTime(0));
                            dispatch(setRole(''));
                            if (data) {
                                navigate('/login');
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    } else if (result) {
                        navigate('/hr/selected-students');
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };
        hired();
    }, [agree]);

    const handleDisinterest = async () => {
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
                    student_id: studentId,
                }),
            });
            const result = await data.json();
            setFeedbackSuccess(result);
            setFeedbackError(result.message);
            setOpenModal(true);
            if (result) {
                navigate('/hr/selected-students');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const telNumber = () => {
        if (tel !== null) {
            const telNum = String(tel);
            const number = `${telNum[0]}${telNum[1]}${telNum[2]} ${telNum[3]}${telNum[4]}${telNum[5]} ${telNum[6]}${telNum[7]}${telNum[8]}`;
            return <p>+48 {number}</p>;
        } else return <p>_____________________</p>;
    };

    return (
        <div className="sidebar_container">
            <Avatar
                alt={img_alt}
                src={img_src}
                sx={{width: 150, height: 150}}
            />

            {
                firstName ? (
                    <p className="sidebar_fullName">
                        {firstName} {lastName}
                    </p>
                ) : (
                    <p className="sidebar_fullName">Kursant</p>
                )
            }

            <div className="sidebar_githubName">
                <GitHubIcon sx={{color: '#0B8BD4'}}/>
                {githubUsername ? <p>{githubUsername}</p> : <p>_____________________</p>}
            </div>

            <div className="sidebar_phoneNumber">
                <CallIcon sx={{color: '#4D4D4D', height: '20px', width: '20px'}}/>
                {telNumber()}
            </div>

            <div className="sidebar_email">
                <EmailIcon sx={{color: '#4D4D4D', height: '20px', width: '20px'}}/>
                <p>{email}</p>
            </div>

            <p className="sidebar_about_p">O mnie</p>

            <div className="sidebar_about">{bio ? <p>{bio}</p> : null}</div>

            {
                secondBtn ? (
                    <MainBtn
                        onClick={handleDisinterest}
                        fullWidth
                        sx={{marginTop: '10px'}}>
                        Brak zainteresowania
                    </MainBtn>
                ) : null
            }

            <MainBtn
                onClick={handleHired}
                fullWidth
                sx={{marginTop: '10px'}}>
                Zatrudniony
            </MainBtn>

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
        </div>
    );
};
