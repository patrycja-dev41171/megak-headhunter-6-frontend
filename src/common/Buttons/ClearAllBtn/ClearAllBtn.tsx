import {MainBtn} from "../MainBtn/MainBtn";
import {MouseEventHandler} from "react";

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ClearAllBtn = (props: Props) => <MainBtn
    onClick={props.onClick}
    sx={{
        backgroundColor: '#172A35',
        '&:hover': {
            backgroundColor: '#172A35',
        },
    }}>
    Wyczyść wszystkie
</MainBtn>
