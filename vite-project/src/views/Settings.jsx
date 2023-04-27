import React, {useState} from 'react';
import {Button, Stack, Typography, colors} from '@mui/material';
import Logout from './Logout';

const Settings = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);

  const handleInfoClick = () => {
    setIsInfoClicked(!isInfoClicked);
  };
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
            <Button style={{ fontSize: '1.5rem' }}>Edit Profile</Button>
            <Button style={{ fontSize: '1.5rem' }} onClick={handleInfoClick}>Info</Button>
        {isInfoClicked && (
          <div style={{fontSize: '1.2rem', padding: '1rem'}}>
            Tässä meidän mahtava applikaatio!
          </div>
        )}
            <Button style={{ fontSize: '1.5rem', }} onClick={handleLogout}>Logout</Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default Settings;
