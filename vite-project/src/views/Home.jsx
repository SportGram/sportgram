import { Typography } from '@mui/material';
import React from 'react';
import MediaTable from '../components/MediaTable';

const Home = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Typography component="h1" variant="h3">


      </Typography>
      <MediaTable />
    </div>
  );
};

export default Home;
