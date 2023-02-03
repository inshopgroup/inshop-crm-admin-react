import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import DashboardMenuItem from './DashboardMenuItem'

import type { IMenuItemExpanded } from '../model/IMenuItem'

interface DashboardMenuExpandedItemProps {
  item: IMenuItemExpanded
}

export default function DashboardMenuExpandedItem(props: DashboardMenuExpandedItemProps) {
  const { item } = props
  const router = useRouter()
  const currentUrl = router.asPath
  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<boolean>(false)
  const hasChildren = item.children?.length > 0

  useEffect(() => {
    const selected =
        !!item.children
            .map(child => child.route)
            .filter(childRoute => currentUrl.includes(childRoute))
            .length

    setSelected(selected)

    if (selected) {
      setOpen(true)
    }
  }, [item, currentUrl])

  return hasChildren ? (
      <>
        <DashboardMenuItem
            item={item}
            hasChildren={hasChildren}
            open={open}
            onClick={setOpen}
            selected={selected && !open}
        />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, index) => (
                <DashboardMenuItem
                    item={child}
                    pl={4}
                    key={index}
                />
            ))}
          </List>
        </Collapse>
      </>
  ) : null
}
