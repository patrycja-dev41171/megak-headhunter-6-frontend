import React, {MouseEvent} from "react";
import {ToggleButtonGroup} from "@mui/material";
import {FilterStudentsToggleBtn} from "../../Buttons/FilterStudentsToggleBtn/FilterStudentsToggleBtn";
import {ExpectedContractType, ExpectedTypeWork} from "types";

interface TypesWorkProps {
    expectedTypesWork: string[] | null;
    handleChangeTypesWork: (event: MouseEvent<HTMLElement>, newChoices: string[]) => void;
}

interface ContractTypesProps {
    expectedContractTypes: string[] | null;
    handleChangeContractTypes: (event: MouseEvent<HTMLElement>, newChoices: string[]) => void;
}

const buttonGroupStyles = {
    '& .Mui-selected': {
        color: '#f7f7f7 !important',
        borderBottom: '2px solid #E02735',
        backgroundColor: '#292A2B !important',
    },
}

export const FilteringTypesWork = (props: TypesWorkProps) => {
    const {expectedTypesWork, handleChangeTypesWork} = props;

    return (
        <div className="filterStudents_lineContent">
            <ToggleButtonGroup
                sx={buttonGroupStyles}
                value={expectedTypesWork}
                onChange={handleChangeTypesWork}
                aria-label="typesWork"
            >
                <FilterStudentsToggleBtn
                    value={ExpectedTypeWork.OnPlace}
                    aria-label="onPlace">
                    Na miejscu
                </FilterStudentsToggleBtn>
                <FilterStudentsToggleBtn
                    value={ExpectedTypeWork.ReadyToMove}
                    aria-label="readyToMove">
                    Przeprowadzka
                </FilterStudentsToggleBtn>
                <FilterStudentsToggleBtn
                    value={ExpectedTypeWork.OnlyRemote}
                    aria-label="onlyRemote">
                    Zdalnie
                </FilterStudentsToggleBtn>
                <FilterStudentsToggleBtn
                    value={ExpectedTypeWork.Hybrid}
                    aria-label="hybrid">
                    Hybrydowo
                </FilterStudentsToggleBtn>
                <FilterStudentsToggleBtn
                    value={ExpectedTypeWork.DoesNotMatter}
                    aria-label="doesNotMatter">
                    Bez znaczenia
                </FilterStudentsToggleBtn>
            </ToggleButtonGroup>
        </div>
    )
}

export const FilteringContractTypes = (props: ContractTypesProps) => {
    const {expectedContractTypes, handleChangeContractTypes} = props;

    return (
        <div className="filterStudents_lineContent">
            <ToggleButtonGroup
                sx={buttonGroupStyles}
                value={expectedContractTypes}
                onChange={handleChangeContractTypes}
                aria-label="contractTypes"
            >
                <FilterStudentsToggleBtn
                    value={ExpectedContractType.EmploymentContract}
                    aria-label="contract">
                    UoP
                </FilterStudentsToggleBtn>
                <FilterStudentsToggleBtn
                    value={ExpectedContractType.B2B}
                    aria-label="b2b">
                    B2B
                </FilterStudentsToggleBtn>
                <FilterStudentsToggleBtn
                    value={ExpectedContractType.ContractOfServices}
                    aria-label="contractServices">
                    Uz/UoD
                </FilterStudentsToggleBtn>
                <FilterStudentsToggleBtn
                    value={ExpectedContractType.DoesNotMatter}
                    aria-label="doesNotMatter">
                    Brak preferencji
                </FilterStudentsToggleBtn>
            </ToggleButtonGroup>
        </div>
    )
}