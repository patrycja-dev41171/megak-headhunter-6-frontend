import React from 'react';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import { MicroLogoMegaK } from '../../common/MicroLogoMegaK/MicroLogoMegaK';
import { Avatar, Container } from '@mui/material';
import './Header.css';

interface HeaderProps {
  img_alt?: string | undefined;
  img_src?: string | undefined;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  role: string;
  id: string;
}

export const Header = (props: HeaderProps) => {
  const { img_alt, img_src, firstName, lastName, role, id, fullName } = props;

  const handleName = () => {
    switch (role) {
      case 'admin':
        return <p>Admin</p>;
        break;
      case 'hr':
        return fullName ? <p>{`${fullName}`}</p> : <p>Hr</p>;
        break;
      case 'student':
        return firstName ? <p>{`${firstName} ${lastName}`}</p> : <p>Kursant</p>;
    }
  };

  return (
    <div className="main-header">
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&.MuiContainer-root': {
            maxWidth: '1430px',
          },
        }}>
        <MicroLogoMegaK role={role} />
        <div className="user-info">
          <Avatar
            alt={img_alt}
            src={img_src}
            sx={{ width: 45, height: 45 }}
          />
          <div className="user-name">{handleName()}</div>
          <HeaderMenu
            className="options-btn"
            userRole={role}
            userId={id}
          />
        </div>
      </Container>
    </div>
  );
};
