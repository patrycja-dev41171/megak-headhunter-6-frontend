import React from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {UseFormRegister} from "react-hook-form";
import {ExpectedContractType, ExpectedTypeWork} from "types";

interface Props {
    reg: UseFormRegister<any>;
    name: string;
    canTakeApp?: number | null;
    expectedTypeWork?: ExpectedTypeWork | null;
    expectedContractType?: ExpectedContractType | null;
}

const radioStudentForm = () => <Radio
    sx={{
        color: '#7E7E7E',
        '& .MuiSvgIcon-root': {fontSize: 14},
    }}
/>

const radioGroupStudentFormStyles = {
    color: '#7E7E7E',
    backgroundColor: '#292a2b',
    padding: '0 12px',
}

const formLabelStudentFormStyles = {
    backgroundColor: '#292a2b',
    color: '#7E7E7E',
    padding: '5px 12px',
    textAlign: 'left',
}

const radioFilterStudents = () => <Radio
    sx={{
        color: '#f7f7f7',
        '& .MuiSvgIcon-root': {
            fontSize: 14,
        },
        '&.Mui-checked': {
            color: '#E02735',
        },
    }}
/>

export const ApprenticeshipFilterStudents = (props: Props) => {
    const {reg, name} = props;

    return (
        <div className="filterStudents_lineContent_practice">
            <FormControl
                fullWidth
                sx={{margin: '0'}}>
                <RadioGroup
                    sx={{
                        color: '#f7f7f7',
                        padding: '0 12px',
                    }}>
                    <FormControlLabel
                        {...reg(name)}
                        value="1"
                        sx={{
                            '& .MuiTypography-root': {fontSize: 14},
                        }}
                        control={radioFilterStudents()}
                        label="Tak"
                    />
                    <FormControlLabel
                        {...reg(name)}
                        value="0"
                        sx={{
                            '& .MuiTypography-root': {fontSize: 14},
                        }}
                        control={radioFilterStudents()}
                        label="Nie"
                    />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export const ApprenticeshipStudentForm = (props: Props) => {
    const {reg, name, canTakeApp} = props;

    return (
        <FormControl
            fullWidth
        >
            <FormLabel
                sx={formLabelStudentFormStyles}>
                Zgoda na odbycie praktyk
            </FormLabel>
            <RadioGroup
                defaultValue={canTakeApp !== null ? canTakeApp : '1'}
                sx={radioGroupStudentFormStyles}>
                <FormControlLabel
                    {...reg(name)}
                    value="1"
                    control={radioStudentForm()}
                    label="Tak"
                />
                <FormControlLabel
                    {...reg(name)}
                    value="0"
                    control={radioStudentForm()}
                    label="Nie"
                />
            </RadioGroup>
        </FormControl>
    )
}

export const ExpectedTypeWorkStudentForm = (props: Props) => {
    const {reg, name, expectedTypeWork} = props;

    return (
        <FormControl
            fullWidth
        >
            <FormLabel
                sx={formLabelStudentFormStyles}>
                Wybór preferowanego miejsca pracy
            </FormLabel>
            <RadioGroup
                sx={radioGroupStudentFormStyles}
                defaultValue={expectedTypeWork !== null ? expectedTypeWork : ExpectedTypeWork.DoesNotMatter}>
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedTypeWork.OnPlace}
                    control={radioStudentForm()}
                    label="Na miejscu"
                />
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedTypeWork.ReadyToMove}
                    control={radioStudentForm()}
                    label="Gotowość do przeprowadzki"
                />
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedTypeWork.OnlyRemote}
                    control={radioStudentForm()}
                    label="Wyłącznie zdalnie"
                />
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedTypeWork.Hybrid}
                    control={radioStudentForm()}
                    label="Hybrydowo"
                />
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedTypeWork.DoesNotMatter}
                    control={radioStudentForm()}
                    label="Bez znaczenia"
                />
            </RadioGroup>
        </FormControl>
    )
}

export const ExpectedContractTypeStudentForm = (props: Props) => {
    const {expectedContractType, name, reg} = props;

    return (
        <FormControl fullWidth>
            <FormLabel
                sx={formLabelStudentFormStyles}>
                Oczekiwany typ kontraktu
            </FormLabel>
            <RadioGroup
                sx={radioGroupStudentFormStyles}
                defaultValue={expectedContractType !== null ? expectedContractType : ExpectedContractType.DoesNotMatter}>
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedContractType.EmploymentContract}
                    control={radioStudentForm()}
                    label="Tylko UoP"
                />
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedContractType.B2B}
                    control={radioStudentForm()}
                    label="Możliwe B2B"
                />
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedContractType.ContractOfServices}
                    control={radioStudentForm()}
                    label="Możliwe UZ/UoD"
                />
                <FormControlLabel
                    {...reg(name)}
                    value={ExpectedContractType.DoesNotMatter}
                    control={radioStudentForm()}
                    label="Brak preferencji"
                />
            </RadioGroup>
        </FormControl>
    )
}