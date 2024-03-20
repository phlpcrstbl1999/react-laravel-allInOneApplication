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
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BasicProgress from '../../common/BasicProgress/BasicProgress';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { format } from 'date-fns';

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




const Profile = () => {
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
    date_registered: ''
  });
  const user_fname = userInfo ? userInfo.user_fname : '';
  const user_mname = userInfo ? userInfo.user_mname : '';
  const user_lname = userInfo ? userInfo.user_lname : '';
  const date_registered = userInfo ? format(new Date(userInfo.date_registered), 'dd MMMM yyyy') : '';
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
        const response = await axios.post('http://localhost:8000/api/user', {token}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setUserInfo(data);
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
            <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
            />
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
      <Divider />
    </Drawer>

    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
  
      <Grid container spacing={2}>
        <Grid item sm={12} lg={3}>
        <Card
        variant="outlined"
        sx={{
        width: 'auto',
        // to make the card resizable
        height: '100%',
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
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 110, height: 110 }}
                    />
                </div>
                <Button variant="contained" size="small" sx={{backgroundColor: 'rgb(255, 51, 102)', marginBottom: 2}}>Upload New Photo</Button>
                <div style={{padding: 10, fontSize: '12px', backgroundColor: '#D3D3D3', borderRadius: '5px', marginBottom: 10}} >
                    Upload a new avatar. Larger image will be resized automatically.<br></br>
                    Maximum upload size is <b>1 MB</b>
                </div>
                <Typography sx={{ fontSize: 12 }}>
                    Member Since: <b>{date_registered}</b>
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        <Grid item sm={12} lg={9}>
        <Card
        variant="outlined"
        sx={{
        width: 'auto',
        // to make the card resizable
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
        }}
        >   
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>

        </Grid>
      </Grid>
    </Box>
  </Box>
  )
}

export default Profile
