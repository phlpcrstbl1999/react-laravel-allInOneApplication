import { React, useState, useMemo } from 'react';
import axios from 'axios';
import { Button, Link, InputLabel, Input, InputAdornment, IconButton, FormControl, useFormControl, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';
import BasicSnackbar from '../../common/Snackbar/BasicSnackbar';
import BasicProgress from '../../common/BasicProgress/BasicProgress';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  //React Hook / Declaring / Initializing
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right', 
    severityAlert: '',
    variantAlert: 'filled',
    message: ''
  });

  //Functions
  const handleCredential = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleLogin = async() => {
    if(credential.email === '') {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'Email address is required'});
    } else if(credential.password === '') {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'Password is required'});
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credential.email)) {
      setSnackbar({...snackbar, open: true, severityAlert: 'warning', message: 'Invalid email address'});
    } else {
      setLoading(true);
      console.log(credential);
      try {
        const response = await axios.post('http://localhost:8000/api/auth/login', credential);
        const data = response.data;
        const message = data.message;
        setSnackbar({...snackbar, open: true, severityAlert: 'success', message: message});
        localStorage.setItem('loginToken', data.access_token);
        navigate('/admin');
      } catch(e) {
        setSnackbar({...snackbar, open: true, severityAlert: 'error', message:  e.response.data.message});
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setSnackbar({...snackbar, open: false});
  };
  const EmailTextHelper = () =>{
    const { focused } = useFormControl() || {};
  
    const helperText = useMemo(() => {
      if (focused) {
        return 'Please enter your company email';
      }

      return '';
    }, [focused]);
    return <FormHelperText>{helperText}</FormHelperText>;
  }
  const PasswordTextHelper = () =>{
    const { focused } = useFormControl() || {};
    
    const helperText = useMemo(() => {
      if (focused) {
        return 'Please enter your password';
      }
      
      return '';
    }, [focused]);
    
    return <FormHelperText>{helperText}</FormHelperText>;
  }

  return (
    <div className='login-container'>
       {loading === true ? <BasicProgress /> : null} 
      <div className='login-left'>
      </div>
      <div className='login-right'>
      <h1 className='animate__animated animate__bounceInLeft'>Sign In</h1>
    <FormControl sx={{ m: 1, width: '65%' }} variant="outlined" className='animate__animated animate__bounceInRight'> 
     <InputLabel htmlFor="standard-adornment-username">Email</InputLabel>
          <Input id="standard-adornment-username" name="email" onChange={handleCredential}/>
          <EmailTextHelper />
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
            }  name="password" onChange={handleCredential}/>
            <PasswordTextHelper />
      </FormControl>
      <Button variant="contained" className='animate__animated animate__bounceInRight' onClick={handleLogin}>Submit</Button>
      <p>Don't have an account yet? <Link href="/authentication/register" underline="hover">Sign up</Link></p>
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

export default Login