import * as React from 'react'
import List from '@mui/material/List'
import DashboardMenuItem from './DashboardMenuItem'
import Collapse from '@mui/material/Collapse'

import type { IMenuItemExpanded } from '../model/IMenuItem'

interface DashboardMenuExpandedItemProps {
  item: IMenuItemExpanded
}

export default function DashboardMenuExpandedItem(props: DashboardMenuExpandedItemProps) {
  const { item } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const hasChildren = item.children?.length > 0

  return hasChildren ? (
      <>
        <DashboardMenuItem item={item} hasChildren={hasChildren} open={open} onClick={setOpen} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, index) => (
                <DashboardMenuItem item={child} pl={4} key={index} />
            ))}
          </List>
        </Collapse>
      </>
  ) : null
}
