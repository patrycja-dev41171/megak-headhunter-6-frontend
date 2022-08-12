import * as yup from "yup";

export const StudentFilteredValidation = yup
    .object()
    .shape({
        salaryFrom: yup
            .string()
            .min(1, 'Podaj liczbę całkowita lub zostaw 0')
            .test('correct-data', "Podaj liczbę całkowitą",
                (val) => val !== null && val !== undefined && !(val.includes('.')) && !(val.includes(','))
            )
            .max(6, "Za długa wartość"),
        salaryTo: yup
            .string()
            .min(1, 'Podaj liczbę całkowita lub zostaw 0')
            .test('correct-data', "Podaj liczbę całkowitą",
                (val) => val !== null && val !== undefined && !(val.includes('.')) && !(val.includes(','))
            )
            .max(6, "Za długa wartość"),
        monthsOfCommercialExp: yup
            .string()
            .min(1, 'Podaj liczbę całkowita lub zostaw 0')
            .test('correct-data', "Podaj liczbę całkowitą",
                (val) => val !== null && val !== undefined && !(val.includes('.')) && !(val.includes(','))
            )
            .max(3, "Za długa wartość"),
    })