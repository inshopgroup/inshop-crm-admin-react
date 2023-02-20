import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { setSnackbar } from '../store/loaderSlice'
import { useDeleteItemMutation } from '../store/crud'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

interface PageActionProps {
  id: number
  slug: string
  model: string
  editMode?: boolean
}

export default function PageAction(props: PageActionProps) {
  const { id, slug, model, editMode = false } = props
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
          {editMode ?
              <Button type="submit" variant="contained" color="success">Save</Button> :
              <Button
                  variant="contained"
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
                onClick={goToList}
            >
              Back to list
            </Button>
          </Grid>
          {editMode && <Grid item>
              <Button
                type="submit"
                variant="contained"
                onClick={() => router.push(`/dashboard/${slug}/show/${id}`)}
              >
                Show
              </Button>
            </Grid>
          }
        </Grid>
        <Grid item>
          <Button
              type="submit"
              variant="contained"
              color="error"
              onClick={handleDelete}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
  )
}
