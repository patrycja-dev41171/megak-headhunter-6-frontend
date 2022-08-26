import React, {useEffect, useState} from 'react';
import { Header } from '../Header/Header';
import { NavbarForHRHome } from '../NavbarForHRHome/NavbarForHRHome';
import { Container } from '@mui/material';
import { HrHomeSingleStudent } from '../HrHomeSingleStudent/HrHomeSingleStudent';
import { SearchByFilterForHRHome } from '../SearchByFilterForHRHome/SearchByFilterForHRHome';
import { HrFrontEntity } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';
import { setStudentList } from '../../redux-toolkit/features/user/user-slice';
import { apiUrl } from '../../config/api';

import './HrHomeBox.css';
import { useRefreshToken } from '../../utils/useRefreshToken';

export const HrHomeBox = () => {
  const { id, studentsList, accessToken } = useSelector((store: StoreState) => store.user);
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
  useRefreshToken()

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
        const res = await fetch(`${apiUrl}/hr/home/getAll/${id}`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (data === null) {
          dispatch(setStudentList([]));
          setFeedbackError('Brak dostęnych kursantów.');
          setOpenModal(true);
        }
        if (data !== null) {
          dispatch(setStudentList(data));
          if (typeof data.message === 'string') {
            console.log('dasds');
            dispatch(setStudentList([]));
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
        <div className="hrHomeBox__contentContainer">
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
