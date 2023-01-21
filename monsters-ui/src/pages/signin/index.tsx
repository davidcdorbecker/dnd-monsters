import React from 'react'
import SignIn from "./signin";
import AuthService from "../../services/auth.service";
import {useNavigate} from "react-router-dom";

const SigninPage = () => {
    const navigate = useNavigate()
    const handleLogin = async ({email, password}: { email: string; password: string }) => {
        AuthService.login(email, password).then(
            () => {
                navigate('/dashboard')
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                alert(resMessage)
            }
        );
    }

    const signup = () => navigate('/signup')

    return <SignIn handleLogin={handleLogin} signup={signup}/>
}

export default SigninPage
