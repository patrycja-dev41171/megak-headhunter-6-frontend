import React from "react"
import {Header} from "../Header/Header";
import "./StudentBox.css";
import {Box, Container} from "@mui/material";

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
                        }
                    }}>
                    <Box
                        sx={{
                            backgroundColor: '#292A2B',
                            minWidth: '250px',
                            height: '400px',
                            marginRight: '4px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#88888d',
                        }}
                    >
                        <p>Tutaj będzie kontener Patrycji :)</p>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: '#222224',
                            width: '1176px',
                        }}
                    >
                        <h3 className="studentView_subtitle">Oceny</h3>
                        <div className="studentView_line">
                            <div className="studentView_gradesContent displayCenter">
                                Tu będzie kontener z gwiazdkami
                            </div>
                        </div>

                        <div className="studentView_subtitle">
                            <h3>Uzupełnij swój profil</h3>
                            <span
                                className="studentView_subtitleInstruction"
                            >
                            Jesteś niewidoczny dla HR. Uzupełnij dane
                        </span>
                        </div>

                        <div className="studentView_line">
                            <form className="studentView_form displayCenter">
                                <p>Tutaj będzie formularz</p>
                            </form>
                        </div>
                    </Box>
                </Container>
            </div>
        </>

    )
}