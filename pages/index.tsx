import * as React from 'react';
import Link from '@mui/material/Link';

export default function Dashboard() {
    return (
        <>
            Index page
            <Link href="/signin" variant="body2">
                {"Sign in"}
            </Link>
        </>
    );
}