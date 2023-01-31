import * as React from 'react'
import List from '@mui/material/List'
import DashboardMenuItem from './DashboardMenuItem'
import DashboardMenuExpandedItem from './DashboardMenuIExpandedtem'

import type { IMenuItemExpanded, IMenuItemSimple } from '../model/IMenuItem'

interface DashboardMenuProps {
  items: Array<IMenuItemSimple | IMenuItemExpanded>
}

export default function DashboardMenu(props: DashboardMenuProps) {
  return (
      <List component="nav">
        {props.items.map((item, index) => {
          return 'children' in item && item.children?.length > 0 ?
              <DashboardMenuExpandedItem item={item} key={index} /> :
              <DashboardMenuItem item={item} key={index} />
        })}
      </List>
  )
}
