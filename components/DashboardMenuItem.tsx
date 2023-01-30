import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import type {IMenuItem} from '../model/IMenuItem'

interface DashboardMenuItemProps {
  item: IMenuItem,
  pl?: number,
}

export default function DashboardMenuItem(props: DashboardMenuItemProps) {
  const { item, pl = 2 } = props

  return (
      <ListItemButton href={item.route || ''} sx={{ pl }}>
        <ListItemIcon>
          <props.item.icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
  )
}
