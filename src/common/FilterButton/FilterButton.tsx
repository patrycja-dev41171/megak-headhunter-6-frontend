import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const FilterButton = styled(Button)(() => ({
  width: '111px',
  height: '39px',
  border: 'none',
  padding: '5px',
  backgroundColor: '#1E1E1F',
  color: '#f7f7f7',
  fontSize: '16px',
  fontFamily: 'Catamaran',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1E1E1F',
  },
}));
