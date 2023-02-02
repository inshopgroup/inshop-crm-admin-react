import * as React from 'react'
import { useRouter } from 'next/router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import type { IMenuItemExpanded, IMenuItemSimple } from '../model/IMenuItem'

interface DashboardMenuItemProps {
  item: IMenuItemSimple | IMenuItemExpanded
  hasChildren?: boolean | undefined
  pl?: number | undefined
  open?: boolean | undefined
  selected?: boolean | undefined
  onClick?: React.Dispatch<React.SetStateAction<boolean>> | undefined
  setSelected?: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

export default function DashboardMenuItem(props: DashboardMenuItemProps) {
  const router = useRouter()
  const currentUrl = router.asPath
  const {
    item,
    hasChildren = false,
    pl = 2,
    open,
    onClick,
    setSelected,
    selected: selectedFromParent = false
  } = props
  const route = 'route' in item ? item.route : ''
  const selected =
      currentUrl === route ||
      !!route && route !== '/dashboard' && currentUrl.includes(route)

  if (selected && hasChildren && setSelected) {
    setSelected(true)
  }

  function clickHandler(event: React.MouseEvent<HTMLElement>): void {
    event.preventDefault()

    if (hasChildren && onClick) {
      onClick(!open)
    } else {
      router.push(route)
    }
  }

  return (
      <ListItemButton
          href={route}
          sx={{ pl }}
          onClick={clickHandler}
          selected={selected || selectedFromParent}
      >
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <props.item.icon sx={{ fontSize: 'medium' }} />
        </ListItemIcon>
        <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '0.9rem' }} />
        {hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
  )
}
