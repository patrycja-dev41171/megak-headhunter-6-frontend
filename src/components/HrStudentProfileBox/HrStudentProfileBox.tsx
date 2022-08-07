import React from 'react';
import { Header } from '../Header/Header';
import { Box, Container } from '@mui/material';
import { StudentExpectations } from '../StudentExpectations/StudentExpectations';
import './HrStudentProfileBox.css';
import '../../styles/stylesForLayouts.css';
import { SidebarStudent } from '../Sidebars/SidebarStudent';

export const HrStudentProfileBox = () => {
  return (
    <>
      <Header />
      <div className="main-container pageWithHeader">
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '26px',
            '&.MuiContainer-root': {
              maxWidth: '1522px',
              position: 'relative',
              left: '-70px',
            },
          }}>
          <div className="hrStudentProfileView_button">Wróć</div>
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
              <div className="layouts_gradesContent displayCenter">Kontener z ocenami</div>
            </div>
            <h3 className="layouts_subtitle">Oczekiwanie w stosunku do zatrudnienia</h3>
            <div className="layouts_line">
              <div className="layouts_gradesContent displayCenter">
                <StudentExpectations />
              </div>
            </div>
            <h3 className="layouts_subtitle">Edukacja</h3>
            <div className="layouts_line">
              <div className="layouts_gradesContent displayCenter">Kontener z opisem edukacji</div>
            </div>
            <h3 className="layouts_subtitle">Kursy</h3>
            <div className="layouts_line">
              <div className="layouts_gradesContent displayCenter">Kontener z opisem kursów studenta</div>
            </div>
            <h3 className="layouts_subtitle">Doświadczenie zawodowe</h3>
            <div className="layouts_line">
              <div className="layouts_gradesContent displayCenter">Kontener z opisem doświadczenia zawodowego</div>
            </div>
            <h3 className="layouts_subtitle">Portfolio</h3>
            <div className="layouts_line">
              <div className="layouts_gradesContent displayCenter">Kontener z linkami do portfolio</div>
            </div>
            <h3 className="layouts_subtitle">Projekt w zespole Scrumowym</h3>
            <div className="layouts_line">
              <div className="layouts_gradesContent displayCenter">Kontener z linkami do projektu scrumowego</div>
            </div>
            <h3 className="layouts_subtitle">Projekt na zaliczenie</h3>
            <div className="layouts_line">
              <div className="layouts_gradesContent displayCenter">Kontener z linkami do projektu na zaliczenie</div>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};
