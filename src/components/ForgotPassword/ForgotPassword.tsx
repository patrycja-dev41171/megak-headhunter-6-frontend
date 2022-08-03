import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {MainStyledTextField} from "../StyledComponents/MainStyledTextField";
import {schemaForgotPassword} from "../../Validations/UserValidation";
import {AnimatedSecondaryButton} from "../../common/AnimatedSecondaryButton/AnimatedSecondaryButton";
import {MiniLogoMegaK} from "../../common/MiniLogoMegaK/MiniLogoMegaK";
import SimpleDialog from "@mui/material/Dialog";
import {DisplayAlertModals} from "../../common/DisplayAlertModals/DisplayAlertModals";
import "../../styles/stylesForForms.css"

type FormData = {
    userEmail: string;
    confirmEmail: string;
};

export const ForgotPassword = () => {
    //modal
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };
    //informacje z backendu
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schemaForgotPassword),
        mode: "onBlur",
    })

    const submitForm: SubmitHandler<FormData> = async ({userEmail: email, confirmEmail}) => {

        try {
            const res = await fetch('http://localhost:8080/forgot-password', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, confirmEmail
                }),
            });
            const result = await res.json();

            setOpenModal(true)
            setFeedbackError(result.message)
            setFeedbackSuccess(result)

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="main-container">
            <MiniLogoMegaK/>
            <h1 className="formView_header">Zresetuj swoje hasło</h1>
            <p className="formView_header_instruction">
                Podaj swój adres e-mail poniżej, aby otrzymać link do zresetowania hasła.
            </p>
            <form
                onSubmit={handleSubmit(submitForm)}
                className="formView_form"
            >
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="email"
                        {...register('userEmail')}
                        variant="filled"
                        error={!!errors.userEmail}
                        label="Podaj email"
                        helperText={errors.userEmail ? errors.userEmail?.message : ''}
                    />
                </div>

                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="email"
                        {...register('confirmEmail')}
                        variant="filled"
                        error={!!errors.confirmEmail}
                        label="Potwierdź email"
                        helperText={errors.confirmEmail && "Niepoprawnie potwierdzony email"}
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
                <AnimatedSecondaryButton type="submit">Wyślij hasło</AnimatedSecondaryButton>
            </form>
        </div>
    )
};