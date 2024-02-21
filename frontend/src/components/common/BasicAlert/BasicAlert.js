import React from 'react'
import { Alert } from '@mui/material';
const BasicAlert = ({severityAlert, variantAlert, message}) => {
  return (
    <Alert
      severity={severityAlert}
      variant={variantAlert}
      sx={{ width: '100%' }} 
    >
      {message}
    </Alert>
  )
}

export default BasicAlert
