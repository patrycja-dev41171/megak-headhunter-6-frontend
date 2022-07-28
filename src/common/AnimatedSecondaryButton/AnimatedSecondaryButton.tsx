import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const AnimatedSecondaryButton = styled(Button)<ButtonProps>(() => ({
    textTransform: 'none',
    backgroundColor: '#d92330',
    opacity: 0.8,
    marginTop: '5px',
    '&:hover': {
        backgroundColor: '#d92330',
        opacity: 1
    },
}));
