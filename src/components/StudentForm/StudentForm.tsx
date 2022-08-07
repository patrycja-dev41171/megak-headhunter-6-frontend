import React, { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/DisplayAlertModals/DisplayAlertModals';
import { MainButton } from '../../common/MainButton/MainButton';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip } from '@mui/material';
import { MainStyledTextField } from '../StyledComponents/MainStyledTextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCardIcon from '@mui/icons-material/AddCard';
import { MultiLineStyledTextField } from '../StyledComponents/MultiLineStyledTextField';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './StudentForm.css';
import { StoreState } from '../../redux-toolkit/store';
import { useSelector } from 'react-redux';
import { ExpectedTypeWork, ExpectedContractType } from 'types';

interface StudentFormProps {
  email: string;
  tel: number | null;
  firstName: string | null;
  lastName: string | null;
  githubUserName: string | null;
  portfolioUrls?: string | null;
  projectUrls: string | null;
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
  const { id } = useSelector((store: StoreState) => store.user);

  const [onePortfolio, setOnePortfolio] = useState<string>('');
  const [oneProject, setOneProject] = useState<string>('');

  //modal
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  //infoFromBackendStatus
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const { control, register, handleSubmit } = useForm<any>({
    // resolver: yupResolver(schemaAddHr),
    mode: 'onChange',
  });

 //portfolioURLS
    const {fields: portfolioUrlsFields, append: portfolioUrlsAppend, remove: portfolioUrlsRemove} = useFieldArray({
        control,
        name: 'portfolioUrls',
    })

    //projectsURLS
    const {fields: projectUrlsFields, append: projectUrlsAppend, remove: projectUrlsRemove} = useFieldArray({
        control,
        name: 'projectUrls'
    })

    //openLinkInNweTab
    const openInNewTab = (url: string) => {
        window.open(url, '_blank');
    };

    const handleClickOnePortfolio = (e: any) => {
        e.preventDefault();
        if (!onePortfolio) return null
        portfolioUrlsAppend({id: Date.now(), value: onePortfolio});
        setOnePortfolio('');
        

  const handleClickOneProject = (e: any) => {
    e.preventDefault();
    if (!oneProject) return null;
    projectUrlsAppend({ id: Date.now(), value: oneProject });
    setOneProject('');
  };

  const submitForm: SubmitHandler<any> = async data => {
    console.log(data);

    try {
      const res = await fetch(`http://localhost:8080/student/data/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log({ result });
      setOpenModal(true);
      setFeedbackSuccess(result);
      setFeedbackError(result.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="studentForm_form">
        {/*---------------------------------EMAIL----------------------------------*/}
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            type="email"
            defaultValue={email}
            {...register('email')}
            variant="filled"
            label="Email"
          />
        </div>

        {/*---------------------------------IMIE--------------------------------------*/}
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            type="text"
            defaultValue={firstName}
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
            defaultValue={lastName}
            {...register('lastName')}
            variant="filled"
            label="Nazwisko"
          />
        </div>

        {/*-----------------------------telefon---------------------------------------*/}
        <div className="formView_input">
          <MainStyledTextField
            sx={{
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                display: 'none',
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
            }}
            fullWidth
            type="number"
            defaultValue={tel}
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
            defaultValue={githubUserName}
            {...register('githubUserName')}
            variant="filled"
            label="Podaj login z GitHub"
          />
        </div>

        {/*----------------------------ZGODA NA ODBYCIE PRAKTYK-------------------------------------------------------*/}
        <div className="formView_input">
          <FormControl fullWidth>
            <FormLabel sx={{ backgroundColor: '#292a2b', color: '#7E7E7E', padding: '5px 12px', textAlign: 'left' }}>
              Zgoda na odbycie praktyk
            </FormLabel>
            <RadioGroup
              defaultValue={canTakeApprenticeship !== null ? canTakeApprenticeship : '1'}
              sx={{
                color: '#7E7E7E',
                backgroundColor: '#292a2b',
                padding: '0 12px',
              }}>
              <FormControlLabel
                {...register('canTakeApprenticeship')}
                value="1"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Tak"
              />
              <FormControlLabel
                {...register('canTakeApprenticeship')}
                value="0"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Nie"
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/*-----------------------------LINKI DO PROJEKTÓW----------------------------------------------*/}
        <div className="studentForm_links">
          <div className="formView_input">
            <FormControl fullWidth>
              <FormLabel sx={{ backgroundColor: '#292a2b', color: '#7E7E7E', paddingTop: '5px' }}>Linki do projektów</FormLabel>

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
                    style: { backgroundColor: '#292a2b' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            color: '#7E7E7E',
                            cursor: 'pointer',
                            transition: '0.3s',
                            '&:hover': {
                              color: '#146DA0',
                            },
                          }}
                          onClick={() => openInNewTab(oneProject.value)}>
                          <OpenInNewIcon />
                        </IconButton>

                        <IconButton
                          sx={{
                            color: '#7E7E7E',
                            cursor: 'pointer',
                            transition: '0.3s',
                            '&:hover': {
                              color: '#d93535',
                            },
                          }}
                          onClick={() => projectUrlsRemove(index)}>
                          <DeleteForeverOutlinedIcon />
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
              onChange={e => setOneProject(e.target.value)}
              label="Dodaj link do projektu"
              InputProps={{
                style: { backgroundColor: '#292a2b' },
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      sx={{ fontSize: '20px' }}
                      title={
                        <>
                          <p style={{ fontSize: '14px', color: '#b2b2b2' }}>Wklej kompletny link URL np:</p>
                          <p style={{ fontSize: '14px', textAlign: 'center' }}>https://www.megak.pl/</p>
                        </>
                      }
                      arrow>
                      <InfoOutlinedIcon sx={{ color: '#7E7E7E', marginRight: '20px' }} />
                    </Tooltip>
                    <IconButton
                      sx={{
                        color: '#7E7E7E',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                          color: '#146DA0',
                        },
                      }}
                      onClick={handleClickOneProject}>
                      <AddCardIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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

                            {portfolioUrlsFields.map((onePortfolio: any, index: number) => (
                                <MainStyledTextField
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            color: '#146DA0',
                                        },
                                    }}
                                    fullWidth
                                    variant="filled"
                                    key={onePortfolio.id}
                                    {...register(`portfolioUrls.${index}.value` as const)}
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
                                                            color: '#146DA0',
                                                        }
                                                    }}
                                                    onClick={() => openInNewTab(onePortfolio.value)}
                                                >
                                                    <OpenInNewIcon/>
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: '#7E7E7E',
                                                        cursor: 'pointer',
                                                        transition: '0.3s',
                                                        '&:hover': {
                                                            color: '#d93535',
                                                        }
                                                    }}
                                                    onClick={() => portfolioUrlsRemove(index)}
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

                    {/*-------------------------------------DODAJ LINK DO PORTFOLIO------------------------------------------------*/}
                    <div className="studentForm_add">
                        <MainStyledTextField
                            value={onePortfolio}
                            variant="filled"
                            name="portfolioInput"
                            onChange={(e) => setOnePortfolio(e.target.value)}
                            label="Dodaj link do portfolio"
                            InputProps={{
                                style: {backgroundColor: '#292a2b'},
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip sx={{fontSize: '20px'}}
                                                 title={
                                                     <>
                                                         <p style={{color: '#bcbcc5', fontSize:'14px'}}>Wklej kompletny link URL np:</p>
                                                         <p style={{textAlign: 'center', fontSize: '16px'}}>https://www.megak.pl/</p>
                                                     </>
                                                 }
                                                 arrow
                                        >
                                            <IconButton>
                                                <InfoOutlinedIcon sx={{color: '#7E7E7E', cursor: 'help'}}/>
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton
                                            sx={{
                                                color: '#7E7E7E',
                                                cursor: 'pointer',
                                                transition: '0.3s',
                                                '&:hover': {
                                                    color: '#146DA0',
                                                }
                                            }}
                                            onClick={handleClickOnePortfolio}
                                        >
                                            <AddCardIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
        {/*---------------------------------BIO--------------------------------------*/}
        <div className="formView_input">
          <MultiLineStyledTextField
            fullWidth
            defaultValue={bio}
            {...register('bio')}
            label="Napisz coś o sobie"
            multiline
            minRows={2}
            variant="standard"
          />
        </div>

        {/*----------------------------DOCELOWE MIASTO GDZIE CHCESZ PRACOWAĆ--------------------------------*/}
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            defaultValue={targetWorkCity}
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
            defaultValue={expectedSalary}
            type="number"
            {...register('expectedSalary')}
            InputProps={{ inputProps: { min: 0, max: 999999 } }}
            variant="filled"
            label="Oczekiwane miesięczne wynagrodzenie w PLN"
          />
        </div>

        {/*-----------------------------ILOŚĆ MIESIĘCY DOŚWIADCZENIA KOMERCYJNEGO---------------------------------------*/}
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            defaultValue={monthsOfCommercialExp}
            type="number"
            {...register('monthsOfCommercialExp')}
            InputProps={{ inputProps: { min: 0, max: 9999 } }}
            variant="filled"
            label="Ilość miesięcy doświadczenia komercyjnego w programowaniu"
          />
        </div>

        {/*------------------------------EDUKACJA----------------------------------*/}
        <div className="formView_input">
          <MultiLineStyledTextField
            fullWidth
            defaultValue={education}
            {...register('education')}
            label="Przebieg edukacji"
            multiline
            minRows={3}
            variant="standard"
          />
        </div>

        {/*------------------------------PRZEBIEG DOŚWIADCZENIA ZAWODOWEGO-----------------------------*/}
        <div className="formView_input">
          <MultiLineStyledTextField
            fullWidth
            defaultValue={workExperience}
            {...register('workExperience')}
            label="Doświadczenie zawodowe"
            multiline
            minRows={3}
            variant="standard"
          />
        </div>

        {/*------------------------------KURSY I CERTYFIKATY ZWIĄZANE Z PROGRAMOWANIEM-----------------------------*/}
        <div className="formView_input">
          <MultiLineStyledTextField
            fullWidth
            defaultValue={courses}
            {...register('courses')}
            label="Kursy i certyfikaty związane z programowaniem"
            multiline
            minRows={3}
            variant="standard"
          />
        </div>

        {/*---------------------------------WYBÓR PREFEROWANEGO MIEJSCA PRACY-----------------------------------------*/}
        <div className="formView_input">
          <FormControl fullWidth>
            <FormLabel sx={{ backgroundColor: '#292a2b', color: '#7E7E7E', padding: '5px 12px', textAlign: 'left' }}>
              Wybór preferowanego miejsca pracy
            </FormLabel>
            <RadioGroup
              sx={{
                color: '#7E7E7E',
                backgroundColor: '#292a2b',
                padding: '0 12px',
              }}
              defaultValue={expectedTypeWork !== null ? expectedTypeWork : 'Bez znaczenia'}>
              <FormControlLabel
                {...register('expectedTypeWork')}
                value="Na miejscu"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Na miejscu"
              />
              <FormControlLabel
                {...register('expectedTypeWork')}
                value="Gotowość do przeprowadzki"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Gotowość do przeprowadzki"
              />
              <FormControlLabel
                {...register('expectedTypeWork')}
                value="Wyłącznie zdalnie"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Wyłącznie zdalnie"
              />
              <FormControlLabel
                {...register('expectedTypeWork')}
                value="Hybrydowo"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Hybrydowo"
              />
              <FormControlLabel
                {...register('expectedTypeWork')}
                value="Bez znaczenia"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
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
            <FormLabel sx={{ backgroundColor: '#292a2b', color: '#7E7E7E', padding: '5px 12px', textAlign: 'left' }}>
              Oczekiwany typ kontraktu
            </FormLabel>
            <RadioGroup
              sx={{
                color: '#7E7E7E',
                backgroundColor: '#292a2b',
                padding: '0 12px',
              }}
              defaultValue={expectedContractType !== null ? expectedContractType : 'Brak preferencji'}>
              <FormControlLabel
                {...register('expectedContractType')}
                value="Tylko UoP"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Tylko UoP"
              />
              <FormControlLabel
                {...register('expectedContractType')}
                value="Możliwe B2B"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Możliwe B2B"
              />
              <FormControlLabel
                {...register('expectedContractType')}
                value="Możliwe UZ/UoD"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                }
                label="Możliwe UZ/UoD"
              />
              <FormControlLabel
                {...register('expectedContractType')}
                value="Brak preferencji"
                control={
                  <Radio
                    sx={{
                      color: '#7E7E7E',
                      '& .MuiSvgIcon-root': { fontSize: 14 },
                    }}
                  />
                  }
                   label="Brak preferencji"
              />
            </RadioGroup>
          </FormControl>
        </div>
                {
                    openModal && <SimpleDialog
                        open={openModal}
                        onClose={handleClose}
                    >
                        {openModal && <DisplayAlertModals error={feedbackError} success={feedbackSuccess}/>}
                    </SimpleDialog>
        )}
        <div style={{ marginTop: '50px' }}>
          <MainButton type="submit">Zapisz dane z formularza</MainButton>
        </div>
      </form>
    </>
  );
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
