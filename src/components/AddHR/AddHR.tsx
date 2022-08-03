import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaAddHr} from "../../Validations/UserValidation";
import {AnimatedSecondaryButton} from "../../common/AnimatedSecondaryButton/AnimatedSecondaryButton";
import SimpleDialog from "@mui/material/Dialog";
import {AddHrStyledTextField} from "../StyledComponents/AddHrStyledTextField";
import {DisplayAlertModals} from "../../common/DisplayAlertModals/DisplayAlertModals";
import "../../styles/stylesForForms.css"

interface FormValues {
    fullName: string;
    hrEmail: string;
    company: string;
    maxReservedStudents: number;
}

export const AddHR = () => {
    //modal
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };

    //infoFromBackendStatus
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(schemaAddHr),
        mode: "onChange",
    })

    const submitForm: SubmitHandler<FormValues> = async ({
                                                             hrEmail: email,
                                                             fullName,
                                                             company,
                                                             maxReservedStudents
                                                         }) => {
        try {
            const res = await fetch('http://localhost:8080/admin/add-hr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, fullName, company, maxReservedStudents
                }),
            });

            const result = await res.json();
            setOpenModal(true)
            setFeedbackSuccess(result)
            setFeedbackError(result.message)

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h2 className="addHrFormView_header r">Add HR:</h2>

            <form onSubmit={handleSubmit(submitForm)} className="addHrFormView_form">
                <div className="formView_input">
                        <AddHrStyledTextField
                            fullWidth
                            type="text"
                            {...register('fullName')}
                            variant="filled"
                            error={!!errors.fullName}
                            label="Imię i nazwisko"
                            helperText={errors.fullName ? errors.fullName?.message : ''}
                        />
                    </div>

                    <div className="formView_input">
                        <AddHrStyledTextField
                            fullWidth
                            type="email"
                            {...register('hrEmail')}
                            variant="filled"
                            error={!!errors.hrEmail}
                            label="Email"
                            helperText={errors.hrEmail ? errors.hrEmail?.message : ''}
                        />
                    </div>

                    <div className="formView_input">
                        <AddHrStyledTextField
                            fullWidth
                            type="text"
                            {...register('company')}
                            variant="filled"
                            error={!!errors.company}
                            label="Nazwa firmy"
                            helperText={errors.company ? errors.company?.message : ''}
                        />
                    </div>

                    <div className="formView_input">
                        <AddHrStyledTextField
                            fullWidth
                            type="number"
                            defaultValue={10}
                            {...register('maxReservedStudents')}
                            InputProps={{inputProps: {min: 1, max: 999},}}
                            variant="filled"
                            error={!!errors.maxReservedStudents}
                            label="Liczba studentów"
                            helperText={errors.maxReservedStudents ? errors.maxReservedStudents?.message : ''}
                        />
                    </div>
                    {
                        openModal && <SimpleDialog
                            open={openModal}
                            onClose={handleClose}
                        >
                            {openModal && <DisplayAlertModals error={feedbackError} success={feedbackSuccess}/>}
                        </SimpleDialog>
                    }
                    <AnimatedSecondaryButton type="submit">Dodaj HR</AnimatedSecondaryButton>
                </form>

        </>
    )
}
