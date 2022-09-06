import {styled} from '@mui/material/styles';
import Button, {ButtonProps} from '@mui/material/Button';

export const MainBtn = styled(Button)<ButtonProps>(() => ({
    textTransform: 'none',
    color: "#ffffff",
    backgroundColor: '#d92330',
    opacity: 0.8,
    marginTop: '5px',
    borderRadius: '2px',
    padding: '5px 10px',

    '&:hover': {
        backgroundColor: '#d92330',
        opacity: 1
    },
}));
