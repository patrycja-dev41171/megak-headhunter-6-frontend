import React from 'react';
// import React, { useEffect, useState } from 'react';

import { LoginBox } from '../../components/LoginBox/LoginBox';
// import { useSelector } from 'react-redux';
// import { StoreState } from '../../redux-toolkit/store';
// import { useNavigate } from 'react-router-dom';

export const LoginView = () => {
  // const { role } = useSelector((store: StoreState) => store.user);
  // let navigate = useNavigate();

  // useEffect(() => {
  //   switch (role){
  //     case 'admin':
  //       navigate('/home-admin');
  //       break;
  //     case 'hr':
  //       navigate('/hr/home');
  //       break;
  //     case 'student':
  //       navigate('/student');
  //       break;
  //   }
  // });

  return <LoginBox />;
};
