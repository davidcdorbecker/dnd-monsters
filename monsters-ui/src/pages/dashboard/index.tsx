import * as React from 'react';
import {useEffect, useState} from "react";
import UsersService from "../../services/users.service";
import {UserData} from "../../models/user_data";
import Header from "./header";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Container} from "@mui/material";
import MonstersSection from "./monsters";
import {Egg} from "../../models/eggs_store";
import EggsSection from "./eggs/eggs";
import TransactionDialog from "./transaction-dialog";
import TransactionsSection from "./transactions";
import {Transaction} from "../../models/transaction";
import AuthService from "../../services/auth.service";
import {Route, Routes, useLocation, useMatch, Outlet} from 'react-router-dom'

const theme = createTheme({
    palette: {
        background: {
            default: "#EEE9E9"
        }
    }
});

enum Section {
    Monsters = 0,
    Trading,
    Transactions
}

export default function ProfilePage() {
    const [userData, setUserData] = useState<UserData>()
    const [openDialog, setOpenDialog] = useState(false)
    const [eggs, setEggs] = useState<Egg[]>()
    const [selectedEgg, setSelectedEgg] = useState<Egg | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        (async () => {
            const userData = await UsersService.getUserData()
            setUserData(userData)
            setEggs(await UsersService.getEggs())
            //TODO: return transactions in userData to avoid this call
            setTransactions(await UsersService.getTransactions(userData!.id))
        })()
    }, [])

    const handleOpenTransactionDialog = (egg: Egg) => {
        setSelectedEgg(egg)
        setOpenDialog(true)
    }

    const handleCloseTransactionDialog = () => {
        setSelectedEgg(null)
        setOpenDialog(false)
    }

    const signout = () => {
        AuthService.logout()
    }

    const handleConfirmTransaction = async () => {
        let alertMessage = `you bought an egg level ${selectedEgg}!`
        try {
            await UsersService.doTransaction(selectedEgg!.level)
            setUserData({...userData, credits: userData!.credits - selectedEgg!.price} as UserData)
        } catch (e) {
            console.error(e)
            alertMessage = 'failed transaction'
        }
        setSelectedEgg(null)
        setOpenDialog(false)
        alert(alertMessage)
    }
    const headerProps = {
        sections: [
            {title: 'Monsters', to: '/monsters'},
            {title: 'Incubator', to: '/monsters'},
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
                        open: handleOpenTransactionDialog,
                        eggs: eggs,
                        transactions: transactions
                    }}/>
                }
            </Container>
            <TransactionDialog open={openDialog} close={handleCloseTransactionDialog}
                               confirm={handleConfirmTransaction}/>
        </ThemeProvider>
    );
}