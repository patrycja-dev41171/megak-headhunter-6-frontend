import React, { FormEvent, useState } from 'react';

export const HomeAdmin = () => {
  const [file, setFile] = useState();

  function changeHandler(event: FormEvent) {
    setFile((event.target as any).files[0]);
  }

  async function handleSubmission() {
    if (file) {
      const formData = new FormData();

      formData.append('photo', file);

      await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });
    }
  }

  return (
    <div>
      <input
        type="file"
        name="foo"
        onChange={changeHandler}
      />
      <button onClick={handleSubmission}>Wyślij</button>
    </div>
  );
};
