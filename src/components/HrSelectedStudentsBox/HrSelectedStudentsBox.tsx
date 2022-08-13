import React from 'react';
import { Header } from '../Header/Header';
import './HrSelectedStudentsBox.css';
import {Container} from "@mui/material";
import {NavbarForHRHome} from "../NavbarForHRHome/NavbarForHRHome";
import {SearchByFilterForHRHome} from "../SearchByFilterForHRHome/SearchByFilterForHRHome";

export const HrSelectedStudentsBox = () => {
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
                    img_alt="Kurs"
                    img_src="https://github.com/Ami777.png "
                    fullName="Jakub K"
                    role="hr"
                    id="7c2afcc9-cd42-44d6-a3ea-c1f3dc5ec"
                />
                <NavbarForHRHome/>
                <SearchByFilterForHRHome/>
            </Container>
        </div>
        )
};
