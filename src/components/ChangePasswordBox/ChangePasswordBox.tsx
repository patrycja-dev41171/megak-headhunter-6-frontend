import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../Validations/UserValidation';
import { TextField } from '@mui/material';
import {styled} from '@mui/system';
import '../commonStyles.css';
import {SmallBtn} from '../../common/SmallBtn/SmallBtn';
import { useParams } from 'react-router-dom';
import { MiniLogoMegaK } from '../../common/MiniLogoMegaK/MiniLogoMegaK';

const StyledTextField = styled(TextField, {
  name: 'StyledTextField',
})({
  input: {
    width: '300px',
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #292a2b inset',
      WebkitTextFillColor: '#7E7E7E',
      borderRadius: '0',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#7E7E7E',
  },
  '& .MuiInputBase-input': {
    color: '#7E7E7E',
    backgroundColor: '#292a2b',
  },
});

type FormData = {
  password: string;
  confirmPassword: string;
};

export const ChangePasswordBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    mode: 'onTouched',
  });
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const { userId } = useParams();

  const submitForm: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const res = await fetch('http://localhost:8080/change-password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });
      const result = await res.json();
      setFeedback(result.message);
      setIsSuccessfullySubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="setPass-view ">
        <MiniLogoMegaK/>
        <div className="setPass-info">
          <h1 className="header">Utwórz nowe hasło do twojego konta</h1>
          <p>Hasło powinno zawierać conajmniej 8 znaków, jedną wielką literę, jedną małą literę, jedną cyfrę i jeden
            znak specjalny.</p>
        </div>
        <form
            onSubmit={handleSubmit(submitForm)}
            className="setPass-form">
          <div className="inputFormSetPass">
            <StyledTextField
                variant="outlined"
                type="password"
                error={!!errors.password}
                label="Podaj hasło"
                helperText={errors.password ? errors.password?.message : ''}
                {...register('password')}
                disabled={isSuccessfullySubmitted}
            />
          </div>

          <div className="inputFormSetPass">
            <StyledTextField
                variant="outlined"
                type="password"
                error={!!errors.confirmPassword}
                label="Potwierdź hasło"
                helperText={errors.confirmPassword && 'Podane hasła nie są takie same!'}
                {...register('confirmPassword')}
                disabled={isSuccessfullySubmitted}
            />
          </div>

          {isSuccessfullySubmitted && <p className="setPass-success">Utworzono nowe hasło do twojego konta</p>}
          <p className="setPass-btn">
            <SmallBtn text="Utwórz"/>
          </p>
          {feedback}
        </form>
    </div>
  );
};
