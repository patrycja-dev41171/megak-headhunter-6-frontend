import React, {useEffect, useState} from 'react';
import {SubmitHandler, useFieldArray, useForm} from 'react-hook-form';
import SimpleDialog from '@mui/material/Dialog';
import {DisplayAlertModals} from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import {MainBtn} from '../../common/Buttons/MainBtn/MainBtn';
import {MainStyledTextField} from '../StyledComponents/MainStyledTextField';
import {MultiLineStyledTextField} from '../StyledComponents/MultiLineStyledTextField';
import {StoreState} from '../../redux-toolkit/store';
import {useSelector} from 'react-redux';
import {ExpectedTypeWork, ExpectedContractType} from 'types';
import {yupResolver} from '@hookform/resolvers/yup';
import {StudentValidation} from '../../Validations/StudentValidation';
import {apiUrl} from '../../config/api';
import {
    ApprenticeshipStudentForm, ExpectedContractTypeStudentForm,
    ExpectedTypeWorkStudentForm
} from "../../common/FormsFilterParts/RadioForm/RadioForm";
import {PortfolioUrlsArray, ProjectsUrlsArray} from "../../common/FormsFilterParts/ArrayInputs/ArrayInputs";
import {InputButtonAdd} from "../../common/FormsFilterParts/InputButtonAdd/InputButtonAdd";
import {inputPrefix, PhoneTextField} from "../StyledComponents/PhoneTextField";

import './StudentForm.css';

interface StudentFormProps {
    email: string;
    tel: number | null;
    firstName: string | null;
    lastName: string | null;
    githubUserName: string | null;
    portfolioUrls?: any;
    projectUrls: any;
    bio: string | null;
    expectedTypeWork: ExpectedTypeWork | null;
    targetWorkCity: string | null;
    expectedContractType: ExpectedContractType | null;
    expectedSalary: number | null;
    canTakeApprenticeship: number | null;
    monthsOfCommercialExp: number | null;
    education: string | null;
    workExperience: string | null;
    courses: string | null;
    renderComponent: (render: boolean) => void;
}

interface StudentValidateValues extends StudentFormProps {
    projectInput?: string;
    portfolioInput?: string;
}

export const StudentForm = (props: StudentFormProps) => {
    const {
        email,
        tel,
        firstName,
        lastName,
        githubUserName,
        portfolioUrls,
        projectUrls,
        bio,
        expectedTypeWork,
        targetWorkCity,
        expectedContractType,
        expectedSalary,
        canTakeApprenticeship,
        monthsOfCommercialExp,
        education,
        workExperience,
        courses,
    } = props;
    const {id, accessToken} = useSelector((store: StoreState) => store.user);

    //modal
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };

    //infoFromBackendStatus
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        trigger,
        setValue,
    } = useForm<StudentValidateValues>({
        resolver: yupResolver(StudentValidation),
        mode: 'onChange',
    });

    //portfolioURLS
    const {
        fields: portfolioUrlsFields,
        append: portfolioUrlsAppend,
        remove: portfolioUrlsRemove,
    } = useFieldArray({
        control,
        name: 'portfolioUrls',
    });

    //projectsURLS
    const {
        fields: projectUrlsFields,
        append: projectUrlsAppend,
        remove: projectUrlsRemove,
    } = useFieldArray({
        control,
        name: 'projectUrls',
    });

    const handleClickOnePortfolio = async () => {
        if ((await trigger('portfolioInput')) && getValues('portfolioInput') !== '') {
            portfolioUrlsAppend({id: Date.now(), value: getValues('portfolioInput')});
            setValue('portfolioInput', '');
        }
    };

    const handleClickOneProject = async () => {
        if ((await trigger('projectInput')) && getValues('projectInput') !== '') {
            projectUrlsAppend({id: Date.now(), value: getValues('projectInput')});
            setValue('projectInput', '');
        }
    };

    const submitForm: SubmitHandler<any> = async ({projectInput, portfolioInput, ...data}) => {
        console.log({data})
        try {
            const res = await fetch(`${apiUrl}/student/data/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            setFeedbackSuccess(result);
            setFeedbackError(result.message);
            setOpenModal(true);
            props.renderComponent(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (portfolioUrls !== null) {
            if (portfolioUrls !== undefined) {
                const portfolioUrlsArr = JSON.parse(portfolioUrls);
                for (const portfolio of portfolioUrlsArr) {
                    portfolioUrlsAppend({id: Date.now(), value: portfolio});
                }
            }
        }

        if (projectUrls !== null) {
            if (projectUrls !== undefined) {
                const projectUrlsArr = JSON.parse(projectUrls);
                for (const project of projectUrlsArr) {
                    projectUrlsAppend({id: Date.now(), value: project});
                }
            }
        }
    }, [bio]);

    return (
        <>
            <form
                onSubmit={handleSubmit(submitForm)}
                className="studentForm_form">
                {/*---------------------------------Email----------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        variant="filled"
                        label="Email"
                        type="email"
                        defaultValue={email}
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email?.message : ''}
                    />
                </div>

                {/*---------------------------------firstName--------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="text"
                        defaultValue={firstName}
                        {...register('firstName')}
                        variant="filled"
                        label="Imię"
                        error={!!errors.firstName}
                        helperText={errors.firstName ? errors.firstName?.message : ''}
                    />
                </div>

                {/*-----------------------------lastName---------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="text"
                        defaultValue={lastName}
                        {...register('lastName')}
                        variant="filled"
                        label="Nazwisko"
                        error={!!errors.lastName}
                        helperText={errors.lastName ? errors.lastName?.message : ''}
                    />
                </div>

                {/*-----------------------------Phone---------------------------------------*/}
                <div className="formView_input">
                    <PhoneTextField
                        fullWidth
                        type="number"
                        defaultValue={tel}
                        {...register('tel')}
                        variant="filled"
                        label="Numer telefonu"
                        error={!!errors.tel}
                        helperText={errors.tel ? errors.tel?.message : ''}
                        InputProps={{
                            style: {backgroundColor: '#292a2b'},
                            startAdornment: inputPrefix(),
                        }}
                    />
                </div>

                {/*------------------------------Github Username--------------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="text"
                        defaultValue={githubUserName}
                        {...register('githubUserName')}
                        variant="filled"
                        label="Podaj login z GitHub"
                        error={!!errors.githubUserName}
                        helperText={errors.githubUserName ? errors.githubUserName?.message : ''}
                    />
                </div>

                {/*----------------------------Can Take Apprenticeship-------------------------------------------------------*/}
                <div className="formView_input">
                    <ApprenticeshipStudentForm
                        reg={register}
                        canTakeApp={canTakeApprenticeship}
                        name={'canTakeApprenticeship'}
                    />
                </div>

                {/*-----------------------------Projects urls----------------------------------------------*/}
                <div className="studentForm_links">
                    <div className="formView_input">
                        <ProjectsUrlsArray
                            fields={projectUrlsFields}
                            reg={register}
                            remove={projectUrlsRemove}
                        />
                    </div>

                    {/*-------------------------------------Project Add Input------------------------------------------------*/}
                    <div className="studentForm_add">
                        <MainStyledTextField
                            variant="filled"
                            {...register('projectInput')}
                            defaultValue=""
                            label="Dodaj link do projektu"
                            error={!!errors.projectInput}
                            helperText={errors.projectInput ? errors.projectInput?.message : ''}
                            InputProps={{
                                style: {backgroundColor: '#292a2b'},
                                endAdornment: (
                                    <InputButtonAdd
                                        handleClick={handleClickOneProject}
                                    />
                                ),
                            }}
                        />
                    </div>
                </div>

                {/*----------------------------Portfolio Urls--------------------------------*/}
                <div className="studentForm_links">
                    <div className="formView_input">
                        <PortfolioUrlsArray
                            reg={register}
                            fields={portfolioUrlsFields}
                            remove={portfolioUrlsRemove}
                        />
                    </div>

                    {/*-------------------------------------Portfolio Add Input------------------------------------------------*/}
                    <div className="studentForm_add">
                        <MainStyledTextField
                            {...register('portfolioInput')}
                            defaultValue=""
                            variant="filled"
                            label="Dodaj link do portfolio"
                            error={!!errors.portfolioInput}
                            helperText={errors.portfolioInput ? errors.portfolioInput?.message : ''}
                            InputProps={{
                                style: {backgroundColor: '#292a2b'},
                                endAdornment: (
                                    <InputButtonAdd
                                        handleClick={handleClickOnePortfolio}
                                    />
                                ),
                            }}
                        />
                    </div>
                </div>
                {/*---------------------------------Biography--------------------------------------*/}
                <div className="formView_input">
                    <MultiLineStyledTextField
                        fullWidth
                        defaultValue={bio}
                        {...register('bio')}
                        label="Napisz coś o sobie"
                        multiline
                        minRows={2}
                        variant="standard"
                        error={!!errors.bio}
                        helperText={errors.bio ? errors.bio?.message : ''}
                    />
                </div>

                {/*----------------------------Target WorkCity--------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        defaultValue={targetWorkCity}
                        type="text"
                        {...register('targetWorkCity')}
                        variant="filled"
                        label="Docelowe miasto gdzie chcesz pracować"
                        error={!!errors.targetWorkCity}
                        helperText={errors.targetWorkCity ? errors.targetWorkCity?.message : ''}
                    />
                </div>

                {/*-----------------------------Expected Salary---------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        defaultValue={expectedSalary ? expectedSalary : 0}
                        type="number"
                        {...register('expectedSalary')}
                        InputProps={{inputProps: {min: 0, max: 999999}}}
                        variant="filled"
                        label="Oczekiwane miesięczne wynagrodzenie w PLN"
                        error={!!errors.expectedSalary}
                        helperText={errors.expectedSalary ? errors.expectedSalary?.message : ''}
                    />
                </div>

                {/*-----------------------------Months Of Commercial Exp---------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        defaultValue={monthsOfCommercialExp ? monthsOfCommercialExp : 0}
                        type="number"
                        {...register('monthsOfCommercialExp')}
                        InputProps={{inputProps: {min: 0, max: 999}}}
                        variant="filled"
                        label="Ilość miesięcy doświadczenia komercyjnego w programowaniu"
                        error={!!errors.monthsOfCommercialExp}
                        helperText={errors.monthsOfCommercialExp ? errors.monthsOfCommercialExp?.message : ''}
                    />
                </div>

                {/*------------------------------Education----------------------------------*/}
                <div className="formView_input">
                    <MultiLineStyledTextField
                        fullWidth
                        defaultValue={education}
                        {...register('education')}
                        label="Przebieg edukacji"
                        multiline
                        minRows={3}
                        variant="standard"
                        error={!!errors.education}
                        helperText={errors.education ? errors.education?.message : ''}
                    />
                </div>

                {/*------------------------------Work Experience-----------------------------*/}
                <div className="formView_input">
                    <MultiLineStyledTextField
                        fullWidth
                        defaultValue={workExperience}
                        {...register('workExperience')}
                        label="Doświadczenie zawodowe"
                        multiline
                        minRows={3}
                        variant="standard"
                        error={!!errors.workExperience}
                        helperText={errors.workExperience ? errors.workExperience?.message : ''}
                    />
                </div>

                {/*------------------------------Courses-----------------------------*/}
                <div className="formView_input">
                    <MultiLineStyledTextField
                        fullWidth
                        defaultValue={courses}
                        {...register('courses')}
                        label="Kursy i certyfikaty związane z programowaniem"
                        multiline
                        minRows={3}
                        variant="standard"
                        error={!!errors.courses}
                        helperText={errors.courses ? errors.courses?.message : ''}
                    />
                </div>

                {/*---------------------------------Expected TypeWork-----------------------------------------*/}
                <div className="formView_input">
                    <ExpectedTypeWorkStudentForm
                        reg={register}
                        name={'expectedTypeWork'}
                        expectedTypeWork={expectedTypeWork}
                    />
                </div>

                {/*--------------------------------Expected ContractType-----------------------------------------*/}
                <div className="formView_input">
                    <ExpectedContractTypeStudentForm
                        reg={register}
                        expectedContractType={expectedContractType}
                        name={'expectedContractType'}
                    />
                </div>

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

                <div style={{marginTop: '50px'}}>
                    <MainBtn type="submit">Zapisz dane z formularza</MainBtn>
                </div>
            </form>
        </>
    );
};
