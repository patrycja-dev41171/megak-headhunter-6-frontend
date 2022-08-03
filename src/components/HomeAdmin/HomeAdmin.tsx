import React from 'react';
import {StudentImport} from '../StudentImport/StudentImport';
import {AddHR} from '../AddHR/AddHR';
import {Header} from '../Header/Header';

export const HomeAdmin = () => {
    return (
        <>
            <Header/>
            <div className="main-container pageWithHeader">
                <div className="displayCenter">
                    <StudentImport/>
                    <AddHR/>
                </div>
            </div>
        </>
    );
};
