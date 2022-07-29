import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {userSchemaForgotPassword} from "../../Validations/UserValidation";
import {TextField} from "@mui/material";
import {styled} from "@mui/system";
import {AnimatedSecondaryButton} from "../../common/AnimatedSecondaryButton/AnimatedSecondaryButton";
import {ModalTopBottomError, ModalTopBottomSuccess} from "../../common/AlertModal/AlertModal";
import './ForgotPassword.css';

const StyledTextField = styled(TextField, {
    name: "StyledTextField",
})({
    input: {
        width: '300px',
        '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #292a2b inset',
            WebkitTextFillColor: '#7E7E7E',
            borderRadius: '0',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#7E7E7E',
    },
    '& .MuiInputBase-input': {
        color: '#7E7E7E',
        backgroundColor: '#292a2b',
    },
});

type FormData = {
    userEmail: string;
    confirmEmail: string;
};

export const ForgotPassword = () => {
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');
    const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(userSchemaForgotPassword),
        mode: "onBlur",
    })

    const displayModals = (error: string, success: string ) => {
        if(error) {
            return < ModalTopBottomError errorMessage={feedbackError}/>
        }
        if (success) {
            return < ModalTopBottomSuccess successMessage={feedbackSuccess}/>
        }
        return null
    }



    const submitForm: SubmitHandler<FormData> = async ({userEmail: email, confirmEmail}) => {
        setOpenInfoModal(false);
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
            console.log(result)
            setFeedbackError(result.message)
            // lub setFeedbackSuccess(string z informacja o sukcesie)
            setOpenInfoModal(true)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="remPass-view">
            <img
                src="logo-megak.webp"
                alt="Logo MegaK"
                className="logo"
            />
            <p className="remPass-info">
                Podaj swój adres e-mail, wyślemy Ci Twoje hasło.
            </p>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="remPass-input">
                    <StyledTextField
                        type="email"
                        {...register('userEmail')}
                        variant="filled"
                        error={!!errors.userEmail}
                        label="Podaj email"
                        helperText={errors.userEmail ? errors.userEmail?.message : ''}
                    />
                </div>

                <div className="remPass-input">
                    <StyledTextField
                        type="email"
                        {...register('confirmEmail')}
                        variant="filled"
                        error={!!errors.confirmEmail}
                        label="Potwierdź email"
                        helperText={errors.confirmEmail && "Niepoprawnie potwierdzony email"}
                    />
                </div>
                <AnimatedSecondaryButton type="submit">Wyślij hasło</AnimatedSecondaryButton>
            </form>
            {openInfoModal && displayModals(feedbackError, feedbackSuccess)}
        </div>
    );
};