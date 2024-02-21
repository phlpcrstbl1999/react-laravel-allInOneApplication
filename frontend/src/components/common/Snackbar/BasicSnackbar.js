import { React } from 'react'
import { Snackbar, Alert } from '@mui/material';

const BasicSnackbar = ({vertical, horizontal, open, close, message}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={3000}
      onClose={close}
      message={message}
      key={vertical + horizontal}
    >
    <Alert
      onClose={close}
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    />
    </Snackbar>
  )
}

export default BasicSnackbar
