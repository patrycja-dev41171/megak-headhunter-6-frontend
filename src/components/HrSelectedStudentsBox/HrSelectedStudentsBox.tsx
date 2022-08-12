import React from 'react';
import { Header } from '../Header/Header';

import './HrSelectedStudentsBox.css';

export const HrSelectedStudentsBox = () => {
  return (
    <div className="hr-selected-students__content">
      <Header
        img_alt="Kurs"
        img_src="https://github.com/Ami777.png "
        fullName="Jakub K"
        role="hr"
        id="7c2afcc9-cd42-44d6-a3ea-c1f3dc5ec"
      />
      <main className="hr-selected-students__main">
        <nav className="hr-selected-students__navbar">MIEJSCE NA NAVBAR</nav>
        <div className="hr-selected-students__searching-students">
          <div className="hr-selected-students__search">MIEJSCE NA WYSZUKIWARKĘ I FILTRY</div>
          <ul className="hr-selected-students__students-list">LISTA STUDENTÓW</ul>
        </div>
      </main>
    </div>
  );
};
