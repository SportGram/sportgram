import {Typography} from '@mui/material';
import React from 'react';
import MediaTable from '../components/MediaTable';

const Home = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
    <Typography component="h1" variant="h3">
      Home
    </Typography>
    <MediaTable style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}} />
  </div>
  );
};

export default Home;
