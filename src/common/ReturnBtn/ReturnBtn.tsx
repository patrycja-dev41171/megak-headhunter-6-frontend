import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './ReturnBtn.css';

export const ReturnBtn = () => {
    return (
        <div className="return_btn">
            <ArrowBackIosIcon sx={{color: '#666666'}}/>
            <div className="return_btn_text">Wróć</div>
        </div>
    );
};