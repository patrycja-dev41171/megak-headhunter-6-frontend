import React from 'react';
import {Header} from '../Header/Header';
import {Box, Container} from '@mui/material';
import {StudentExpectations} from '../StudentExpectations/StudentExpectations';
import '../../styles/stylesForLayouts.css';
import {SidebarStudent} from '../Sidebars/SidebarStudent';
import {StudentGrades} from '../StudentGrades/StudentGrades';
import {StudentInfoBoxEducation} from "../StudentInfoBoxes/StudentInfoBoxEducation";
import {StudentInfoBoxCourses} from "../StudentInfoBoxes/StudentInfoBoxCourses";
import {StudentInfoBoxWorkExperience} from "../StudentInfoBoxes/StudentInfoBoxWorkExperience";
import {StudentInfoBoxLinksPortfolio} from "../StudentInfoBoxesLinks/StudentInfoBoxLinksPortfolio";
import {StudentInfoBoxLinksGroupProject} from "../StudentInfoBoxesLinks/StudentInfoBoxLinksGroupProject";
import {StudentInfoBoxLinksPassingProject} from "../StudentInfoBoxesLinks/StudentInfoBoxLinksPassingProject";

export const HrStudentProfileBox = () => {
    return (
        <>
            <Header/>
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
                            <div className="layouts_gradesContent displayCenter">
                                <StudentGrades/>
                            </div>
                        </div>
                        <h3 className="layouts_subtitle">Oczekiwanie w stosunku do zatrudnienia</h3>
                        <div className="layouts_line">
                            <div className="layouts_gradesContent displayCenter">
                                <StudentExpectations/>
                            </div>
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
