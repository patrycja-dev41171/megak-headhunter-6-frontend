import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar } from '@mui/material';
import { AnimatedSecondaryButton } from '../../common/AnimatedSecondaryButton/AnimatedSecondaryButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';
import './Sidebar.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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

interface SidebarHrProps {
  email: string;
  fullName: string;
  img_src?: string;
}

export const SidebarHr = (props: SidebarHrProps) => {
  const { img_src, fullName, email } = props;
  const { id } = useSelector((store: StoreState) => store.user);
  const [imageSelected, setImageSelected] = useState<any>('');
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [fileName, setFileName] = useState<string>('');

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  //infoFromBackendStatus
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const displayFileName = (name: string) => {
    return <span className="sidebar_p_span">{!name ? 'Nie wybrano pliku' : <strong>{name}</strong>}</span>;
  };

  function imgValidation(e: any) {
    const file = e.target.files[0];
    if (file.size >= 2000000) {
      setFeedbackError('Maksymalna wielkość zdjęcia to 2MB.');
      setOpenModal(true);
      return false;
    }
    if (!file.type.includes('image')) {
      setFeedbackError('Plik nie ma wymaganego typu.');
      setOpenModal(true);
      return false;
    } else {
      return true;
    }
  }

  const getEnvData = async () => {
    try {
      const res = await fetch('http://localhost:8080/env/cloud-connection', {
        method: 'GET',
      });
      const data = await res.json();
      setFeedbackError(data.message);
      setOpenModal(true);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    if (!imageSelected) {
      setFeedbackError('Wybierz zdjęcie przed zapisem!');
      setOpenModal(true);
      return false;
    }
    try {
      const env = await getEnvData();
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', env.upload_preset);
      const res = await fetch(`https://api.cloudinary.com/${env.api_call}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        setFeedbackError('Wybierz zdjęcie przed zapisem!');
        setOpenModal(true);
      } else {
        await sendData(data.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendData = async (url: string) => {
    try {
      const res = await fetch('http://localhost:8080/hr/set/photo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          img_src: url,
        }),
      });
      const data = await res.json();
      setFeedbackSuccess(data);
      setFeedbackError(data.message);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sidebar_container">
      <Avatar
        alt={fullName}
        src={img_src ? img_src : imagePreview}
        sx={{ width: 150, height: 150 }}
      />
      <p className="sidebar_fullName sidebar_fullName_hr">HR</p>
      <p className="sidebar_fullName sidebar_fullName_hr">{fullName}</p>
      <div className="sidebar_email sidebar_email_hr">
        <EmailIcon sx={{ color: '#4D4D4D', height: '20px', width: '20px' }} />
        <p>{email}</p>
        <p className="sidebar_addPhoto">Dodaj zdjęcie profilowe:</p>
        <div className="sidebar_upload">
          <Button
            variant="text"
            component="label"
            sx={{ color: '#F7F7F7' }}>
            Wybierz zdjęcie
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
            />
          </Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={e => {
                if (e.target.files !== null) {
                  const isCorrect = imgValidation(e);
                  if (isCorrect) {
                    setImageSelected(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                    setImagePreview(URL.createObjectURL((e.target as any).files[0]));
                  }
                }
              }}
            />
            <AddAPhotoIcon sx={{ color: 'white' }} />
          </IconButton>
          <p>{displayFileName(fileName)}</p>
          <AnimatedSecondaryButton
            onClick={uploadImage}
            sx={{ marginTop: '30px' }}>
            Zapisz zdjęcie
          </AnimatedSecondaryButton>
        </div>
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
