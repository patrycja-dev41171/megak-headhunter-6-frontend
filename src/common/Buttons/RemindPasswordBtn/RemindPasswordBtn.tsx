import React from 'react';
import {Link} from 'react-router-dom';

import './RemindPasswordBtn.css';

export const RemindPasswordBtn = () => {
    return (
        <Link
            className="remind-btn"
            to="/forgot-password">
            Zapomniałeś hasła?
        </Link>
    );
};
