import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { signIn, SignInResponse } from 'next-auth/react'
import Router from 'next/router'
import SigninLayout from '../layouts/SigninLayout'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
    const [error, setError] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        signIn('credentials', {
            redirect: false,
            email: data.get('email'),
            password: data.get('password'),
        })
            .then((value: SignInResponse | undefined) => {
                if (value && value.ok) {
                    Router.push('/dashboard');
                } else {
                    setError(true)
                }
            })
            // .catch(e => {
            //     alert('2')
            // })
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={error}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        error={error}
                        helperText={error ? 'Incorrect email or password.' : ''}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </>
    );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <SigninLayout>
            {page}
        </SigninLayout>
    )
}

export default Page
