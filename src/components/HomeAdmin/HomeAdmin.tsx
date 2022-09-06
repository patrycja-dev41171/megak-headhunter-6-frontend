import React from 'react';
import {StudentImport} from '../StudentImport/StudentImport';
import {AddHR} from '../AddHR/AddHR';
import {HeaderMain} from '../Header/HeaderMain/HeaderMain';
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {useRefreshToken} from "../../utils/useRefreshToken";

export const HomeAdmin = () => {
    const { id } = useSelector((store: StoreState) => store.user);
    useRefreshToken();
    return (
        <>
            <HeaderMain role="admin" id={id}/>
            <div className="main-container pageWithHeader">
                <div className="displayCenter">
                    <StudentImport/>
                    <AddHR/>
                </div>
            </div>
        </>
    );
};
