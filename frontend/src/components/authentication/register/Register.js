import { React, useState, useMemo } from 'react'
import { Button, Link, InputLabel, Input, FormControl, FormHelperText, useFormControl } from '@mui/material';
import axios from 'axios';
import './Register.css';
import BasicSnackbar from '../../common/Snackbar/BasicSnackbar';
import BasicProgress from '../../common/BasicProgress/BasicProgress';
const Register = () => {  
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right', 
    severityAlert: '',
    variantAlert: 'filled',
    message: ''
  });
  const [credential, setCredential] = useState({
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const handleVerifyEmail = async () => {
    if(credential.email === '' || credential.email === null) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'Email address is required'});
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credential.email)) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'Invalid email address'});
    } else {
    setLoading(true);
    console.log(credential);
    try {
      const response = await axios.get('http://localhost:8000/api/auth/verify', {
        params: credential
      });
      const data = response.data;
      const message = data.message;
      setSnackbar({...snackbar, open: true, severityAlert: 'success', message: message});
      console.log(data);
      console.log('success');
    } catch(e) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message:  e.response.data.message});
    } finally {
      setLoading(false);
    }
  }
  };
  const handleEmail = (e) => {
    setCredential({ email: e.target.value });
  }

  const handleClose = () => {
    setSnackbar({...snackbar, open: false});
  };
  
  const EmailTextHelper = () =>{
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
           {loading === true ? <BasicProgress /> : null} 

      <div className='register-left'>

      </div>
      <div className='register-right'>
      <h1 className='animate__animated animate__bounceInRight'>Sign Up</h1>
      <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInLeft' error={false}>
      <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
            <Input type="email" id="standard-adornment-email" onChange={handleEmail} />
            <EmailTextHelper />
      </FormControl>
      <Button variant="contained" className='animate__animated animate__bounceInRight' name='email' onClick={handleVerifyEmail}>Verify</Button>
      <p>Already have an account? <Link href="/authentication" underline="hover">Sign in</Link></p>
      <BasicSnackbar 
        vertical={snackbar.vertical} 
        horizontal={snackbar.horizontal} 
        open={snackbar.open} 
        close={handleClose} 
        severityAlert={snackbar.severityAlert} 
        variantAlert={snackbar.variantAlert} 
        message={snackbar.message}
      />
      </div>
    </div>
  )
}

export default Register
