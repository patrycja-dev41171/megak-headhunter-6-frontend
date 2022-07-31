import React from 'react';

import './Header.css';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import { MicroLogoMegaK } from '../../common/MicroLogoMegaK/MicroLogoMegaK';
import { UserPhoto } from '../../common/UserPhoto/UserPhoto';

export const Header = () => {
  return (
    <>
      <div className="main-header">
        <div className="logo-background">
          <MicroLogoMegaK />
        </div>
        <div className="user-info">
          <UserPhoto className="photo-space" />
          <div className="user-name">
            <p>Mateusz Kowalski</p>
          </div>
          <HeaderMenu className="options-btn" />
        </div>
      </div>
    </>
  );
};
