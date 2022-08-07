import React from "react"
import {Header} from "../Header/Header";
import "./StudentBox.css";
import {Box, Container} from "@mui/material";
import {StudentForm} from "../StudentForm/StudentForm";
import {SidebarStudent} from '../Sidebars/SidebarStudent';
import {StudentGrades} from '../StudentGrades/StudentGrades';

export const StudentBox = () => {
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
                            secondBtn={false}
                        />

                    </div>
                    <Box
                        sx={{
                            backgroundColor: '#222224',
                            width: '1176px',
                        }}>
                        <h3 className="studentView_subtitle">Oceny</h3>
                        <div className="studentView_line">

                            <div className="studentView_gradesContent displayCenter">
                                <StudentGrades/>
                            </div>
                        </div>

                        <div className="studentView_subtitle">
                            <h3>Uzupełnij swój profil</h3>
                            <span
                                className="studentView_subtitleInstruction">Jesteś niewidoczny dla HR. Uzupełnij dane</span>
                        </div>

                        <div className="studentView_line">
                            <StudentForm/>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    );
};
