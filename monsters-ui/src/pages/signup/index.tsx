import React from 'react'
import Signup from "./signup";
import AuthService from "../../services/auth.service";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate()
    const handleSignup = async ({email, password, name}: { email: string; password: string, name: string }) => {
        AuthService.signup(email, password, name).then(
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

    return <Signup signup={handleSignup} />
}

export default SignupPage
