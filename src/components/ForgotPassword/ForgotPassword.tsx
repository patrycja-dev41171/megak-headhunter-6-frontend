import React, { useState } from 'react';
import './ForgotPassword.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../Validations/UserValidation';

type FormData = {
  email: string;
  confirmEmail: string;
};

export const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    mode: 'onTouched',
  });
  const { errors } = formState;
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const submitForm = async (data: FormData) => {
    try {
      const res = await fetch('http://localhost:8080/forgot-password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
        }),
      });
      const result = await res.json();
      setFeedback(result.message)
      setIsSuccessfullySubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="remPass-view">
      <img
        src="logo-megak.webp"
        alt="Logo MegaK"
        className="logo"
      />
      <p className="remPass-info">Podaj swój adres e-mail. Wyślemy Ci wiadomość.</p>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          type="email"
          className={`remPass-input ${errors.email ? 'remPass-input-error' : ''}`}
          placeholder="Wpisz e-mail..."
          {...register('email')}
          disabled={isSuccessfullySubmitted}
        />
        <p className="remPass-errors">{errors.email?.message}</p>
        <input
          type="email"
          className={`remPass-input ${errors.confirmEmail ? 'remPass-input-error' : ''}`}
          placeholder="Potwierdź e-mail..."
          {...register('confirmEmail')}
          disabled={isSuccessfullySubmitted}
        />
        {errors.confirmEmail && <p className="remPass-errors">Niepoprawnie potwierdzony e-mail</p>}
        {isSuccessfullySubmitted && <p className="remPass-success">Hasło zostało wysłane na podany e-mail</p>}
        <p className="remPass-btn-box">
          <button className="remPass-btn">Wyślij</button>
        </p>
        {feedback}
      </form>
    </div>
  );
};
