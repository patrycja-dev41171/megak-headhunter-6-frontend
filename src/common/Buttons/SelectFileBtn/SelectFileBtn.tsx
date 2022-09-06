import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

type Props = {
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectFileButton = (props: Props) => {
    return (
        <Stack direction="row" alignItems="center" spacing={0} onChange={props.handleChange}>
            <Button
                variant="text"
                component="label"
                sx={{color: '#F7F7F7'}}
            >
                Wybierz plik
                <input hidden accept="image/*" multiple type="file"/>
            </Button>
            <IconButton
                aria-label="upload picture"
                component="label"
                sx={{color: '#F7F7F7'}}
            >
                <input hidden accept="image/*" type="file"/>
                <FileDownloadOutlinedIcon/>
            </IconButton>
        </Stack>
    );
}