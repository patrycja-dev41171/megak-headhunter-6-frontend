import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Box, Container } from '@mui/material';
import { SidebarHr } from '../Sidebars/SidebarHr';
import { Link } from 'react-router-dom';
import { MainButton } from '../../common/MainButton/MainButton';
import '../../styles/stylesForLayouts.css';
import './HrProfileBox.css';
import { HrEntity } from 'types';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';

interface HrData extends HrEntity {
  studentsNum: number;
}

export const HrProfileBox = () => {
  const { id } = useSelector((store: StoreState) => store.user);
  const [hrData, setHrData] = useState<HrData>({
    id: '',
    user_id: '',
    email: '',
    fullName: '',
    company: '',
    maxReservedStudents: 0,
    users_id_list: '',
    img_src: '',
    studentsNum: 0,
  });

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  //infoFromBackendStatus
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/hr/${id}`, {
          method: 'GET',
        });
        const data = await res.json();
          const students = JSON.parse(data.users_id_list).length;
          await setHrData({
            ...data,
            studentsNum: students,
          });
        if (data.message) {
          setFeedbackError(data.message);
          setOpenModal(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Header
        role="hr"
        fullName={hrData.fullName}
        id={id}
        img_src={hrData.img_src === null ? '' : hrData.img_src}
        img_alt={hrData.fullName}
      />
      <div className="main-container pageWithHeader">
        <Container
          sx={{
            display: 'flex',
            marginTop: '26px',
            '&.MuiContainer-root': {
              maxWidth: '1430px',
            },
          }}>
          <div className="sidebarBox">
            <SidebarHr
              email={hrData.email}
              fullName={hrData.fullName}
              img_src={hrData.img_src}
            />
          </div>
          <Box
            sx={{
              backgroundColor: '#222224',
              width: '1176px',
            }}>
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
                  <span className="numberOfStudentsNum">{hrData.studentsNum}</span>
                </span>
                <span className="numberOfStudents_availablePlaces">
                  Dostępne miejsca:
                  <span className="numberOfStudentsNum">{hrData.maxReservedStudents - hrData.studentsNum}</span>
                </span>
              </div>
              <Link
                className="noUnderline"
                to="/hr/home">
                <MainButton>Strona główna</MainButton>
              </Link>
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
          </Box>
        </Container>
      </div>
    </>
  );
};
