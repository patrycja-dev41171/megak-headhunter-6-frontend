import React from 'react';
// import React, {useEffect} from 'react';
import { LoginView } from './pages/LoginView/LoginView';
import { Route, Routes } from 'react-router-dom';
import { HomeAdmin } from './pages/HomeAdmin/HomeAdmin';
import { RegisterView } from './pages/RegisterView/RegisterView';
import { ForgotPasswordView } from './pages/ForgotPasswordView/ForgotPasswordView';
import { ChangePasswordView } from './pages/ChangePasswordView/ChangePasswordView';
import { HrHomeView } from './pages/HrHomeView/HrHomeView';
import { HrSelectedStudentsView } from './pages/HrSelectedStudentsView/HrSelectedStudentsView';
import { HrStudentProfileView } from './pages/HrStudentProfileView/HrStudentProfileView';
import { StudentView } from './pages/StudentView/StudentView';
// import {useDispatch, useSelector} from "react-redux-toolkit";
// import {StoreState} from "./redux-toolkit/store";
// import axios from 'axios';
// import jwtDecode from "jwt-decode";
// import {setAccessToken, setExpirationTime, setId, setRole} from './redux-toolkit/actions/user';

export const App = () => {
    // const {expirationTime, accessToken} = useSelector((store: StoreState) => store.user);
    // const dispatch = useDispatch();
    // const axiosJWT = axios.create();
    //
    // const refreshToken = async () => {
    //     if(accessToken !== ''){
    //         try {
    //             const res = await fetch(`http://localhost:8080/refresh-token`, {
    //                 method: "GET",
    //                 headers: {
    //                     Accept: "application/json",
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    //             const data = await res.json();
    //             const decoded: any = jwtDecode(data.accessToken);
    //             dispatch(setId(data.id));
    //             dispatch(setAccessToken(data.accessToken));
    //             dispatch(setExpirationTime(decoded.exp));
    //             dispatch(setRole(data.role))
    //         } catch (error) {
    //             throw new Error('Token refresh error.')
    //         }
    //     }
    //
    // };
    //
    // axiosJWT.interceptors.request.use(
    //     async (config) => {
    //         const currentDate = new Date();
    //         if (expirationTime * 1000 < currentDate.getTime()) {
    //             const res: any = await fetch(`http://localhost:8080/refresh-token`, {
    //                 method: "GET",
    //                 headers: {
    //                     Accept: "application/json",
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    //             const data = await res.json();
    //             const decoded: any = jwtDecode(data.accessToken);
    //             dispatch(setId(data.id));
    //             dispatch(setAccessToken(data.accessToken));
    //             dispatch(setExpirationTime(decoded.exp));
    //             dispatch(setRole(data.role))
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );
    //
    // useEffect(() => {
    //     refreshToken()
    // }, []);

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginView />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordView />}
                />
                <Route
                    path="/home-admin"
                    element={<HomeAdmin />}
                />
                <Route
                    path="/change-password/:userId"
                    element={<ChangePasswordView />}
                />
                <Route
                    path="/register/:userId/:registerToken"
                    element={<RegisterView />}
                />
                <Route
                    path="/hr/home"
                    element={<HrHomeView />}
                />
                <Route
                    path="/hr/selected-students"
                    element={<HrSelectedStudentsView />}
                />
                <Route
                    path="/hr/student-profile/:studentId"
                    element={<HrStudentProfileView />}
                />
                <Route
                    path="/student"
                    element={<StudentView />}
                />
            </Routes>
        </>
    );
};
