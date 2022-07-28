import React, { FormEvent, useState } from 'react';
import {StructureFileModal} from "../../common/StructureFileModal/StructureFileModal";
import './StudentImport.css';

export const StudentImport = () => {
  const [photo, setPhoto] = useState();
  const [error, setError] = useState(null);
  const [respon, setRespon] = useState(null);

  function changeHandler(event: FormEvent) {
    setPhoto((event.target as any).files[0]);
  }

  async function handleSubmission() {
    if (photo) {
      const formData = new FormData();
      formData.append('photo', photo);

      try {
        const response = await fetch('http://localhost:8080/admin/upload/students', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setRespon(data);
        setError(data.message);
      } catch (err: any) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div>{error ? error : respon}</div>

      <header className="student-import_header">
        <h3>Zaimportuj listę studentów:</h3>
        <StructureFileModal/>
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
          className="student-import_button">
          Wyślij
        </button>
      </main>
    </>
  );
};
