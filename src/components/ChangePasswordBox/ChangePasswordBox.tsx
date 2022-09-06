import React, {MouseEvent, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schemaChangedPassword} from '../../Validations/UserValidation';
import {useNavigate, useParams} from 'react-router-dom';
import {MiniLogoMegaK} from '../../common/LogoMegaK/MiniLogoMegaK/MiniLogoMegaK';
import {MainStyledTextField} from '../StyledComponents/MainStyledTextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {MainBtn} from '../../common/Buttons/MainBtn/MainBtn';
import SimpleDialog from '@mui/material/Dialog';
import {DisplayAlertModals} from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import '../../styles/stylesForForms.css';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux-toolkit/store';
import {apiUrl} from '../../config/api';

type FormValues = {
    changedPassword: string;
    confirmChangedPassword: string;
};

interface InputNumber {
    changedPassword: string;
    confirmChangedPassword: string;
    showChangedPassword: boolean;
    showConfirmPassword: boolean;
}

export const ChangePasswordBox = () => {
    const {role} = useSelector((store: StoreState) => store.user);

    //eye visible-hidden handle
    const [values, setValues] = useState<InputNumber>({
        changedPassword: '',
        confirmChangedPassword: '',
        showChangedPassword: false,
        showConfirmPassword: false,
    });

    const ShowChangedPass = () => {
        setValues({
            ...values,
            showChangedPassword: !values.showChangedPassword,
        });
    };

    const ShowConfirmPass = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
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

    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: yupResolver(schemaChangedPassword),
        mode: 'onChange',
    });

    const {userId} = useParams();

    const submitForm: SubmitHandler<FormValues> = async ({
                                                             changedPassword: password,
                                                             confirmChangedPassword: confirmPassword
                                                         }) => {
        try {
            const res = await fetch(`${apiUrl}/change-password/${userId}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    confirmPassword,
                }),
            });
            const result = await res.json();

            setFeedbackSuccess(result);
            setFeedbackError(result.message);
            setOpenModal(true);
            navigate('/login');

            if (!result.message) {
                switch (role) {
                    case 'admin':
                        return navigate('/home-admin');

                    case 'hr':
                        return navigate('/hr/profile');

                    case 'student':
                        return navigate('/student');

                    case '':
                        return navigate('/login');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="main-container">
            <MiniLogoMegaK/>
            <h1 className="formView_header">Zmień hasło</h1>
            <p className="formView_header_instruction">
                Zmień hasło dla swojego konta. Hasło powinno zawierać conajmniej 8 znaków, jedną wielką literę, jedną
                małą literę, jedną cyfrę i
                jeden znak specjalny.
            </p>

            <form
                onSubmit={handleSubmit(submitForm)}
                className="formView_form">
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        variant="filled"
                        type={values.showChangedPassword ? 'text' : 'password'}
                        error={!!errors.changedPassword}
                        label="Podaj hasło"
                        helperText={errors.changedPassword ? errors.changedPassword?.message : ''}
                        {...register('changedPassword')}
                        InputProps={{
                            style: {backgroundColor: '#292a2b'},
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{
                                            color: '#7E7E7E',
                                        }}
                                        aria-label="toggle password visibility"
                                        onClick={ShowChangedPass}
                                        onMouseDown={handleMouseDownPassword}>
                                        {values.showChangedPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        variant="filled"
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        error={!!errors.confirmChangedPassword}
                        label="Potwierdź hasło"
                        helperText={errors.confirmChangedPassword && 'Podane hasła nie są takie same!'}
                        {...register('confirmChangedPassword')}
                        InputProps={{
                            style: {backgroundColor: '#292a2b'},
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{
                                            color: '#7E7E7E',
                                        }}
                                        aria-label="toggle password visibility"
                                        onClick={ShowConfirmPass}
                                        onMouseDown={handleMouseDownPassword}>
                                        {values.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <MainBtn type="submit">Zmień hasło</MainBtn>
            </form>

            {openModal && (
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
            )}
        </div>
    );
};
