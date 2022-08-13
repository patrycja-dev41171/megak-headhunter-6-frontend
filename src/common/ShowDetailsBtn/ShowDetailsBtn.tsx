import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './ShowDetailsBtn.css';

export const ShowDetailsBtn = () => {
  const [arrowDown, setArrowDown] = useState(true);

  const changeArrow = () => {
    arrowDown ? setArrowDown(false) : setArrowDown(true);
  };

  return (
    <>
      {arrowDown ? (
        <button
          className="show_details_btn"
          onClick={changeArrow}>
          <KeyboardArrowDownIcon />
        </button>
      ) : (
        <button
          className="show_details_btn"
          onClick={changeArrow}>
          <KeyboardArrowUpIcon />
        </button>
      )}
    </>
  );
};
