import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {useContext, useEffect} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import {themeOptions} from '../themes/themeOptions';
import {
  AddCircleOutlined,
  HomeOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      console.log(userToken);
      const userData = await getUserByToken(userToken);
      if (userData) {
        setUser(userData);
        const target = location.pathname === '/' ? '/home' : location.pathname;
        navigate(target);
        return;
      }
    }
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <AppBar position="sticky" style={{top: '0'}}>
          <Toolbar sx={{justifyContent: 'center'}}>
            <Typography
              variant="h6"
              fontSize={32}
              sx={{
                m: 2,
                letterSpacing: '.2rem',
                textAlign: 'center',
                flexGrow: 1,
              }}
            >
              SportsGram
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >
              {user ? (
                <>
                  <Button
                    sx={{my: 1, color: 'white', mr: 1}}
                    onClick={handleMenuClick}
                  >
                    {user.username}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/settings"
                      onClick={handleClose}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/logout"
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{my: 1, color: 'white'}}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    sx={{my: 1, color: 'white'}}
                  >
                    Signup
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          <Outlet />
        </main>
      </Container>
      <BottomNavigation
        sx={{
          width: '100%',
          height: '100%',
          position: 'sticky',
          bottom: 0,
          backgroundColor: '#0E0F15',
          marginTop: '200px',
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          component={Link}
          to="/profile"
          label={<Typography sx={{color: 'white'}}>Profile</Typography>}
          icon={<AccountCircleOutlined sx={{my: 1, color: 'white'}} />}
        />
        <BottomNavigationAction
          component={Link}
          to="/upload"
          label={<Typography sx={{color: 'white'}}>Upload</Typography>}
          icon={<AddCircleOutlined sx={{my: 1, color: 'white'}} />}
        />
        <BottomNavigationAction
          component={Link}
          to="/home"
          label={<Typography sx={{color: 'white'}}>Home</Typography>}
          icon={<HomeOutlined sx={{my: 1, color: 'white'}} />}
        />
      </BottomNavigation>
    </ThemeProvider>
  );
};

export default Layout;
