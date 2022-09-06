import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";
import './ReturnBtn.css';

export const ReturnBtn = () => {
    const navigate = useNavigate()

    return (
        <button className="return_btn" onClick={() => navigate(-1)}>
            <ArrowBackIosIcon sx={{color: '#666666'}}/>
            <div className="return_btn_text">Wróć</div>
        </button>
    );
};