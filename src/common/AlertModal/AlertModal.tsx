import * as React from 'react';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {useState} from 'react';

export interface State extends SnackbarOrigin {
    open: boolean;
}

interface ErrorProps {
    errorMessage: string;
}

interface SuccessProps {
    successMessage: string;
}

export function ModalTopBottomError(props: ErrorProps) {
    const [state] = useState<State>({
        open: true,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const {vertical, horizontal, open} = state;
    const {errorMessage} = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                key={vertical + horizontal}
            >
                <Alert variant="filled" severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export function ModalTopBottomSuccess(props: SuccessProps) {
    const [state] = useState<State>({
        open: true,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const {vertical, horizontal, open} = state;
    const {successMessage} = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                key={vertical + horizontal}
            >
                <Alert variant="filled" severity="success" sx={{width: '100%'}}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

