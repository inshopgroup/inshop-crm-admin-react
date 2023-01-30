import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import DashboardMenuItem from './DashboardMenuItem'
import Collapse from '@mui/material/Collapse'

import type { IMenuItem } from '../model/IMenuItem'

interface DashboardMenuExpandedItemProps {
  item: IMenuItem
}

export default function DashboardMenuExpandedItem(props: DashboardMenuExpandedItemProps) {
  const { item } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const handleClick = (): void => {
    setOpen(!open)
  };
  const hasChildren = item.children && item?.children?.length > 0

  return hasChildren ? (
      <>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <props.item.icon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {(item.children || []).map((item: IMenuItem, index) => (
                <DashboardMenuItem item={item} pl={4} key={index} />
            ))}
          </List>
        </Collapse>
      </>
  ) : null
}
