import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';

import { Avatar } from '@mui/material';
import { AnimatedSecondaryButton } from '../../common/AnimatedSecondaryButton/AnimatedSecondaryButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';
import './Sidebar.css';

//Wyświetlenie komponentu na sztywno:
// const telNum = String(546343000);
// const tel = `${telNum[0]}${telNum[1]}${telNum[2]} ${telNum[3]}${telNum[4]}${telNum[5]} ${telNum[6]}${telNum[7]}${telNum[8]}`

// return (
//     <>S
//         <header />
//         <SidebarStudent
//             email="jan.kowalski@gmail.com"
//             firstName="Jan"
//             lastName="Kowalski"
//             githubUsername="jan.kowalski245"
//             img_alt="Jak kowalski"
//             img_src="https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=20&m=1200677760&s=612x612&w=0&h=JCqytPoHb6bQqU9bq6gsWT2EX1G5chlW5aNK81Kh4Lg="
//             tel={tel}
//             bio="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
//          erat, sed diam voluptua. At vero eos et accusam et justo duo."
//         />

//Wyświetlenie komponentu z propsami:
// <SidebarStudent email="jan.kowalski@gmail.com" />

interface SidebarStudentProps {
  img_alt?: string;
  img_src?: string;
  firstName?: string;
  lastName?: string;
  githubUsername?: string;
  tel?: string;
  email: string;
  bio?: string;
}

export const SidebarStudent = (props: SidebarStudentProps) => {
  const { img_alt, img_src, firstName, lastName, githubUsername, tel, email, bio } = props;
  const { id } = useSelector((store: StoreState) => store.user);

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  //infoFromBackendStatus
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const handleStatusChange = async () => {
    const isConfirm = window.confirm('Czy jesteś pewien, że ten student został zatrudniony?');
    if (isConfirm) {
      try {
        const data = await fetch('http://localhost:8080/student/status', {
          method: 'POST',
          body: JSON.stringify({
            id: id,
            status: 'Zatrudniony',
          }),
        });
        const result = await data.json();
        setFeedbackSuccess(result);
        setFeedbackError(result.message);
        setOpenModal(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="sidebar_container">
      <Avatar
        alt={img_alt}
        src={img_src}
        sx={{ width: 150, height: 150 }}
      />
      {firstName ? (
        <p className="sidebar_fullName">
          {firstName} {lastName}
        </p>
      ) : (
        <p className="sidebar_fullName">Kursant</p>
      )}
      <div className="sidebar_githubName">
        <GitHubIcon sx={{ color: '#0B8BD4' }} />
        {githubUsername ? <p>{githubUsername}</p> : <p>____________</p>}
      </div>
      <div className="sidebar_phoneNumber">
        <CallIcon sx={{ color: '#4D4D4D', height: '20px', width: '20px' }} />
        {tel ? <p>+48 {tel}</p> : <p>____________________</p>}
      </div>
      <div className="sidebar_email">
        <EmailIcon sx={{ color: '#4D4D4D', height: '20px', width: '20px' }} />
        <p>{email}</p>
      </div>
      <p className="sidebar_about_p">O mnie</p>
      <div className="sidebar_about">{bio ? <p>{bio}</p> : <div className="sidebar_div_about"></div>}</div>
      <div className="sidebar_btns">
        <AnimatedSecondaryButton
          className="sidebar_btn"
          type="button"
          onClick={handleStatusChange}
          sx={{ marginTop: '10px' }}>
          Zatrudniony
        </AnimatedSecondaryButton>
      </div>
      {openModal && (
        <SimpleDialog
          open={openModal}
          onClose={handleClose}>
          {openModal && (
            <DisplayAlertModals
              error={feedbackError}
              success={feedbackSuccess}
            />
          )}
        </SimpleDialog>
      )}
    </div>
  );
};
