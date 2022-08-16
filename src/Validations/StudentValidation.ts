import * as yup from 'yup';

export const StudentValidation = yup.object().shape({
  email: yup.string().email('Nieprawidłowy email').max(255, 'Email nie może być dłuższy niż 255 znaków').required('Podaj email'),
  tel: yup
    .string()
    .matches(/^(?:\d{9}|)$/, 'Podaj dokładnie 9 cyfr')
    .nullable(),
  firstName: yup.string().max(50, 'Imię nie może być dłuższe niż 50 znaków').required('Podaj imię'),
  lastName: yup.string().max(100, 'Nazwisko nie może być dłuższe niż 100 znaków').required('Podaj nazwisko'),
  githubUserName: yup.string().nullable().max(255, 'Za długa nazwa'),
  bio: yup
    .string()
    .max(500, 'Za długi tekst')
    .test(
      'exclude lorem ipsum',
      'Tylko nie Lorem Ipsum....:) Napisz o sobie !!!',
      val => val !== null && val !== undefined && !val.includes('Lorem')
    ),
  targetWorkCity: yup.string().nullable().max(50, 'Za długi tekst'),
  expectedSalary: yup
    .string()
    .min(1, 'Podaj prawidłową wartość lub zostaw 0')
    .test('correct-data', 'Podaj liczbę całkowitą', val => val !== null && val !== undefined && !val.includes('.') && !val.includes(','))
    .max(6, 'Za długa wartość'),
  monthsOfCommercialExp: yup
    .string()
    .min(1, 'Podaj prawidłową wartość lub zostaw 0')
    .test('correct-data', 'Podaj liczbę całkowitą', val => val !== null && val !== undefined && !val.includes('.') && !val.includes(','))
    .max(3, 'Za długa wartość'),
  education: yup
    .string()
    .max(10000, 'Za dugi tekst')
    .test(
      'exclude lorem ipsum',
      'Tylko nie Lorem Ipsum....:) Napisz o sobie !!!',
      val => val !== null && val !== undefined && !val.includes('Lorem')
    ),
  workExperience: yup
    .string()
    .max(10000, 'Za dugi tekst')
    .test(
      'exclude lorem ipsum',
      'Tylko nie Lorem Ipsum....:) Napisz o sobie !!!',
      val => val !== null && val !== undefined && !val.includes('Lorem')
    ),
  courses: yup
    .string()
    .max(10000, 'Za dugi tekst')
    .test(
      'exclude lorem ipsum',
      'Tylko nie Lorem Ipsum....:) Napisz o sobie !!!',
      val => val !== null && val !== undefined && !val.includes('Lorem')
    ),
  projectInput: yup
    .string()
    .transform(value => (!value ? null : value))
    .nullable()
    .matches(/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/, 'Niepoprawny adres URL'),
  portfolioInput: yup
    .string()
    .transform(value => (!value ? null : value))
    .nullable()
    .matches(/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/, 'Niepoprawny adres URL'),
});
