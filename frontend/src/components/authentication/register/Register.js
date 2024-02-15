import { React, useState } from 'react'
import { Button, Link, InputLabel, Input, InputAdornment, IconButton, FormControl } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Register.css';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className='register-container'>
      <div className='register-left'>
      </div>
      <div className='register-right'>
      <h1 className='animate__animated animate__bounceInRight'>Sign Up</h1>
    <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInLeft'>
     <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input id="standard-adornment-email"/>
    </FormControl>

     {/* <FormControl sx={{ m: 1, width: '65%' }} variant="outlined">
     <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }/>
      </FormControl> */}
      <Button variant="contained" className='animate__animated animate__bounceInRight'>Verify</Button>
      <p>Already have an account? <Link href="/authentication" underline="hover">Sign in</Link></p>
      </div>
    </div>
  )
}

export default Register
