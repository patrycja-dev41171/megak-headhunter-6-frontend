import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { MainButton } from '../../common/MainButton/MainButton';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';

interface SidebarHrProps {
  email: string;
  fullName: string;
  img_src: string | null;
  renderComponent: (render: boolean) => void;
}

export const SidebarHr = (props: SidebarHrProps) => {
  const { img_src, fullName, email } = props;
  const { id } = useSelector((store: StoreState) => store.user);
  const [imageSelected, setImageSelected] = useState<any>('');
  const [imagePreview, setImagePreview] = useState<string | null>(img_src);
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
      props.renderComponent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sidebar_container">
      <Avatar
        alt={fullName}
        src={imagePreview !== null ? imagePreview : ''}
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
                    setImagePreview(URL.createObjectURL((e.target as any).files[0]));
                    setImageSelected(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }
                }
              }}
            />
            <AddAPhotoIcon sx={{ color: 'white' }} />
          </IconButton>
          <p>{displayFileName(fileName)}</p>
          <MainButton
            onClick={uploadImage}
            sx={{ marginTop: '30px' }}>
            Zapisz zdjęcie
          </MainButton>
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
