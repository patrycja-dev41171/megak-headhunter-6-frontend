import * as yup from 'yup';

export const StudentFilteredValidation = yup.object().shape({
  minSalary: yup
    .string()
    .nullable()
    .test('correct-data', 'Podaj liczbę całkowitą', val => val !== null && val !== undefined && !val.includes('.') && !val.includes(','))
    .max(6, 'Za długa wartość'),
  maxSalary: yup
    .string()
    .nullable()
    .test('correct-data', 'Podaj liczbę całkowitą', val => val !== null && val !== undefined && !val.includes('.') && !val.includes(','))
    .max(6, 'Za długa wartość'),
  monthsOfCommercialExp: yup
    .string()
    .nullable()
    .test('correct-data', 'Podaj liczbę całkowitą', val => val !== null && val !== undefined && !val.includes('.') && !val.includes(','))
    .max(3, 'Za długa wartość'),
});
