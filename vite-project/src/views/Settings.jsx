import React, {useState} from 'react';
import {Button, Stack, Typography} from '@mui/material';
import Logout from './Logout';

const Settings = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  return (
    <>
      {isLoggedOut ? (
        <Logout />
      ) : (
        <>
          <Typography component="h1" variant="h3">
            Settings
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button>Edit Profile</Button>
            <Button>Info</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default Settings;
