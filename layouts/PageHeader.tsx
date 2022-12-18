import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface PageHeaderProps {
    title: string;
    actions?: (() => JSX.Element) | undefined;
}

export default function PageHeader(props: PageHeaderProps) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
                {props.title}
            </Typography>

            {props.actions && props.actions()}
        </Toolbar>
    );
}
