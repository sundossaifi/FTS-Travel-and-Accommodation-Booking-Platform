import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface LogoutDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function LogoutDialog({ open, onConfirm, onCancel }: LogoutDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
        >
            <DialogTitle id="logout-dialog-title">{"Logout Confirmation"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="logout-dialog-description">
                    Are you sure you want to log out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Logout
                </Button>
            </DialogActions>
        </Dialog>
    )
}

