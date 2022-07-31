import React, { MouseEventHandler } from 'react';

import './ShowMenuBtn.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props {
  onClick: MouseEventHandler;
}

export const ShowMenuBtn = (props: Props) => {
  return (
    <button
      className="show-menu-btn"
      onClick={props.onClick}>
      <ArrowDropDownIcon />
    </button>
  );
};
