import { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import DashboardMenuItem from './DashboardMenuItem'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import type { IMenuItemExpanded } from '../model/IMenuItem'

interface DashboardMenuExpandedItemProps {
  item: IMenuItemExpanded
}

export default function DashboardMenuExpandedItem(props: DashboardMenuExpandedItemProps) {
  const { item } = props
  const router = useRouter()
  const currentUrl = router.asPath
  const hasSubmenu = item.children?.length > 0
  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<boolean>(false)

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

  return hasSubmenu ? (
      <>
        <DashboardMenuItem
            item={item}
            hasSubmenu={hasSubmenu}
            onClick={() => setOpen(!open)}
            selected={selected && !open}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </DashboardMenuItem>

        <Collapse in={open}>
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
