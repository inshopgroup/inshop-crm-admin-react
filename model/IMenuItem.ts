import { SvgIconComponent } from '@mui/icons-material'

export interface IMenuItem {
  label: string
  icon: SvgIconComponent
  route: string
  role: string
}
