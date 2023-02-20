import { ReactNode } from 'react'
import { format, parseISO } from 'date-fns'

import Chip from '@mui/material/Chip'

export const getTableCellData = (value: any, property: string): ReactNode | string => {
  if (value === undefined || value === null) {
    return ''
  }

  let content

  switch (property) {
    case 'isActive':
      content = <Chip
          label={value ? 'Yes' : 'No'}
          color={value ? 'success' : 'error'}
          sx={{ minWidth: 60 }}
      />
      break
    case 'createdAt':
    case 'updatedAt':
      content = format(parseISO(value), 'dd-MM-yyyy')
      break
    default:
      content = value.toString()
  }

  return content
}
