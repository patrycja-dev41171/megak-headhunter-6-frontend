import React from 'react';

import "./HomeAdmin.css"
import {StudentImport} from "../../components/StudentImport/StudentImport";
import {AddHR} from "../../components/AddHR/AddHR";

export const HomeAdmin = () => {
    return (
        <>
            <header className="home-admin_header">
                <img
                    className="home-admin_img"
                    src="/logo-megak.webp"
                    alt="Logo Mega K"
                />
                <p className="home-admin_h1">Witaj <b>Admin</b>!</p>
            </header>

            <main className="home-admin_main">
                <StudentImport/>
                <AddHR/>
            </main>
        </>
    )
};
