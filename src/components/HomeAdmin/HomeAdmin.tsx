import React from 'react';
import {MiniLogoMegaK} from "../../common/MiniLogoMegaK/MiniLogoMegaK";
import {StudentImport} from "../StudentImport/StudentImport";
import {AddHR} from "../AddHR/AddHR";

export const HomeAdmin = () => {
    return (
        <div className='main-container'>
            <MiniLogoMegaK/>
            <StudentImport/>
            <AddHR/>
        </div>
    )
}