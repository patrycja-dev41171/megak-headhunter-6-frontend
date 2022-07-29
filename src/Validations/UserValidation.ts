import * as yup from 'yup';

//błędy walidacji na froncie

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .min(5, 'Email musi posiadać przynajmniej 5 znaków')
    .email('Nieprawidłowy email')
    .max(255, 'Email nie może być dłuższy niż 255 znaków')
    .required('Podaj email'),

  confirmEmail: yup.string().oneOf([yup.ref('email'), null]),

  password: yup
    .string()
    .max(255, 'Hasło nie może być dłuższy niż 255 znaków')
    .required('Podaj hasło')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Hasło nie spełnia wszystkich wymagań.'),

  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});
