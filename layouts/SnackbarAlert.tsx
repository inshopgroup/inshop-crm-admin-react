import * as React from 'react';
import {Alert, AlertColor, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectSnackbarState, setSnackbar} from "../store/loaderSlice";

export interface SnackbarInterface {
    message: string;
    severity: AlertColor;
}

export default function SnackbarAlert() {
    const dispatch = useDispatch()
    const snackbarState: SnackbarInterface | null = useSelector(selectSnackbarState)

    const handleSnackBarClose = () => {
        dispatch(setSnackbar(null))
    }

    return (
        <>
            {!!snackbarState &&
                <Snackbar
                    autoHideDuration={30000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={true}
                    onClose={handleSnackBarClose}
                >
                    <Alert
                        variant="filled"
                        severity={snackbarState.severity}
                        sx={{ width: '100%' }}
                        onClose={handleSnackBarClose}
                    >
                        {snackbarState.message}
                    </Alert>
                </Snackbar>
            }
        </>
    );
}
