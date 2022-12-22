import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from "@mui/material/Button";
import {signOut, useSession} from "next-auth/react";
import PageFooter from "./PageFooter";
import {Alert, LinearProgress} from "@mui/material";
import {selectErrorState, selectLoaderState, setError} from "../store/loaderSlice";
import {useDispatch, useSelector} from "react-redux";
import SnackbarAlert from "./SnackbarAlert";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: `${drawerWidth}px`,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#0c5c6f',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);
interface Content {
    children: React.ReactNode
}
const mdTheme = createTheme();


// @ts-ignore
export default function DefaultLayout({ children }: Content) {
    const {data: session} = useSession()
    const dispatch = useDispatch()
    const showLoader = useSelector(selectLoaderState) !== 0
    const error = useSelector(selectErrorState)

    const handleAlertClose = () => {
       dispatch(setError(null))
    }


    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box
                sx={{
                    display: 'flex',

                }}
            >
                <CssBaseline />
                    <AppBar  position="absolute">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{ ...(open && { display: 'none' }) }}
                            >
                            <MenuIcon />
                            </IconButton>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="close drawer"
                                onClick={toggleDrawer}
                                sx={{ ...(!open && { display: 'none' }) }}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                                Inshop CRM
                            </Typography>
                            <Typography>{session?.user?.name}</Typography>
                            <Button onClick={() => signOut()} color="inherit">[ Logout ]</Button>
                        </Toolbar>
                    </AppBar>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    open={open}
                >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    />
                    <Divider />
                    <List component="nav">
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider />
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                {/*<Main>*/}
                {/*    <DrawerHeader />*/}
                {/*    {error &&*/}
                {/*        <Alert*/}
                {/*            variant="filled"*/}
                {/*            severity="error"*/}
                {/*            sx={{marginBottom: 3}}*/}
                {/*            onClose={handleAlertClose}*/}
                {/*        >{error}</Alert>*/}
                {/*    }*/}

                {/*    {children}*/}
                {/*</Main>*/}
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        position: 'relative'
                    }}
                >
                    <Toolbar />
                    <DrawerHeader />
                    {error &&
                    <Alert
                        variant="filled"
                        severity="error"
                        sx={{marginBottom: 3}}
                        onClose={handleAlertClose}
                    >{error}</Alert>
                    }
                    <main>
                        { children }
                    </main>
                </Box>
            </Box>
            <PageFooter/>
            <SnackbarAlert/>
        </ThemeProvider>
    )
}
