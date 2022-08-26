import React, { useState } from 'react';
import { Container, FormControl, FormControlLabel, Radio, RadioGroup, Rating, ToggleButtonGroup } from '@mui/material';
import { MainButton } from '../../common/MainButton/MainButton';
import '../../styles/stylesForLayouts.css';
import '../../styles/stylesForForms.css';
import StarIcon from '@mui/icons-material/Star';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExpectedTypeWork, ExpectedContractType } from 'types';
import { ToggleButtonFilterStudents } from '../../common/ToggleButtonFilterStudents/ToggleButtonFilterStudents';
import { FilteredStudentsInput } from '../StyledComponents/MainStyledTextField';
import { StudentFilteredValidation } from '../../Validations/StudentFilteredValidation';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStudentList, setStudentList } from '../../redux-toolkit/features/user/user-slice';
import { StoreState } from '../../redux-toolkit/store';
import { apiUrl } from '../../config/api';
import {useRefreshToken} from "../../utils/useRefreshToken";

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
  const { id, accessToken } = useSelector((store: StoreState) => store.user);
  const [expectedTypesWork, setExpectedTypesWork] = useState<string[] | null>(() => null);
  const [expectedContractTypes, setExpectedContractTypes] = useState<string[] | null>(() => null);

  const dispatch = useDispatch();
  useRefreshToken()

  const customizeValue = (val: number | null) => {
    switch (val) {
      case 0:
        return null;
      case 1:
        return 5;

      case 2:
        return 4;

      case 3:
        return 3;

      case 4:
        return 2;

      case 5:
        return 1;
      case null:
        return null;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
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

  const { name: namePassCour, ref: refPassCour } = register('courseCompletion');
  const { name: nameActivity, ref: refActivity } = register('courseEngagement');
  const { name: nameCode, ref: refCode } = register('projectDegree');
  const { name: nameTeamWork, ref: refTeamWork } = register('teamProjectDegree');

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
            <MainButton
              type="button"
              sx={{
                backgroundColor: '#172A35',
                '&:hover': {
                  backgroundColor: '#172A35',
                },
              }}>
              Wyczyść wszystkie
            </MainButton>
          </header>
          {/*-------------------------------OCENA PRZEJŚCIA KURSU------------------------------------------*/}
          <p className="filterStudents_subTitle">Ocena przejścia kursu</p>
          <div className="filterStudents_lineContentStars">
            <div className="filterStudents_starNumbersBox">
              <span className="filterStudents_numberAtStar starNumber1">5</span>
              <span className="filterStudents_numberAtStar starNumber2">4</span>
              <span className="filterStudents_numberAtStar starNumber3">3</span>
              <span className="filterStudents_numberAtStar starNumber4">2</span>
              <span className="filterStudents_numberAtStar starNumber5">1</span>
            </div>

            <Rating
              name={namePassCour}
              ref={refPassCour}
              onChange={(event, newValue) => {
                setValue(namePassCour, customizeValue(newValue));
              }}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#E02735',
                },
              }}
              icon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                  }}
                />
              }
              emptyIcon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                    color: '#4D4D4D',
                  }}
                />
              }
            />
          </div>

          {/*---------------------------------OCENA AKTYWNOŚCI I ZAANGAŻOWANIA NA KURSIE-------------------*/}
          <p className="filterStudents_subTitle">Ocena aktywności i zaangażowania na kursie</p>
          <div className="filterStudents_lineContentStars">
            <div className="filterStudents_starNumbersBox">
              <span className="filterStudents_numberAtStar starNumber1">5</span>
              <span className="filterStudents_numberAtStar starNumber2">4</span>
              <span className="filterStudents_numberAtStar starNumber3">3</span>
              <span className="filterStudents_numberAtStar starNumber4">2</span>
              <span className="filterStudents_numberAtStar starNumber5">1</span>
            </div>

            <Rating
              name={nameActivity}
              ref={refActivity}
              onChange={(event, newValue) => {
                setValue(nameActivity, customizeValue(newValue));
              }}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#E02735',
                },
              }}
              icon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                  }}
                />
              }
              emptyIcon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                    color: '#4D4D4D',
                  }}
                />
              }
            />
          </div>

          {/*--------------------OCENA KODU W PROJEKCIE WŁASNYM------------------------------*/}
          <p className="filterStudents_subTitle">Ocena kodu w projekcie własnym</p>
          <div className="filterStudents_lineContentStars">
            <div className="filterStudents_starNumbersBox">
              <span className="filterStudents_numberAtStar starNumber1">5</span>
              <span className="filterStudents_numberAtStar starNumber2">4</span>
              <span className="filterStudents_numberAtStar starNumber3">3</span>
              <span className="filterStudents_numberAtStar starNumber4">2</span>
              <span className="filterStudents_numberAtStar starNumber5">1</span>
            </div>
            <Rating
              name={nameCode}
              ref={refCode}
              onChange={(event, newValue) => {
                setValue(nameCode, customizeValue(newValue));
              }}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#E02735',
                },
              }}
              icon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                  }}
                />
              }
              emptyIcon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                    color: '#4D4D4D',
                  }}
                />
              }
            />
          </div>

          {/*-------------------------OCENA PRACY W ZESPOLE SCRUM------------------------------*/}
          <p className="filterStudents_subTitle">Ocena pracy w zespole w Scrum</p>
          <div className="filterStudents_lineContentStars">
            <div className="filterStudents_starNumbersBox">
              <span className="filterStudents_numberAtStar starNumber1">5</span>
              <span className="filterStudents_numberAtStar starNumber2">4</span>
              <span className="filterStudents_numberAtStar starNumber3">3</span>
              <span className="filterStudents_numberAtStar starNumber4">2</span>
              <span className="filterStudents_numberAtStar starNumber5">1</span>
            </div>

            <Rating
              name={nameTeamWork}
              ref={refTeamWork}
              onChange={(event, newValue) => {
                setValue(nameTeamWork, customizeValue(newValue));
              }}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#E02735',
                },
              }}
              icon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                  }}
                />
              }
              emptyIcon={
                <StarIcon
                  style={{
                    width: '45px',
                    height: '27px',
                    padding: '5px 5px 5px 15px',
                    marginRight: '5px',
                    color: '#4D4D4D',
                  }}
                />
              }
            />
          </div>

          {/*----------------------------PREFEROWANE MIEJSCE PRACY---------------------------------*/}
          <p className="filterStudents_subTitle">Preferowane miejsce pracy</p>
          <div className="filterStudents_lineContent">
            <ToggleButtonGroup
              sx={{
                '& .Mui-selected': {
                  color: '#f7f7f7 !important',
                  borderBottom: '2px solid #E02735',
                  backgroundColor: '#292A2B !important',
                },
              }}
              value={expectedTypesWork}
              onChange={handleChangeTypesWork}
              aria-label="typesWork">
              <ToggleButtonFilterStudents
                value={ExpectedTypeWork.OnPlace}
                aria-label="onPlace">
                Na miejscu
              </ToggleButtonFilterStudents>
              <ToggleButtonFilterStudents
                value={ExpectedTypeWork.ReadyToMove}
                aria-label="readyToMove">
                Przeprowadzka
              </ToggleButtonFilterStudents>
              <ToggleButtonFilterStudents
                value={ExpectedTypeWork.OnlyRemote}
                aria-label="onlyRemote">
                Zdalnie
              </ToggleButtonFilterStudents>
              <ToggleButtonFilterStudents
                value={ExpectedTypeWork.Hybrid}
                aria-label="hybrid">
                Hybrydowo
              </ToggleButtonFilterStudents>
              <ToggleButtonFilterStudents
                value={ExpectedTypeWork.DoesNotMatter}
                aria-label="doesNotMatter">
                Bez znaczenia
              </ToggleButtonFilterStudents>
            </ToggleButtonGroup>
          </div>

          {/*---------------------------------OCZEKIWANY TYP KONTRAKTU------------------------*/}
          <p className="filterStudents_subTitle">Oczekiwany typ kontraktu</p>
          <div className="filterStudents_lineContent">
            <ToggleButtonGroup
              sx={{
                '& .Mui-selected': {
                  color: '#f7f7f7 !important',
                  borderBottom: '2px solid #E02735',
                  backgroundColor: '#292A2B !important',
                },
              }}
              value={expectedContractTypes}
              onChange={handleChangeContractTypes}
              aria-label="contractTypes">
              <ToggleButtonFilterStudents
                value={ExpectedContractType.EmploymentContract}
                aria-label="contract">
                UoP
              </ToggleButtonFilterStudents>
              <ToggleButtonFilterStudents
                value={ExpectedContractType.B2B}
                aria-label="b2b">
                B2B
              </ToggleButtonFilterStudents>
              <ToggleButtonFilterStudents
                value={ExpectedContractType.ContractOfServices}
                aria-label="contractServices">
                Uz/UoD
              </ToggleButtonFilterStudents>
              <ToggleButtonFilterStudents
                value={ExpectedContractType.DoesNotMatter}
                aria-label="doesNotMatter">
                Brak preferencji
              </ToggleButtonFilterStudents>
            </ToggleButtonGroup>
          </div>

          {/*---------------------------OCZEKIWANE WYNAGRODZENIE MIESIĘCZNE-------------------*/}
          <p className="filterStudents_subTitle">Oczekiwane wynagrodzenie miesięczne netto</p>
          <div className="filterStudents_lineContent">
            <div className="filterStudents_inputsSalaryBox">
              <span className="filterStudents_inputPrefix">Od:</span>
              <FilteredStudentsInput
                size="small"
                type="number"
                {...register('minSalary')}
                InputProps={{ inputProps: { min: 0, max: 999999 } }}
                variant="filled"
                label="PLN"
                error={!!errors.minSalary}
                helperText={errors.minSalary ? errors.minSalary?.message : ''}
              />
              <span className="filterStudents_inputPrefix">Do:</span>
              <FilteredStudentsInput
                size="small"
                type="number"
                {...register('maxSalary')}
                InputProps={{ inputProps: { min: 0, max: 999999 } }}
                variant="filled"
                label="PLN"
                error={!!errors.maxSalary}
                helperText={errors.maxSalary ? errors.maxSalary?.message : ''}
              />
            </div>
          </div>

          {/*-----------------ZGODA NA ODBYCIE BEZPŁATNYCH PRAKTYK/STAŻU------------------------------*/}
          <p className="filterStudents_subTitle">Zgoda na odbycie bezpłatnych praktyk/stażu na początek</p>
          <div className="filterStudents_lineContent_practice">
            <FormControl
              fullWidth
              sx={{ margin: '0' }}>
              <RadioGroup
                sx={{
                  color: '#f7f7f7',
                  padding: '0 12px',
                }}>
                <FormControlLabel
                  {...register('canTakeApprenticeship')}
                  value="1"
                  sx={{
                    '& .MuiTypography-root': { fontSize: 14 },
                  }}
                  control={
                    <Radio
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 14,
                          color: '#E02735',
                        },
                      }}
                    />
                  }
                  label="Tak"
                />
                <FormControlLabel
                  {...register('canTakeApprenticeship')}
                  value="0"
                  sx={{
                    '& .MuiTypography-root': { fontSize: 14 },
                  }}
                  control={
                    <Radio
                      sx={{
                        color: '#f7f7f7',
                        '& .MuiSvgIcon-root': {
                          fontSize: 14,
                          color: '#E02735',
                        },
                      }}
                    />
                  }
                  label="Nie"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/*-----------------ILOŚĆ MIESIĘCY DOŚWIADCZENIA KOMERCYJNEGO------------------------------*/}
          <p className="filterStudents_subTitle">Ilość miesięcy doświadczenia komercyjnego kandydata w programowaniu</p>
          <div className="filterStudents_lineContent">
            <FilteredStudentsInput
              size="small"
              type="number"
              {...register('monthsOfCommercialExp')}
              InputProps={{ inputProps: { min: 0, max: 999 } }}
              variant="filled"
              label="ILOŚĆ"
              error={!!errors.monthsOfCommercialExp}
              helperText={errors.monthsOfCommercialExp ? errors.monthsOfCommercialExp?.message : ''}
            />
          </div>
          <div className="filterStudents_endButtons">
            <MainButton
              type="button"
              onClick={props.handleClose}
              sx={{
                backgroundColor: '#0a0a0a',
                marginRight: '20px',
                '&:hover': {
                  backgroundColor: '#0a0a0a',
                },
              }}>
              Anuluj
            </MainButton>
            <MainButton
              onClick={props.handleClose}
              type="submit">
              Pokaż wyniki
            </MainButton>
          </div>
        </Container>
      </form>
    </>
  );
};
