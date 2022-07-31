import * as yup from 'yup';

//błędy walidacji na froncie tworzymy dla kazdego formularza osobny obiekt tylko z polami które występują w formularzu

export const userSchemaForgotPassword = yup.object().shape({
    userEmail: yup
        .string()
        .email('Nieprawidłowy email')
        .min(5, 'Email musi posiadać przynajmniej 5 znaków')
        .max(255, 'Email nie może być dłuższy niż 255 znaków')
        .required('Podaj email'),
    confirmEmail: yup.string().oneOf([yup.ref('userEmail'), null]),
}).required();

export const schemaAddHr = yup.object().shape({
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

}).required('Musisz podać liczbę studentów');


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
