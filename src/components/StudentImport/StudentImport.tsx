import React, {FormEvent, useState} from 'react';
import {StructureFileModal} from "../../common/StructureFileModal/StructureFileModal";
import './StudentImport.css';
import {SelectFileButton} from "../../common/SelectFileBtn/SelectFileBtn";
import {AnimatedSecondaryButton} from "../../common/AnimatedSecondaryButton/AnimatedSecondaryButton";
import SimpleDialog from "@mui/material/Dialog";
import {DisplayAlertModals} from "../../common/DisplayAlertModals/DisplayAlertModals";

export const StudentImport = () => {
    //modal
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };

    //infoFromBackendStatus
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const [photo, setPhoto] = useState();
    const [fileName, setFileName] = useState<string>('')

    const displayFileName = (name: string) => {
        return <span className="student-import_fileNameBox">
      {!name ? 'Nie wybrano pliku' : <strong>{name}</strong>}
    </span>
    }

    const changeHandler = (event: FormEvent) => {
        setFileName((event.target as any).files[0].name)
        setPhoto((event.target as any).files[0]);
    }

    const handleSubmission = async () => {

        if (photo) {
            const formData = new FormData();
            formData.append('photo', photo);

            try {
                const response = await fetch('http://localhost:8080/admin/upload/students', {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();

                setOpenModal(true)
                setFeedbackSuccess(result)
                setFeedbackError(result.message)

            } catch (err: any) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <header className="student-import_header">
                <h3 className="student-import_headerTitle">Zaimportuj listę studentów:</h3>
                <StructureFileModal/>
            </header>

            <main className="student-import_main">
                <SelectFileButton handleChange={changeHandler}/>
                <p>{displayFileName(fileName)}</p>
                <AnimatedSecondaryButton onClick={handleSubmission}>Wyślij plik</AnimatedSecondaryButton>
            </main>

            <div>
                {
                    openModal && <SimpleDialog
                        open={openModal}
                        onClose={handleClose}
                    >
                        {openModal && <DisplayAlertModals error={feedbackError} success={feedbackSuccess}/>}
                    </SimpleDialog>
                }
            </div>
        </>
    );
};
