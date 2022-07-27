import React, { FormEvent, useState } from 'react';

import './StudentImport.css';

export const StudentImport = () => {
  const [photo, setPhoto] = useState();
  const [error, setError] = useState(null);

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
        const helix = data.message;
        setError(helix);
      } catch (err: any) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div>{error}</div>

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
          className="student-import_button">
          Wyślij
        </button>
      </main>
    </>
  );
};
