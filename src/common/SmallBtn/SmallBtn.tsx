import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import './SmallBtn.css';

interface Props {
  text: string;
  to?: string;
  onClick?: MouseEventHandler;
}

export const SmallBtn = (props: Props) =>
  props.to ? (
    <Link
      className="btn"
      to={props.to}
      onClick={props.onClick}>
      {props.text}
    </Link>
  ) : (
    <button
      className="btn"
      onClick={props.onClick}>
      {props.text}
    </button>
  );
