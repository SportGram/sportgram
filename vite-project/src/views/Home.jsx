import {Typography} from '@mui/material';
import React from 'react';
import MediaTable from '../components/MediaTable';

const Home = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Typography component="h1" variant="h3">
      Home
    </Typography>
    <MediaTable />
  </div>
  );
};

export default Home;
