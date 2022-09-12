import React, {FormEvent, useState} from 'react';
import {StructureFileModal} from '../../common/StructureFileModal/StructureFileModal';
import {SelectFileButton} from '../../common/Buttons/SelectFileBtn/SelectFileBtn';
import {MainBtn} from '../../common/Buttons/MainBtn/MainBtn';
import SimpleDialog from '@mui/material/Dialog';
import {DisplayAlertModals} from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import {apiUrl} from '../../config/api';
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";

import './StudentImport.css';

export const StudentImport = () => {
    const {accessToken} = useSelector((store: StoreState) => store.user);

    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };

    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const [photo, setPhoto] = useState();
    const [fileName, setFileName] = useState<string>('');

    const displayFileName = (name: string) => {
        return <span className="studentImport_fileNameBox">{!name ? 'Nie wybrano pliku' :
            <strong>{name}</strong>}</span>;
    };

    const changeHandlerFiles = (event: FormEvent) => {
        setFileName((event.target as any).files[0].name);
        setPhoto((event.target as any).files[0]);
    };

    const submitForm = async () => {
        if (photo) {
            const formData = new FormData();
            formData.append('photo', photo);

            try {
                const response = await fetch(`${apiUrl}/admin/upload/students`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: formData,
                });
                const result = await response.json();

                setOpenModal(true);
                setFeedbackSuccess(result);
                setFeedbackError(result.message);
            } catch (err: any) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <h2 className="studentImport_header">Zaimportuj listę studentów:</h2>
            <StructureFileModal/>

            <main className="studentImport_main">
                <SelectFileButton handleChange={changeHandlerFiles}/>
                <p>{displayFileName(fileName)}</p>
                <MainBtn onClick={submitForm}>Wyślij plik</MainBtn>
            </main>

            {
                openModal && (
                    <SimpleDialog
                        open={openModal}
                        onClose={handleClose}>
                        {openModal && (
                            <DisplayAlertModals
                                error={feedbackError}
                                success={feedbackSuccess}
                            />
                        )}
                    </SimpleDialog>
                )
            }
        </>
    );
};
