import React from 'react';

import './Header.css';
import {HeaderMenu} from '../HeaderMenu/HeaderMenu';

export const Header = () => {
  return (
      <>
        <div className="main-header">
          <div className="logo-background">
            <img
                src="../../logo-megak.webp"
                alt="Logo MegaK"
                className="logo"
            />
          </div>
          <div className="user-info">
            <div className="photo-space">
              <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1659204468~exp=1659205068~hmac=936a7aaf9d679d433eb81584d87be66f60eb01c0498e1abcabfe6de62a060c69"
                  alt="Zdjęcie użytkownika"
                  className="photo"
              />
            </div>
            <div className="user-name"></div>
            <p>Tester Testowy Do Testów</p>
            <div className="options-btn">
              <HeaderMenu/>
            </div>
          </div>
        </div>
      </>
  );
};
