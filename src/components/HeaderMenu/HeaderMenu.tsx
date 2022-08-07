import React, { SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { MenuBtn } from '../../common/MenuBtn/MenuBtn';
import { ShowMenuBtn } from '../../common/ShowMenuBtn/ShowMenuBtn';
import './HeaderMenu.css';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    minWidth: 220,
    backgroundColor: '#1e1e1f',
    color: 'white',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenu-button': {
      backgroundColor: 'yellow',
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: '#1e1e1f',
        maxWidth: 20,
      },
    },
  },
}));

interface HeaderMenuProps {
  className: string;
  userRole: string;
  userId: string;
}

export const HeaderMenu = (props: HeaderMenuProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await fetch('http://localhost:8080/login', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (data.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setMenuOptions = () => {
    switch (props.userRole) {
      case 'admin':
        return null;
        break;
      case 'student':
        return null;
        break;
      case 'hr':
        return (
          <MenuBtn
            text="Konto"
            to="/hr/profile"
          />
        );
        break;
    }
  };

  return (
    <div className={props.className}>
      <ShowMenuBtn onClick={handleClick} />
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {setMenuOptions()}
        <MenuBtn
          text="Zmień hasło"
          to={`/change-password/${props.userId}`}
        />
        <MenuBtn
          text="Wyloguj"
          onClick={handleLogout}
        />
      </StyledMenu>
    </div>
  );
};
