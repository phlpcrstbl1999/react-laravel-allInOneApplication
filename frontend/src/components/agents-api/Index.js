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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import BasicCard from '../common/BasicCard/BasicCard';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BasicProgress from '../common/BasicProgress/BasicProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import Datatable from '../common/Datatable/Datatable';
import BasicSnackbar from '../common/Snackbar/BasicSnackbar';

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




const AgentsApi = () => {
  //React Hook / Declaring / Initializing
  const [tickets, setTickets] = useState([]);
  const columns = [
    {
      name: "license_id",
      label: "license id"
    },
    {
      name: "fullname",
      label: "fullname"
    },
    {
      name: "first_name",
      label: "first name"
    },
    {
      name: "middle_name",
      label: "middle name"
    },
    {
      name: "last_name",
      label: "last name"
    },
    {
      name: "agent_type",
      label: "agent type"
    },
    {
      name: "license_type",
      label: "license type"
    },
    {
      name: "license_date_issued",
      label: "license date issued"
    },
    {
      name: "license_expiration_date",
      label: "license expiration date"
    },
    {
      name: "company_name",
      label: "company name"
    }
  ];

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = useState();
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    user_fname: '',
    user_mname: '',
    user_lname: '',
    email: '',
    profile_path: ''
  });
  const user_fname = userInfo ? userInfo.user_fname : '';
//const user_mname = userInfo ? userInfo.user_mname : '';
  const user_lname = userInfo ? userInfo.user_lname : '';
  const user_profile_path = userInfo ? userInfo.profile_path : '';

  //Functions
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right', 
    severityAlert: '',
    variantAlert: 'filled',
    message: ''
  });
  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };
  const handleAuthorize = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.20.4.92:8000/api/proxy/agents/login',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      if (response.data && response.data.access_token) {
        const updatedApi = {
          name: 'accessToken',
          key: response.data.access_token
        };
        await sendApiKey(updatedApi);
      } else {
        setSnackbar({...snackbar, open: true, severityAlert: 'error', message: response.data});
      }
    } catch(e) {
      if (e.response) {
        console.error('Error response:', e.response.data);
        console.error('HTTP Code:', e.response.status);
      } else {
        console.error('Error:', e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const sendApiKey = async (updatedApi) => {
    try {
      setLoading(true);
      const response = await axios.post('http://192.20.4.92:8000/api/agent/key', updatedApi);
      const data = response.data;
      console.log(data);
      setSnackbar({...snackbar, open: true, severityAlert: 'success', message: 'Authorization uccessful'});
    } catch(e) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: e});
    } finally {
      setLoading(false);
    }
  }

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.20.4.92:8000/api/agents', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = response.data;
      setTickets(data);
      setSnackbar({...snackbar, open: true, severityAlert: 'success', message: 'Data fetched successfully'});
    } catch(e) {
      setSnackbar({...snackbar, open: true, severityAlert: 'error', message: e});
    } finally {
      setLoading(false);
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Divider />
        <List>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          href="/"
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
      
        <List sx={{ backgroundColor: 'rgb(35, 86, 181)'}}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'rgb(255, 255, 255)'
                  }}
                >
                 <ApiRoundedIcon style={{width: '25px', height: '25px'}} />
                </ListItemIcon>
                <ListItemText primary={"Agents API"} sx={{ opacity: open ? 1 : 0, color: 'rgb(255, 255, 255)'  }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container sx={{mb: 3}} spacing={2}>
          <Grid item xs={4}>
            <BasicCard name={"IC Licensed Insurance Agents API"} />    
          </Grid>
        </Grid>
        <Grid container>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'right'}}>
              <Button variant="contained" sx={{marginRight: '10px'}} onClick={handleAuthorize}>Authorize</Button>
              <Button variant="contained" sx={{marginRight: '10px'}} color="success" onClick={handleGenerate}>Generate</Button>
          </Grid>
          </Grid>
          <Grid container>
              <Grid item xs={12}>
              <Datatable title="Agents" data={tickets} columns={columns}/>
            </Grid>
          </Grid>
      </Box>
      <BasicSnackbar
        vertical={snackbar.vertical} 
        horizontal={snackbar.horizontal} 
        open={snackbar.open} 
        close={handleCloseSnackbar} 
        severityAlert={snackbar.severityAlert} 
        variantAlert={snackbar.variantAlert} 
        message={snackbar.message}
      />
    </Box>
  );
}

export default AgentsApi