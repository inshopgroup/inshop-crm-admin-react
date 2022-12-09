import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import BarFolderOpen from '@mui/icons-material/FolderOpen';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon  from '@mui/icons-material/Settings';
import Link from "next/link";


export function ListItems() {
    return(
        <div>
            <nav>
                <Link href={'/dashboard'} color="#666666">
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Link>
                <Link href={'/calendar'} color="#666666">
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText primary="Calendar"/>
                    </ListItemButton>
                </Link>
                <Link href={'/clients'} color="#666666">
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clients"/>
                    </ListItemButton>
                </Link>
                <Link href={'/projects'} color="#666666">
                    <ListItemButton>
                        <ListItemIcon>
                            <BarFolderOpen />
                        </ListItemIcon>
                        <ListItemText primary="Projects"/>
                    </ListItemButton>
                </Link>
                <Link href={'/tasks'} color="#666666">
                    <ListItemButton>
                        <ListItemIcon>
                            <TaskAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks"/>
                    </ListItemButton>
                </Link>
                <Link href={'/tasks'} color="#666666">
                    <ListItemButton>
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contacts"/>
                    </ListItemButton>
                </Link>
                <Link href={'/settings'} color="#666666">
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Settings" color="#666666"/>
                    </ListItemButton>
                </Link>
            </nav>
            <style jsx>{`
                nav a {
                    color: black
                    text-decoration: none
                }
            `}
            </style>
        </div>
    )
};
