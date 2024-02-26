import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import './BasicProgress.css';
const BasicProgress = () => {
  return (
    <Box className='container-progress'>
        <CircularProgress />
    </Box>
  )
}

export default BasicProgress
