import * as React from 'react';
import {useEffect, useState} from "react";
import UsersService from "../../services/users.service";
import {UserData} from "../../models/user_data";
import Header from "./header";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Container} from "@mui/material";
import {Egg} from "../../models/eggs_store";
import AuthService from "../../services/auth.service";
import {Outlet} from 'react-router-dom'

const theme = createTheme({
    palette: {
        background: {
            default: "#EEE9E9"
        }
    }
});

export default function ProfilePage() {
    const [userData, setUserData] = useState<UserData>()
    const [eggs, setEggs] = useState<Egg[]>()

    useEffect(() => {
        (async () => {
            const userData = await UsersService.getUserData()
            setUserData(userData)
            setEggs(await UsersService.getEggs())
        })()
    }, [])

    const signout = () => {
        AuthService.logout()
    }

    const handleConfirmTransaction = async (egg: Egg) => {
        let alertMessage = `you bought an egg level ${egg}!`
        try {
            const transaction = await UsersService.doTransaction(egg!.level)
            console.log({transaction})
            setUserData({
                ...userData,
                credits: userData!.credits - egg!.price,
                transactions: [transaction].concat(userData!.transactions)
            } as UserData)
        } catch (e) {
            console.error(e)
            alertMessage = 'failed transaction'
        }
        alert(alertMessage)
    }

    const headerProps = {
        sections: [
            {title: 'Monsters', to: '/monsters'},
            {title: 'Buy eggs', to: '/eggs'},
            {title: 'Transactions', to: '/transactions'}
        ],
        title: 'Monsters  trading panel'
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Header {...headerProps} credits={userData?.credits || 0}
                        signout={signout}/>
                {userData && eggs &&
                    <Outlet context={{
                        monsters: userData!.monsters,
                        eggs: eggs,
                        transactions: userData.transactions,
                        handleConfirmTransaction: handleConfirmTransaction
                    }}/>
                }
            </Container>

        </ThemeProvider>
    );
}