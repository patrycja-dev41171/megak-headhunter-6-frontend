import React from 'react';
import {Header} from '../Header/Header';
import {Box, Container} from '@mui/material';
import {SidebarHr} from "../Sidebars/SidebarHr";
import {Link} from "react-router-dom";
import {MainButton} from "../../common/MainButton/MainButton";
import '../../styles/stylesForLayouts.css';
import "./HrProfileBox.css";

export const HrProfileBox = () => {
    return (
        <>
            {/*wstawilem dane do Header na sztywno zeby wyswietlic*/}
            <Header role="hr" id="746237642376"/>
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
                        <SidebarHr email="testowy@test.pl" fullName="Test Testowy" img_src="fotka"/>
                    </div>
                    <Box
                        sx={{
                            backgroundColor: '#222224',
                            width: '1176px',
                        }}>
                        <h3 className="layouts_subtitle">Dane pofilowe</h3>
                        <div className="layouts_line">
                            {/*Dane profilowe*/}
                        </div>
                        <h3 className="layouts_subtitle">Email</h3>
                        <div className="layouts_line">
                            {/*Email*/}
                        </div>
                        <h3 className="layouts_subtitle">Firma</h3>
                        <div className="layouts_line">
                            {/*Firma*/}
                        </div>
                        <h3 className="layouts_subtitle">Studenci</h3>
                        <div className="layouts_line numberOfStudents_line">
                            <div className="numberOfStudents_line-info">
                                <span className="numberOfStudents_reserved">
                                    Zarezerwowani:
                                    <span className="numberOfStudentsNum">4{/*Liczba zarezerwowanych studentów*/}</span>
                                </span>
                                <span className="numberOfStudents_availablePlaces">
                                    Dostępne miejsca:
                                    <span className="numberOfStudentsNum">8{/*liczba dostępnych miejsc*/}</span>
                                </span>
                            </div>
                            <Link className="noUnderline" to="/"><MainButton>Strona główna</MainButton></Link>
                        </div>
                    </Box>
                </Container>
            </div>
        </>
    );
};
