import React from 'react';
import {FormControl, FormLabel, Tooltip} from "@mui/material";
import {MainStyledTextField} from "../../../components/StyledComponents/MainStyledTextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {UseFieldArrayRemove, UseFormRegister} from "react-hook-form";
import {checkUrl} from "../../../utils/checkUrl";

interface Props {
    fields:  Record<"id", string>[],
    reg: UseFormRegister<any>,
    remove:  UseFieldArrayRemove,
}

export const ProjectsUrlsArray = (props: Props) => {
    const {fields, remove, reg} = props;

    return (
        <FormControl fullWidth>
            <FormLabel sx={{backgroundColor: '#292a2b', color: '#7E7E7E', paddingTop: '5px'}}>Linki do
                projektów</FormLabel>

            {fields.map((oneProject: any, index: number) => (
                <MainStyledTextField
                    sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#146DA0',
                        },
                    }}
                    disabled
                    fullWidth
                    variant="filled"
                    key={oneProject.id}
                    {...reg(`projectUrls.${index}.value` as const)}
                    InputProps={{
                        style: {backgroundColor: '#292a2b'},
                        endAdornment: (
                            <InputAdornment position="end">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={checkUrl(oneProject.value)}>
                                    <IconButton
                                        sx={{
                                            color: '#7E7E7E',
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            '&:hover': {
                                                color: '#146DA0',
                                            },
                                        }}>
                                        <Tooltip title="Otwórz link w nowym oknie">
                                            <OpenInNewIcon/>
                                        </Tooltip>
                                    </IconButton>
                                </a>
                                <IconButton
                                    sx={{
                                        color: '#7E7E7E',
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        '&:hover': {
                                            color: '#d93535',
                                        },
                                    }}
                                    onClick={() => remove(index)}>
                                    <Tooltip title="Usuń link">
                                        <DeleteForeverOutlinedIcon/>
                                    </Tooltip>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            ))}
        </FormControl>
    )
}

export const PortfolioUrlsArray = (props: Props) => {
    const {fields, remove, reg} = props;

    return (
        <FormControl fullWidth>
            <FormLabel sx={{backgroundColor: '#292a2b', color: '#7E7E7E', paddingTop: '5px'}}>Linki do
                portfolio</FormLabel>
            {fields.map((onePortfolio: any, index: number) => (
                <MainStyledTextField
                    sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                            WebkitTextFillColor: '#146DA0',
                        },
                    }}
                    disabled
                    fullWidth
                    variant="filled"
                    key={onePortfolio.id}
                    {...reg(`portfolioUrls.${index}.value` as const)}
                    InputProps={{
                        style: {backgroundColor: '#292a2b'},
                        endAdornment: (
                            <InputAdornment position="end">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={checkUrl(onePortfolio.value)}>
                                    <IconButton
                                        sx={{
                                            color: '#7E7E7E',
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            '&:hover': {
                                                color: '#146DA0',
                                            },
                                        }}>
                                        <Tooltip title="Otwórz link w nowym oknie">
                                            <OpenInNewIcon/>
                                        </Tooltip>
                                    </IconButton>
                                </a>
                                <IconButton
                                    sx={{
                                        color: '#7E7E7E',
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        '&:hover': {
                                            color: '#d93535',
                                        },
                                    }}
                                    onClick={() => remove(index)}>
                                    <Tooltip title="Usuń link">
                                        <DeleteForeverOutlinedIcon/>
                                    </Tooltip>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            ))}
        </FormControl>
    )
}