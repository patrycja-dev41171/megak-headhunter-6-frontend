import React from 'react';
import {Rating} from "@mui/material";
import {customizeValueFromStars} from "../../../utils/customizeValueFromStars";
import StarIcon from "@mui/icons-material/Star";
import {RefCallBack, UseFormSetValue} from "react-hook-form/dist/types/form";

interface Props {
    name: string,
    reference: RefCallBack,
    setValue: UseFormSetValue<any>,
}

const iconStyles = {
    width: '45px',
    height: '27px',
    padding: '5px 5px 5px 15px',
    marginRight: '5px',
}

export const FilteringWithStars = (props: Props) => {
    const {name, reference, setValue} = props;

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
                name={name}
                ref={reference}
                onChange={(event, newValue) => {
                    setValue(props.name, customizeValueFromStars(newValue));
                }}
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