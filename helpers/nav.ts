import DashboardIcon from '@mui/icons-material/Dashboard'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PeopleIcon from '@mui/icons-material/People'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import EngineeringIcon from '@mui/icons-material/Engineering'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ContactsIcon from '@mui/icons-material/Contacts'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import FlagIcon from '@mui/icons-material/Flag'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import LabelIcon from '@mui/icons-material/Label'
import SecurityIcon from '@mui/icons-material/Security'

import type { IMenuItemExpanded, IMenuItemSimple } from '../model/IMenuItem'

export const menu: Array<IMenuItemSimple | IMenuItemExpanded> = [
    {
        name: 'Dashboard',
        icon: DashboardIcon,
        role: '',
        route: '/dashboard',
    },
    {
        name: 'Calendar',
        icon: CalendarMonthIcon,
        role: '',
        route: '/dashboard/calendar',
    },
    {
        name: 'Clients',
        icon: PeopleIcon,
        role: '',
        route: '/dashboard/clients',
    },
    {
        name: 'Projects',
        icon: FolderCopyIcon,
        role: '',
        route: '/dashboard/projects',
    },
    {
        name: 'Tasks',
        icon: AccessTimeIcon,
        role: '',
        route: '/dashboard/tasks',
    },
    {
        name: 'Documents',
        icon: BookmarkIcon,
        role: '',
        route: '/dashboard/documents',
    },
    {
        name: 'Contacts',
        icon: ContactsIcon,
        role: '',
        children: [
            {
                name: 'Contacts',
                icon: ContactPhoneIcon,
                role: '',
                route: '/dashboard/contacts',
            },
            {
                name: 'Address',
                icon: ImportContactsIcon,
                role: '',
                route: '/dashboard/addresses',
            }
        ]
    },
    {
        name: 'Dictionaries',
        icon: FormatListBulletedIcon,
        role: '',
        children: [
            {
                name: 'Countries',
                icon: FlagIcon,
                role: '',
                route: '/dashboard/countries',
            },
            // {
            //     name: 'Contact types',
            //     icon: '',
            //     role: '',
            //     route: '/dashboard/contact_types',
            // },
            // {
            //     name: 'Project types',
            //     icon: '',
            //     role: '',
            //     route: '/dashboard/project_types',
            // },
            // {
            //     name: 'Project statuses',
            //     icon: '',
            //     role: '',
            //     route: '/dashboard/project_statuses',
            // },
            // {
            //     name: 'Task statuses',
            //     icon: '',
            //     role: '',
            //     route: '/dashboard/task_statuses',
            // },
            {
                name: 'Labels',
                icon: LabelIcon,
                role: '',
                route: '/dashboard/labels',
            }
        ]
    },
    {
        name: 'Users',
        icon: SecurityIcon,
        role: '',
        children: [
            {
                name: 'Users',
                icon: ManageAccountsIcon,
                role: '',
                route: '/dashboard/users',
            },
            // {
            //     name: 'User groups',
            //     icon: '',
            //     role: '',
            //     route: '/dashboard/user_groups',
            // }
        ]
    },
    {
        name: 'Maintenance',
        icon: EngineeringIcon,
        role: '',
        children: [
            {
                name: 'History',
                icon: HourglassBottomIcon,
                role: '',
                route: '/dashboard/histories',
            }
        ]
    }
]
