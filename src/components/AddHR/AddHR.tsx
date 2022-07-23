import React, {useState} from "react";

import "./AddHR.css"

interface FormValues {
    fullname: string,
    email: string,
    company: string,
    maxReservedStudents: number,
}

export const AddHR = () => {

    const [form, setForm] = useState<FormValues>({
        fullname: '',
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

    const saveHR = () => {
        // @TODO zrobić fetcha do BE
        console.log("Wyślij formularz")
    }

    return (
        <div className="add-hr">
            <h3>Dodaj HR:</h3>

            <form className="add-hr_form" onSubmit={saveHR}>
                <p>
                    <label>
                        Imię i nazwisko: <br/>
                        <input
                            type="text"
                            name="fullname"
                            required
                            maxLength={100}
                            value={form.fullname}
                            onChange={e => updateForm('fullname', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Email: <br/>
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
                        Firma: <br/>
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
                        Maksymalna ilość studentów: <br/>
                        <input
                            type="number"
                            name="maxReservedStudents"
                            value={form.maxReservedStudents}
                            onChange={e => updateForm('maxReservedStudents', Number(e.target.value))}/>
                    </label>
                </p>

                <button>Zapisz</button>
            </form>

        </div>
    )
}