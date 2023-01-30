import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
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
import LabelIcon from '@mui/icons-material/Label';
import FlagIcon from '@mui/icons-material/Flag';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import {signOut, useSession} from "next-auth/react";
import PageFooter from "./PageFooter";
import {Alert, LinearProgress} from "@mui/material";
import {selectErrorState, selectLoaderState, setError} from "../store/loaderSlice";
import {useDispatch, useSelector} from "react-redux";
import SnackbarAlert from "./SnackbarAlert";
import Collapse from '@mui/material/Collapse';

import type { IMenuItem } from '../model/IMenuItem'

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

// @ts-ignore
export default function DefaultLayout({ children }) {
    const {data: session} = useSession()
    const dispatch = useDispatch()
    const showLoader = useSelector(selectLoaderState) !== 0
    const error = useSelector(selectErrorState)
    const [open, setOpen] = React.useState<boolean>(true);

    const handleClick = (): void => {
        setOpen(!open);
    };

    const handleAlertClose = (): void => {
       dispatch(setError(null))
    }

    const menuItems: Array<IMenuItem> = [
        { label: 'Labels', icon: LabelIcon, route: 'label', role: 'ROLE_LABEL_LIST' },
        { label: 'Countries', icon: FlagIcon, route: 'country', role: 'ROLE_COUNTRY_LIST' },
    ]

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                {showLoader ?
                    <LinearProgress sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }} /> :
                    ''
                }
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Inshop CRM
                    </Typography>
                    <Typography>{session?.user?.name}</Typography>
                    <Button onClick={() => signOut()} color="inherit">[ Logout ]</Button>
                </Toolbar>
            </MuiAppBar>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dictionaries" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        {menuItems.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton href={`/dashboard/${item.route}`} sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <item.icon />
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
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
                </Box>
            </Drawer>
            <Main>
                <DrawerHeader />
                {error &&
                    <Alert
                        variant="filled"
                        severity="error"
                        sx={{marginBottom: 3}}
                        onClose={handleAlertClose}
                    >{error}</Alert>
                }

                {children}
            </Main>
            <PageFooter/>
            <SnackbarAlert/>
        </Box>
    )
}
