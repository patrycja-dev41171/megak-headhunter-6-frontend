import React from 'react';
import { LoginView } from './pages/LoginViews/LoginView';
import {Route, Routes} from 'react-router-dom';

function App() {
    return (
        <>
            <Routes>
                <Route path="/registration" element={<LoginView/>}/>
            </Routes>
        </>
    )}

export default App;
