import { ReactNode, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import type { IMenuItemExpanded, IMenuItemSimple } from '../model/IMenuItem'

interface DashboardMenuItemProps {
  item: IMenuItemSimple | IMenuItemExpanded
  hasSubmenu?: boolean
  children?: ReactNode
  pl?: number
  selected?: boolean
  onClick?: () => void
}

export default function DashboardMenuItem(props: DashboardMenuItemProps) {
  const router = useRouter()
  const currentUrl = router.asPath
  const {
    item,
    hasSubmenu = false,
    children = null,
    pl = 2,
    selected: selectedFromParent = false,
    onClick,
  } = props
  const route = 'route' in item ? item.route : ''
  const selected =
      currentUrl === route ||
      !!route && route !== '/dashboard' && currentUrl.includes(route)

  function handleClick(event: MouseEvent<HTMLElement>): void {
    event.preventDefault()

    if (hasSubmenu && onClick) {
      onClick()
    } else {
      router.push(route)
    }
  }

  return (
      <ListItemButton
          href={route}
          sx={{ pl }}
          onClick={handleClick}
          selected={selected || selectedFromParent}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <item.icon sx={{ fontSize: 'medium' }} />
        </ListItemIcon>
        <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '0.9rem' }} />
        {children}
      </ListItemButton>
  )
}
