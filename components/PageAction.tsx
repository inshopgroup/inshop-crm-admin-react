import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { setSnackbar } from '../store/loaderSlice'
import { useDeleteItemMutation } from '../store/crud'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AddIcon from '@mui/icons-material/Add'

interface PageActionProps {
  id?: number
  slug: string
  model: string
  editMode?: boolean
  createMode?: boolean
}

export default function PageAction(props: PageActionProps) {
  const {
    id,
    slug,
    model,
    editMode = false,
    createMode = false
  } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const [deleteItem] = useDeleteItemMutation()

  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      const item = {
        id,
        '@type': model
      }

      deleteItem(item).then((response: any) => {
        if (!response.error) {
          dispatch(setSnackbar({
            message: 'Successfully deleted',
            severity: 'success',
          }))

          goToList()
        }
      })
    }
  }

  function goToList(): void {
    router.push(`/dashboard/${slug}`)
  }

  return (
      <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
      >
        <Grid item md={2} xs={12}>
          {editMode || createMode ?
              <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={editMode ? <SaveIcon /> : <AddIcon />}
              >
                {editMode ? 'Save' : 'Add'}
              </Button> :
              <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => router.push(`/dashboard/${slug}/edit/${id}`)}
              >
                Edit
              </Button>
          }
        </Grid>

        <Grid
            container
            item
            justifyContent="center"
            spacing={2}
            xs={12}
            md={6}
        >
          <Grid item>
            <Button
                type="submit"
                variant="contained"
                startIcon={<FormatListBulletedIcon />}
                onClick={goToList}
            >
              Back to list
            </Button>
          </Grid>
          {id && !createMode && editMode && <Grid item>
              <Button
                type="submit"
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={() => router.push(`/dashboard/${slug}/show/${id}`)}
              >
                Show
              </Button>
            </Grid>
          }
        </Grid>
        <Grid container item md={2} xs={12} justifyContent="flex-end">
          {!createMode && <Button
                type="submit"
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
            >
              Delete
            </Button>
          }
        </Grid>
      </Grid>
  )
}
