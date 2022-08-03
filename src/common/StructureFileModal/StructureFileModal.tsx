import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import {MainButton} from "../MainButton/MainButton";
import './StructureFileModal.css';

export function StructureFileModal() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <MainButton
                variant="contained"
                size="small"
                onClick={handleClickOpen}
            >
                Zobacz strukturę pliku
            </MainButton>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle
                    id="responsive-dialog-title"
                    className="dialogTitle"
                >
                    {"Przykładowa struktura pobieranego pliku w formacie JSON"}
                </DialogTitle>
                <DialogContent>
                    {
                        <div className="dialogContentText">
                            <p>{'['}</p>
                            <div className="dialogContentText-spacing">
                                <p>{'{'}</p>
                                <div className="dialogContentText-spacingDouble">
                                    <p>{`"email" : "pi@megak.pl",`}</p>
                                    <p>{`"courseCompletion" : 2,`}</p>
                                    <p>{`"courseEngagement" : 4,`}</p>
                                    <p>{`"projectDegree" : 2,`}</p>
                                    <p>{`"teamProjectDegree" : 1,`}</p>
                                    <p>{`"bonusProjectUrls": ["https://github.com/patrycja-dev41171/megak-headhunter-6-frontend",`}</p>
                                    <p>{`"https://github.com/patrycja-dev41171/megak-headhunter-6-backend"]`}</p>
                                </div>
                                <p>{`},`}</p>

                                <p>{'{'}</p>
                                <div className="dialogContentText-spacingDouble">
                                    <p>{`"email" : "mu@megak.pl",`}</p>
                                    <p>{`"courseCompletion" : 2,`}</p>
                                    <p>{`"courseEngagement" : 4,`}</p>
                                    <p>{`"projectDegree" : 2,`}</p>
                                    <p>{`"teamProjectDegree" : 1,`}</p>
                                    <p>{`"bonusProjectUrls": ["https://github.com/MateuszU/megaKDev-front",`}</p>
                                    <p>{`"https://github.com/MateuszU/megaKDev-back"]`}</p>
                                </div>
                                <p>{`},`}</p>

                                <p>{'{'}</p>
                                <div className="dialogContentText-spacingDouble">
                                    <p>{`"email" : "mc@megak.pl",`}</p>
                                    <p>{`"courseCompletion" : 2,`}</p>
                                    <p>{`"courseEngagement" : 4,`}</p>
                                    <p>{`"projectDegree" : 2,`}</p>
                                    <p>{`"teamProjectDegree" : 1,`}</p>
                                    <p>{`"bonusProjectUrls": ["https://github.com/MiroChm/megaKDev-front",`}</p>
                                    <p>{`"https://github.com/MiroChm/megaKDev-back"]`}</p>
                                </div>
                                <p>{`}`}</p>
                            </div>
                            <p>{`]`}</p>
                        </div>
                    }

                </DialogContent>
                <DialogActions>
                    <MainButton
                        onClick={handleClose}
                        autoFocus
                        sx={{
                            color: '#ffffff',
                        }}
                    >
                        Zamknij
                    </MainButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
