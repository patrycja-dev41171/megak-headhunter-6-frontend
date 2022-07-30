import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {Dispatch, SetStateAction} from "react";

interface Props {
    isModalExpanded: boolean;
    setIsModalExpanded: Dispatch<SetStateAction<boolean>>
    text: string;
}

export const TransitionAlertError = (props: Props) => {
    const {isModalExpanded, setIsModalExpanded, text} = props;

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={isModalExpanded}>
                <Alert
                    variant="filled"
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsModalExpanded(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {text}
                </Alert>
            </Collapse>
         </Box>
    );
}

export const TransitionAlertSuccess = (props: Props) => {
    const {isModalExpanded, setIsModalExpanded, text} = props;

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={isModalExpanded}>
                <Alert
                    variant="filled"
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsModalExpanded(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {text}
                </Alert>
            </Collapse>
        </Box>
    );
}