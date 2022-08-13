import React, {useState} from 'react';
import {Header} from '../Header/Header';
import {NavbarForHRHome} from "../NavbarForHRHome/NavbarForHRHome";
import {Container} from "@mui/material";
import {HrHomeSingleStudent} from "../HrHomeSingleStudent/HrHomeSingleStudent";
import {SearchByFilterForHRHome} from "../SearchByFilterForHRHome/SearchByFilterForHRHome";
import './HrHomeBox.css'

export const HrHomeBox = () => {

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
                <div className="hrHomeBox__content">
                    <NavbarForHRHome/>
                    <SearchByFilterForHRHome/>
                    <HrHomeSingleStudent firstName="Janusz" lastName="Boczek"/>
                    <HrHomeSingleStudent firstName="Janusz" lastName="Boczek"/>
                    <HrHomeSingleStudent firstName="Janusz" lastName="Boczek"/>
                </div>
            </Container>
        </div>
    );
};
