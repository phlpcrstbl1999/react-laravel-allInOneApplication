import { React } from 'react'
import { Snackbar, Alert } from '@mui/material';

const BasicSnackbar = ({vertical, horizontal, open, close, severityAlert, variantAlert, message}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={3000}
      onClose={close}
      key={vertical + horizontal}
    >
    <Alert
      severity={severityAlert}
      variant={variantAlert}
      sx={{ width: '100%' }} 
    >
      {message}
    </Alert>
    </Snackbar>
  )
}

export default BasicSnackbar
