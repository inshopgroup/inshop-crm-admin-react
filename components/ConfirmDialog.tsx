import { ReactNode } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface AlertDialogProps {
  open: boolean
  handleSubmit: () => void
  handleClose: () => void
  children?: ReactNode
}

export default function AlertDialog(props: AlertDialogProps) {
  const { open, handleSubmit, handleClose, children = null } = props

  return (
      <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" align="center" sx={{ minWidth: 320 }}>
            {'Are you sure?'}
          </DialogTitle>
          {children && <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {children}
            </DialogContentText>
          </DialogContent>}
          <DialogActions>
            <Grid
                container
                justifyContent="space-between"
                spacing={2}
            >
              <Grid item>
                <Button
                    color="error"
                    variant="contained"
                    onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                    autoFocus
                    color="success"
                    variant="contained"
                    onClick={handleSubmit}
                >
                  Ok
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </>
  );
}
