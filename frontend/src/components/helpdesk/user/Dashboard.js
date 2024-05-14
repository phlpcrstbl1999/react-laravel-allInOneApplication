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
import BasicCard from '../../common/BasicCard/BasicCard';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BasicProgress from '../../common/BasicProgress/BasicProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import HelpdeskCard from './Card';
import { MdOutlineSupportAgent } from "react-icons/md";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import Modal from '@mui/material/Modal';
import Datatable from '../../common/Datatable/Datatable';

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
        <Box sx={{ p: 1 }}>
          <div>{children}</div>
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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




const Helpdesk = () => {
  //React Hook / Declaring / Initializing
  const [users, setUsers] = useState([]);
  const columns = [
    {
      name: "id",
    },
    {
      name: "firstName",
    },
    {
      name: "lastName",
    },
    {
      name: "gender",
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    profile_path: ''
  });
  const user_fname = userInfo ? userInfo.user_fname : '';
//   const user_mname = userInfo ? userInfo.user_mname : '';
  const user_lname = userInfo ? userInfo.user_lname : '';
  const user_profile_path = userInfo ? userInfo.profile_path : '';
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
        //getting user info
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

        //getting tickets
        const ticketResponse = await axios.get('https://dummyjson.com/users');
        const ticketData = ticketResponse.data.users;
        setUsers(ticketData);
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
                 <MdOutlineSupportAgent style={{width: '25px', height: '25px'}} />
                </ListItemIcon>
                <ListItemText primary={"Help Desk"} sx={{ opacity: open ? 1 : 0, color: 'rgb(255, 255, 255)'  }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container sx={{mb: 3}} spacing={2}>
          <Grid item xs={4}>
            <BasicCard name={"Lorem Ipsum"} />    
          </Grid>
        </Grid>
        <Grid container sx={{mb: 3}} spacing={2}>
          <Grid item xs={12} sm={6} lg={3} >
              <HelpdeskCard name={"03"} message={"Lorem Ipsum"} backgroundColor={"#FF90BC"}/>   
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
              <HelpdeskCard name={"12"} message={"Lorem Ipsum"} backgroundColor={"#FFC0D9"}/>    
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
              <HelpdeskCard name={"02"} message={"Lorem Ipsum"} backgroundColor={"#F9F9E0"}/>     
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
              <HelpdeskCard name={"21"} message={"Lorem Ipsum"} backgroundColor={"#8ACDD7"}/>    
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>         
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
          <div style={{display: 'flex', justifyContent:'right', alignItems: 'center', width: '100%'}}>
              <Button onClick={handleOpenModal} sx={{height: '75%'}} variant="contained">Create</Button>
            </div>
          <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example" scrollButtons="auto" variant="scrollable">
            <Tab icon={<FolderSpecialRoundedIcon />} iconPosition="start" label="All Tickets" {...a11yProps(0)} />
            <Tab icon={<MarkEmailUnreadRoundedIcon />} iconPosition="start" label="New" {...a11yProps(1)} />
            <Tab icon={<MarkunreadRoundedIcon />} iconPosition="start" label="On-Going" {...a11yProps(2)} />
            <Tab icon={<MarkEmailReadRoundedIcon />} iconPosition="start" label="Resolved" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container>
              <Grid item xs={12}>
                <Datatable title="Employees" data={users} columns={columns}/>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
           <Grid container>
              <Grid item xs={12}>
                <Datatable title="Employees" data={users} columns={columns}/>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
           <Grid container>
              <Grid item xs={12}>
                <Datatable title="Employees" data={users} columns={columns}/>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
           <Grid container>
              <Grid item xs={12}>
                <Datatable title="Employees" data={users} columns={columns}/>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default Helpdesk