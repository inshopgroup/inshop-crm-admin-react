import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {signOut, useSession} from "next-auth/react";
import PageFooter from "./PageFooter";
import {Alert, LinearProgress} from "@mui/material";
import {selectErrorState, selectLoaderState, setError} from "../store/loaderSlice";
import {useDispatch, useSelector} from "react-redux";
import SnackbarAlert from "./SnackbarAlert";
import { menu as menuItems } from '../helpers/nav'
import DashboardMenu from "../components/DashboardMenu";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

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

    const handleAlertClose = (): void => {
       dispatch(setError(null))
    }

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
                    <Button
                        color="inherit"
                        startIcon={<PowerSettingsNewIcon />}
                        onClick={() => signOut()}
                    >
                      Logout
                    </Button>
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
                    <DashboardMenu items={menuItems} />
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
