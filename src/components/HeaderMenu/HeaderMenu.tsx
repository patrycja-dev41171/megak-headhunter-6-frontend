import React, {SyntheticEvent} from 'react';
import {MenuItem} from '@mui/material';
import {styled} from '@mui/material/styles';
import Menu, {MenuProps} from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useNavigate} from 'react-router-dom';

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
))(({theme}) => ({
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

export const HeaderMenu = () => {
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

    return (
        <div>
            <button
                onClick={handleClick}
                className="show-menu-btn">
                <ArrowDropDownIcon/>
            </button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    disableRipple>
                    Konto
                </MenuItem>
                <MenuItem
                    className="menu-item"
                    onClick={handleLogout}
                    disableRipple>
                    Wyloguj
                </MenuItem>
                <link
                    rel="stylesheet"
                    href="/test"
                />
            </StyledMenu>
        </div>
    );
};
