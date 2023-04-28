import {Button, Grid, Typography, useMediaQuery, useTheme} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);
  const toggle = () => {
    setFormToggle(!formToggle);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <Grid container alignItems="center">
      {!isMobile && (
        <Grid item xs={12} md={6}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <img
                src="./src/assets/PhoneAD2.png"
                alt="Image 1"
                style={{width: '100%', height: 'auto', maxWidth: '100%'}}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} md={isMobile ? 12 : 6}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography component="h1" variant="h3">
              {formToggle ? 'Login' : 'Register'}
            </Typography>
          </Grid>
          <Grid item>
            {formToggle ? <LoginForm /> : <RegisterForm toggle={toggle} />}
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{mt: 2}}>
              {formToggle ? 'First time here?' : 'Already registered?'}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={toggle}>
              {formToggle ? 'Register' : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
