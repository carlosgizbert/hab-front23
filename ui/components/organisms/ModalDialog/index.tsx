import { forwardRef } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface IModalDialog {
  title: string
  text: string
  ref?: any
  loading?: boolean
  callbackAgree: () => void
  callbackDisagree: () => void
  callbackClose?: () => void
}

export default function ModalDialog({
  title,
  text,
  callbackAgree,
  callbackDisagree,
  callbackClose,
  ref,
  loading,
}: IModalDialog) {
  return (
    <div>
      <Dialog
        ref={ref}
        open
        TransitionComponent={Transition}
        keepMounted
        onClose={callbackClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={callbackDisagree}>Cancelar</Button>
          <Button onClick={callbackAgree} disabled={loading}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
