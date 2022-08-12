import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Box, Container } from '@mui/material';
import { StudentExpectations } from '../StudentExpectations/StudentExpectations';
import { SidebarStudent } from '../Sidebars/SidebarStudent';
import { StudentGrades } from '../StudentGrades/StudentGrades';
import { StudentInfoBoxEducation } from '../StudentInfoBoxes/StudentInfoBoxEducation';
import { StudentInfoBoxCourses } from '../StudentInfoBoxes/StudentInfoBoxCourses';
import { StudentInfoBoxWorkExperience } from '../StudentInfoBoxes/StudentInfoBoxWorkExperience';
import { StudentInfoBoxLinksPortfolio } from '../StudentInfoBoxesLinks/StudentInfoBoxLinksPortfolio';
import { StudentInfoBoxLinksGroupProject } from '../StudentInfoBoxesLinks/StudentInfoBoxLinksGroupProject';
import { StudentInfoBoxLinksPassingProject } from '../StudentInfoBoxesLinks/StudentInfoBoxLinksPassingProject';
import { ReturnBtn } from '../../common/ReturnBtn/ReturnBtn';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import { useParams } from 'react-router-dom';
import { studentEntityFront } from 'types';
import '../../styles/stylesForLayouts.css';

interface hrData {
  fullName: string | null;
  img_src: string | null;
}

export const HrStudentProfileBox = () => {
  const { id } = useSelector((store: StoreState) => store.user);
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

  const [hrData, setHrData] = useState<hrData>({
    fullName: '',
    img_src: '',
  });

  const { studentId } = useParams();

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
        await setHrData({
          fullName: data.fullName,
          img_src: data.img_src,
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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/oneStudent/${studentId}`, {
          method: 'GET',
        });
        const data = await res.json();
        await setStudentData(data);
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
        id={id}
        fullName={hrData.fullName}
        img_src={hrData.img_src === null ? '' : hrData.img_src}
        img_alt={`Hr ${hrData.fullName}`}
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
            <ReturnBtn />
            <SidebarStudent
              email={studentData.email}
              secondBtn
              githubUsername={studentData.githubUserName}
              firstName={studentData.firstName}
              lastName={studentData.lastName}
              bio={studentData.bio}
              tel={studentData.tel}
              img_alt={`Kursant ${studentData.firstName} ${studentData.lastName}.`}
              img_src={studentData.githubUserName === null ? undefined : `https://github.com/${studentData.githubUserName}.png`}
            />
          </div>
          <Box
            sx={{
              backgroundColor: '#222224',
              width: '1176px',
            }}>
            <h3 className="layouts_subtitle">Oceny</h3>
            <div className="layouts_line">
              <StudentGrades
                courseCompletion={studentData.courseCompletion}
                courseEngagement={studentData.courseEngagement}
                projectDegree={studentData.projectDegree}
                teamProjectDegree={studentData.teamProjectDegree}
              />
            </div>
            <h3 className="layouts_subtitle">Oczekiwanie w stosunku do zatrudnienia</h3>
            <div className="layouts_line">
              <StudentExpectations
                targetWorkCity={studentData.targetWorkCity ?? null}
                expectedContractType={studentData.expectedContractType ?? null}
                expectedTypeWork={studentData.expectedTypeWork ?? null}
                expectedSalary={studentData.expectedSalary ?? null}
                canTakeApprenticeship={studentData.canTakeApprenticeship ?? null}
                monthsOfCommercialExp={studentData.monthsOfCommercialExp ?? null}
              />
            </div>
            <h3 className="layouts_subtitle">Edukacja</h3>
            <div className="layouts_line">
              <StudentInfoBoxEducation education={studentData.education ?? null} />
            </div>
            <h3 className="layouts_subtitle">Kursy</h3>
            <div className="layouts_line">
              <StudentInfoBoxCourses courses={studentData.courses ?? null} />
            </div>
            <h3 className="layouts_subtitle">Doświadczenie zawodowe</h3>
            <div className="layouts_line">
              <StudentInfoBoxWorkExperience workExperience={studentData.workExperience ?? null} />
            </div>
            <h3 className="layouts_subtitle">Portfolio</h3>
            <div className="layouts_line">
              {studentData.portfolioUrls !== null ? (
                <StudentInfoBoxLinksPortfolio portfolioUrls={studentData.portfolioUrls ?? null} />
              ) : null}
            </div>
            <h3 className="layouts_subtitle">Projekt w zespole Scrumowym</h3>
            <div className="layouts_line">
              {studentData.bonusProjectUrls !== '' ? (
                <StudentInfoBoxLinksGroupProject bonusProjectUrls={studentData.bonusProjectUrls ?? ''} />
              ) : null}
            </div>
            <h3 className="layouts_subtitle">Projekt na zaliczenie</h3>
            <div className="layouts_line">
              {studentData.projectUrls !== null ? (
                <StudentInfoBoxLinksPassingProject projectUrls={studentData.projectUrls ?? null} />
              ) : null}
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};
