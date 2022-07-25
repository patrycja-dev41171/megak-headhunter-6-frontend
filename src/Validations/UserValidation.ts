import * as yup from 'yup';

//błędy walidacji na froncie

export const userSchema = yup.object().shape({
    email: yup
        .string()
        .min(5, "Email musi posiadać przynajmniej 5 znaków")
        .email('Nieprawidłowy email')
        .max(255, "Email nie może być dłuższy niż 255 znaków")
        .required("Podaj email"),

    confirmEmail: yup
            .string()
            .oneOf([yup.ref("email"), null]),
})