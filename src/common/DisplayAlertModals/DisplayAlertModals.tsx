import {Alert} from "@mui/material";
import React from "react";

interface Props {
    error: string;
    success: string;
}

export const DisplayAlertModals = (props: Props) => {
    const {error, success} = props;
    if (error) {
        return <Alert
            variant="filled"
            severity="error"
            sx={{width: '100%'}}
        >
            {error}
        </Alert>
    }
    if (success) {
        return <Alert variant="filled" severity="success" sx={{width: '100%'}}>
            {success}
        </Alert>
    }
    return null
}