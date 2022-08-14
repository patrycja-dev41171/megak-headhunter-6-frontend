import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import './HrSelectedStudentsBox.css';
import { Container } from '@mui/material';
import { NavbarForHRHome } from '../NavbarForHRHome/NavbarForHRHome';
import { SearchByFilterForHRHome } from '../SearchByFilterForHRHome/SearchByFilterForHRHome';
import { OneSelectedStudentOnList } from '../OneSelectedStudentOnList/OneSelectedStudentOnList';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import { SetSelectedStudentList } from '../../redux-toolkit/features/user/user-slice';
import { HrFrontEntity } from 'types';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';

export const HrSelectedStudentsBox = () => {
    const { id, selectedStudentsList } = useSelector((store: StoreState) => store.user);
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

    const handleClose = () => {
        setOpenModal(false);
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
                const res = await fetch(`http://localhost:8080/hr/selected/students/${id}`, {
                    method: 'GET',
                });
                const data = await res.json();

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
                    img_src={hrData.img_src ? hrData.img_src : undefined}
                    fullName={hrData.fullName}
                    role="hr"
                    id={hrData.user_id}
                />
                <div className="hrSelStudBox__contentContainer">
                    <div className="hrSelStudBox__content">
                <NavbarForHRHome />
                <SearchByFilterForHRHome />
                {selectedStudentsList === []
                    ? null
                    : selectedStudentsList.map(el => {
                        return (
                            <OneSelectedStudentOnList
                                student={el}
                                key={el.user_id}
                                renderComponent={render => handleRender(render)}
                            />
                        );
                    })}
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
                </div>
            </Container>
        </div>
    );
};
