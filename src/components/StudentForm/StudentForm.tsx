import React, {useState} from 'react';
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import SimpleDialog from "@mui/material/Dialog";
import {DisplayAlertModals} from "../../common/DisplayAlertModals/DisplayAlertModals";
import {MainButton} from "../../common/MainButton/MainButton";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import {MainStyledTextField} from "../StyledComponents/MainStyledTextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import "./StudentForm.css";


export const StudentForm = () => {

    const [onePortfolio, setOnePortfolio] = useState<string>('')
    const [oneProject, setOneProject] = useState<string>('')

    //modal
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => {
        setOpenModal(false);
    };

    //infoFromBackendStatus
    const [feedbackError, setFeedbackError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');

    const {control, register, handleSubmit} = useForm<any>({
        // resolver: yupResolver(schemaAddHr),
        mode: "onChange",
    })

    //portfolioURLS
    const {fields: portfolioURLSFields, append: portfolioURLSAppend, remove: portfolioURLSRemove} = useFieldArray({
        control,
        name: 'portfolioURLS',
    })

    //projectsURLS
    const {fields: projectUrlsFields, append: projectUrlsAppend, remove: projectUrlsRemove} = useFieldArray({
        control,
        name: 'projectUrls'
    })

    const handleClickOnePortfolio = (e: any) => {
        e.preventDefault();
        if (!onePortfolio) return null
        portfolioURLSAppend({id: Date.now(), value: onePortfolio});
        setOnePortfolio('');
    }

    const handleClickOneProject = (e: any) => {
        e.preventDefault();
        if (!oneProject) return null
        projectUrlsAppend({id: Date.now(), value: oneProject});
        setOneProject('');
    }

    const submitForm: SubmitHandler<any> = async (data) => {
        console.log(data)

        try {
            const res = await fetch('http://localhost:8080/student/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log({result})
            setOpenModal(true)
            setFeedbackSuccess(result)
            setFeedbackError(result.message)

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} className="studentForm_form">
                {/*---------------------------------IMIE--------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="text"
                        {...register('firstName')}
                        variant="filled"
                        label="Imię"
                    />
                </div>

                {/*-----------------------------NAZWISKO---------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="text"
                        {...register('lastName')}
                        variant="filled"
                        label="Nazwisko"
                    />
                </div>

                {/*-----------------------------telefon---------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        sx={{
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                display: "none",
                            },
                            "& input[type=number]": {
                                MozAppearance: "textfield",
                            },
                        }}
                        fullWidth
                        type="number"
                        {...register('tel')}
                        variant="filled"
                        label="Numer telefonu"
                    />
                </div>

                {/*------------------------------GITHUB USERNAME--------------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="text"
                        {...register('githubUserName')}
                        variant="filled"
                        label="Podaj login z GitHub"
                    />
                </div>

                {/*----------------------------ZGODA NA ODBYCIE PRAKTYK-------------------------------------------------------*/}
                <div className="formView_input">
                    <FormControl fullWidth>
                        <FormLabel
                            sx={{backgroundColor: '#292a2b', color: '#7E7E7E', padding: "5px 12px", textAlign: 'left'}}
                            // id="demo-row-radio-buttons-group-label"
                        >
                            Zgoda na odbycie praktyk
                        </FormLabel>
                        <RadioGroup
                            row
                            defaultValue="1"
                            // aria-labelledby="demo-row-radio-buttons-group-label"
                            sx={{
                                color: '#7E7E7E',
                                backgroundColor: '#292a2b',
                                padding: '0 12px'
                            }}
                            {...register('canTakeApprenticeship')}
                        >
                            <FormControlLabel
                                value="1"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Tak"
                            />
                            <FormControlLabel
                                value="0"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Nie"/>
                        </RadioGroup>
                    </FormControl>
                </div>

                {/*-----------------------------LINKI DO PROJEKTÓW----------------------------------------------*/}
                <div className="studentForm_links">
                    <div className="formView_input">
                        <FormControl fullWidth>
                            <FormLabel
                                sx={{backgroundColor: '#292a2b', color: '#7E7E7E', paddingTop: "5px"}}
                            >
                                Linki do projektów
                            </FormLabel>

                            {projectUrlsFields.map((oneProject: any, index: number) => (
                                <MainStyledTextField
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            color: '#146DA0',
                                        },
                                    }}
                                    fullWidth
                                    variant="filled"
                                    key={oneProject.id}
                                    {...register(`projectUrls.${index}.value` as const)}
                                    defaultValue={oneProject.value}
                                    InputProps={{
                                        style: {backgroundColor: '#292a2b'},
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{
                                                        color: '#7E7E7E',
                                                        cursor: 'pointer',
                                                        transition: '0.3s',
                                                        '&:hover': {
                                                            color: '#d93535',
                                                        }
                                                    }}
                                                    onClick={() => projectUrlsRemove(index)}
                                                >
                                                    <DeleteForeverOutlinedIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </FormControl>
                    </div>


                    {/*-------------------------------------DODAJ PROJEKT------------------------------------------------*/}
                    <div className="studentForm_add">
                        <MainStyledTextField
                            value={oneProject}
                            variant="filled"
                            name="projectInput"
                            onChange={(e) => setOneProject(e.target.value)}
                            label="Dodaj link do projektu"
                        />
                        <div>
                            <MainButton
                                type="button"
                                sx={{
                                    backgroundColor: '#3B3E3FFF',
                                    '&:hover': {
                                        backgroundColor: '#3B3E3FFF',
                                        color: '#0B8BD4',
                                    }
                                }}
                                onClick={handleClickOneProject}
                            >
                                Dodaj link do projektu
                            </MainButton>
                        </div>

                    </div>
                </div>

                {/*----------------------------LINKI DO PORTFOLIO--------------------------------*/}
                <div className="studentForm_links">
                    <div className="formView_input">
                        <FormControl fullWidth>
                            <FormLabel
                                sx={{backgroundColor: '#292a2b', color: '#7E7E7E', paddingTop: "5px"}}
                            >
                                Linki do portfolio
                            </FormLabel>

                            {portfolioURLSFields.map((onePortfolio: any, index: number) => (
                                <MainStyledTextField
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            color: '#146DA0',
                                        },
                                    }}
                                    fullWidth
                                    variant="filled"
                                    key={onePortfolio.id}
                                    {...register(`portfolioURLS.${index}.value` as const)}
                                    defaultValue={onePortfolio.value}
                                    InputProps={{
                                        style: {backgroundColor: '#292a2b'},
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{
                                                        color: '#7E7E7E',
                                                        cursor: 'pointer',
                                                        transition: '0.3s',
                                                        '&:hover': {
                                                            color: '#d93535',
                                                        }
                                                    }}
                                                    onClick={() => portfolioURLSRemove(index)}
                                                >
                                                    <DeleteForeverOutlinedIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </FormControl>
                    </div>

                    {/*-------------------------------------DODAJ PORTFOLIO------------------------------------------------*/}
                    <div className="studentForm_add">
                        <MainStyledTextField
                            value={onePortfolio}
                            variant="filled"
                            name="portfolioInput"
                            onChange={(e) => setOnePortfolio(e.target.value)}
                            label="Dodaj link do portfolio"
                        />
                        <div>
                            <MainButton
                                type="button"
                                sx={{
                                    backgroundColor: '#3B3E3FFF',
                                    '&:hover': {
                                        backgroundColor: '#3B3E3FFF',
                                        color: '#0B8BD4',
                                    }
                                }}
                                onClick={handleClickOnePortfolio}
                            >
                                Dodaj link do portfolio
                            </MainButton>
                        </div>
                    </div>
                </div>
                {/*---------------------------------BIO--------------------------------------*/}
                <div className="formView_input">
                    <TextField
                        fullWidth
                        {...register('bio')}
                        label="Napisz coś o sobie"
                        multiline
                        minRows={3}
                        variant="standard"
                        sx={{
                            backgroundColor: '#292a2b',
                            '& .MuiInputLabel-root': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                            '& .MuiInputBase-input': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                        }}
                    />
                </div>

                {/*----------------------------DOCELOWE MIASTO GDZIE CHCESZ PRACOWAĆ--------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="text"
                        {...register('targetWorkCity')}
                        variant="filled"
                        label="Docelowe miasto gdzie chcesz pracować"
                    />
                </div>

                {/*-----------------------------OCZEKIWANE WYNAGRODZENIE MIESIĘCZNE---------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="number"
                        {...register('expectedSalary')}
                        InputProps={{inputProps: {min: 0, max: 999999},}}
                        variant="filled"
                        label="Oczekiwane miesięczne wynagrodzenie w PLN"
                    />
                </div>

                {/*-----------------------------ILOŚĆ MIESIĘCY DOŚWIADCZENIA KOMERCYJNEGO---------------------------------------*/}
                <div className="formView_input">
                    <MainStyledTextField
                        fullWidth
                        type="number"
                        {...register('monthsOfCommercialExp')}
                        InputProps={{inputProps: {min: 0, max: 9999},}}
                        defaultValue={0}
                        variant="filled"
                        label="Ilość miesięcy doświadczenia komercyjnego w programowaniu"
                    />
                </div>

                {/*------------------------------EDUKACJA----------------------------------*/}
                <div className="formView_input">
                    <TextField
                        fullWidth
                        {...register('education')}
                        label="Przebieg edukacji"
                        multiline
                        minRows={3}
                        variant="standard"
                        sx={{
                            backgroundColor: '#292a2b',
                            '& .MuiInputLabel-root': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                            '& .MuiInputBase-input': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                        }}
                    />
                </div>

                {/*------------------------------PRZEBIEG DOŚWIADCZENIA ZAWODOWEGO-----------------------------*/}
                <div className="formView_input">
                    <TextField
                        fullWidth
                        {...register('workExperience')}
                        label="Doświadczenie zawodowe"
                        multiline
                        minRows={3}
                        variant="standard"
                        sx={{
                            backgroundColor: '#292a2b',
                            '& .MuiInputLabel-root': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                            '& .MuiInputBase-input': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                        }}
                    />
                </div>

                {/*------------------------------KURSY I CERTYFIKATY ZWIĄZANE Z PROGRAMOWANIEM-----------------------------*/}
                <div className="formView_input">
                    <TextField
                        fullWidth
                        {...register('courses')}
                        label="Kursy i certyfikaty związane z programowaniem"
                        multiline
                        minRows={3}
                        variant="standard"
                        sx={{
                            backgroundColor: '#292a2b',
                            '& .MuiInputLabel-root': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                            '& .MuiInputBase-input': {
                                color: '#7E7E7E',
                                padding: '10px',
                            },
                        }}
                    />
                </div>

                {/*---------------------------------WYBÓR PREFEROWANEGO MIEJSCA PRACY-----------------------------------------*/}
                <div className="formView_input">
                    <FormControl fullWidth>
                        <FormLabel
                            sx={{backgroundColor: '#292a2b', color: '#7E7E7E', padding: "5px 12px", textAlign: 'left'}}
                        >
                            Wybór preferowanego miejsca pracy
                        </FormLabel>
                        <RadioGroup
                            sx={{
                                color: '#7E7E7E',
                                backgroundColor: '#292a2b',
                                padding: '0 12px'
                            }}
                            {...register('expectedTypeWork')}
                            defaultValue="Bez znaczenia"
                        >
                            <FormControlLabel
                                value="Na miejscu"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Na miejscu"
                            />
                            <FormControlLabel
                                value="Gotowość do przeprowadzki"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Gotowość do przeprowadzki"
                            />
                            <FormControlLabel
                                value="Wyłącznie zdalnie"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Wyłącznie zdalnie"
                            />
                            <FormControlLabel
                                value="Hybrydowo"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Hybrydowo"
                            />
                            <FormControlLabel
                                value="Bez znaczenia"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Bez znaczenia"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>

                {/*--------------------------------OCZEKIWANY TYP KONTRAKTU-----------------------------------------*/}
                <div className="formView_input">
                    <FormControl fullWidth>
                        <FormLabel
                            sx={{backgroundColor: '#292a2b', color: '#7E7E7E', padding: "5px 12px", textAlign: 'left'}}
                        >
                            Oczekiwany typ kontraktu
                        </FormLabel>
                        <RadioGroup
                            sx={{
                                color: '#7E7E7E',
                                backgroundColor: '#292a2b',
                                padding: '0 12px'
                            }}
                            {...register('expectedContractType')}
                            defaultValue="Brak preferencji"
                        >
                            <FormControlLabel
                                value="Tylko UoP"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Tylko UoP"
                            />
                            <FormControlLabel
                                value="Możliwe B2B"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Możliwe B2B"
                            />
                            <FormControlLabel
                                value="Możliwe UZ/UoD"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Możliwe UZ/UoD"
                            />
                            <FormControlLabel
                                value="Brak preferencji"
                                control={
                                    <Radio
                                        sx={{
                                            color: '#7E7E7E',
                                            '& .MuiSvgIcon-root': {fontSize: 20,}
                                        }}
                                    />
                                }
                                label="Brak preferencji"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                {/*---------------------------------------------------------------------------------*/}
                {
                    openModal && <SimpleDialog
                        open={openModal}
                        onClose={handleClose}
                    >
                        {openModal && <DisplayAlertModals error={feedbackError} success={feedbackSuccess}/>}
                    </SimpleDialog>
                }
                <div style={{marginTop: '50px'}}>
                    <MainButton type="submit">Wyślij dane</MainButton>
                </div>
            </form>
        </>
    )
};

/*
* this.id = obj.id ?? null;
    this.email = obj.email ?? null;
    this.courseEngagement = obj.courseEngagement ?? null;     TAK
    this.projectDegree = obj.projectDegree ?? null;
    this.courseCompletion = obj.courseCompletion ?? null;
    this.teamProjectDegree = obj.teamProjectDegree ?? null;
    this.bonusProjectUrls = obj.bonusProjectUrls ?? null;
    this.tel = obj.tel ?? null;
    this.firstName = obj.firstName ?? null;
    this.lastName = obj.lastName ?? null;
    this.githubUserName = obj.githubUserName ?? null;
    this.portfolioUrls = obj.portfolioUrls ?? null;
    this.projectUrls = obj.projectUrls ?? null;
    this.bio = obj.bio ?? null;
    this.expectedTypeWork = obj.expectedTypeWork ?? null;
    this.targetWorkCity = obj.targetWorkCity ?? null;
    this.expectedContractType = obj.expectedContractType ?? null;
    this.expectedSalary = obj.expectedSalary ?? null;
    this.canTakeApprenticeship = obj.canTakeApprenticeship ?? null;
    this.monthsOfCommercialExp = obj.monthsOfCommercialExp ?? null;
    this.education = obj.education ?? null;
    this.workExperience = obj.workExperience ?? null;
    this.courses = obj.courses ?? null;
    this.status = obj.status ?? null;
    this.user_id = obj.user_id ?? null;
    this.hr_id = obj.hr_id ?? null;
* */
