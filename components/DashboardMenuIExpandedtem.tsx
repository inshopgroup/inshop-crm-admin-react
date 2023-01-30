import * as React from 'react'
import List from '@mui/material/List'
import DashboardMenuItem from './DashboardMenuItem'
import Collapse from '@mui/material/Collapse'

import type { IMenuItem } from '../model/IMenuItem'

interface DashboardMenuExpandedItemProps {
  item: IMenuItem
}

export default function DashboardMenuExpandedItem(props: DashboardMenuExpandedItemProps) {
  const { item } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const hasChildren = item.children && item?.children?.length > 0

  return hasChildren ? (
      <>
        <DashboardMenuItem item={item} hasChildren={hasChildren} open={open} onClick={setOpen} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {(item.children || []).map((child: IMenuItem, index) => (
                <DashboardMenuItem item={child} pl={4} key={index} />
            ))}
          </List>
        </Collapse>
      </>
  ) : null
}
