import React, {useEffect} from 'react';
import SigninPage from './pages/signin'
import {Routes, Route, useNavigate} from "react-router-dom";
import ProfilePage from "./pages/dashboard";
import AuthService from "./services/auth.service";
import SignupPage from "./pages/signup";
import MonstersSection from "./pages/dashboard/monsters";
import EggsSection from "./pages/dashboard/eggs/eggs";
import TransactionsSection from "./pages/dashboard/transactions";

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        AuthService.getCurrentUser() ? navigate('/dashboard') : navigate('/login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Routes>
            <Route path={'/login'} element={<SigninPage/>}/>
            <Route path={'/dashboard'} element={<ProfilePage/>}>
                <Route index element={<MonstersSection  />}/>
                <Route path={"monsters"} element={<MonstersSection  />}/>
                <Route path={"eggs"} element={<EggsSection  />}/>
                <Route path={"transactions"} element={<TransactionsSection  />}/>
            </Route>
            <Route path={'/signup'} element={<SignupPage/>}/>
        </Routes>
    );
}

export default App;
