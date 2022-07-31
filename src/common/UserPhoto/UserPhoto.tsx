import React from 'react';

import './UserPhoto.css';

interface Props {
  className: string;
}

export const UserPhoto = (props: Props) => {
  return (
    <div className={props.className}>
      <img
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="Zdjęcie użytkownika"
        className="photo"
      />
    </div>
  );
};
