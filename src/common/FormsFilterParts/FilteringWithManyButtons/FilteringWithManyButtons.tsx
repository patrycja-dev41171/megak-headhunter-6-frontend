import React, {Dispatch, SetStateAction} from "react";
import {ToggleButtonGroup} from "@mui/material";
import {FilterStudentsToggleBtn} from "../../Buttons/FilterStudentsToggleBtn/FilterStudentsToggleBtn";
import {ExpectedContractType, ExpectedTypeWork} from "types";
import {UseFormSetValue} from "react-hook-form/dist/types/form";

interface Props {
    name: string;
    expectedData: string[] | null;
    setData: Dispatch<SetStateAction<string[] | null>>;
    setValueHookForm: UseFormSetValue<any>,
}

const buttonGroupStyles = {
    '& .Mui-selected': {
        color: '#f7f7f7 !important',
        borderBottom: '2px solid #E02735',
        backgroundColor: '#292A2B !important',
    },
}

export const FilteringTypesWork = (props: Props) => {
    const {name, expectedData, setData, setValueHookForm} = props;

    const handleChangeData = (event: React.MouseEvent<HTMLElement>, newChoices: string[]) => {
        setData(newChoices);
        setValueHookForm(name, newChoices);
    };

    return (
        <div className="filterStudents_lineContent">
            <ToggleButtonGroup
                sx={buttonGroupStyles}
                value={expectedData}
                onChange={handleChangeData}
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

export const FilteringContractTypes = (props: Props) => {
    const {name, expectedData, setData, setValueHookForm} = props;

    const handleChangeData = (event: React.MouseEvent<HTMLElement>, newChoices: string[]) => {
        setData(newChoices);
        setValueHookForm(name, newChoices);
    };

    return (
        <div className="filterStudents_lineContent">
            <ToggleButtonGroup
                sx={buttonGroupStyles}
                value={expectedData}
                onChange={handleChangeData}
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