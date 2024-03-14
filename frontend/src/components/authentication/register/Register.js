import { React, useState, useMemo, useEffect } from 'react'
import { Button, Link, InputLabel, Input, FormControl, FormHelperText, useFormControl, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleCredential = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [hideRegisterComponent, setHideRegisterComponent] = useState(false);
  const handleVerifyEmail = async () => {
    if(credential.email === '' || credential.email === null) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'Email address is required'});
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credential.email)) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'Invalid email address'});
    } else {
    setLoading(true);
    console.log(credential);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/verify', credential);
      const data = response.data;
      const message = data.message;
      setSnackbar({...snackbar, open: true, severityAlert: 'success', message: message});
      console.log(data);
    } catch(e) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message:  e.response.data.message});
    } finally {
      setLoading(false);
    }
  }
  };

  const handleRegister = () => {
    if(credential.password === '' || credential.password === null || credential.password === undefined || credential.confirmPassword === '' || credential.confirmPassword === null || credential.confirmPassword === undefined) {
      setSnackbar({ ...snackbar, open: true, severityAlert: 'error', message: 'Password and Confirm Password are required' });
    }else if(credential.password !== credential.confirmPassword) {
      setSnackbar({ ...snackbar, open: true, severityAlert: 'error', message: 'Passwords do not match' });
    } 
  }

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
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get('token'));
    if(token !== '' && token !== null) {
      const emailVerification = async () => {
        try {
          setHideRegisterComponent(true);
          setLoading(true);
          const response = await axios.post('http://localhost:8000/api/auth/verifyEmail', {token});
          const data = response.data;
          setCredential({ email: data.email });
        } catch (e) {
          console.error("Error fetching data:", e);
        } finally {
          setLoading(false);
        }
      };
      emailVerification();
    }
}, [token]);

  return (
    <div className='register-container'>
           {loading === true ? <BasicProgress /> : null} 

      <div className='register-left'>

      </div>
      {hideRegisterComponent === false ? 
      <div className='register-right'>
      <h1 className='animate__animated animate__bounceInRight'>Sign Up</h1>
      <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInLeft' error={false}>
      <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
            <Input type="email" id="standard-adornment-email" onChange={handleEmail} />
            <EmailTextHelper />
      </FormControl>
      <Button variant="contained" className='animate__animated animate__bounceInRight' name='email' onClick={handleVerifyEmail}>Verify</Button>
      <p>Already have an account? <Link href="/authentication/login" underline="hover">Sign in</Link></p>
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
      :
      <div className='register-right'>
      <h1 className='animate__animated animate__bounceInRight'>Sign Up</h1>
      <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInLeft' error={false}>
            <Input id="standard-adornment-email" value={credential.email} disabled/>
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
            }  name="password" onChange={handleCredential} required/>
      </FormControl>
      <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInLeft'>
      <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <Input
            id="standard-adornment-confirm-password"
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
            }  name="confirmPassword" onChange={handleCredential}/>
      </FormControl>
      <Button variant="contained" className='animate__animated animate__bounceInRight' name='register' onClick={handleRegister}>Register</Button>
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
    }
    </div>
  )
}

export default Register
