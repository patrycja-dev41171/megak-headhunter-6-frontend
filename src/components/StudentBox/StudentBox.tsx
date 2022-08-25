import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Box, Container } from '@mui/material';
import { StudentForm } from '../StudentForm/StudentForm';
import { SidebarStudent } from '../Sidebars/SidebarStudent';
import { StudentGrades } from '../StudentGrades/StudentGrades';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import { studentEntityFront } from 'types';
import './StudentBox.css';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';
import {useRefreshToken} from "../../utils/useRefreshToken";

export const StudentBox = () => {
  const { id, accessToken } = useSelector((store: StoreState) => store.user);
  const [render, setRender] = useState(false);
  const [studentData, setStudentData] = useState<studentEntityFront>({
    email: '',
    courseCompletion: 0,
    courseEngagement: 0,
    projectDegree: 0,
    teamProjectDegree: 0,
    bonusProjectUrls: '',
    tel: null,
    firstName: null,
    lastName: null,
    githubUserName: null,
    portfolioUrls: null,
    projectUrls: null,
    bio: null,
    expectedTypeWork: null,
    targetWorkCity: null,
    expectedContractType: null,
    expectedSalary: null,
    canTakeApprenticeship: null,
    monthsOfCommercialExp: null,
    education: null,
    workExperience: null,
    courses: null,
    status: null,
  });
  const [value, setValue] = useState('');
  useRefreshToken();

  const updateValue = (datafromChild: any) => {
    setValue(datafromChild);
  };

  const handleRender = (render: boolean) => {
    setRender(render);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${apiUrl}/oneStudent/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        await setStudentData(data);
        setRender(false);
        if (data.message) {
          setFeedbackError(data.message);
          setOpenModal(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [render]);

  return (
    <>
      <Header
        img_alt={`Kursant ${studentData.firstName} ${studentData.lastName}.`}
        img_src={studentData.githubUserName === null ? undefined : `https://github.com/${studentData.githubUserName}.png`}
        firstName={studentData.firstName}
        lastName={studentData.lastName}
        role="student"
        id={id}
      />
      <div className="main-container pageWithHeader">
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '26px',
            '&.MuiContainer-root': {
              maxWidth: '1430px',
            },
          }}>
          <div className="sidebarBox">
            <SidebarStudent
              email={studentData.email}
              bio={studentData.bio}
              img_alt={`Kursant ${studentData.firstName} ${studentData.lastName}.`}
              img_src={studentData.githubUserName === null ? undefined : `https://github.com/${studentData.githubUserName}.png`}
              firstName={studentData.firstName}
              lastName={studentData.lastName}
              githubUsername={studentData.githubUserName}
              tel={studentData.tel}
              secondBtn={false}
            />
          </div>
          <Box
            sx={{
              backgroundColor: '#222224',
              width: '1176px',
            }}>
            <h3 className="studentView_subtitle">Oceny</h3>
            <div className="studentView_line studentView_grades">
              <StudentGrades
                courseCompletion={studentData.courseCompletion}
                courseEngagement={studentData.courseEngagement}
                projectDegree={studentData.projectDegree}
                teamProjectDegree={studentData.teamProjectDegree}
              />
            </div>

            <div className="studentView_subtitle">
              <h3>Uzupełnij swój profil</h3>
              {studentData.firstName === null ? (
                <span className="studentView_subtitleInstruction">Jesteś niewidoczny dla HR. Uzupełnij dane w formularzu.</span>
              ) : (
                <span className="studentView_subtitleInstruction studentView_subtitleInstruction_success">Twój profil jest widoczny.</span>
              )}
            </div>

            <div className="studentView_line">
              {studentData.email !== '' ? (
                <StudentForm
                  email={studentData.email}
                  tel={studentData.tel}
                  firstName={studentData.firstName}
                  lastName={studentData.lastName}
                  githubUserName={studentData.githubUserName}
                  portfolioUrls={studentData.portfolioUrls}
                  projectUrls={studentData.projectUrls}
                  bio={studentData.bio}
                  expectedTypeWork={studentData.expectedTypeWork}
                  expectedSalary={studentData.expectedSalary}
                  canTakeApprenticeship={studentData.canTakeApprenticeship}
                  monthsOfCommercialExp={studentData.monthsOfCommercialExp}
                  education={studentData.education}
                  workExperience={studentData.workExperience}
                  courses={studentData.courses}
                  expectedContractType={studentData.expectedContractType}
                  targetWorkCity={studentData.targetWorkCity}
                  renderComponent={render => handleRender(render)}
                />
              ) : null}
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
