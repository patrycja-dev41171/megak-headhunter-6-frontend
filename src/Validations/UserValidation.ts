import * as yup from 'yup';

//błędy walidacji na froncie tworzymy dla kazdego formularza osobny obiekt tylko z polami które występują w formularzu

export const schemaForgotPassword = yup
  .object()
  .shape({
    userEmail: yup
      .string()
      .email('Nieprawidłowy email')
      .min(5, 'Email musi posiadać przynajmniej 5 znaków')
      .max(255, 'Email nie może być dłuższy niż 255 znaków')
      .required('Podaj email'),
    confirmEmail: yup.string().oneOf([yup.ref('userEmail'), null]),
  })
  .required();

//home-admin
export const schemaAddHr = yup
  .object()
  .shape({
    hrEmail: yup
      .string()
      .email('Nieprawidłowy email')
      .min(5, 'Email musi posiadać przynajmniej 5 znaków')
      .max(255, 'Email nie może być dłuższy niż 255 znaków')
      .required('Podaj email'),

    fullName: yup
      .string()
      .min(2, 'Musisz podać przynajmniej 2 znaki')
      .max(50, 'Imię i nazwisko nie może być dłuższe niż 50 znaków')
      .required('Podaj imię i nazwisko'),

    company: yup
      .string()
      .min(1, 'Musisz podać przynajmniej jeden znak')
      .max(120, 'Nazwa firmy nie może być dłuższa niż 120 znaków')
      .required('Podaj nazwę firmy'),

    maxReservedStudents: yup
      .number()
      .typeError('Musisz podać liczbę')
      .min(1, 'Liczba studentów musi wynosić minimum 1')
      .max(999, 'Liczba studentów nie może przekraczać 999')
      .required('Podaj liczbę zarezerwowanych studentów'),
  })
  .required('Musisz podać liczbę studentów');

//login
export const schemaLogin = yup
  .object()
  .shape({
    loginEmail: yup
      .string()
      .min(1, 'Pole nie może być puste')
      .max(255, 'Email nie może być dłuższy niż 255 znaków')
      .required('Podaj email'),
    loginPassword: yup.string().min(1, 'Pole nie może być puste'),
  })
  .required();

export const schemaCreatePassword = yup.object().shape({
  registerPassword: yup
    .string()
    .min(1, 'Pole nie może być puste')
    .max(255, 'Hasło nie może być dłuższe niż 255 znaków')
    .required('Podaj hasło')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/, 'Hasło nie spełnia wszystkich wymagań.'),
  confirmPassword: yup.string().oneOf([yup.ref('registerPassword'), null]),
});

export const schemaChangedPassword = yup.object().shape({
  changedPassword: yup
    .string()
    .min(1, 'Pole nie może być puste')
    .max(255, 'Hasło nie może być dłuższe niż 255 znaków')
    .required('Podaj hasło')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/, 'Hasło nie spełnia wszystkich wymagań.'),

  confirmChangedPassword: yup.string().oneOf([yup.ref('changedPassword'), null]),
});
