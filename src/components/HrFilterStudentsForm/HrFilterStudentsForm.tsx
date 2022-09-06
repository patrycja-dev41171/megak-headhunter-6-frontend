import React, {useState} from 'react';
import {Container} from '@mui/material';
import {MainBtn} from '../../common/Buttons/MainBtn/MainBtn';
import {SubmitHandler, useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StudentFilteredValidation} from '../../Validations/StudentFilteredValidation';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedStudentList, setStudentList} from '../../redux-toolkit/features/user/user-slice';
import {StoreState} from '../../redux-toolkit/store';
import {apiUrl} from '../../config/api';
import {FilterStudentsInput} from "../StyledComponents/FilterStudentsInput";
import {useRefreshToken} from "../../utils/useRefreshToken";
import {FilteringWithStars} from "../../common/FormsFilterParts/FilteringWithStars/FilteringWithStars";
import {ClearAllBtn} from "../../common/Buttons/ClearAllBtn/ClearAllBtn";
import {
    FilteringContractTypes,
    FilteringTypesWork,
} from "../../common/FormsFilterParts/FilteringWithManyButtons/FilteringWithManyButtons";
import {ApprenticeshipFilterStudents} from "../../common/FormsFilterParts/RadioForm/RadioForm";
import {CancelBtn} from "../../common/Buttons/CancelBtn/CancelBtn";

import '../../styles/stylesForForms.css';
import '../../styles/stylesForLayouts.css';

interface StudentValues {
    minSalary: string | null;
    maxSalary: string | null;
    canTakeApprenticeship: number | null;
    monthsOfCommercialExp: string | null;
    courseCompletion?: number | null;
    courseEngagement?: number | null;
    projectDegree?: number | null;
    teamProjectDegree?: number | null;
    expectedTypeWork?: any;
    expectedContractType?: any;
}

interface Props {
    handleClose: () => void;
}

export const HrFilterStudentsForm = (props: Props) => {
    const {id, accessToken} = useSelector((store: StoreState) => store.user);
    const [expectedTypesWork, setExpectedTypesWork] = useState<string[] | null>(() => null);
    const [expectedContractTypes, setExpectedContractTypes] = useState<string[] | null>(() => null);

    const dispatch = useDispatch();
    useRefreshToken()

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        control
    } = useForm<StudentValues>({
        resolver: yupResolver(StudentFilteredValidation),
        mode: 'onChange',
    });

    useFieldArray({
        control,
        name: 'expectedTypeWork',
    });

    useFieldArray({
        control,
        name: 'expectedContractType',
    });

    const {name: namePassCourse, ref: refPassCourse} = register('courseCompletion');
    const {name: nameActivity, ref: refActivity} = register('courseEngagement');
    const {name: nameCode, ref: refCode} = register('projectDegree');
    const {name: nameTeamWork, ref: refTeamWork} = register('teamProjectDegree');

    const handleChangeTypesWork = (event: React.MouseEvent<HTMLElement>, newChoices: string[]) => {
        setExpectedTypesWork(newChoices);
        setValue('expectedTypeWork', newChoices);
    };

    const handleChangeContractTypes = (event: React.MouseEvent<HTMLElement>, newChoices: string[]) => {
        setExpectedContractTypes(newChoices);
        setValue('expectedContractType', newChoices);
    };

    const submitForm: SubmitHandler<any> = async data => {
        if (window.location.href === 'http://localhost:3000/hr/home') {
            try {
                const res = await fetch(`${apiUrl}/hr/home/filterList/${id}`, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await res.json();
                if (result.message) {
                    dispatch(setStudentList([]));
                }
                if (!result.message) {
                    dispatch(setStudentList(result));
                }
            } catch (err) {
                console.log(err);
            }
        } else if (window.location.href === 'http://localhost:3000/hr/selected-students') {
            try {
                const res = await fetch(`${apiUrl}/hr/home/selectedStudents/filterList`, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        hr_id: id,
                    }),
                });

                const result = await res.json();
                if (result.message) {
                    dispatch(setSelectedStudentList([]));
                }
                if (!result.message) {
                    dispatch(setSelectedStudentList(result));
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <Container
                    sx={{
                        padding: '26px',
                        '&.MuiContainer-root': {
                            maxWidth: '600px',
                            background: '#0a0a0a',
                        },
                    }}>

                    <header className="filterStudents_header">
                        <h2 className="formView_header">Filtrowanie</h2>
                        <ClearAllBtn/>
                    </header>

                    <p className="filterStudents_subTitle">Ocena przejścia kursu</p>
                    <FilteringWithStars
                        name={namePassCourse}
                        reference={refPassCourse}
                        setValue={setValue}
                    />

                    <p className="filterStudents_subTitle">Ocena aktywności i zaangażowania na kursie</p>
                    <FilteringWithStars
                        name={nameActivity}
                        reference={refActivity}
                        setValue={setValue}
                    />

                    <p className="filterStudents_subTitle">Ocena kodu w projekcie własnym</p>
                    <FilteringWithStars
                        name={nameCode}
                        reference={refCode}
                        setValue={setValue}
                    />

                    <p className="filterStudents_subTitle">Ocena pracy w zespole w Scrum</p>
                    <FilteringWithStars
                        name={nameTeamWork}
                        reference={refTeamWork}
                        setValue={setValue}
                    />

                    <p className="filterStudents_subTitle">Preferowane miejsce pracy</p>
                    <FilteringTypesWork
                        expectedTypesWork={expectedTypesWork}
                        handleChangeTypesWork={handleChangeTypesWork}
                    />

                    <p className="filterStudents_subTitle">Oczekiwany typ kontraktu</p>
                    <FilteringContractTypes
                        expectedContractTypes={expectedContractTypes}
                        handleChangeContractTypes={handleChangeContractTypes}
                    />

                    <p className="filterStudents_subTitle">Oczekiwane wynagrodzenie miesięczne netto</p>
                    <div className="filterStudents_lineContent">
                        <div className="filterStudents_inputsSalaryBox">
                            <span className="filterStudents_inputPrefix">Od:</span>
                            <FilterStudentsInput
                                size="small"
                                type="number"
                                {...register('minSalary')}
                                InputProps={{inputProps: {min: 0, max: 999999}}}
                                variant="filled"
                                label="PLN"
                                error={!!errors.minSalary}
                                helperText={errors.minSalary ? errors.minSalary?.message : ''}
                            />
                            <span className="filterStudents_inputPrefix">Do:</span>
                            <FilterStudentsInput
                                size="small"
                                type="number"
                                {...register('maxSalary')}
                                InputProps={{inputProps: {min: 0, max: 999999}}}
                                variant="filled"
                                label="PLN"
                                error={!!errors.maxSalary}
                                helperText={errors.maxSalary ? errors.maxSalary?.message : ''}
                            />
                        </div>
                    </div>

                    <p className="filterStudents_subTitle">Zgoda na odbycie bezpłatnych praktyk/stażu na początek</p>
                    <ApprenticeshipFilterStudents
                        reg={register}
                        name={'canTakeApprenticeship'}
                    />

                    <p className="filterStudents_subTitle">Ilość miesięcy doświadczenia komercyjnego kandydata w
                        programowaniu</p>
                    <div className="filterStudents_lineContent">
                        <FilterStudentsInput
                            size="small"
                            type="number"
                            {...register('monthsOfCommercialExp')}
                            InputProps={{inputProps: {min: 0, max: 999}}}
                            variant="filled"
                            label="ILOŚĆ"
                            error={!!errors.monthsOfCommercialExp}
                            helperText={errors.monthsOfCommercialExp ? errors.monthsOfCommercialExp?.message : ''}
                        />
                    </div>

                    <div className="filterStudents_endButtons">
                        <CancelBtn
                            onClick={props.handleClose}
                        >
                            Anuluj
                        </CancelBtn>
                        <MainBtn
                            onClick={props.handleClose}
                            type="submit">
                            Pokaż wyniki
                        </MainBtn>
                    </div>
                </Container>
            </form>
        </>
    );
};
