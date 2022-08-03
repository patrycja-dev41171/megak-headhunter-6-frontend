import React from 'react';
import {HeaderMenu} from '../HeaderMenu/HeaderMenu';
import {MicroLogoMegaK} from '../../common/MicroLogoMegaK/MicroLogoMegaK';
import {UserPhoto} from '../../common/UserPhoto/UserPhoto';
import {Container} from "@mui/material";
import './Header.css';

export const Header = () => {
    return (
        <div className="main-header">
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&.MuiContainer-root': {
                        maxWidth: '1430px',
                    }
                }}>
                <MicroLogoMegaK/>
                <div className="user-info">
                    <UserPhoto className="photo-space"/>
                    <div className="user-name">
                        <p>Mateusz Kowalski</p>
                    </div>
                    <HeaderMenu className="options-btn"/>
                </div>
            </Container>
        </div>
    );
};
