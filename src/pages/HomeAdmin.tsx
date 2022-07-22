import React, { FormEvent, useState } from 'react';

export const HomeAdmin = () => {
  const [photo, setPhoto] = useState();

  function changeHandler(event: FormEvent) {
    setPhoto((event.target as any).files[0]);
  }

  async function handleSubmission() {
    if (photo) {
      const formData = new FormData();

      formData.append('photo', photo);

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
