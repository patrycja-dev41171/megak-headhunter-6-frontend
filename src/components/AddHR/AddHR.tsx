import React, {SyntheticEvent, useState} from 'react';
import './AddHR.css';
import {styled} from "@mui/system";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {userSchemaForgotPassword} from "../../Validations/UserValidation";

interface FormValues {
  fullName: string;
  email: string;
  company: string;
  maxReservedStudents: number;
}

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
})({
  input: {
    width: '300px',
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #292a2b inset',
      WebkitTextFillColor: '#7E7E7E',
      borderRadius: '0',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#7E7E7E',
  },
  '& .MuiInputBase-input': {
    color: '#7E7E7E',
    backgroundColor: '#292a2b',
  },
});

// export const AddHR = () => {
//   const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
//     resolver: yupResolver(userSchemaForgotPassword),
//     mode: "onBlur",
//   })
//   return null
// }

export const AddHR = () => {
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormValues>({
    fullName: '',
    email: '',
    company: '',
    maxReservedStudents: 0,
  });

  const updateForm = (key: string, value: any) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  };

  const saveHR = async (e:SyntheticEvent) => {
    try {
      e.preventDefault();
      const res = await fetch('http://localhost:8080/admin/add-hr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          company: form.company,
          maxReservedStudents: form.maxReservedStudents,
        }),
      });
      if (!(await res.json())) {
        throw new Error('Error adding hr by admin.');
      }
    } catch (err) {
      setError('Nieprawidłowe dane. Błąd dodania HR do bazy danych.');
    }
    setForm({
      fullName: '',
      email: '',
      company: '',
      maxReservedStudents: 0,
    })
  };

  return (
    <div className="add-hr_container">
      <h3>Dodaj HR:</h3>
      <form
        className="add-hr_form"
        onSubmit={saveHR}>
        <p>
          <label>
            Imię i nazwisko: <br />
            <input
              type="text"
              name="fullName"
              required
              maxLength={100}
              value={form.fullName}
              onChange={e => updateForm('fullName', e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Email: <br />
            <input
              type="text"
              name="email"
              required
              maxLength={100}
              value={form.email}
              onChange={e => updateForm('email', e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Firma: <br />
            <input
              type="text"
              name="company"
              required
              maxLength={100}
              value={form.company}
              onChange={e => updateForm('company', e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Maksymalna ilość studentów: <br />
            <input
              type="number"
              name="maxReservedStudents"
              value={form.maxReservedStudents}
              onChange={e => updateForm('maxReservedStudents', Number(e.target.value))}
            />
          </label>
        </p>
        <p className="p_error">{error}</p>
        <button>Zapisz</button>
      </form>
    </div>
  );
};
