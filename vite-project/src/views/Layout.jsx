
import { AppBar, Box, Button, Container, createTheme, CssBaseline, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';


import { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { useUser } from '../hooks/ApiHooks';
import { themeOptions } from '../themes/themeOptions';

import { AddCircleOutlined, HomeOutlined, AccountCircleOutlined } from '@mui/icons-material';


import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';



const Layout = () => {
  const { user, setUser } = useContext(MediaContext);
  const { getUserByToken } = useUser();
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
      <AppBar position="sticky" style={{ top: '0' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
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
                    sx={{ my: 1, color: 'white', mr: 1 }}
                    onClick={handleMenuClick}
                  >
                    {user.username}

              SportsGram
            </Typography>
            <Box sx={{ mr: 2 }}>
              <Button sx={{ color: 'white' }} component={Link} to="/home">
                Home
              </Button>
              {user ? (
                <>
                  <Button sx={{ color: 'white' }} component={Link} to="/profile">
                    Profile
                  </Button>
                  <Button sx={{ color: 'white' }} component={Link} to="/upload">
                    Upload
                  </Button>
                  <Button sx={{ color: 'white' }} component={Link} to="/myfiles">
                    My Files
                  </Button>
                  <Button sx={{ color: 'white' }} component={Link} to="/settings">
                    Settings
                  </Button>
                  <Button sx={{ color: 'white' }} component={Link} to="/logout">
                    Logout
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
                    <MenuItem onClick={handleClose}
                         component={Link}
                         to="/logout"

                    >Logout</MenuItem>
                  </Menu>
                </>
              ) : (

                <>
      <Button component={Link} to="/login" sx={{ my: 1, color:'white' }}>
        Login
      </Button>
      <Button component={Link} to="/signup" sx={{ my: 1, color:'white' }}>
        Signup
      </Button>
    </>
  )}
</Box>


</Toolbar>



                <Button sx={{ color: 'white' }} component={Link} to="/">
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>

        </AppBar>
        <main style={{}}>
           <Outlet />
          </main>
      </Container>
      <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#0E0F15'  }} value={value} onChange={handleChange}>
  <BottomNavigationAction
    component={Link} to="/profile"
    label={<Typography sx={{ color: 'white' }}>Profile</Typography>}
    icon={<AccountCircleOutlined sx={{ my: 1, color:'white' }}  />}
  />
  <BottomNavigationAction
    component={Link} to="/upload"
    label={<Typography sx={{ color: 'white' }}>Upload</Typography>}
    icon={<AddCircleOutlined sx={{ my: 1, color:'white' }} />}
  />
  <BottomNavigationAction
    component={Link} to="/home"
    label={<Typography sx={{ color: 'white' }}>Home</Typography>}
    icon={<HomeOutlined sx={{ my: 1, color:'white' }}/>}
  />
</BottomNavigation>
    </ThemeProvider>
  );
};

export default Layout;
