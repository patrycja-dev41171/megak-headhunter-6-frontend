import React from 'react';
import { Header } from '../Header/Header';
import './HrSelectedStudentsBox.css';
import {Container} from "@mui/material";
import {NavbarForHRHome} from "../NavbarForHRHome/NavbarForHRHome";

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

                {/*<div className="hr_line">*/}
                {/*    <SearchByFilterForHRHome/>*/}
                {/*</div>*/}
                {/*<div className="hr_line">*/}
                {/*    <HrHomeSingleStudent firstName="Janusz" lastName="Boczek"/>*/}
                {/*</div>*/}

            </Container>
        </div>
        )

  // return (
  //   <div className="hr-selected-students__content">
  //     <Header
  //       img_alt="Kurs"
  //       img_src="https://github.com/Ami777.png "
  //       fullName="Jakub K"
  //       role="hr"
  //       id="7c2afcc9-cd42-44d6-a3ea-c1f3dc5ec"
  //     />
  //     <main className="hr-selected-students__main">
  //       <nav className="hr-selected-students__navbar">MIEJSCE NA NAVBAR</nav>
  //       <div className="hr-selected-students__searching-students">
  //         <div className="hr-selected-students__search">MIEJSCE NA WYSZUKIWARKĘ I FILTRY</div>
  //         <ul className="hr-selected-students__students-list">LISTA STUDENTÓW</ul>
  //       </div>
  //     </main>
  //   </div>
  // );
};
