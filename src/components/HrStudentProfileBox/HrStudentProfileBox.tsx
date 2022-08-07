import React from 'react';
import {Header} from '../Header/Header';
import {Box, Container} from '@mui/material';
import {StudentExpectations} from '../StudentExpectations/StudentExpectations';
import {SidebarStudent} from '../Sidebars/SidebarStudent';
import {StudentGrades} from '../StudentGrades/StudentGrades';
import {StudentInfoBoxEducation} from "../StudentInfoBoxes/StudentInfoBoxEducation";
import {StudentInfoBoxCourses} from "../StudentInfoBoxes/StudentInfoBoxCourses";
import {StudentInfoBoxWorkExperience} from "../StudentInfoBoxes/StudentInfoBoxWorkExperience";
import {StudentInfoBoxLinksPortfolio} from "../StudentInfoBoxesLinks/StudentInfoBoxLinksPortfolio";
import {StudentInfoBoxLinksGroupProject} from "../StudentInfoBoxesLinks/StudentInfoBoxLinksGroupProject";
import {StudentInfoBoxLinksPassingProject} from "../StudentInfoBoxesLinks/StudentInfoBoxLinksPassingProject";
import '../../styles/stylesForLayouts.css';

export const HrStudentProfileBox = () => {
    return (
        <>
            {/*wstawilem dane do Header na sztywno zeby wyswietlic*/}
            <Header role="student" id="7462376423764523746"/>
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
                        <SidebarStudent
                            email="j.kowalski@op.pl"
                            secondBtn
                        />
                    </div>
                    <Box
                        sx={{
                            backgroundColor: '#222224',
                            width: '1176px',
                        }}>
                        <h3 className="layouts_subtitle">Oceny</h3>
                        <div className="layouts_line">
                            {/*wstawilem dane do StudentGrades na sztywno zeby wyswietlic*/}
                            <StudentGrades courseCompletion={3} courseEngagement={3} projectDegree={3} teamProjectDegree={3}/>
                        </div>
                        <h3 className="layouts_subtitle">Oczekiwanie w stosunku do zatrudnienia</h3>
                        <div className="layouts_line">
                            <StudentExpectations/>
                        </div>
                        <h3 className="layouts_subtitle">Edukacja</h3>
                        <div className="layouts_line">
                            <StudentInfoBoxEducation/>
                        </div>
                        <h3 className="layouts_subtitle">Kursy</h3>
                        <div className="layouts_line">
                            <StudentInfoBoxCourses/>
                        </div>
                        <h3 className="layouts_subtitle">Doświadczenie zawodowe</h3>
                        <div className="layouts_line">
                            <StudentInfoBoxWorkExperience/>
                        </div>
                        <h3 className="layouts_subtitle">Portfolio</h3>
                        <div className="layouts_line">
                            <StudentInfoBoxLinksPortfolio/>
                        </div>
                        <h3 className="layouts_subtitle">Projekt w zespole Scrumowym</h3>
                        <div className="layouts_line">
                            <StudentInfoBoxLinksGroupProject/>
                        </div>
                        <h3 className="layouts_subtitle">Projekt na zaliczenie</h3>
                        <div className="layouts_line">
                            <StudentInfoBoxLinksPassingProject/>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    );
};
