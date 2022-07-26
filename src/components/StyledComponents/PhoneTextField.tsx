import React from "react";
import {styled} from "@mui/system";
import {TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export const PhoneTextField = styled(TextField, {
    name: 'MainStyledPhoneTextField',
})({
    input: {
        '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #292a2b inset',
            WebkitTextFillColor: '#7E7E7E',
            borderRadius: '0',
        },
    },

    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        display: 'none',
    },

    '& input[type=number]': {
        MozAppearance: 'textfield',
    },

    '& .MuiInputLabel-root': {
        color: '#7E7E7E',
    },
    '& .MuiInputBase-input': {
        color: '#7E7E7E',
        backgroundColor: '#292a2b',
    },
});

export const inputPrefix = () => <InputAdornment
    position="start"
    sx={{
        '.MuiTypography-root': {
            color: '#7E7E7E',
        },
    }}>
    +48
</InputAdornment>

