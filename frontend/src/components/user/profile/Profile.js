import { React, useEffect, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { MdOutlineSupportAgent } from "react-icons/md";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BasicProgress from '../../common/BasicProgress/BasicProgress';
import { useNavigate } from 'react-router-dom';
import { Grid, FormControl, Input, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import BasicSnackbar from '../../common/Snackbar/BasicSnackbar';
import CryptoJS from 'crypto-js';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Profile = () => {
    //React Hook / Declaring / Initializing
    
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = useState();
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    user_fname: '',
    user_mname: '',
    user_lname: '',
    email: '',
    dept_name: '', 
    date_registered: Date(),
    profile_path: ''
  });
  const [credential, setCredential] = useState({
    newPassword: '',
    newConfirmPassword: ''
  });
  const user_fname = userInfo ? userInfo.user_fname : '';
  const user_mname = userInfo ? userInfo.user_mname : '';
  const user_lname = userInfo ? userInfo.user_lname : '';
  const user_email = userInfo ? userInfo.email : '';
  const user_dept = userInfo ? userInfo.dept_name : '';
  const user_profile_path = userInfo ? userInfo.profile_path : '';
  const date_registered = userInfo ? format(new Date(userInfo.date_registered), 'dd MMMM yyyy') : 'No registration date available';
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right', 
    severityAlert: '',
    variantAlert: 'filled',
    message: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  //Functions
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfile = () => {
    navigate('/user/profile');
  }
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => { 
      localStorage.removeItem('loginToken');
      navigate('/authentication/login');
    }, 1000); 
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleCredential = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
  const handleUpdateProfile = async () => {
    if(credential.newPassword === '' || credential.newPassword === null || credential.newPassword === undefined || credential.newConfirmPassword === '' || credential.newConfirmPassword === null || credential.newConfirmPassword === undefined) {
      setSnackbar({ ...snackbar, open: true, severityAlert: 'error', message: 'Password and Confirm Password are required' });
    }else if(credential.newPassword !== credential.newConfirmPassword) {
      setSnackbar({ ...snackbar, open: true, severityAlert: 'error', message: 'Passwords do not match' });
    }else {
      setLoading(true);
      try {
        const response = await axios.post('http://192.20.4.92:8000/api/user/update', {
          email: userInfo.email,
          newPassword: credential.newPassword
        });
        const data = response.data;
        const message = data.message;
        setSnackbar({...snackbar, open: true, severityAlert: 'success', message: message});
        setCredential({ email: credential.newPassword, password: '', newConfirmPassword: '' });
      } catch(e) {
        setSnackbar({...snackbar, open: true, severityAlert: 'error', message:  e.response.data.message});
      } finally {
        setLoading(false);
      }
    }
  }
  const handleUploadProfile = async (e) => {
    const selectedFile = e.target.files[0];
    const fileSizeInMB = selectedFile.size / (1024 * 1024);
    const fileType = selectedFile.name.split('.').pop().toLowerCase();
    console.log(fileType);
    if(fileSizeInMB > 1) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'File size exceeds the maximum limit of 1MB.'});
    }else if(fileType !== 'jpeg' && fileType !== 'jpg' && fileType !== 'png' && fileType !== 'avif'){
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: 'Invalid file type. Please upload valid type'});
    }else {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('user_id', userInfo.user_id);
      try {
        const response = await axios.post('http://192.20.4.92:8000/api/user/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = response.data;
        console.log (data);
    } catch (error) {
        console.error('Error uploading profile picture:', error);
    } finally {
      window.location.reload();
    }
    }
  }
  useEffect(() => {
    setToken(localStorage.getItem('loginToken'));
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const cachedData = localStorage.getItem('userInfo');
        if (cachedData) {
          const decryptedData = CryptoJS.AES.decrypt(cachedData, 'secret-key').toString(CryptoJS.enc.Utf8);
          const parsedData = JSON.parse(decryptedData);
          setUserInfo(parsedData);
        }
        const response = await axios.post('http://192.20.4.92:8000/api/user', {token});
        const data = response.data;
        setUserInfo(data);
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret-key').toString();
        localStorage.setItem('userInfo', encryptedData);
      } catch(e) {
        console.log('error: ', e);
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      fetchUserData();
    } else {
      setUserInfo(null); // Reset user info if token is not available
    }
  }, [token]);
  return (
    <Box sx={{ display: 'flex' }}>
    {loading === true ? <BasicProgress /> : null} 
    <BasicSnackbar
        vertical={snackbar.vertical} 
        horizontal={snackbar.horizontal} 
        open={snackbar.open} 
        close={handleCloseSnackbar} 
        severityAlert={snackbar.severityAlert} 
        variantAlert={snackbar.variantAlert} 
        message={snackbar.message}
      />
    <CssBaseline />
    <AppBar position="fixed" open={open} sx={{ backgroundColor: 'rgb(35, 86, 181)'}}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
          }}
          >
                            
          </Typography>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ 
        backgroundColor: 'rgb(20, 157, 204)',  
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: 150,
        color: 'rgb(255, 255, 255)',
        gap: 1
        }}>
            {<Avatar alt={user_fname + ' ' + user_lname} src={user_profile_path} sx={{ width: 100, height: 100 }} />}
            <Button
              id="fade-button"
              aria-controls={openAnchor ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAnchor ? 'true' : undefined}
              onClick={handleClick}
              sx={{color:'rgb(255, 255, 255)'}}
              endIcon={<ArrowDropDownIcon />}
            >
              {user_fname + ' ' + user_lname}
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={openAnchor}
              onClose={handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={handleProfile}>My Account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
      </List>
      <List>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        href="/dashboard"
      >
            <ListItemIcon
              sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
              }}
            >
              <DashboardRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0}}/>
          </ListItemButton>
      </List>
      <List>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          href="/helpdesk"
        >
              <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                }}
              >
              <MdOutlineSupportAgent style={{width: '25px', height: '25px'}} />
              </ListItemIcon>
              <ListItemText primary="Help Desk" sx={{ opacity: open ? 1 : 0}}/>
            </ListItemButton>
        </List>
      <Divider />
    </Drawer>

    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
  
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={3}>
        <Card
        variant="outlined"
        sx={{
        width: 'auto',
        // to make the card resizable
        height: 'auto',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center'
        }}
        >   
            <CardContent>
                <Typography sx={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 3 }}>
                    {user_fname + ' ' + user_lname}
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }} >
                    {<Avatar alt={user_fname + ' ' + user_lname} src={user_profile_path} sx={{ width: 100, height: 100 }} />}
                </div>
                <Button  component="label" role={undefined} variant="contained" size="small" sx={{backgroundColor: 'rgb(255, 51, 102)', marginBottom: 2}} onChange={handleUploadProfile}>Upload New Photo  <VisuallyHiddenInput type="file" /></Button>
                <div style={{padding: 10, fontSize: '12px', backgroundColor: '#D3D3D3', borderRadius: '5px', marginBottom: 10}} >
                    Upload a new avatar. Larger image will be resized automatically.<br></br>
                    Maximum upload size is <b>1 MB</b>
                </div>
                <Typography sx={{ fontSize: 12 }}>
                    Registered Since: <b>{date_registered}</b>
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={9}>
        <div style={{border: '1px solid #D3D3D3', borderRadius: '5px'}}>
        <div style={{padding: '15px 15px 0 15px', backgroundColor: '#E5E4E2'}}>
            <Typography variant="h5" fontWeight={'bold'} gutterBottom sx={{paddingLeft: '15px'}}>
                    Edit Profile
            </Typography>
              <Tabs value={value} onChange={handleChange} aria-label="user-profile tabs">
                <Tab label="User Info" {...a11yProps(0)} />
                {/* <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
           
            {/* <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Item Three
            </CustomTabPanel> */}
        </div>
              <div style={{padding: 20}}>
                <Grid container spacing={2} paddingBottom={2}>
                  <Grid item xs={12} sm={4} lg={4}>
                    <label style={{fontSize:'12px', fontWeight:'bold'}}>First Name</label>
                    <TextField id="user_fname" variant="outlined" value={user_fname} sx={{width: '100%'}} readOnly />
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <label style={{fontSize:'12px', fontWeight:'bold'}}>Middle Name</label>
                    <TextField id="user_mname" variant="outlined" value={user_mname} sx={{width: '100%'}} readOnly />
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <label style={{fontSize:'12px', fontWeight:'bold'}}>Last Name</label>
                    <TextField id="user_lname" variant="outlined" value={user_lname} sx={{width: '100%'}} readOnly />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <label style={{fontSize:'12px', fontWeight:'bold'}}>Email Address</label>
                    <TextField id="user_email" variant="outlined" value={user_email} sx={{width: '100%'}} readOnly />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <label style={{fontSize:'12px', fontWeight:'bold'}}>Department</label>
                    <TextField id="user_dept" variant="outlined" value={user_dept} sx={{width: '100%'}} readOnly />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                  <label style={{fontSize:'12px', fontWeight:'bold'}}>New Password</label>
                      <Input
                      variant="outlined"
                        id="standard-adornment-new-password"
                        value={credential.newPassword || ''}
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
                        }  name="newPassword" onChange={handleCredential} required/>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                  <label style={{fontSize:'12px', fontWeight:'bold'}}>Confirm New Password</label>
                      <Input
                      variant="outlined"
                        id="standard-adornment-new-confirm-password"
                        value={credential.newConfirmPassword || ''}
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
                        }  name="newConfirmPassword" onChange={handleCredential} required/>
                  </FormControl>
                  </Grid>
                </Grid>
                <Button variant="contained" size="medium" sx={{backgroundColor: 'rgb(255, 51, 102)'}} onClick={handleUpdateProfile}>Save</Button>
        </div>
        </div>

        </Grid>
      </Grid>
    </Box>
  </Box>
  )
}

export default Profile
