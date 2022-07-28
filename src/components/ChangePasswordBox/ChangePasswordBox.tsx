import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../Validations/UserValidation';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import './ChangePasswordBox.css';
import { SmallBtn } from '../../common/SmallBtn/SmallBtn';
import { useParams } from 'react-router-dom';

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
    <div className="changePass-view ">
      <img
        src="logo-megak.webp"
        alt="Logo MegaK"
        className="logo"
      />
      <p className="changePass-info">Utwórz nowe hasło do twojego konta.</p>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="changePass-form">
        <div className="inputFormChangePass">
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

        <div className="inputFormChangePass">
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

        {isSuccessfullySubmitted && <p className="remPass-success">Utworzono nowe hasło do twojego konta</p>}
        <p className="changePass-btn">
          <SmallBtn text="Utwórz" />
        </p>
        {feedback}
      </form>
    </div>
  );
};
