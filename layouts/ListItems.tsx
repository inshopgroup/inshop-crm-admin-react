import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import BarFolderOpen from '@mui/icons-material/FolderOpen';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon  from '@mui/icons-material/Settings';
import Link from "next/link";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";


export function ListItems() {

    const router = useRouter();

    return(
        <nav className={'navigation'}>
            <Link
                href={'/'}
                className={ router.pathname == "/" ? "navigation-link active" : "navigation-link"}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </Link>
            <Link
                href={'/calendar'}
                className={ router.pathname == "/calendar" ? "navigation-link active" : "navigation-link"}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendar"/>
                </ListItemButton>
            </Link>
            <Link href={'/clients'} className={'navigation-link'}>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Clients"/>
                </ListItemButton>
            </Link>
            <Link href={'/projects'} className={'navigation-link'}>
                <ListItemButton>
                    <ListItemIcon>
                        <BarFolderOpen />
                    </ListItemIcon>
                    <ListItemText primary="Projects"/>
                </ListItemButton>
            </Link>
            <Divider />
            <Link href={'/tasks'} className={'navigation-link'}>
                <ListItemButton>
                    <ListItemIcon>
                        <TaskAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tasks"/>
                </ListItemButton>
            </Link>
            <Link href={'/tasks'} className={'navigation-link'}>
                <ListItemButton>
                    <ListItemIcon>
                        <ContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contacts"/>
                </ListItemButton>
            </Link>
            <Link href={'/settings'} className={'navigation-link'}>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItemButton>
            </Link>
        </nav>
    )
};