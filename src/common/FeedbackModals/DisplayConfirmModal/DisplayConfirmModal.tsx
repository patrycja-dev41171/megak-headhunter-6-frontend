import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DisplayConfirmModalProps {
  title: string;
  content: string;
  agree: (render: boolean) => void;
}

export const DisplayConfirmDialog = (props: DisplayConfirmModalProps) => {
  const handleClose = (isConfirm: boolean) => {
    props.agree(isConfirm);
  };

  return (
    <div style={{ backgroundColor: 'whitesmoke' }}>
      <DialogTitle
        sx={{ fontFamily: 'Catamaran' }}
        id="alert-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ fontFamily: 'Catamaran' }}
          id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: 'gray', fontFamily: 'Catamaran' }}
          onClick={() => handleClose(true)}>
          Zmień
        </Button>
        <Button
          sx={{ color: 'red', fontFamily: 'Catamaran' }}
          onClick={() => handleClose(false)}>
          Anuluj
        </Button>
      </DialogActions>
    </div>
  );
};
