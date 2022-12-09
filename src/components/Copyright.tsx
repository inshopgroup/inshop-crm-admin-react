import * as React from 'react';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://inshopgroup.com/">
                Inshop CRM
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
