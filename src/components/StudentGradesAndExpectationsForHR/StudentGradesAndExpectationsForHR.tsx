import React from 'react';
import {StudentEntityFront, StudentGetAll } from 'types';
import './StudentGradesAndExpectationsForHR.css';

interface StudentGradesAndExpectationsForHRProps {
  student: StudentGetAll | StudentEntityFront;
}

export const StudentGradesAndExpectationsForHR = (props: StudentGradesAndExpectationsForHRProps) => {
  const { student } = props;

  const switchMonths = (months: number) => {
    switch (months) {
      case 1:
        return 'miesiąc';
      case 2:
        return 'miesiące';
      case 3:
        return 'miesiące';
      case 4:
        return 'miesiące';
      default:
        return 'miesięcy';
    }
  };

  return (
    <div className="student-expectations__wrapper">
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Ocena przejścia kursu</p>
        {student.courseCompletion ? (
          <p className="student-expectations__item-description">
            {student.courseCompletion}
            <span className="student-expectations__item-description__span">/5</span>
          </p>
        ) : (
          <p className="student-expectations__item-description">Brak</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Ocena aktywności i zaangażowania na kursie</p>
        {student.courseEngagement ? (
          <p className="student-expectations__item-description">
            {student.courseEngagement}
            <span className="student-expectations__item-description__span">/5</span>
          </p>
        ) : (
          <p className="student-expectations__item-description">Brak</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Ocena kodu w projekcie własnym</p>
        {student.projectDegree ? (
          <p className="student-expectations__item-description">
            {student.projectDegree}
            <span className="student-expectations__item-description__span">/5</span>
          </p>
        ) : (
          <p className="student-expectations__item-description">Brak</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Ocena pracy w zespole w Scrum</p>
        {student.teamProjectDegree ? (
          <p className="student-expectations__item-description">
            {student.teamProjectDegree}
            <span className="student-expectations__item-description__span">/5</span>
          </p>
        ) : (
          <p className="student-expectations__item-description">Brak</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Preferowane miejsce pracy</p>
        {student.expectedTypeWork ? (
          <p className="student-expectations__item-description">{student.expectedTypeWork}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Docelowe miasto, gdzie chce pracować kandydat</p>
        {student.targetWorkCity ? (
          <p className="student-expectations__item-description">{student.targetWorkCity}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Oczekiwany typ kontraktu</p>
        {student.expectedContractType ? (
          <p className="student-expectations__item-description">{student.expectedContractType}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Oczekiwane wynagrodzenie miesięczne netto</p>
        {student.expectedSalary ? (
          <p className="student-expectations__item-description">{student.expectedSalary} zł</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Zgoda na odbycie bezpłatnych praktyk/stażu na początek</p>
        {student.canTakeApprenticeship ? (
          <p className="student-expectations__item-description">{student.canTakeApprenticeship ? 'TAK' : 'NIE'}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Komercyjne doświadczenie w programowaniu</p>
        {student.monthsOfCommercialExp ? (
          <p className="student-expectations__item-description">
            {student.monthsOfCommercialExp} {switchMonths(student.monthsOfCommercialExp)}
          </p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
    </div>
  );
};
