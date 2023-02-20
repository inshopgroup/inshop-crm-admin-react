import { SvgIconComponent } from '@mui/icons-material'

interface IMenuItem {
  name: string
  icon: SvgIconComponent
  role: string
}

export interface IMenuItemSimple extends IMenuItem {
  route: string
}

export interface IMenuItemExpanded extends IMenuItem {
  children: IMenuItemSimple[]
}
