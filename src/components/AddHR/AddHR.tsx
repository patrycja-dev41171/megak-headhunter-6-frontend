import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux-toolkit/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import SimpleDialog from '@mui/material/Dialog';
import { DisplayAlertModals } from '../../common/FeedbackModals/DisplayAlertModals/DisplayAlertModals';
import { MainStyledTextField } from '../StyledComponents/MainStyledTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaAddHr } from '../../Validations/UserValidation';
import { MainBtn } from '../../common/Buttons/MainBtn/MainBtn';
import { apiUrl } from '../../config/api';

import '../../styles/stylesForForms.css';

interface FormValues {
  fullName: string;
  hrEmail: string;
  company: string;
  maxReservedStudents: number;
}

export const AddHR = () => {
  const { accessToken } = useSelector((store: StoreState) => store.user);

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaAddHr),
    mode: 'onChange',
  });

  const submitForm: SubmitHandler<FormValues> = async ({ hrEmail: email, fullName, company, maxReservedStudents }) => {
    try {
      const res = await fetch(`${apiUrl}/admin/add-hr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          fullName,
          company,
          maxReservedStudents,
        }),
      });

      const result = await res.json();
      setOpenModal(true);
      setFeedbackSuccess(result);
      setFeedbackError(result.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="addHrFormView_header">Add HR:</h2>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="addHrFormView_form">
        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            type="text"
            {...register('fullName')}
            variant="filled"
            error={!!errors.fullName}
            label="Imię i nazwisko"
            helperText={errors.fullName ? errors.fullName?.message : ''}
          />
        </div>

        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            type="email"
            {...register('hrEmail')}
            variant="filled"
            error={!!errors.hrEmail}
            label="Email"
            helperText={errors.hrEmail ? errors.hrEmail?.message : ''}
          />
        </div>

        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            type="text"
            {...register('company')}
            variant="filled"
            error={!!errors.company}
            label="Nazwa firmy"
            helperText={errors.company ? errors.company?.message : ''}
          />
        </div>

        <div className="formView_input">
          <MainStyledTextField
            fullWidth
            type="number"
            defaultValue={10}
            {...register('maxReservedStudents')}
            InputProps={{ inputProps: { min: 1, max: 999 } }}
            variant="filled"
            error={!!errors.maxReservedStudents}
            label="Liczba studentów"
            helperText={errors.maxReservedStudents ? errors.maxReservedStudents?.message : ''}
          />
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

        <MainBtn type="submit">Dodaj HR</MainBtn>
      </form>
    </>
  );
};
