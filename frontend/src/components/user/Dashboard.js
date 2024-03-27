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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import BasicCard from '../common/BasicCard/BasicCard';
import { Grid } from '@mui/material';
import MainButton from '../common/MainButton/MainButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BasicProgress from '../common/BasicProgress/BasicProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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




const Dashboard = () => {
  //React Hook / Declaring / Initializing
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
    profile_path: ''
  });
  const user_fname = userInfo ? userInfo.user_fname : '';
  const user_mname = userInfo ? userInfo.user_mname : '';
  const user_lname = userInfo ? userInfo.user_lname : '';
  const user_profile_path = userInfo ? userInfo.profile_path : '';
  //Functions
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
          const parsedData = JSON.parse(cachedData);
          setUserInfo(parsedData);
        }
        const response = await axios.post('http://localhost:8000/api/user', {token}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
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
              {/* <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'rgb(255, 255, 255)'
                }}
              >
                <DashboardRoundedIcon />
              </ListItemIcon> */}
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
        <List sx={{ backgroundColor: 'rgb(35, 86, 181)'}}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          href=""
        >
              <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'rgb(255, 255, 255)'
                }}
              >
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0, color: 'rgb(255, 255, 255)' }}/>
            </ListItemButton>
        </List>
        <Divider />
        <List>
          {['Sample 1', 'Sample 2', 'Sample 3'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container sx={{mb: 3}} spacing={2}>
          <Grid item xs={4}>
            <BasicCard message={"Welcome back!"} name={user_fname + ' ' + user_lname} />    
          </Grid>
        </Grid>
        <Grid container sx={{mb: 3}} spacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <MainButton appName={"Document Management System"} appDescription={`We are a community of developers prepping for coding interviews,
        participate, chat with others and get better at interviewing.`}/>   
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MainButton appName={"QRCode Generator"} appDescription={`We are a community of developers prepping for coding interviews,
        participate, chat with others and get better at interviewing.`}/>      
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MainButton appName={"Agents Portal"} appDescription={`We are a community of developers prepping for coding interviews,
        participate, chat with others and get better at interviewing.`}/>    
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <MainButton appName={"Clearance Processing"} appDescription={`We are a community of developers prepping for coding interviews,
        participate, chat with others and get better at interviewing.`}/>      
          </Grid>
        </Grid>
             
              {/* <Dashboard /> */}

      </Box>
    </Box>
  );
}

export default Dashboard