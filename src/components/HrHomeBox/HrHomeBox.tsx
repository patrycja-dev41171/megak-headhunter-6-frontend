import React from 'react';

import './HrHomeBox.css';
import { Header } from '../Header/Header';

export const HrHomeBox = () => {
  return (
    <div className="hr-home__content">
      <Header
        img_alt="Kurs"
        img_src="https://github.com/Ami777.png "
        fullName="Jakub K"
        role="hr"
        id="7c2afcc9-cd42-44d6-a3ea-c1f3dc5ec"
      />
      <main className="hr-home__main">
        <nav className="hr-home__navbar">MIEJSCE NA NAVBAR</nav>
        <div className="hr-home__searching-students">
          <div className="hr-home__search">MIEJSCE NA WYSZUKIWARKĘ I FILTRY</div>
          <ul className="hr-home__students-list">LISTA STUDENTÓW</ul>
        </div>
      </main>
    </div>
  );
};
