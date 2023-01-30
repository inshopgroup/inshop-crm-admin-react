import { SvgIconComponent } from '@mui/icons-material'

export interface IMenuItem {
  name: string
  icon: SvgIconComponent
  route?: string
  role: string
  children?: Array<IMenuItem>
}
