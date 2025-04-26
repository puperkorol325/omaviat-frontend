import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import PlayerPage from "./pages/PlayerPage";
import RegPage from "./pages/RegPage";
import { useDispatch, useSelector } from "react-redux";
import { AuthData } from "./types/authData";
import AccountPage from "./pages/AccountPage";

function App() {

    const authData: AuthData = useSelector((state: {authDataReducer: AuthData}) => state.authDataReducer);
    const dispatch = useDispatch();

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/video/:videoID" element={<PlayerPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegPage />}></Route>
                <Route path='/profile' element={<AccountPage/>}></Route>
            </Routes>
        </>
    )
}

export default App;