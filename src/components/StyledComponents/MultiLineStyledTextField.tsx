import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const MultiLineStyledTextField = styled(TextField, {
  name: 'MultiLineStyledTextField',
})({
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #292a2b inset',
      WebkitTextFillColor: '#7E7E7E',
      borderRadius: '0',
    },
  },
  backgroundColor: '#292a2b',
  '& .MuiInputLabel-root': {
    color: '#7E7E7E',
    padding: '10px',
  },
  '& .MuiInputBase-input': {
    color: '#7E7E7E',
    padding: '10px',
  },
});
