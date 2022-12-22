import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Dashboard() {
    return (
        <Container maxWidth="lg" sx={{ display:'flex', justifyContent:"center", flexDirection:"column", alignItems: "center", mt: 4, mb: 4 }}>
            <Box sx={{ display:'flex', justifyContent:"center", flexDirection:"column", alignItems: "center"}}>
                Index page
                <Link href="/signin" variant="body2">
                    {"Sign in"}
                </Link>
            </Box>
        </Container>
    );
}