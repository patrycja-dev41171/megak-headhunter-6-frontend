import React, {useState, MouseEvent,} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import jwtDecode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaLogin} from "../../Validations/UserValidation";
import {useNavigate} from 'react-router-dom';
import {setAccessToken, setExpirationTime, setId, setRole} from '../../redux-toolkit/features/user/user-slice';
import {MiniLogoMegaK} from '../../common/MiniLogoMegaK/MiniLogoMegaK';
import SimpleDialog from "@mui/material/Dialog";
import {DisplayAlertModals} from "../../common/DisplayAlertModals/DisplayAlertModals";
import {AnimatedSecondaryButton} from "../../common/AnimatedSecondaryButton/AnimatedSecondaryButton";
import {RemindPasswordBtn} from "../../common/RemindPasswordBtn/RemindPasswordBtn";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {MainStyledTextField} from "../StyledComponents/MainStyledTextField";
import '../../styles/stylesForForms.css';

interface FormValues {
    loginEmail: string;
    loginPassword: string;
}

interface InputNumber {
    loginPassword: string;
    showPassword: boolean;
}

interface AccessToken {
    name: string;
    exp: number;
}

export const LoginBox = () => {
    //eye visible-hidden handle
    const [values, setValues] = useState<InputNumber>({
        loginPassword: '',
        showPassword: false,
    });

    const showPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    //modal
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };

    //infoFromBackendStatus
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(schemaLogin),
        mode: "onChange",
    })

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const submitForm: SubmitHandler<FormValues> = async ({
                                                             loginEmail: email,
                                                             loginPassword: password
                                                         }) => {

        try {
            const res = await fetch(`http://localhost:8080/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, password
                }),
            });

            const result = await res.json();

            const decoded = jwtDecode<AccessToken>(result.accessToken);
            dispatch(setId(result.id));
            dispatch(setAccessToken(result.accessToken));
            dispatch(setExpirationTime(decoded.exp));
            dispatch(setRole(result.role));

            setOpenModal(true)
            setFeedbackSuccess(result);
            setFeedbackError(result.message);

            if (result.role === 'admin') {
                navigate(`/home-admin`);
            } else {
                // navigate(`/home`);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className="main-container">
            <MiniLogoMegaK/>
            <h1 className="formView_header">Zaloguj się</h1>
            <form onSubmit={handleSubmit(submitForm)} className="formView_form">
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="email"
                        {...register('loginEmail')}
                        variant="filled"
                        error={!!errors.loginEmail}
                        label="Email"
                        helperText={errors.loginEmail ? errors.loginEmail?.message : ''}
                    />
                </div>
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        variant="filled"
                        type={values.showPassword ? 'text' : 'password'}
                        error={!!errors.loginPassword}
                        label="Podaj hasło"
                        helperText={errors.loginPassword ? errors.loginPassword?.message : ''}
                        {...register('loginPassword')}
                        InputProps={{
                            style: {backgroundColor: "#292a2b"},
                            endAdornment: <InputAdornment
                                position="end"
                            >
                                <IconButton
                                    sx={{
                                        color: '#7E7E7E',
                                    }}
                                    aria-label="toggle password visibility"
                                    onClick={showPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                </div>
                <div className="formView_forgotPasswordBtnBox">
                    <RemindPasswordBtn/>
                </div>
                <AnimatedSecondaryButton type="submit">Zaloguj się</AnimatedSecondaryButton>
            </form>

            {
                openModal && <SimpleDialog
                    open={openModal}
                    onClose={handleClose}
                >
                    {openModal && <DisplayAlertModals error={feedbackError} success={feedbackSuccess}/>}
                </SimpleDialog>
            }
        </div>
    );
};
