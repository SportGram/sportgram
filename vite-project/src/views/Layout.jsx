import { AppBar, Box, Button, Container, createTheme, CssBaseline, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { useUser } from '../hooks/ApiHooks';
import { themeOptions } from '../themes/themeOptions';
import { AddCircleOutlined, HomeOutlined, AccountCircleOutlined } from '@mui/icons-material';


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

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
      <AppBar position="sticky" sx={{flexShrink: 0, width: '20%', position: 'fixed', top: 0, left: 0, bottom: 0}}>
      <Toolbar disableGutters sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>


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
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', padding: '100px'}}>
  <Button component={Link} to="/upload" sx={{ my: 1, color: 'white', alignItems: 'center' }}>
    <HomeOutlined sx={{ mr: 1}} />
    Home&nbsp;&nbsp;&nbsp;&nbsp;
  </Button>
  {user ? (
    <>
      <Button component={Link} to="/profile" sx={{ my: 1, color:'white' }}>
        <AccountCircleOutlined sx={{ mr: 1 }} />
        Profile
      </Button>
      <Button component={Link} to="/upload" sx={{ my: 1, color: 'white' }}>
        <AddCircleOutlined sx={{ mr: 1 }} />
        Upload
      </Button>
      <Button component={Link} to="/myfiles" sx={{ my: 1, color:'white', mr: 1 }}>

        My Files
      </Button>
      <Button component={Link} to="/logout" sx={{ my: 1, color:'white', mr: 1 }}>

        Logout
      </Button>
      <Button component={Link} to="/settings" sx={{ my: 1, color:'white', mr: 1 }}>

        Settings
      </Button>
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

        </AppBar>
        <main>
          <Outlet />
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
