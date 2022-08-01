import {styled} from "@mui/system";
import {TextField} from "@mui/material";

export const MainStyledTextField = styled(TextField, {
    name: "StyledTextField",
})({
    input: {
        '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #292a2b inset',
            WebkitTextFillColor: '#7E7E7E',
            borderRadius: '0',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#7E7E7E',
    },
    '& .MuiInputBase-input': {
        color: '#7E7E7E',
        backgroundColor: '#292a2b',
    },
});