import React from 'react';
import { LoginBox } from '../../components/LoginBox/LoginBox';
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";

export const LoginView = () => {
  const { isLoggedIn } = useSelector((store: StoreState) => store.user);
  return !isLoggedIn ?  null : <LoginBox />;
};
