import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux-toolkit/store';
import {HrFrontEntity} from 'types';
import SimpleDialog from '@mui/material/Dialog';
import {Box, Container} from '@mui/material';
import {HeaderMain} from '../Header/HeaderMain/HeaderMain';
import {SidebarHr} from '../Sidebars/SidebarHr';
import {MainBtn} from '../../common/Buttons/MainBtn/MainBtn';
import {apiUrl} from '../../config/api';
import {useRefreshToken} from "../../utils/useRefreshToken";
import {DisplayAlertModals} from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import {BoxNextToSidebar, containerWrapperWithSidebar} from "../../styles/styleObjects";

import '../../styles/stylesForLayouts.css';
import './HrProfileBox.css';

export const HrProfileBox = () => {
    const {id, accessToken} = useSelector((store: StoreState) => store.user);
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

    useRefreshToken();

    const handleRender = (render: boolean) => {
        setRender(render);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`${apiUrl}/hr/${id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
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
                setRender(false);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, [render]);

    return (
        <>
            <HeaderMain
                role="hr"
                fullName={hrData.fullName}
                id={id}
                img_src={hrData.img_src === null ? '' : hrData.img_src}
                img_alt={hrData.fullName}
            />
            <div className="main-container pageWithHeader">
                <Container sx={containerWrapperWithSidebar}>

                    <div className="sidebarBox">
                        {hrData.img_src !== '' ? (
                            <SidebarHr
                                email={hrData.email}
                                fullName={hrData.fullName}
                                img_src={hrData.img_src}
                                renderComponent={render => handleRender(render)}
                            />
                        ) : null}
                    </div>

                    <Box sx={BoxNextToSidebar}>

                        <h3 className="layouts_subtitle">Dane pofilowe</h3>
                        <div className="layouts_line">{hrData.fullName}</div>

                        <h3 className="layouts_subtitle">Email</h3>
                        <div className="layouts_line">{hrData.email}</div>

                        <h3 className="layouts_subtitle">Firma</h3>
                        <div className="layouts_line">{hrData.company}</div>

                        <h3 className="layouts_subtitle">Kursanci</h3>
                        <div className="layouts_line numberOfStudents_line">
                            <div className="numberOfStudents_line-info">

                                <span className="numberOfStudents_reserved">
                                    Zarezerwowani:
                                    <span className="numberOfStudentsNum">
                                        {hrData.reservedStudents}
                                    </span>
                                </span>

                                <span className="numberOfStudents_availablePlaces">
                                    Dostępne miejsca:
                                    <span className="numberOfStudentsNum">
                                        {hrData.maxReservedStudents - hrData.reservedStudents}
                                    </span>
                                </span>

                            </div>

                            <Link
                                className="noUnderline"
                                to="/hr/home">
                                <MainBtn>Strona główna</MainBtn>
                            </Link>
                        </div>

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
                    </Box>
                </Container>
            </div>
        </>
    );
};
