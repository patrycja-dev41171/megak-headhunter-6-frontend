import {styled} from "@mui/material/styles";
import Button, {ButtonProps} from "@mui/material/Button";

export const CancelBtn = styled(Button)<ButtonProps>(() => ({
    textTransform: 'none',
    color: "#ffffff",
    backgroundColor: '#0a0a0a',
    marginRight: '20px',
    opacity: 0.8,
    marginTop: '5px',
    borderRadius: '2px',
    padding: '5px 10px',

    '&:hover': {
        backgroundColor: '#0a0a0a',
        opacity: 1
    },
}));