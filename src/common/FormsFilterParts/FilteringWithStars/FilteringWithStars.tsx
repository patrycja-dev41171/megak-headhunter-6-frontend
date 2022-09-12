import React, {Dispatch, SetStateAction, SyntheticEvent} from 'react';
import {Rating} from "@mui/material";
import {customizeValueFromStars} from "../../../utils/customizeValueFromStars";
import StarIcon from "@mui/icons-material/Star";
import {RefCallBack, UseFormSetValue} from "react-hook-form/dist/types/form";

interface Props {
    reference: RefCallBack,
    val: number | null;
    setVal: Dispatch<SetStateAction<number | null>>
    setValueHookForm: UseFormSetValue<any>,
    nameHookForm: string;
}

const iconStyles = {
    width: '45px',
    height: '27px',
    padding: '5px 5px 5px 15px',
    marginRight: '5px',
}

export const FilteringWithStars = (props: Props) => {
    const {val, setVal, setValueHookForm, nameHookForm, reference} = props;

    const handleChangeCourseCompletion = (event: SyntheticEvent, newValue: number | null) => {
        setVal(newValue);
        setValueHookForm(nameHookForm, customizeValueFromStars(newValue))
    }

    return (
        <div className="filterStudents_lineContentStars">
            <div className="filterStudents_starNumbersBox">
                <span className="filterStudents_numberAtStar starNumber1">5</span>
                <span className="filterStudents_numberAtStar starNumber2">4</span>
                <span className="filterStudents_numberAtStar starNumber3">3</span>
                <span className="filterStudents_numberAtStar starNumber4">2</span>
                <span className="filterStudents_numberAtStar starNumber5">1</span>
            </div>

            <Rating
                ref={reference}
                value={val}
                onChange={handleChangeCourseCompletion}
                sx={{
                    '& .MuiRating-iconFilled': {
                        color: '#E02735',
                    },
                }}
                icon={
                    <StarIcon
                        style={iconStyles}
                    />
                }
                emptyIcon={
                    <StarIcon
                        style={{
                            color: '#4D4D4D',
                            ...iconStyles
                        }}
                    />
                }
            />
        </div>
    )
}