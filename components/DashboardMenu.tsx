import * as React from 'react'
import List from '@mui/material/List'

import type {IMenuItem} from '../model/IMenuItem'
import DashboardMenuItem from './DashboardMenuItem'
import DashboardMenuExpandedItem from './DashboardMenuIExpandedtem'

interface DashboardMenuProps {
  items: IMenuItem[]
}

export default function DashboardMenu(props: DashboardMenuProps) {
  return (
      <List component="nav">
        {props.items.map((item, index) => {
          return Array.isArray(item.children) && item.children.length > 0 ?
              <DashboardMenuExpandedItem item={item} key={index} /> :
              <DashboardMenuItem item={item} key={index} />
        })}
      </List>
  )
}
