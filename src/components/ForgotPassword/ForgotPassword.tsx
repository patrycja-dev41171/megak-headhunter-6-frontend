import React, {useState} from "react";
import './ForgotPassword.css';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {userSchema} from "../../Validations/UserValidation";

type FormData = {
    email: string,
    confirmEmail: string,
}

export const ForgotPassword = () => {
    const {register, handleSubmit, formState} = useForm<FormData>({
        resolver: yupResolver(userSchema),
        mode: "onTouched",
    })
    const {errors} = formState;
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(
        false
    );

    const submitForm = (data: FormData) => {
        //obsługa wysłania hasła na data.email
        //data.email = podany email
        setIsSuccessfullySubmitted(true)
    }

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
                <input
                    type="email"
                    className={`remPass-input ${errors.email ? "remPass-input-error" : ""}`}
                    placeholder="Wpisz e-mail..."
                    {...register("email")}
                    disabled={isSuccessfullySubmitted}
                />
                <p className="remPass-errors">
                    {errors.email?.message}
                </p>
                <input
                    type="email"
                    className={`remPass-input ${errors.confirmEmail ? "remPass-input-error" : ""}`}
                    placeholder="Potwierdź e-mail..."
                    {...register("confirmEmail")}
                    disabled={isSuccessfullySubmitted}
                />
                {errors.confirmEmail && (
                    <p className="remPass-errors">Niepoprawnie potwierdzony e-mail</p>
                )}
                {isSuccessfullySubmitted && (
                    <p className="remPass-success">Hasło zostało wysłane na podany e-mail</p>
                )}
                <p className="remPass-btn-box">
                    <button className="remPass-btn">Wyślij hasło</button>
                </p>
            </form>
        </div>
    );
};