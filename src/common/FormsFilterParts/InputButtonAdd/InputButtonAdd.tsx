import React, {MouseEventHandler} from 'react';
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCardIcon from "@mui/icons-material/AddCard";
import InputAdornment from "@mui/material/InputAdornment";

interface Props {
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export const InputButtonAdd = (props: Props) => {
    return (
        <InputAdornment position="end">
            <Tooltip title="Dodaj link">
                <IconButton
                    sx={{
                        color: '#7E7E7E',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                            color: '#146DA0',
                        },
                    }}
                    onClick={props.handleClick}>
                    <AddCardIcon/>
                </IconButton>
            </Tooltip>
        </InputAdornment>
    )
}