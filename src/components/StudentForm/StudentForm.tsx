import React, { useEffect, useState } from 'react';
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
import { StoreState } from '../../redux-toolkit/store';
import { useSelector } from 'react-redux';
import { ExpectedTypeWork, ExpectedContractType } from 'types';
import './StudentForm.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentValidation } from '../../Validations/StudentValidation';

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
  const { id } = useSelector((store: StoreState) => store.user);

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
    formState: { errors },
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

  //correct display url address
  const checkUrl = (url: string) => {
    if (url.substring(0, 4) !== 'http') {
      return `//${url}`;
    }
    return url;
  };

  const handleClickOnePortfolio = async () => {
    if ((await trigger('portfolioInput')) && getValues('portfolioInput') !== '') {
      portfolioUrlsAppend({ id: Date.now(), value: getValues('portfolioInput') });
      setValue('portfolioInput', '');
    }
  };

  const handleClickOneProject = async () => {
    if ((await trigger('projectInput')) && getValues('projectInput') !== '') {
      projectUrlsAppend({ id: Date.now(), value: getValues('projectInput') });
      setValue('projectInput', '');
    }
  };

  const submitForm: SubmitHandler<any> = async ({ projectInput, portfolioInput, ...data }) => {
    try {
      const res = await fetch(`http://localhost:8080/student/data/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          portfolioUrlsAppend({ id: Date.now(), value: portfolio });
        }
      }
    }

    if (projectUrls !== null) {
      if (projectUrls !== undefined) {
        const projectUrlsArr = JSON.parse(projectUrls);
        for (const project of projectUrlsArr) {
          projectUrlsAppend({ id: Date.now(), value: project });
        }
      }
    }
  }, [bio]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="studentForm_form">
        {/*---------------------------------EMAIL----------------------------------*/}
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

        {/*---------------------------------IMIE--------------------------------------*/}
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

        {/*-----------------------------NAZWISKO---------------------------------------*/}
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
            error={!!errors.tel}
            helperText={errors.tel ? errors.tel?.message : ''}
            InputProps={{
              style: { backgroundColor: '#292a2b' },
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    '.MuiTypography-root': {
                      color: '#7E7E7E',
                    },
                  }}>
                  +48
                </InputAdornment>
              ),
            }}
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
            error={!!errors.githubUserName}
            helperText={errors.githubUserName ? errors.githubUserName?.message : ''}
          />
        </div>

        {/*----------------------------ZGODA NA ODBYCIE PRAKTYK-------------------------------------------------------*/}
        <div className="formView_input">
          <FormControl fullWidth>
            <FormLabel
              sx={{
                backgroundColor: '#292a2b',
                color: '#7E7E7E',
                padding: '5px 12px',
                textAlign: 'left',
              }}>
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
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#146DA0',
                    },
                  }}
                  disabled
                  fullWidth
                  variant="filled"
                  key={oneProject.id}
                  {...register(`projectUrls.${index}.value` as const)}
                  defaultValue={oneProject.value}
                  InputProps={{
                    style: { backgroundColor: '#292a2b' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={checkUrl(oneProject.value)}>
                          <IconButton
                            sx={{
                              color: '#7E7E7E',
                              cursor: 'pointer',
                              transition: '0.3s',
                              '&:hover': {
                                color: '#146DA0',
                              },
                            }}>
                            <Tooltip title="Otwórz link w nowym oknie">
                              <OpenInNewIcon />
                            </Tooltip>
                          </IconButton>
                        </a>
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
                          <Tooltip title="Usuń link">
                            <DeleteForeverOutlinedIcon />
                          </Tooltip>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </FormControl>
          </div>

          {/*-------------------------------------DODAJ LINK DO PROJEKTU------------------------------------------------*/}
          <div className="studentForm_add">
            <MainStyledTextField
              variant="filled"
              {...register('projectInput')}
              defaultValue=""
              label="Dodaj link do projektu"
              error={!!errors.projectInput}
              helperText={errors.projectInput ? errors.projectInput?.message : ''}
              InputProps={{
                style: { backgroundColor: '#292a2b' },
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Dodaj link">
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
                    </Tooltip>
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
              <FormLabel sx={{ backgroundColor: '#292a2b', color: '#7E7E7E', paddingTop: '5px' }}>Linki do portfolio</FormLabel>
              {portfolioUrlsFields.map((onePortfolio: any, index: number) => (
                <MainStyledTextField
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#146DA0',
                    },
                  }}
                  disabled
                  fullWidth
                  variant="filled"
                  key={onePortfolio.id}
                  {...register(`portfolioUrls.${index}.value` as const)}
                  defaultValue={onePortfolio.value}
                  InputProps={{
                    style: { backgroundColor: '#292a2b' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={checkUrl(onePortfolio.value)}>
                          <IconButton
                            sx={{
                              color: '#7E7E7E',
                              cursor: 'pointer',
                              transition: '0.3s',
                              '&:hover': {
                                color: '#146DA0',
                              },
                            }}>
                            <Tooltip title="Otwórz link w nowym oknie">
                              <OpenInNewIcon />
                            </Tooltip>
                          </IconButton>
                        </a>
                        <IconButton
                          sx={{
                            color: '#7E7E7E',
                            cursor: 'pointer',
                            transition: '0.3s',
                            '&:hover': {
                              color: '#d93535',
                            },
                          }}
                          onClick={() => portfolioUrlsRemove(index)}>
                          <Tooltip title="Usuń link">
                            <DeleteForeverOutlinedIcon />
                          </Tooltip>
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
              {...register('portfolioInput')}
              defaultValue=""
              variant="filled"
              label="Dodaj link do portfolio"
              error={!!errors.portfolioInput}
              helperText={errors.portfolioInput ? errors.portfolioInput?.message : ''}
              InputProps={{
                style: { backgroundColor: '#292a2b' },
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Dodaj link">
                      <IconButton
                        sx={{
                          color: '#7E7E7E',
                          cursor: 'pointer',
                          transition: '0.3s',
                          '&:hover': {
                            color: '#146DA0',
                          },
                        }}
                        onClick={handleClickOnePortfolio}>
                        <AddCardIcon />
                      </IconButton>
                    </Tooltip>
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
            error={!!errors.bio}
            helperText={errors.bio ? errors.bio?.message : ''}
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
            error={!!errors.targetWorkCity}
            helperText={errors.targetWorkCity ? errors.targetWorkCity?.message : ''}
          />
        </div>

        {/*-----------------------------OCZEKIWANE WYNAGRODZENIE MIESIĘCZNE---------------------------------------*/}
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            defaultValue={expectedSalary ? expectedSalary : 0}
            type="number"
            {...register('expectedSalary')}
            InputProps={{ inputProps: { min: 0, max: 999999 } }}
            variant="filled"
            label="Oczekiwane miesięczne wynagrodzenie w PLN"
            error={!!errors.expectedSalary}
            helperText={errors.expectedSalary ? errors.expectedSalary?.message : ''}
          />
        </div>

        {/*-----------------------------ILOŚĆ MIESIĘCY DOŚWIADCZENIA KOMERCYJNEGO---------------------------------------*/}
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            defaultValue={monthsOfCommercialExp ? monthsOfCommercialExp : 0}
            type="number"
            {...register('monthsOfCommercialExp')}
            InputProps={{ inputProps: { min: 0, max: 999 } }}
            variant="filled"
            label="Ilość miesięcy doświadczenia komercyjnego w programowaniu"
            error={!!errors.monthsOfCommercialExp}
            helperText={errors.monthsOfCommercialExp ? errors.monthsOfCommercialExp?.message : ''}
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
            error={!!errors.education}
            helperText={errors.education ? errors.education?.message : ''}
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
            error={!!errors.workExperience}
            helperText={errors.workExperience ? errors.workExperience?.message : ''}
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
            error={!!errors.courses}
            helperText={errors.courses ? errors.courses?.message : ''}
          />
        </div>

        {/*---------------------------------WYBÓR PREFEROWANEGO MIEJSCA PRACY-----------------------------------------*/}
        <div className="formView_input">
          <FormControl fullWidth>
            <FormLabel
              sx={{
                backgroundColor: '#292a2b',
                color: '#7E7E7E',
                padding: '5px 12px',
                textAlign: 'left',
              }}>
              Wybór preferowanego miejsca pracy
            </FormLabel>
            <RadioGroup
              sx={{
                color: '#7E7E7E',
                backgroundColor: '#292a2b',
                padding: '0 12px',
              }}
              defaultValue={expectedTypeWork !== null ? expectedTypeWork : ExpectedTypeWork.DoesNotMatter}>
              <FormControlLabel
                {...register('expectedTypeWork')}
                value={ExpectedTypeWork.OnPlace}
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
                value={ExpectedTypeWork.ReadyToMove}
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
                value={ExpectedTypeWork.OnlyRemote}
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
                value={ExpectedTypeWork.Hybrid}
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
                value={ExpectedTypeWork.DoesNotMatter}
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
            <FormLabel
              sx={{
                backgroundColor: '#292a2b',
                color: '#7E7E7E',
                padding: '5px 12px',
                textAlign: 'left',
              }}>
              Oczekiwany typ kontraktu
            </FormLabel>
            <RadioGroup
              sx={{
                color: '#7E7E7E',
                backgroundColor: '#292a2b',
                padding: '0 12px',
              }}
              defaultValue={expectedContractType !== null ? expectedContractType : ExpectedContractType.DoesNotMatter}>
              <FormControlLabel
                {...register('expectedContractType')}
                value={ExpectedContractType.EmploymentContract}
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
                value={ExpectedContractType.B2B}
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
                value={ExpectedContractType.ContractOfServices}
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
                value={ExpectedContractType.DoesNotMatter}
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
        <div style={{ marginTop: '50px' }}>
          <MainButton type="submit">Zapisz dane z formularza</MainButton>
        </div>
      </form>
    </>
  );
};
