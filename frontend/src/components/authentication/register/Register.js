import { React, useState, useMemo } from 'react'
import { Button, Link, InputLabel, Input, FormControl, FormHelperText, useFormControl } from '@mui/material';
import './Register.css';
import BasicSnackbar from '../../common/Snackbar/BasicSnackbar';
const Register = () => {  
  const [snackbarState, setSnackbarState] = useState(false);

  const handleVerifyEmail = () => {
    setSnackbarState(true);
  };
  
  const handleClose = () => {
    setSnackbarState(false);
  };
  
  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = useMemo(() => {
      if (focused) {
        return 'Please enter your company email';
      }
  
      return 'Enter your email';
    }, [focused]);
  
    return <FormHelperText>{helperText}</FormHelperText>;
  }
  return (
    <div className='register-container'>
      <div className='register-left'>
      </div>
      <div className='register-right'>
      <h1 className='animate__animated animate__bounceInRight'>Sign Up</h1>
      <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInLeft' error={false}>
      <InputLabel htmlFor="standard-adornment-email">Email*</InputLabel>
            <Input id="standard-adornment-email"/>
            <MyFormHelperText />
      </FormControl>
      <Button variant="contained" className='animate__animated animate__bounceInRight' onClick={handleVerifyEmail}>Verify</Button>
      <p>Already have an account? <Link href="/authentication" underline="hover">Sign in</Link></p>
 
      <BasicSnackbar vertical={"top"} horizontal={"center"} open={snackbarState} close={handleClose} message={"Try"}/>
      </div>
    </div>
  )
}

export default Register
