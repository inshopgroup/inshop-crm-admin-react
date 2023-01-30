import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import type {IMenuItem} from '../model/IMenuItem'

interface DashboardMenuItemProps {
  item: IMenuItem,
  hasChildren?: boolean
  pl?: number,
  open?: boolean,
  onClick?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DashboardMenuItem(props: DashboardMenuItemProps) {
  const { item, hasChildren = false, pl = 2, open, onClick } = props

  function clickHandler(event: React.MouseEvent<HTMLElement>): void {
    if (hasChildren && onClick) {
      event.preventDefault()
      onClick(!open)
    }
  }

  return (
      <ListItemButton href={item.route || ''} sx={{ pl }} onClick={clickHandler}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <props.item.icon sx={{ fontSize: 'medium' }} />
        </ListItemIcon>
        <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '0.8rem' }} />
        {hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
  )
}
