import React, {SyntheticEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    setAccessToken,
    setExpirationTime,
    setId,
    setIsLoggedIn,
    setRole
} from '../../../redux-toolkit/features/user/user-slice';
import {useDispatch, useSelector} from 'react-redux';
import {styled} from '@mui/material/styles';
import Menu, {MenuProps} from '@mui/material/Menu';
import {MenuBtn} from '../../../common/Buttons/MenuBtn/MenuBtn';
import {ShowMenuBtn} from '../../../common/Buttons/ShowMenuBtn/ShowMenuBtn';
import {apiUrl} from '../../../config/api';
import {StoreState} from "../../../redux-toolkit/store";

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

interface HeaderMenuProps {
    userRole: string;
    userId: string;
}

export const HeaderMenu = (props: HeaderMenuProps) => {
    const {accessToken} = useSelector((store: StoreState) => store.user);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            const data = await fetch(`${apiUrl}/login`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (data.status === 200) {
                dispatch(setId(''));
                dispatch(setAccessToken(''));
                dispatch(setExpirationTime(0));
                dispatch(setRole(''));
                dispatch(setIsLoggedIn(false));
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

            case 'student':
                return null;

            case 'hr':
                return (
                    <MenuBtn
                        text="Konto"
                        to="/hr/profile"
                    />
                );
        }
    };

    return (
        <div>
            <ShowMenuBtn onClick={handleClick}/>
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
