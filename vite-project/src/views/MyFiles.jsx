import React from 'react';
import {Tabs, Typography} from '@mui/material';
import MediaTable from '../components/MediaTable';

const MyFiles = () => {
  return (
    <>
      <Typography component="h1" variant="h3">
      </Typography>
      <MediaTable myFilesOnly={true} />

    </>


  );
};



export default MyFiles;
