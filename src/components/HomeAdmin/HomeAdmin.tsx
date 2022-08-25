import React from 'react';
import {StudentImport} from '../StudentImport/StudentImport';
import {AddHR} from '../AddHR/AddHR';
import {Header} from '../Header/Header';
import {useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {useRefreshToken} from "../../utils/useRefreshToken";

export const HomeAdmin = () => {
    const { id } = useSelector((store: StoreState) => store.user);
    useRefreshToken();
    return (
        <>
            <Header role="admin" id={id}/>
            <div className="main-container pageWithHeader">
                <div className="displayCenter">
                    <StudentImport/>
                    <AddHR/>
                </div>
            </div>
        </>
    );
};
