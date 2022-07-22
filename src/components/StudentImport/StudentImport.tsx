import React, {FormEvent, useState} from "react";

import "./StudentImport.css"

export const StudentImport = () => {
    const [photo, setPhoto] = useState();

    function changeHandler(event: FormEvent) {
        setPhoto((event.target as any).files[0]);
    }

    function handleSubmission() {
        if (photo) {
            const formData = new FormData();

            formData.append('photo', photo);

            fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData,
            });
        }
    }

    return (
        <>
            <header className="student-import_header">
                <h3>Zaimportuj listę studentów:</h3>
            </header>

            <main className="student-import_main">

                <input
                    className="student-import_input"
                    type="file"
                    name="foo"
                    onChange={changeHandler}
                />
                <button
                    onClick={handleSubmission}
                    className="student-import_button"
                >Wyślij
                </button>
            </main>
        </>
    )
}