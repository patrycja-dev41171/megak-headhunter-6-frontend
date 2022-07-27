import React, { SyntheticEvent, useState } from 'react';
import { RemindPasswordBtn } from '../RemindPasswordBtn/RemindPasswordBtn';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setExpirationTime, setId, setRole } from '../../redux-toolkit/features/user/user-slice';
import { SmallBtn } from '../../common/SmallBtn/SmallBtn';
import './LoginBox.css';

interface AccessToken {
  name: string;
  exp: number;
}

export const LoginBox = () => {
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      const data = await res.json();
      const decoded = jwtDecode<AccessToken>(data.accessToken);
      dispatch(setId(data.id));
      dispatch(setAccessToken(data.accessToken));
      dispatch(setExpirationTime(decoded.exp));
      dispatch(setRole(data.role));
      if (data.role === 'admin') {
        navigate(`/home-admin`);
      } else {
        // navigate(`/home`);
      }
    } catch (err) {
      setError('Nieprawidłowe dane logowania.');
    }
  };

  const updateForm = (key: string, value: any) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  };

  return (
    <div className="login-view">
      <div>
        <img
          src="logo-megak.webp"
          alt="Logo MegaK"
          className="logo"
        />
        <form onSubmit={login}>
          <div className="form-box">
            <p className="input-box">
              <label>
                <input
                  type="email"
                  name="email"
                  required
                  minLength={5}
                  maxLength={255}
                  value={form.email}
                  onChange={e => updateForm('email', e.target.value)}
                  className="input"
                  placeholder="E-mail"
                />
              </label>
            </p>
            <p className="input-box">
              <label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  required
                  minLength={5}
                  maxLength={150}
                  value={form.password}
                  onChange={e => updateForm('password', e.target.value)}
                  className="input"
                  placeholder="Hasło"
                />
              </label>
            </p>
          </div>
          <RemindPasswordBtn />
          <p className="log-btn">
            <SmallBtn text="Zaloguj się"></SmallBtn>
          </p>
          <p className="p_error">{error === null ? null : error}</p>
        </form>
      </div>
    </div>
  );
};
