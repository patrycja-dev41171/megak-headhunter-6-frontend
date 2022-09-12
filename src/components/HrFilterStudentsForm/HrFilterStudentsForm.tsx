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
import {containerHrFilterStudentsForm} from "../../styles/styleObjects";

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
    const [courseComp, setCourseComp] = useState<number | null>(null);
    const [courseEng, setCourseEng] = useState<number | null>(null);
    const [projectDeg, setProjectDeg] = useState<number | null>(null);
    const [teamProjectDeg, setTeamProjectDeg] = useState<number | null>(null);
    const [apprenticeship, setApprenticeship] = useState<string | null>(null);

    const dispatch = useDispatch();
    useRefreshToken()

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue: setValueHookForm,
        control,
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
    const {name: nameApprenticeship, ref: refApprenticeship} = register('canTakeApprenticeship');

    const handleClearAllBtn = () => {
        setCourseComp(null)
        setValueHookForm('courseCompletion', null);
        setCourseEng(null)
        setValueHookForm('courseEngagement', null);
        setProjectDeg(null);
        setValueHookForm('projectDegree', null);
        setTeamProjectDeg(null)
        setValueHookForm('teamProjectDegree', null);
        setValueHookForm('minSalary', "");
        setValueHookForm('maxSalary', "");
        setValueHookForm('monthsOfCommercialExp', "");
        setExpectedTypesWork([]);
        setValueHookForm('expectedTypeWork', []);
        setExpectedContractTypes([]);
        setValueHookForm('expectedContractType', []);
        setApprenticeship(null)
        setValueHookForm('canTakeApprenticeship', null);
    }

    const submitForm: SubmitHandler<any> = async data => {
        console.log({data})

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
                <Container sx={containerHrFilterStudentsForm}>

                    <header className="filterStudents_header">
                        <h2 className="formView_header">Filtrowanie</h2>
                        <ClearAllBtn
                            onClick={handleClearAllBtn}
                        />
                    </header>

                    <p className="filterStudents_subTitle">Ocena przejścia kursu</p>
                    <FilteringWithStars
                        reference={refPassCourse}
                        val={courseComp}
                        setVal={setCourseComp}
                        setValueHookForm={setValueHookForm}
                        nameHookForm={namePassCourse}
                    />

                    <p className="filterStudents_subTitle">Ocena aktywności i zaangażowania na kursie</p>
                    <FilteringWithStars
                        reference={refActivity}
                        val={courseEng}
                        setVal={setCourseEng}
                        setValueHookForm={setValueHookForm}
                        nameHookForm={nameActivity}
                    />

                    <p className="filterStudents_subTitle">Ocena kodu w projekcie własnym</p>
                    <FilteringWithStars
                        reference={refCode}
                        val={projectDeg}
                        setVal={setProjectDeg}
                        setValueHookForm={setValueHookForm}
                        nameHookForm={nameCode}
                    />

                    <p className="filterStudents_subTitle">Ocena pracy w zespole w Scrum</p>
                    <FilteringWithStars
                        reference={refTeamWork}
                        val={teamProjectDeg}
                        setVal={setTeamProjectDeg}
                        setValueHookForm={setValueHookForm}
                        nameHookForm={nameTeamWork}
                    />

                    <p className="filterStudents_subTitle">Preferowane miejsce pracy</p>
                    <FilteringTypesWork
                        expectedData={expectedTypesWork}
                        setValueHookForm={setValueHookForm}
                        setData={setExpectedTypesWork}
                        name={'expectedTypeWork'}
                    />

                    <p className="filterStudents_subTitle">Oczekiwany typ kontraktu</p>
                    <FilteringContractTypes
                        expectedData={expectedContractTypes}
                        setValueHookForm={setValueHookForm}
                        setData={setExpectedContractTypes}
                        name={'expectedContractType'}
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
                        reference={refApprenticeship}
                        value={apprenticeship}
                        setApprenticeship={setApprenticeship}
                        setValueHookForm={setValueHookForm}
                        name={nameApprenticeship}
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
                            type="submit"
                        >
                            Pokaż wyniki
                        </MainBtn>
                    </div>
                </Container>
            </form>
        </>
    );
};
