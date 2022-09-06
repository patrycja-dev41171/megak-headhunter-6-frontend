import {MainBtn} from "../MainBtn/MainBtn";
import React from "react";

export const ClearAllBtn = () => <MainBtn
    type="button"
    sx={{
        backgroundColor: '#172A35',
        '&:hover': {
            backgroundColor: '#172A35',
        },
    }}>
    Wyczyść wszystkie
</MainBtn>
