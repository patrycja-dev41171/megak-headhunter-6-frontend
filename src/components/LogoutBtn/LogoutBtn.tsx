import React, { SyntheticEvent } from 'react';
import { SmallBtn } from '../../common/SmallBtn/SmallBtn';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/api';

export const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await fetch(`${apiUrl}/login`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (data.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SmallBtn
      text="Wyloguj"
      onClick={handleLogout}></SmallBtn>
  );
};
