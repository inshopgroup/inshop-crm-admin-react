import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Footer from "./Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectLoaderState} from "../store/loaderSlice";

// @ts-ignore
export default function SigninLayout({ children }) {
    const showLoader = useSelector(selectLoaderState) !== 0

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <CssBaseline />
                <MuiAppBar position="fixed">
                    {showLoader ?
                        <LinearProgress sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} /> :
                        ''
                    }
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Inshop CRM
                        </Typography>
                    </Toolbar>
                </MuiAppBar>
                <main>
                    {children}
                </main>
            </Container>
            <Footer></Footer>
        </Box>
    )
}
