import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

export const FilterBtn = styled(Button)(() => ({
    width: '120px',
    height: '39px',
    border: 'none',
    padding: '5px 15px 5px 5px',
    backgroundColor: '#1E1E1F',
    color: '#f7f7f7',
    fontSize: '16px',
    fontFamily: 'Catamaran',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#1E1E1F',
    },
}));
