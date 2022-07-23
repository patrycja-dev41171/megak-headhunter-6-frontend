import React, { SyntheticEvent, useState } from 'react';

import './LoginBox.css';
import { RemindPasswordBtn } from '../RemindPasswordBtn/RemindPasswordBtn';
import { SmallBtn } from '../../common/SmallBtn/SmallBtn';

export const LoginBox = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:3001/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
      }),
    });
  };

  const updateForm = (key: string, value: any) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  };

  return (
    <div className="login-view">
      <p>
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
        </form>
      </p>
    </div>
  );
};
