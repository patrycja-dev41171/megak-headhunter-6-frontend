import React, {useEffect, useState} from 'react';
import {HeaderMain} from '../Header/HeaderMain/HeaderMain';
import {Container} from '@mui/material';
import {NavbarForHRHome} from '../NavbarForHRHome/NavbarForHRHome';
import {SearchByFilterForHRHome} from '../SearchByFilterForHRHome/SearchByFilterForHRHome';
import {OneSelectedStudentOnList} from '../OneSelectedStudentOnList/OneSelectedStudentOnList';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../redux-toolkit/store';
import {setSelectedStudentList} from '../../redux-toolkit/features/user/user-slice';
import {HrFrontEntity} from 'types';
import SimpleDialog from '@mui/material/Dialog';
import {DisplayAlertModals} from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import {apiUrl} from '../../config/api';
import {useRefreshToken} from "../../utils/useRefreshToken";
import {containerWrapper} from "../../styles/styleObjects";

import './HrSelectedStudentsBox.css';

export const HrSelectedStudentsBox = () => {
    const {id, selectedStudentsList, accessToken} = useSelector((store: StoreState) => store.user);
    const [render, setRender] = useState(false);
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [hrData, setHrData] = useState<HrFrontEntity>({
        id: '',
        user_id: '',
        email: '',
        fullName: '',
        company: '',
        maxReservedStudents: 0,
        img_src: '',
        reservedStudents: 0,
    });

    const handleRender = (render: boolean) => {
        setRender(render);
    };

    const dispatch = useDispatch();
    useRefreshToken();

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const getHrData = async () => {
            try {
                const res = await fetch(`${apiUrl}/hr/${id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json();
                await setHrData({
                    ...data,
                });
                if (data.message) {
                    setFeedbackError(data.message);
                    setOpenModal(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getHrData();
    }, []);

    useEffect(() => {
        const getStudentsData = async () => {
            try {
                const res = await fetch(`${apiUrl}/hr/selected/students/${id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json();

                if (data === null) {
                    dispatch(setSelectedStudentList([]));
                    setFeedbackError('Brak zarezerwowanych kursantów.');
                    setOpenModal(true);
                }
                if (data !== null) {
                    dispatch(setSelectedStudentList(data));
                    if (typeof data.message === 'string') {
                        dispatch(setSelectedStudentList([]));
                        setFeedbackError(data.message);
                        setOpenModal(true);
                    }
                }

                setRender(false);
            } catch (err) {
                console.log(err);
            }
        };
        getStudentsData();
    }, [render]);

    return (
        <div className="mainBackground pageWithHeader">
            <Container sx={containerWrapper}>

                <HeaderMain
                    img_alt={hrData.fullName}
                    img_src={hrData.img_src ? hrData.img_src : undefined}
                    fullName={hrData.fullName}
                    role="hr"
                    id={hrData.user_id}
                />

                <div className="hrSelStudBox__contentContainer">
                    <div className="hrSelStudBox__content">
                        <NavbarForHRHome/>
                        <SearchByFilterForHRHome/>

                        {
                            selectedStudentsList === []
                                ? null
                                : selectedStudentsList.map(el => {
                                    return (
                                        <OneSelectedStudentOnList
                                            student={el}
                                            key={el.user_id}
                                            renderComponent={render => handleRender(render)}
                                        />
                                    );
                                })
                        }

                        {
                            openModal && (
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
                            )
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};
