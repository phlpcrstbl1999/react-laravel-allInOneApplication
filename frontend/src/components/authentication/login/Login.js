import { React, useState } from 'react'
import { Button, Link, InputLabel, Input, InputAdornment, IconButton, FormControl } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';
import BasicSnackbar from '../../common/Snackbar/BasicSnackbar';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [snackbarState, setSnackbarState] = useState(false);

  const handleLogin = () => {
    setSnackbarState(true);
  };
  
  const handleClose = () => {
    setSnackbarState(false);
  };
  return (
    <div className='login-container'>
      <div className='login-left'>
      </div>
      <div className='login-right'>
      <h1 className='animate__animated animate__bounceInLeft'>Sign In</h1>
    <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInRight'> 
     <InputLabel htmlFor="standard-adornment-username">User Name</InputLabel>
          <Input id="standard-adornment-username"/>
    </FormControl>

     <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInLeft'>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }/>
      </FormControl>
      <Button variant="contained" className='animate__animated animate__bounceInRight' onClick={handleLogin}>Submit</Button>
      <p>Don't have an account yet? <Link href="/authentication/register" underline="hover">Sign up</Link></p>
      <BasicSnackbar
        vertical={"top"} 
        horizontal={"right"} 
        open={snackbarState} 
        close={handleClose} 
        severityAlert={"error"} 
        variantAlert={"filled"} 
        message={"Invalid Credentials"}
      />
      </div>
    </div>
  )
}

export default Login