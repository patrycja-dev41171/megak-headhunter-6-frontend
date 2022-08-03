import React from 'react';

import './StudentExpectations.css';

interface StudentExpectationsProps {
  expectedTypeWork?: string;
  targetWorkCity?: string;
  expectedContractType?: string;
  expectedSalary?: number;
  canTakeApprenticeship?: number;
  monthsOfCommercialExp?: number;
}

export const StudentExpectations = (props: StudentExpectationsProps) => {
  const { expectedTypeWork, targetWorkCity, expectedContractType, expectedSalary, canTakeApprenticeship, monthsOfCommercialExp } = props;

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
        <p className="student-expectations__item-title">Preferowane miejsce pracy</p>
        {expectedTypeWork ? (
          <p className="student-expectations__item-description">{expectedTypeWork}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Docelowe miasto, gdzie chce pracować kandydat</p>
        {targetWorkCity ? (
          <p className="student-expectations__item-description">{targetWorkCity}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Oczekiwany typ kontraktu</p>
        {expectedContractType ? (
          <p className="student-expectations__item-description">{expectedContractType}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Oczekiwane wynagrodzenie miesięczne netto</p>
        {expectedSalary ? (
          <p className="student-expectations__item-description">{expectedSalary} zł</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Zgoda na odbycie bezpłatnych praktyk/stażu na początek</p>
        {canTakeApprenticeship ? (
          <p className="student-expectations__item-description">{canTakeApprenticeship ? 'TAK' : 'NIE'}</p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
      <div className="student-expectations__item">
        <p className="student-expectations__item-title">Komercyjne doświadczenie w programowaniu</p>
        {monthsOfCommercialExp ? (
          <p className="student-expectations__item-description">
            {monthsOfCommercialExp} {switchMonths(monthsOfCommercialExp)}
          </p>
        ) : (
          <p className="student-expectations__item-description">Nie podano</p>
        )}
      </div>
    </div>
  );
};
