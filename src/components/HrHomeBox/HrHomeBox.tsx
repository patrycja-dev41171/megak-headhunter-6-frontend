import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { NavbarForHRHome } from '../NavbarForHRHome/NavbarForHRHome';
import { Container } from '@mui/material';
import { HrHomeSingleStudent } from '../HrHomeSingleStudent/HrHomeSingleStudent';
import { SearchByFilterForHRHome } from '../SearchByFilterForHRHome/SearchByFilterForHRHome';
import './HrHomeBox.css';
import { HrFrontEntity } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';
import {SetSelectedStudentList, setStudentList} from '../../redux-toolkit/features/user/user-slice';

export const HrHomeBox = () => {
    const { id, studentsList } = useSelector((store: StoreState) => store.user);
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [render, setRender] = useState(false);
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

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleRender = (render: boolean) => {
        setRender(render);
    };

    useEffect(() => {
        const getHrData = async () => {
            try {
                const res = await fetch(`http://localhost:8080/hr/${id}`, {
                    method: 'GET',
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
                const res = await fetch(`http://localhost:8080/hr/home/getAll`, {
                    method: 'GET',
                });
                const data = await res.json();
                dispatch(setStudentList(data))
                if (data.message) {
                    dispatch(SetSelectedStudentList([]));
                    setFeedbackError(data.message);
                    setOpenModal(true);
                }
                if (!data.message) {
                    dispatch(SetSelectedStudentList(data));
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
            <Container
                sx={{
                    marginTop: '26px',
                    '&.MuiContainer-root': {
                        maxWidth: '1430px',
                    },
                }}>
                <Header
                    img_alt={hrData.fullName}
                    img_src={hrData.img_src === null ? '' : hrData.img_src}
                    fullName={hrData.fullName}
                    role="hr"
                    id={id}
                />
                <div className="hrHomeBox__content">
                    <NavbarForHRHome />
                    <SearchByFilterForHRHome />
                    {studentsList === []
                        ? null
                        : studentsList.map(el => {
                            return (
                                <HrHomeSingleStudent
                                    student={el}
                                    key={el.user_id}
                                    renderComponent={render => handleRender(render)}
                                />
                            );
                        })}
                </div>
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
            </Container>
        </div>
    );
};
