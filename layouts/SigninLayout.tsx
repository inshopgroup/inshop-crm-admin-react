import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Footer from "./Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function SigninLayout({ children }) {
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
