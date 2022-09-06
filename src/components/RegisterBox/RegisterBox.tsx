import React, { MouseEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCreatePassword } from '../../Validations/UserValidation';
import { useNavigate, useParams } from 'react-router-dom';
import { MiniLogoMegaK } from '../../common/LogoMegaK/MiniLogoMegaK/MiniLogoMegaK';
import { MainStyledTextField } from '../StyledComponents/MainStyledTextField';
import { MainBtn } from '../../common/Buttons/MainBtn/MainBtn';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { apiUrl } from '../../config/api';

import '../../styles/stylesForForms.css';

type FormValues = {
  registerPassword: string;
  confirmPassword: string;
};

interface InputNumber {
  registerPassword: string;
  showRegisterPassword: boolean;
  confirmPassword: string;
  showConfirmPassword: boolean;
}

export const RegisterBox = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState<InputNumber>({
    registerPassword: '',
    showRegisterPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  });

  const ClickShowRegPass = () => {
    setValues({
      ...values,
      showRegisterPassword: !values.showRegisterPassword,
    });
  };

  const ClickShowConfirmPass = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaCreatePassword),
    mode: 'onChange',
  });

  const { userId, registerToken } = useParams();

  const submitForm: SubmitHandler<FormValues> = async ({ registerPassword: password, confirmPassword }) => {
    try {
      const res = await fetch(`${apiUrl}/register/${userId}/${registerToken}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
      });
      const result = await res.json();
      setFeedbackSuccess(result);
      setFeedbackError(result.message);
      setOpenModal(true);
      if (!result.message) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <MiniLogoMegaK />
      <h1 className="formView_header">Utwórz hasło</h1>
      <p className="formView_header_instruction">
        Utwórz hasło dla swojego konta. Hasło powinno zawierać conajmniej 8 znaków, jedną wielką literę, jedną małą literę, jedną cyfrę i
        jeden znak specjalny.
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="formView_form">
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            variant="filled"
            type={values.showRegisterPassword ? 'text' : 'password'}
            error={!!errors.registerPassword}
            label="Podaj hasło"
            helperText={errors.registerPassword ? errors.registerPassword?.message : ''}
            {...register('registerPassword')}
            InputProps={{
              style: { backgroundColor: '#292a2b' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      color: '#7E7E7E',
                    }}
                    aria-label="toggle password visibility"
                    onClick={ClickShowRegPass}
                    onMouseDown={handleMouseDownPassword}>
                    {values.showRegisterPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            variant="filled"
            type={values.showConfirmPassword ? 'text' : 'password'}
            error={!!errors.confirmPassword}
            label="Potwierdź hasło"
            helperText={errors.confirmPassword && 'Podane hasła nie są takie same!'}
            {...register('confirmPassword')}
            InputProps={{
              style: { backgroundColor: '#292a2b' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      color: '#7E7E7E',
                    }}
                    aria-label="toggle password visibility"
                    onClick={ClickShowConfirmPass}
                    onMouseDown={handleMouseDownPassword}>
                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <MainBtn type="submit">Utwórz hasło</MainBtn>
      </form>

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
