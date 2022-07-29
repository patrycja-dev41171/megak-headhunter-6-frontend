import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {userSchema} from "../../Validations/UserValidation";
import {TextField} from "@mui/material";
import {styled} from "@mui/system";
import './ForgotPassword.css';
import {AnimatedSecondaryButton} from "../../common/AnimatedSecondaryButton/AnimatedSecondaryButton";

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
  email: string;
  confirmEmail: string;
};

export const ForgotPassword = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(userSchema),
        mode: "onTouched",
    })
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(
        false
    );
    const [feedback, setFeedback] = useState('');

    const submitForm: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const res = await fetch('http://localhost:8080/forgot-password', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                }),
            });
            console.log({data})
            const result = await res.json();
            console.log(result)
            setFeedback(result.message)
            setIsSuccessfullySubmitted(true);
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

                <div className="inputFormRemPass">
                    <StyledTextField
                        variant="filled"
                        type="email"
                        error={!!errors.email}
                        label="Podaj email"
                        helperText={errors.email ? errors.email?.message : ''}
                        {...register('email')}
                        disabled={isSuccessfullySubmitted}
                    />
                </div>

                <div className="remPass-input">
                    <StyledTextField
                        variant="filled"
                        type="email"
                        error={!!errors.confirmEmail}
                        label="Potwierdź email"
                        helperText={errors.confirmEmail && "Niepoprawnie potwierdzony email"}
                        {...register('confirmEmail')}
                        disabled={isSuccessfullySubmitted}
                    />
                </div>

                {isSuccessfullySubmitted && (
                    <p className="remPass-success">Hasło zostało wysłane na podany e-mail</p>
                )}
                <AnimatedSecondaryButton>Wyślij hasło</AnimatedSecondaryButton>
               <p style={{color: '#ffffff'}}>{feedback}</p>
            </form>
        </div>
    );
};

