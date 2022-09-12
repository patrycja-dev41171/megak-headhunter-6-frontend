import {styled} from "@mui/system";
import {TextField} from "@mui/material";

export const FilterStudentsInput = styled(TextField, {
    name: 'MainStyledTextField',
})({
    width: '100px',
    marginRight: '30px',
    input: {
        '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #292a2b inset',
            WebkitTextFillColor: '#7E7E7E',
            borderRadius: '0',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#7E7E7E',
        fontSize: '12px',
    },
    '& .MuiInputBase-input': {
        color: '#7E7E7E',
        backgroundColor: '#292a2b',
        paddingTop: '15px',
        paddingBottom: '2px',
        fontSize: '14px',
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        display: 'none',
    },
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
});