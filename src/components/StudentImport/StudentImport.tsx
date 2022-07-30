import React, { FormEvent, useState } from 'react';
import {StructureFileModal} from "../../common/StructureFileModal/StructureFileModal";
import './StudentImport.css';
import {SelectFileButton} from "../../common/SelectFileBtn/SelectFileBtn";
import {AnimatedSecondaryButton} from "../../common/AnimatedSecondaryButton/AnimatedSecondaryButton";
import {TransitionAlertError, TransitionAlertSuccess} from "../../common/TransitionAlert/TransitionAlerts";

export const StudentImport = () => {
  const [photo, setPhoto] = useState();
  const [fileName, setFileName] = useState<string>('')
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isModalStatusOpen, setIsModalStatusOpen] = useState<boolean>(false)
  const [isModalExpanded, setIsModalExpanded] = useState<boolean>(false);

  const displayFileName = (name: string) => {
    return <span className="student-import_fileNameBox">
      {!name ? 'Nie wybrano pliku' : <strong>{name}</strong>}
    </span>
  }

  const displayModals = (err: string, success: string ) => {
    if(err) {
      return <TransitionAlertError
          text={err}
          isModalExpanded={isModalExpanded}
          setIsModalExpanded={setIsModalExpanded}
      />
    }
    if (success) {
      return <TransitionAlertSuccess
          text={success}
          isModalExpanded={isModalExpanded}
          setIsModalExpanded={setIsModalExpanded}
      />
    }
    return null
  }

  const changeHandler = (event: FormEvent) => {
    setFileName((event.target as any).files[0].name)
    setPhoto((event.target as any).files[0]);
  }

  const handleSubmission =  async () => {

    setError('');
    setResponse('');
    setIsModalStatusOpen(false);

    if (photo) {
      const formData = new FormData();
      formData.append('photo', photo);

      try {
        const response = await fetch('http://localhost:8080/admin/upload/students', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        //data: string = info z backendu o sukcesie
        setResponse(data);

        //data.message: string = info z backendu o błędzie
        setError(data.message);

        setIsModalStatusOpen(true);
        setIsModalExpanded(true);

      } catch (err: any) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <header className="student-import_header">
        <h3 className="student-import_headerTitle">Zaimportuj listę studentów:</h3>
        <StructureFileModal/>
      </header>

      <main className="student-import_main">
        <SelectFileButton handleChange={changeHandler}/>
        <p>{displayFileName(fileName)}</p>
        <AnimatedSecondaryButton onClick={handleSubmission}>Wyślij plik</AnimatedSecondaryButton>
      </main>

      <div>
        {isModalStatusOpen && displayModals(error, response)}
      </div>
    </>
  );
};
