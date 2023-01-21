import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

interface TransactionDialogProps {
    open: boolean,
    close: () => void,
    confirm: () => void
}

const TransactionDialog = ({open, close, confirm}: TransactionDialogProps) => {
    return <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Confirm Transaction
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to buy this egg?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Disagree</Button>
            <Button onClick={confirm} autoFocus> Agree</Button>
        </DialogActions>
    </Dialog>
}

export default TransactionDialog